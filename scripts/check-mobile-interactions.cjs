const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools','node_modules/puppeteer-core'));
const origin=process.env.DND_PERF_ORIGIN||'http://127.0.0.1:3100';
const output=process.env.DND_MOBILE_REPORT||'docs/mobile-interactions-final-2026-10-15.json';
const gesturesOnly=process.argv.includes('--gestures-only');
const report={measuredAt:new Date().toISOString(),buildId:fs.readFileSync('.next/BUILD_ID','utf8').trim(),checked:[],errors:[]};
const save=()=>fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
(async()=>{
 const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
 try{
  if(!gesturesOnly)for(const locale of ['tr','en'])for(const [width,height] of [[320,740],[360,800],[390,844],[430,932],[768,1024],[844,390]]){
   const context=await browser.createBrowserContext(); const page=await context.newPage();
   page.on('pageerror',e=>report.errors.push({locale,width,message:e.message}));
   await page.setViewport({width,height,isMobile:true,hasTouch:true,deviceScaleFactor:2});
   await page.setRequestInterception(true);page.on('request',r=>r.url().startsWith(origin)||/^(data|blob):/.test(r.url())?r.continue():r.abort());
   await page.setCookie({name:'dnd_consent',value:encodeURIComponent(JSON.stringify({v:1,analytics:false,ads:false,ts:Date.now()})),url:origin});
   await page.goto(origin+'/'+locale,{waitUntil:'networkidle2'});
   const menu='header button[aria-label="Open menu"]',dialog='#site-menu';
   await page.tap(menu);await page.waitForSelector(dialog,{visible:true});
   await page.waitForFunction(()=>{const b=document.querySelector('#site-menu button[aria-label="Close menu"]');const r=b?.getBoundingClientRect();return r&&r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight});
   assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
   assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'Close menu');
   assert.equal(await page.$eval(dialog,e=>e.scrollWidth>e.clientWidth+1),false);
   const toggle=locale==='tr'?'button[aria-label="Alt menüyü aç/kapat"]':'button[aria-label="Toggle submenu"]';
   await page.tap(dialog+' '+toggle);await page.waitForSelector(dialog+' a[href="/'+locale+'/perla-ii"]',{visible:true});
   assert.equal(await page.$eval(dialog+' '+toggle,e=>e.getAttribute('aria-expanded')),'true');
   await page.keyboard.press('Tab');assert.ok(await page.$eval(dialog,e=>e.contains(document.activeElement)));
   await page.keyboard.press('Escape');await page.waitForSelector(dialog,{hidden:true});
   assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
   assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'Open menu');
   // Exercise the actual touch path; vertical gestures must remain scrollable.
   const start=await page.$eval('.hero-carousel [aria-hidden="false"]',e=>e.dataset.heroSlide);
   await page.tap('.hero-carousel-next');await page.waitForFunction(previous=>document.querySelector('.hero-carousel [aria-hidden="false"]')?.getAttribute('data-hero-slide')!==previous,{},start);
   assert.equal(await page.$eval('.hero-carousel',e=>getComputedStyle(e).touchAction),'pan-y pinch-zoom');
   assert.ok(await page.$$eval('.hero-carousel-dot',nodes=>nodes.every(e=>{const r=e.getBoundingClientRect();return r.width>=44&&r.height>=44})));
   if(height===390){
    assert.ok(await page.$eval('.hero-carousel',e=>e.getBoundingClientRect().height>=576));
    assert.ok(await page.$eval('.hero-carousel [aria-hidden="false"] h2',e=>e.getBoundingClientRect().top>document.querySelector('header').getBoundingClientRect().bottom));
   }
   if(height===390)await page.$eval('.hero-carousel-pagination',e=>e.scrollIntoView({block:'center',behavior:'instant'}));
   assert.ok(await page.$$eval('.hero-carousel-dot',nodes=>nodes.every(e=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))})), 'Every pagination target must remain reachable above floating controls');
   await page.evaluate(()=>scrollTo({top:1000,behavior:'instant'}));await page.waitForSelector('#floating-hamburger',{visible:true});await page.tap('#floating-hamburger');await page.waitForSelector(dialog,{visible:true});
   await page.waitForFunction(()=>{const r=document.querySelector('#site-menu button[aria-label="Close menu"]')?.getBoundingClientRect();return r&&r.right<=innerWidth&&r.left>=0});
   await page.tap(dialog+' button[aria-label="Close menu"]');await page.waitForSelector(dialog,{hidden:true});
   await page.screenshot({path:'/private/tmp/dnd-mobile-menu-'+locale+'-'+width+'.png'});
   report.checked.push({locale,width,height,checks:'immediate touch menu; in-bounds drawer; accordion; scroll lock/restoration; focus/Escape; touch carousel; 44px pagination; pinch zoom; short landscape hero; floating menu'});save();
   await context.close();
  }
  if(!gesturesOnly)for(const locale of ['tr','en'])for(const [width,height] of [[320,740],[844,390]]){
   const context=await browser.createBrowserContext();const page=await context.newPage();await page.setViewport({width,height,isMobile:true,hasTouch:true});
   await page.setRequestInterception(true);page.on('request',r=>r.url().startsWith(origin)||/^(data|blob):/.test(r.url())?r.continue():r.abort());
   await page.goto(origin+'/'+locale,{waitUntil:'networkidle2'});
   const consent='[role="dialog"][aria-modal="false"]';await page.waitForSelector(consent,{visible:true});
   assert.ok(await page.$eval(consent,e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight}));
   const necessary=locale==='tr'?'Yalnızca zorunlu':'Necessary only';
   await page.$$eval(consent+' button',(buttons,label)=>buttons.find(b=>b.textContent.trim()===label)?.scrollIntoView({block:'nearest'}),necessary);
   const button=await page.$$(consent+' button');let pressed=false;for(const b of button)if(await b.evaluate((e,label)=>e.textContent.trim()===label,necessary)){await b.tap();pressed=true;break;}assert.ok(pressed);
   await page.waitForSelector(consent,{hidden:true});
   assert.deepEqual(await page.evaluate(()=>{const c=window.dndConsent.get();return {analytics:c.analytics,ads:c.ads}}),{analytics:false,ads:false});
   report.checked.push({locale,width,height,checks:'fresh-visit consent fits narrow/landscape viewport and necessary-only choice remains tappable'});save();await context.close();
  }
  for(const locale of ['tr','en']){
   const context=await browser.createBrowserContext();const page=await context.newPage();
   await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
   await page.setRequestInterception(true);page.on('request',r=>r.url().startsWith(origin)||/^(data|blob):/.test(r.url())?r.continue():r.abort());
   await page.setCookie({name:'dnd_consent',value:encodeURIComponent(JSON.stringify({v:1,analytics:false,ads:false,ts:Date.now()})),url:origin});
   await page.goto(origin+'/'+locale,{waitUntil:'networkidle2'});await page.focus('.hero-carousel');
   const cdp=await page.createCDPSession();
   const swipe=async(x1,y1,x2,y2)=>{
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y:y1}]});
    for(let i=1;i<=8;i++){
     await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1+(x2-x1)*i/8,y:y1+(y2-y1)*i/8}]});
     await new Promise(resolve=>setTimeout(resolve,24));
    }
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   };
   const previous=await page.$eval('.hero-carousel [aria-hidden="false"]',e=>e.dataset.heroSlide);
   await swipe(300,180,90,180);
   await page.waitForFunction(before=>document.querySelector('.hero-carousel [aria-hidden="false"]').dataset.heroSlide!==before,{},previous);
   await swipe(195,450,195,150);await page.waitForFunction(()=>scrollY>50);
   report.checked.push({locale,width:390,checks:'native horizontal touch swipe changes slide; vertical touch scroll remains available'});save();await context.close();
  }
  assert.deepEqual(report.errors,[]);report.status='passed';save();
 }finally{await browser.close();}
})().catch(e=>{report.status='failed';report.failure=String(e);save();console.error(e);process.exitCode=1});
