(()=>{
  const d=document, h=d.querySelector('.hdr'), rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.documentElement.classList.remove('js-off');
  let last=0;
  const onScroll=()=>{const y=scrollY;h.classList.toggle('is-scrolled',y>24);
    if(!h.classList.contains('is-open')) h.classList.toggle('is-hidden',y>last&&y>480);
    last=y;};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  const b=d.querySelector('.burger');
  if(b) b.addEventListener('click',()=>{const o=h.classList.toggle('is-open');b.setAttribute('aria-expanded',o);});
  d.querySelectorAll('[data-gal]').forEach(g=>{
    const chips=g.querySelectorAll('.gchip'), items=g.querySelectorAll('.gal-grid li'), st=g.querySelector('.gal-status');
    chips.forEach(c=>c.addEventListener('click',()=>{
      const f=c.dataset.f; let n=0;
      chips.forEach(x=>x.setAttribute('aria-pressed',x===c?'true':'false'));
      items.forEach(i=>{const on=f==='all'||i.dataset.cat===f; i.hidden=!on; if(on){n++; i.querySelectorAll('.rv').forEach(r=>r.classList.add('in'));}});
      if(st) st.textContent=n+(n===1?' Bild':' Bilder')+(f==='all'?'':' · '+c.firstChild.textContent.trim());
    }));
  });
  d.querySelectorAll('.yt').forEach(f=>{const b=f.querySelector('.yt-btn'); if(!b) return;
    b.addEventListener('click',()=>{const i=d.createElement('iframe');
      i.src='https://www.youtube-nocookie.com/embed/'+f.dataset.yt+'?autoplay=1&rel=0';
      i.title=f.dataset.title; i.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      i.allowFullscreen=true; i.referrerPolicy='strict-origin-when-cross-origin'; i.loading='lazy';
      b.replaceWith(i); i.focus();});
  });
  const els=d.querySelectorAll('.rv');
  if(rm||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return;}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  els.forEach(e=>io.observe(e));
})();
