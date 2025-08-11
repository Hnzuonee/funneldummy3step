(function(){
  // vlajka
  function flagEmoji(cc){ if(!cc) return '🌍'; const C=cc.toUpperCase(); return String.fromCodePoint(...[...C].map(c=>127397+c.charCodeAt())); }
  const lang = navigator.language || 'cs-CZ';
  const cc = (lang.split('-')[1]||'CZ');
  document.getElementById('flagL2').textContent = flagEmoji(cc);

  // geo headline (podle time-zóny, fallback „ve tvé oblasti“)
  function cityFromTZ(){
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const map = {'Europe/Prague':'Praze','Europe/Bratislava':'Bratislavě','Europe/Berlin':'Berlíně','Europe/Vienna':'Vídni'};
    return map[tz] || 'tvé oblasti';
  }
  const joinedKey='joinedTodaySeed';
  let joined = parseInt(localStorage.getItem(joinedKey)||'0',10);
  if(!joined){ joined = Math.floor(Math.random()*140)+80; localStorage.setItem(joinedKey,String(joined)); }
  document.getElementById('geoHeadline').textContent = `Dnes se přidalo ${joined} fanoušků v ${cityFromTZ()}`;

  // deadline label 23:59
  const now=new Date(); const dl=new Date(now); dl.setHours(23,59,0,0); if(dl<now) dl.setDate(dl.getDate()+1);
  document.getElementById('deadlineL2').textContent = dl.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

  // 10min session countdown (persist v localStorage)
  const tKey='sessionDeadline10m';
  let end = parseInt(localStorage.getItem(tKey)||'0',10);
  const nowMs = Date.now();
  if(!(end>nowMs && end<nowMs+60*60*1000)){ end = nowMs + 10*60*1000; localStorage.setItem(tKey,String(end)); }

  const hh=document.getElementById('hh'), mm=document.getElementById('mm'), ss=document.getElementById('ss');
  function pad(n){ return n<10?('0'+n):(''+n); }
  function renderDigits(node, str){ node.innerHTML=''; for(const ch of str){ const d=document.createElement('div'); d.className='digit'; d.textContent=ch; node.appendChild(d);} }
  function tick(){
    let diff = end - Date.now();
    if(diff<0) diff=0;
    const sec = Math.floor(diff/1000)%60;
    const min = Math.floor(diff/60000)%60;
    const hrs = Math.floor(diff/3600000);
    renderDigits(hh, pad(hrs));
    renderDigits(mm, pad(min));
    renderDigits(ss, pad(sec));
  }
  tick(); setInterval(tick, 1000);

  // spots left (mírně klesá, ale ne pod 7)
  const spotsKey='spotsLeftSeed';
  let spots=parseInt(localStorage.getItem(spotsKey)||'0',10);
  if(!spots){ spots = Math.floor(Math.random()*14)+27; localStorage.setItem(spotsKey,String(spots)); }
  const spotsEl=document.getElementById('spots');
  function updSpots(){ if(Math.random()<0.35 && spots>7){ spots--; localStorage.setItem(spotsKey,String(spots)); } spotsEl.textContent=spots; }
  updSpots(); setInterval(updSpots, 45000);

  // CTA → progress (dummy)
  const bar=document.getElementById('barL2');
  document.getElementById('ctaEnter').addEventListener('click', (e)=>{
    e.preventDefault();
    bar.style.width='65%';
    setTimeout(()=>bar.style.width='100%', 420);
    setTimeout(()=> alert('DEMO: tady by v ostré verzi proběhla validace a bezpečný redirect.'), 880);
  });
})();
