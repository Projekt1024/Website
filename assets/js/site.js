(()=>{
  const d=document, h=d.querySelector('.hdr'), rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.documentElement.classList.remove('js-off');
  let last=0;
  const onScroll=()=>{const y=scrollY;h.classList.toggle('is-scrolled',y>24);
    if(!h.classList.contains('is-open')) h.classList.toggle('is-hidden',y>last&&y>480);
    last=y;};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  const b=d.querySelector('.burger');
  const setMenu=o=>{h.classList.toggle('is-open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Menü schließen':'Menü öffnen');};
  if(b) b.addEventListener('click',()=>setMenu(!h.classList.contains('is-open')));
  // Dropdown „Leistungen“: Klick/Enter/Leertaste öffnet, Esc und Klick außerhalb schließen
  const mq=matchMedia('(max-width:1240px)');
  d.querySelectorAll('[data-dd]').forEach(dd=>{
    const btn=dd.querySelector('.dd-btn'), set=o=>{dd.classList.toggle('is-open',o);btn.setAttribute('aria-expanded',o);};
    if(mq.matches&&dd.classList.contains('is-active')) set(true);
    btn.addEventListener('click',()=>set(!dd.classList.contains('is-open')));
    dd.addEventListener('focusout',e=>{if(!mq.matches&&!dd.contains(e.relatedTarget)) set(false);});
    d.addEventListener('click',e=>{if(!mq.matches&&!dd.contains(e.target)) set(false);});
    dd.addEventListener('keydown',e=>{if(e.key==='Escape'&&dd.classList.contains('is-open')){set(false);btn.focus();e.stopPropagation();}});
  });
  d.addEventListener('keydown',e=>{if(e.key==='Escape'&&h.classList.contains('is-open')){setMenu(false);b.focus();}});
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

  // Kontaktformular: Endpoint (fetch) oder mailto:-Fallback; Validierung mit Fehlerliste
  const qs=new URLSearchParams(location.search);
  d.querySelectorAll('[data-form]').forEach(f=>{
    const sel=f.querySelector('select[name=bereich]');
    if(sel&&qs.get('bereich')){const o=sel.querySelector('option[data-key="'+qs.get('bereich')+'"]'); if(o) o.selected=true;}
    const msgF=f.querySelector('[name=nachricht]'); if(msgF&&qs.get('produkt')&&!msgF.value) msgF.value='Anfrage zu: '+qs.get('produkt')+'\n\n';
    const errBox=f.querySelector('.cf-errors'), st=f.querySelector('.cf-status');
    const label=el=>(f.querySelector('label[for="'+el.id+'"]')||{}).textContent.replace('*','').replace('optional','').trim();
    const msg=el=>{const v=el.validity;
      if(v.valueMissing) return el.type==='checkbox'?'Bitte bestätigen Sie die Datenschutzhinweise.':el.tagName==='SELECT'?'Bitte wählen Sie einen Bereich.':'Bitte füllen Sie „'+label(el)+'“ aus.';
      if(v.typeMismatch) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de.';
      if(v.tooShort) return 'Bitte schreiben Sie etwas mehr (mindestens '+el.minLength+' Zeichen).';
      return '';};
    const check=el=>{const m=msg(el), e=f.querySelector('#'+el.id+'-e'); el.setAttribute('aria-invalid',m?'true':'false'); if(e) e.textContent=m; return m;};
    f.querySelectorAll('input[required],select[required],textarea[required]').forEach(el=>el.addEventListener(el.type==='checkbox'||el.tagName==='SELECT'?'change':'blur',()=>{if(el.getAttribute('aria-invalid')||el.value) check(el);}));
    const show=(cls,html)=>{st.className='cf-status '+cls; st.innerHTML=html; st.hidden=false; st.focus();};
    f.addEventListener('submit',async ev=>{
      ev.preventDefault();
      const bad=[...f.querySelectorAll('input[required],select[required],textarea[required]')].map(el=>[el,check(el)]).filter(x=>x[1]);
      if(bad.length){errBox.innerHTML='<b>Bitte prüfen Sie '+(bad.length===1?'ein Feld':bad.length+' Felder')+':</b><ul>'+bad.map(([el,m])=>'<li><a href="#'+el.id+'">'+m+'</a></li>').join('')+'</ul>'; errBox.hidden=false; errBox.focus(); return;}
      errBox.hidden=true;
      const hp=f.querySelector('.cf-hp input'); const data=new FormData(f);
      if(hp&&hp.value){f.classList.add('is-done'); show('is-ok','<b>Danke.</b>Ihre Nachricht ist eingegangen.'); return;}
      const mail=f.dataset.mail, subj=f.dataset.subject+' · '+(data.get('bereich')||'');
      const body=['Name: '+data.get('name'),'E-Mail: '+data.get('email'),'Telefon: '+(data.get('telefon')||'–'),'Bereich: '+data.get('bereich'),(data.get('auswahl')?'Auswahl:\n'+data.get('auswahl'):''),'','Nachricht:',data.get('nachricht')].filter(x=>x!=='').join('\n');
      const mailto='mailto:'+mail+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
      if(f.dataset.mode==='mailto'){
        location.href=mailto; f.classList.add('is-done');
        show('is-ok','<b>Fast geschafft.</b>Ihr E-Mail-Programm sollte sich mit der vorbereiteten Nachricht geöffnet haben. Bitte senden Sie sie dort ab. Falls nichts passiert ist: <a class="link" href="'+mailto+'">E-Mail erneut öffnen</a> oder schreiben Sie direkt an <a href="mailto:'+mail+'">'+mail+'</a>.');
        f.dispatchEvent(new CustomEvent('form:sent')); return;}
      f.classList.add('is-sending');
      try{const r=await fetch(f.action,{method:'POST',body:data,headers:{Accept:'application/json'}});
        if(!r.ok) throw new Error(r.status);
        f.classList.add('is-done'); show('is-ok','<b>Danke für Ihre Nachricht.</b>Ihre Anfrage ist angekommen. Sie erhalten in der Regel innerhalb weniger Werktage eine Antwort.');
        f.dispatchEvent(new CustomEvent('form:sent'));
      }catch(e){show('is-err','<b>Das hat leider nicht geklappt.</b>Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder <a class="link" href="'+mailto+'">senden Sie sie per E-Mail</a>.');}
      finally{f.classList.remove('is-sending');}
    });
  });

  d.querySelectorAll('.share-copy').forEach(b=>{if(!navigator.clipboard) return; b.hidden=false;
    b.addEventListener('click',()=>navigator.clipboard.writeText(b.dataset.url).then(()=>{b.textContent='Link kopiert';setTimeout(()=>b.textContent='Link kopieren',2500);}));});

  // Shop: Anfrageliste in localStorage (nur lokal, keine Übertragung bis zum Absenden)
  const KEY='p1024-anfrage', MAP={'feuer-requisiten':'endless-on-fire','prototyping-merch':'prototyping','buecher':'literatur'};
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return []}};
  const save=l=>{try{localStorage.setItem(KEY,JSON.stringify(l))}catch(e){} paint();};
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const root=(d.querySelector('link[rel=stylesheet]').getAttribute('href')||'').replace('assets/css/site.css','');
  function paint(){
    const l=load(), n=l.reduce((a,x)=>a+x.q,0);
    d.querySelectorAll('[data-cart-count]').forEach(e=>{e.textContent=n; if(e.classList.contains('nav-n')) e.hidden=!n; e.closest('a')&&e.closest('a').setAttribute('aria-label','Anfrageliste, '+n+' Artikel');});
    const box=d.querySelector('[data-cart]'); if(!box) return;
    const ul=box.querySelector('[data-cart-list]'), em=box.querySelector('[data-cart-empty]');
    em.hidden=l.length>0;
    ul.innerHTML=l.map((x,i)=>'<li><a href="'+root+x.u.slice(1)+'index.html">'+esc(x.t)+'</a>'+(x.v?'<span class="cv">'+esc(x.v)+'</span>':'')+
      '<label class="cq"><span class="sr">Anzahl für '+esc(x.t)+'</span><input type="number" min="1" max="99" value="'+x.q+'" data-i="'+i+'"></label>'+
      '<button type="button" class="cx" data-rm="'+i+'" aria-label="'+esc(x.t)+' entfernen">Entfernen</button></li>').join('');
    const f=d.querySelector('#anfrage');
    if(f){const h=f.querySelector('[name=auswahl]'); if(h) h.value=l.map(x=>x.q+' × '+x.t+(x.v?' ('+x.v+')':'')).join('\n');
      const sel=f.querySelector('[name=bereich]'); if(sel&&l[0]&&!sel.dataset.touched){const o=sel.querySelector('option[data-key="'+(MAP[l[0].c]||'sonstiges')+'"]'); if(o) o.selected=true;}
      sel&&sel.addEventListener('change',()=>sel.dataset.touched=1,{once:true});}
  }
  d.addEventListener('change',e=>{const i=e.target.dataset&&e.target.dataset.i; if(i===undefined) return; const l=load(); l[+i].q=Math.max(1,Math.min(99,parseInt(e.target.value)||1)); save(l);});
  d.addEventListener('click',e=>{const b=e.target.closest('[data-rm]'); if(!b) return; const l=load(); const t=l[+b.dataset.rm].t; l.splice(+b.dataset.rm,1); save(l);
    const st=d.querySelector('.cf-status')||null; const live=d.querySelector('[data-cart-empty]'); if(live&&!l.length) live.focus&&live.focus(); });
  d.querySelectorAll('[data-product]').forEach(w=>{const p=JSON.parse(w.dataset.product), add=w.querySelector('[data-add]'), st=w.querySelector('.padd-st');
    add.hidden=false;
    add.addEventListener('click',()=>{const q=Math.max(1,Math.min(99,parseInt((w.querySelector('[data-qty]')||{}).value)||1)), vs=w.querySelector('[data-variant]'), v=vs?vs.value:'';
      const l=load(), ex=l.find(x=>x.id===p.id&&x.v===v); if(ex) ex.q=Math.min(99,ex.q+q); else l.push({...p,q,v}); save(l);
      st.innerHTML='Hinzugefügt. <a class="link" href="'+root+'shop/anfrage/index.html">Anfrageliste ansehen ('+l.reduce((a,x)=>a+x.q,0)+')</a>';});
  });
  const af=d.querySelector('#anfrage'); if(af) af.addEventListener('form:sent',()=>{localStorage.removeItem(KEY); paint();});
  d.querySelectorAll('.pgal').forEach(g=>{const m=g.querySelector('.pg-main img'); g.querySelectorAll('.pg-th').forEach(t=>t.addEventListener('click',()=>{
    m.src=t.dataset.src; m.alt=t.dataset.alt; g.querySelectorAll('.pg-th').forEach(x=>x.setAttribute('aria-pressed',x===t?'true':'false'));}));});
  paint();
  const els=d.querySelectorAll('.rv');
  if(rm||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return;}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  els.forEach(e=>io.observe(e));
})();

// Lightbox für [data-lb]-Links (natives <dialog>: Esc schließt, Fokus kehrt zurück). Ohne JS öffnet der Link das große Bild.
(function(){
  const links=document.querySelectorAll('a[data-lb]'); if(!links.length||typeof HTMLDialogElement!=='function') return;
  const dl=document.createElement('dialog'); dl.className='lb'; dl.setAttribute('aria-label','Bildansicht');
  dl.innerHTML='<button type="button" class="lb-x" aria-label="Bildansicht schließen">×</button><img alt=""><p></p>';
  document.body.appendChild(dl);
  const im=dl.querySelector('img'), cap=dl.querySelector('p'); let last=null;
  dl.querySelector('.lb-x').addEventListener('click',()=>dl.close());
  dl.addEventListener('click',e=>{if(e.target===dl) dl.close();});
  dl.addEventListener('close',()=>{im.removeAttribute('src'); if(last) last.focus();});
  links.forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault(); last=a; const t=a.querySelector('img');
    im.src=a.href; im.alt=t?t.alt:''; const fc=a.closest('figure')&&a.closest('figure').querySelector('figcaption'); cap.textContent=fc?fc.textContent:'';
    dl.showModal(); dl.querySelector('.lb-x').focus();
  }));
})();
