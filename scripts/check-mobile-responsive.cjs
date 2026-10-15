const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools', 'node_modules/puppeteer-core'));
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
const output = process.env.DND_MOBILE_REPORT || 'docs/mobile-responsive-final-2026-10-15.json';
const baseline = process.argv.includes('--baseline');
const quick = process.argv.includes('--quick');
const landscape = process.argv.includes('--landscape');
const routesIndex = process.argv.indexOf('--routes');
const widths = landscape ? [[844,390]] : quick ? [[320,740],[768,1024],[844,390]] : [[320,740],[390,844],[768,1024]];
const report = { measuredAt: new Date().toISOString(), buildId: fs.readFileSync('.next/BUILD_ID','utf8').trim(), checked: [], errors: [], pageErrors: [] };
const save = () => fs.writeFileSync(output, JSON.stringify(report,null,2)+'\n');
(async()=>{
  const routes = routesIndex >= 0 ? process.argv[routesIndex+1].split(',') : quick || landscape ? ['/tr','/en','/tr/contact','/en/contact','/tr/perla-ii','/en/perla-ii','/tr/privacy','/en/privacy'] : [...(await (await fetch(origin+'/sitemap.xml')).text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).concat('/tr/qr');
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args:['--no-sandbox'] });
  try {
    const context=await browser.createBrowserContext(); const page=await context.newPage();
    await page.setCacheEnabled(false);
    let route;
    page.on('pageerror',error=>report.pageErrors.push({route,message:error.message}));
    await page.setRequestInterception(true);
    page.on('request',r=>r.url().startsWith(origin)||/^(data|blob):/.test(r.url())?r.continue():r.abort());
    await page.setCookie({name:'dnd_consent',value:encodeURIComponent(JSON.stringify({v:1,analytics:false,ads:false,ts:Date.now()})),url:origin});
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    for(const [width,height] of widths) for(route of routes){
      await page.setViewport({width,height,isMobile:true,hasTouch:true,deviceScaleFactor:2});
      const response=await page.goto(origin+route,{waitUntil:'domcontentloaded'});
      if(route!=='/tr/qr') await page.waitForFunction(()=>!!window.dndConsent,{timeout:15000});
      await page.evaluate(()=>document.fonts.ready);
      const issues=[];
      for(const position of ['top','middle','bottom']){
        await page.evaluate(position=>scrollTo({top:position==='top'?0:position==='bottom'?document.body.scrollHeight:document.body.scrollHeight/2,behavior:'instant'}),position);
        await new Promise(resolve=>setTimeout(resolve,140));
        const check=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,scrollWidth:document.documentElement.scrollWidth,headerOverflow: (()=>{const h=document.querySelector('header');if(!h||getComputedStyle(h).transform!=='none'&&h.getBoundingClientRect().bottom<0)return false;return [...h.querySelectorAll('a,button')].some(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'&&(r.right>innerWidth+1||r.left< -1)});})()}));
        if(check.overflow)issues.push({position,type:'horizontal overflow',scrollWidth:check.scrollWidth});
        if(check.headerOverflow)issues.push({position,type:'header controls outside viewport'});
      }
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      await new Promise(resolve=>setTimeout(resolve,140));
      const header=await page.$('header');
      if(header&&width<1024){
        const reachable=await page.evaluate(()=>[...document.querySelectorAll('button[aria-label="Open menu"]')].some(b=>{const r=b.getBoundingClientRect();return r.width>=24&&r.height>=24&&r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth}));
        if(!reachable)issues.push({type:'no immediately reachable mobile menu'});
      }
      const fields=await page.$$eval('input:not([type=checkbox]):not([type=radio]),textarea,select',nodes=>nodes.filter(e=>e.getBoundingClientRect().width>0&&parseFloat(getComputedStyle(e).fontSize)<16).map(e=>({tag:e.tagName,fontSize:getComputedStyle(e).fontSize})));
      if(fields.length)issues.push({type:'small input font may trigger iOS zoom',fields});
      if(![200,304].includes(response.status()))issues.push({type:'HTTP '+response.status()});
      const row={route,width,height,issues};report.checked.push(row);
      if(issues.length)report.errors.push(row);
      if((route==='/tr'||route==='/en')&&(width===320||height===390))await page.screenshot({path:'/private/tmp/dnd-mobile-'+(baseline?'before':'after')+'-'+route.slice(1)+'-'+width+'.png'});
      save();console.log(JSON.stringify(row));
    }
    await context.close();
  }finally{await browser.close();}
  report.status=report.errors.length||report.pageErrors.length?(baseline?'baseline findings recorded':'failed'):'passed';save();
  if(report.status==='failed')process.exitCode=1;
})().catch(error=>{report.status='failed';report.failure=String(error);save();console.error(error);process.exitCode=1});
