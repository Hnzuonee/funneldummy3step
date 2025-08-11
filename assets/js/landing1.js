(function(){
  // in-app detection (IG/FB/TikTok)
  const ua = navigator.userAgent || "";
  const inApp = /(Instagram|FBAN|FBAV|Facebook|TikTok)/i.test(ua);
  if(inApp){ document.getElementById('stickyInApp').hidden = false; }

  // flag based on language
  function flagEmoji(cc){ if(!cc) return '🌍'; const C=cc.toUpperCase(); return String.fromCodePoint(...[...C].map(c=>127397+c.charCodeAt())); }
  const lang = navigator.language || 'en-US';
  const cc = (lang.split('-')[1]||'US');
  document.getElementById('flagL1').textContent = flagEmoji(cc);

  // deadline today 23:59 (local)
  const now = new Date();
  const dl = new Date(now); dl.setHours(23,59,0,0); if(dl<now) dl.setDate(dl.getDate()+1);
  document.getElementById('deadlineL1').textContent = dl.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

  // social proof per-device
  const key='insideCountSeed';
  let count = localStorage.getItem(key);
  if(!count){ count = String(Math.floor(Math.random()*2500)+4200); localStorage.setItem(key,count); }
  document.getElementById('insideCount').textContent = (count+'+').replace(/\B(?=(\d{3})+(?!\d))/g,',');

  // CTA -> toast + progress + navigate to gate.html (demo)
  const bar = document.getElementById('barL1');
  const toast = document.getElementById('toastL1');
  document.getElementById('ctaUnlock').addEventListener('click', (e)=>{
    e.preventDefault();
    toast.style.display='block';
    bar.style.width='70%';
    setTimeout(()=>bar.style.width='100%', 400);
    setTimeout(()=>{ window.location.href='gate.html'; }, 850);
  });
})();
