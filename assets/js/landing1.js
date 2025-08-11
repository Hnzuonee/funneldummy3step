
(function(){
  const body = document.body;

  // Day/Night background
  const hour = new Date().getHours();
  body.classList.remove('theme-morning','theme-evening');
  body.classList.add(hour >= 18 || hour < 6 ? 'theme-evening' : 'theme-morning');

  // IG/FB/TikTok in-app detection -> sticky note
  const ua = navigator.userAgent || "";
  const inApp = /(Instagram|FBAN|FBAV|Facebook|TikTok)/i.test(ua);
  if(inApp){
    document.getElementById('sticky').style.display = 'block';
  }

  // Local time deadline (23:59)
  const now = new Date();
  const deadline = new Date(now);
  deadline.setHours(23,59,0,0);
  if (deadline < now) {
    // past midnight edge case
    deadline.setDate(deadline.getDate()+1);
  }
  const dl = deadline.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  document.getElementById('deadline').textContent = dl;

  // Social proof count (persist per device)
  const key = 'insideCountSeed';
  let count = localStorage.getItem(key);
  if(!count){
    count = (Math.floor(Math.random()*2500) + 4200).toString(); // 4200–6700
    localStorage.setItem(key, count);
  }
  // format with thin spaces
  function fmt(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  document.getElementById('insideCount').textContent = fmt(count + '+');

  // Country flag based on navigator.language
  function flagEmoji(countryCode){
    if(!countryCode) return '🌍';
    const cc = countryCode.toUpperCase();
    return String.fromCodePoint(...[...cc].map(c => 127397 + c.charCodeAt()));
  }
  const lang = navigator.language || 'en-US';
  const cc = (lang.split('-')[1] || 'US');
  document.getElementById('flag').textContent = flagEmoji(cc);

  // CTA click -> toast + progress + navigate to gate.html
  const toast = document.getElementById('toast');
  const bar = document.getElementById('bar');
  document.getElementById('cta').addEventListener('click', (e)=>{
    e.preventDefault();
    toast.style.display = 'block';
    bar.style.width = '65%';
    setTimeout(()=> bar.style.width='100%', 400);
    setTimeout(()=> { window.location.href = 'gate.html'; }, 900);
  });
})();
