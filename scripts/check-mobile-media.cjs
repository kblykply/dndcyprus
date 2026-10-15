const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const puppeteer=require(path.join(process.env.DND_PERF_TOOLS_DIR||'/private/tmp/dnd-performance-tools','node_modules/puppeteer-core'));
const origin=process.env.DND_PERF_ORIGIN||'http://127.0.0.1:3100';
const report={measuredAt:new Date().toISOString(),buildId:fs.readFileSync('.next/BUILD_ID','utf8').trim(),checked:[],errors:[]};
const output=process.env.DND_MOBILE_REPORT||'docs/mobile-media-final-2026-10-15.json';
const save=()=>fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
(async()=>{
 const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
 try{
  const profiles=process.argv.includes('--tablet-landscape-only')?[[768,1024],[844,390]]:[[320,844],[390,844],[1440,844]];
  for(const locale of ['tr','en'])for(const [width,height] of profiles){
   const context=await browser.createBrowserContext();const page=await context.newPage();const requests=[];
   page.on('pageerror',e=>report.errors.push(e.message));
   await page.setViewport({width,height,deviceScaleFactor:2});
   await page.setRequestInterception(true);page.on('request',r=>{if(r.url().startsWith(origin)||/^(data|blob):/.test(r.url())){requests.push(r.url());r.continue()}else r.abort()});
   await page.setCookie({name:'dnd_consent',value:encodeURIComponent(JSON.stringify({v:1,analytics:false,ads:false,ts:Date.now()})),url:origin});
   await page.goto(origin+'/'+locale,{waitUntil:'networkidle2'});
   const image='.hero-carousel [data-hero-slide="0"] img';
   await page.waitForFunction(s=>{const i=document.querySelector(s);return i?.complete&&i.naturalWidth>0}, {},image);
   const initialSrc=await page.$eval(image,i=>i.currentSrc);
   assert.ok(new URL(initialSrc).pathname.startsWith('/optimized/home-hero-'));
   assert.ok(initialSrc.endsWith('.avif'));
   assert.equal(requests.filter(url=>decodeURIComponent(url).includes('/lagoon-verde/1.jpg')).length,0,'No duplicate WebP hero request in AVIF browsers');
   assert.equal(requests.filter(url=>/BEST-(SOCIOCULTURAL|PROPOSED|NEWCOMER)/.test(decodeURIComponent(url))).length,0,'Below-fold awards defer until visible');
   assert.equal(await page.$eval(image,i=>i.fetchPriority),'high');
   // Verify the real browser fallback without deleting the original photograph.
   await page.$eval(image,i=>{i.parentElement.querySelector('source').type='image/unsupported'});
   await page.waitForFunction(s=>{const i=document.querySelector(s);return i?.complete&&i.currentSrc.includes('/_next/image?')&&i.naturalWidth>0},{},image);
   const awards='section[aria-label="Ödüller bölümü"]';
   await page.$eval(awards,e=>e.scrollIntoView({block:'center',behavior:'instant'}));
   await page.waitForFunction(s=>{const images=[...document.querySelectorAll(s+' img')];return images.length===3&&images.every(i=>i.complete&&i.naturalWidth>0)},{},awards);
   const previous=await page.$eval(awards,e=>e.innerText);
   await page.focus(awards);await page.keyboard.press('ArrowRight');await page.waitForFunction((s,before)=>document.querySelector(s).innerText!==before,{},awards,previous);
   await page.evaluate(()=>[...document.querySelectorAll('div')].find(e=>e.classList.contains('min-h-[640px]'))?.scrollIntoView({block:'center',behavior:'instant'}));
   const payment='section[aria-label="'+(locale==='tr'?'Proje Video Sunum Slider':'Project video carousel')+'"]';
   await page.waitForSelector(payment+' .swiper-initialized');
   assert.equal(await page.$eval(payment+' .swiper-wrapper',e=>getComputedStyle(e).display),'flex');
   assert.ok(await page.$eval(payment+' .swiper-slide',e=>getComputedStyle(e).transitionProperty.includes('opacity')));
   const active=await page.$eval(payment+' .swiper',e=>e.swiper.realIndex);
   await page.$eval(payment,e=>e.scrollIntoView({block:'center',behavior:'instant'}));
   await page.click(payment+' button[aria-label="'+(locale==='tr'?'Sonraki slayt':'Next slide')+'"]');
   await page.waitForFunction((s,before)=>document.querySelector(s).swiper.realIndex!==before,{},payment+' .swiper',active);
   report.checked.push({locale,width,height,deviceScaleFactor:2,initialSrc,checks:'one AVIF hero request; high fetch priority; working WebP fallback; awards deferred/loaded/switched; dynamically loaded Swiper base/fade styles and navigation'});save();await context.close();
  }
  assert.deepEqual(report.errors,[]);report.status='passed';save();
 }finally{await browser.close();}
})().catch(e=>{report.status='failed';report.failure=String(e);save();console.error(e);process.exitCode=1});
