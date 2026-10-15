const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');

// Valid but synthetic IDs: these tests never contact an advertising service.
const env = {
  NEXT_PUBLIC_GA4_ID: 'G-TEST1234',
  NEXT_PUBLIC_GOOGLE_ADS_ID: 'AW-123456789',
  NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL: 'test-lead',
  NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL: 'test-whatsapp',
  NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL: 'test-phone',
  NEXT_PUBLIC_META_PIXEL_ID: '123456789',
  NEXT_PUBLIC_CLARITY_ID: 'test123456',
};
const plain = value => JSON.parse(JSON.stringify(value));

function browser(url = 'https://www.example.test/tr/lagoon-verde?utm_source=facebook&utm_campaign=test') {
  const location = new URL(url);
  const cookies = new Map();
  const scripts = new Map();
  const window = new EventTarget();
  window.location = location;
  const document = {
    title: 'Test project', referrer: '',
    get cookie() { return [...cookies].map(([k,v]) => `${k}=${v}`).join('; '); },
    set cookie(value) {
      const [pair, ...attributes] = value.split(';');
      const split = pair.indexOf('=');
      const name = pair.slice(0,split);
      if (attributes.some(part => part.trim().toLowerCase() === 'max-age=0')) cookies.delete(name);
      else cookies.set(name,pair.slice(split+1));
    },
    getElementById: id => scripts.get(id),
    createElement: () => ({}),
    head: {appendChild: script => scripts.set(script.id,script)},
  };
  const globals = {window, document, location};
  const analytics = loadTypeScript('lib/analytics.ts',{env,globals});
  const attribution = loadTypeScript('lib/attribution.ts',{env,globals,mocks:{'./analytics':analytics}});
  const calls = () => Array.from(window.dataLayer || [], entry => Array.from(entry || []));
  return {window,document,location,cookies,scripts,globals,analytics,attribution,calls};
}

test('no consent: Meta, Clarity and attribution cookies stay off; Google uses explicit page events', () => {
  const b=browser();
  assert.equal(b.analytics.loadMetaPixel(),false);
  assert.equal(b.analytics.loadClarity(),false);
  b.attribution.captureAttribution();
  assert.equal(b.cookies.size,0);
  assert.equal(b.analytics.loadGoogleTags(),true);
  assert.equal(b.scripts.size,1);
  for (const call of b.calls().filter(c=>c[0]==='config')) assert.equal(call[2].send_page_view,false);
});

test('missing/invalid integration IDs do not inject scripts', () => {
  const b=browser();
  const api=loadTypeScript('lib/analytics.ts',{globals:b.globals,env:{NEXT_PUBLIC_GA4_ID:'bad',NEXT_PUBLIC_META_PIXEL_ID:'bad'}});
  api.saveConsent({analytics:true,ads:true});
  assert.equal(api.loadGoogleTags(),false);
  assert.equal(api.loadMetaPixel(),false);
  assert.equal(api.loadClarity(),false);
  assert.equal(b.scripts.size,0);
});

test('analytics-only consent loads Clarity, keeps Meta off, and reports ads denied', () => {
  const b=browser();
  b.analytics.saveConsent({analytics:true,ads:false});
  assert.equal(b.analytics.loadClarity(),true);
  assert.equal(b.analytics.loadMetaPixel(),false);
  assert.equal(b.window.clarity.q[0][1].ad_Storage,'denied');
  assert.equal(b.window.clarity.q[0][1].analytics_Storage,'granted');
});

test('ads-only consent loads Meta once and keeps Clarity off', () => {
  const b=browser();
  b.analytics.saveConsent({analytics:false,ads:true});
  assert.equal(b.analytics.loadMetaPixel(),true);
  assert.equal(b.analytics.loadMetaPixel(),false);
  assert.equal(b.analytics.loadClarity(),false);
  b.analytics.loadGoogleTags();b.analytics.loadGoogleTags();
  assert.equal(b.scripts.size,2);
  assert.equal(b.window.fbq.queue.filter(c=>c[0]==='init').length,1);
  assert.equal(b.calls().filter(c=>c[0]==='config' && c[1]===env.NEXT_PUBLIC_GA4_ID).length,1);
});

test('consent revocation removes marketing, analytics and attribution cookies and stops Meta events', () => {
  const b=browser();
  b.analytics.saveConsent({analytics:true,ads:true});
  b.analytics.loadMetaPixel();b.analytics.loadClarity();
  for(const name of ['_fbp','_fbc','_gcl_aw','_ga','_ga_TEST','_gid','_clck','_clsk','dnd_ft','dnd_lt']) b.cookies.set(name,'test');
  b.analytics.saveConsent({analytics:false,ads:false});
  assert.deepEqual([...b.cookies.keys()],['dnd_consent']);
  const count=b.window.fbq.queue.length;
  b.analytics.track('generate_lead',{}, {eventId:'test-event-1234'});
  assert.equal(b.window.fbq.queue.length,count);
  assert(b.window.clarity.q.some(c=>c[0]==='consent' && c[1]===false));
});

test('lead, WhatsApp and phone conversions use separate Ads labels and lead IDs match Meta', () => {
  const b=browser();
  b.analytics.saveConsent({analytics:true,ads:true});b.analytics.loadMetaPixel();
  b.analytics.track('generate_lead',{project:'lagoon-verde'},{eventId:'test-event-1234'});
  b.analytics.track('contact_whatsapp');b.analytics.track('contact_phone');
  const conversions=b.calls().filter(c=>c[0]==='event'&&c[1]==='conversion');
  assert.deepEqual(conversions.map(c=>c[2].send_to),['AW-123456789/test-lead','AW-123456789/test-whatsapp','AW-123456789/test-phone']);
  assert.equal(conversions[0][2].transaction_id,'test-event-1234');
  const meta=b.window.fbq.queue.filter(c=>c[0]==='track'&&c[1]==='Lead');
  assert.equal(meta.length,1);assert.equal(meta[0][3].eventID,'test-event-1234');
});

test('enhanced conversion data only set with ads consent and normalizes email/phone', () => {
  const b=browser();
  const data={email:' TEST@EXAMPLE.COM ',phone:'0548 888 03 63',locale:'tr'};
  b.analytics.setEnhancedConversionData(data);
  assert(!b.calls().some(c=>c[1]==='user_data'));
  b.analytics.saveConsent({analytics:false,ads:true});
  b.analytics.setEnhancedConversionData(data);
  const call=b.calls().find(c=>c[1]==='user_data');
  assert.deepEqual(plain(call[2]),{email:'test@example.com',phone_number:'+905488880363'});
});

test('admin page cannot emit page or conversion events', () => {
  const b=browser('https://www.example.test/admin/leads');
  b.analytics.pageView();b.analytics.track('generate_lead');
  assert.equal(b.scripts.size,0);assert.equal(b.window.dataLayer,undefined);
});

test('UTM values stay in memory before consent, persist after consent, survive navigation', () => {
  const b=browser();
  b.attribution.captureAttribution();
  assert.equal(b.cookies.size,0);
  assert.equal(b.attribution.getAttribution().first.utm_source,'facebook');
  assert.equal(b.attribution.attributionRef(),' (Ref: facebook-test)');
  b.analytics.saveConsent({analytics:true,ads:false});b.attribution.persistAttribution();
  assert(b.cookies.has('dnd_ft'));assert(b.cookies.has('dnd_lt'));
  b.location.href='https://www.example.test/tr/contact';
  assert.equal(b.attribution.getAttribution().last.utm_campaign,'test');
});

test('revoking and regranting consent restores both first and last touch cookies', () => {
  const b=browser();
  b.analytics.saveConsent({analytics:true,ads:false});b.attribution.captureAttribution();
  b.location.href='https://www.example.test/tr/contact?utm_source=google&utm_campaign=second';
  b.attribution.captureAttribution();
  b.analytics.saveConsent({analytics:false,ads:false});
  b.analytics.saveConsent({analytics:true,ads:false});b.attribution.persistAttribution();
  assert(b.cookies.has('dnd_ft'));
  assert(b.cookies.has('dnd_lt'),'last touch cookie must be restored after consent is regranted');
  assert.equal(JSON.parse(decodeURIComponent(b.cookies.get('dnd_lt'))).utm_campaign,'second');
});

test('attribution sanitizer discards email-like UTM input and unknown fields', () => {
  const b=browser();
  const clean=b.attribution.sanitizeTouch({utm_source:'example@test.com',utm_campaign:'valid',password:'secret',landing:'/tr',ts:42});
  assert.equal(clean.utm_source,undefined);assert.equal(clean.password,undefined);assert.equal(clean.utm_campaign,'valid');
});

for (const [name, value, expectGrant] of [
  ['absent',null,false],
  ['valid',{v:1,analytics:true,ads:true},true],
  ['malformed',{v:1,analytics:'false',ads:'false'},false],
]) {
  test(`head Consent Mode defaults: ${name} consent cookie`,()=>{
    const api=loadTypeScript('lib/analytics.ts');
    const context={document:{cookie:value?`dnd_consent=${encodeURIComponent(JSON.stringify(value))}`:''}};
    context.window=context;
    vm.runInNewContext(api.CONSENT_DEFAULT_SCRIPT,context);
    const calls=Array.from(context.dataLayer,entry=>Array.from(entry));
    const initial=calls.find(c=>c[0]==='consent'&&c[1]==='default')[2];
    for(const field of ['ad_storage','ad_user_data','ad_personalization','analytics_storage']) assert.equal(initial[field],'denied');
    const updates=calls.filter(c=>c[0]==='consent'&&c[1]==='update');
    if(expectGrant) assert.equal(updates.at(-1)[2].ad_storage,'granted');
    else assert(!updates.some(c=>Object.values(c[2]).includes('granted')),'malformed or absent consent must never grant tracking');
  });
}
