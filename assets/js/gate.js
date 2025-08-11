
(function(){
  // helper
  function flagEmoji(countryCode){
    if(!countryCode) return '🌍';
    const cc = countryCode.toUpperCase();
    return String.fromCodePoint(...[...cc].map(c => 127397 + c.charCodeAt()));
  }
  const lang = navigator.language || 'en-US';
  const cc = (lang.split('-')[1] || 'US');
  const flag = document.getElementById('flag');
  if(flag) flag.textContent = flagEmoji(cc);

  // City from time zone
  function cityFromTZ(){
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const map = {
      'Europe/Prague':'Praze','Europe/Berlin':'Berlíně','Europe/Vienna':'Vídni',
      'Europe/Warsaw':'Varšavě','Europe/Paris':'Paříži','Europe/Rome':'Římě',
      'Europe/Madrid':'Madridu','Europe/London':'Londýně','Europe/Amsterdam':'Amsterodamu',
      'Europe/Bratislava':'Bratislavě','Europe/Budapest':'Budapešti'
    };
    return map[tz] || 'tvé oblasti';
  }
  const city = cityFromTZ();
  const joined = (parseInt(localStorage.getItem('joinedTodaySeed')||'0',10)) || (Math.floor(Math.random()*140)+80);
  localStorage.setItem('joinedTodaySeed', joined.toString());
  document.getElementById('geoHeadline').textContent = `Dnes se přidalo ${joined} fanoušků v ${city}`;

  // Deadline 23:59 local
  const now = new Date();
  const deadline = new Date(now);
  deadline.setHours(23,59,0,0);
  if (deadline < now) deadline.setDate(deadline.getDate()+1);
  document.getElementById('deadline').textContent = deadline.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

  // Flip clock to deadline
  function pad(n){return n<10?('0'+n):(''+n)}
  function renderDigits(container, str){
    container.innerHTML='';
    for(const ch of str){
      const d = document.createElement('div');
      d.className='digit';
      d.textContent = ch;
      container.appendChild(d);
    }
  }
  const hh = document.getElementById('hh');
  const mm = document.getElementById('mm');
  const ss = document.getElementById('ss');
  function tick(){
    const t = new Date();
    let diff = deadline - t;
    if(diff < 0) diff = 0;
    const sec = Math.floor(diff/1000)%60;
    const min = Math.floor(diff/60000)%60;
    const hr  = Math.floor(diff/3600000);
    renderDigits(hh, pad(hr));
    renderDigits(mm, pad(min));
    renderDigits(ss, pad(sec));
  }
  tick();
  setInterval(tick, 1000);

  // Spots left (scarcity)
  const spotsKey = 'spotsLeftSeed';
  let spots = parseInt(localStorage.getItem(spotsKey)||'0',10);
  if(!spots){ spots = Math.floor(Math.random()*36) + 25; localStorage.setItem(spotsKey, String(spots)); }
  const spotsEl = document.getElementById('spots');
  function updateSpots(){
    const nowMin = new Date().getMinutes();
    if (Math.random() < 0.35 && spots > 7){ // randomly decrement
      spots -= 1;
      localStorage.setItem(spotsKey, String(spots));
    }
    spotsEl.textContent = spots;
  }
  updateSpots();
  setInterval(updateSpots, 45000);

  // Slide-in notifications
  const names = ['Tereza','Anna','Klára','Ema','Karolína','Adéla','Nela','Eliška','Marie','Sofie','Tom','Pavel','Honza','Filip','David','Jakub'];
  const towns = ['Praha','Brno','Ostrava','Plzeň','Liberec','Olomouc','Hradec Králové','ČB','Pardubice','Zlín'];
  const stream = document.getElementById('stream');
  function pushNotice(){
    const n = names[Math.floor(Math.random()*names.length)];
    const c = towns[Math.floor(Math.random()*towns.length)];
    const node = document.createElement('div');
    node.className='notice';
    node.textContent = `${n} z ${c} se právě připojil/a`;
    stream.appendChild(node);
    setTimeout(()=>{
      node.style.opacity = '0';
      node.style.transform = 'translateX(-24px)';
      setTimeout(()=> stream.removeChild(node), 800);
    }, 6000);
  }
  setTimeout(pushNotice, 2500);
  setInterval(pushNotice, 38000 + Math.floor(Math.random()*15000));

  // CTA enter -> progress
  const bar = document.getElementById('bar');
  document.getElementById('enter').addEventListener('click', (e)=>{
    e.preventDefault();
    bar.style.width='60%';
    setTimeout(()=>bar.style.width='100%', 450);
    // Demo only: show alert after short delay
    setTimeout(()=> alert('DEMO: v ostré verzi by nyní proběhla validace a přesměrování na cílovou stránku.'), 900);
  });
})();
