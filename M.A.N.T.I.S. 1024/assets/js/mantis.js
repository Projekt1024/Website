// M.A.N.T.I.S. 1024 · Menü, "bald"-Login, Beta-Formular (fetch an anfrage.php)

/* Formular: fetch an anfrage.php; Erfolg erst nach {"ok":true}; bei Fehler mailto-Ausweichlink */
function p1024Send(f,subject,bodyFn){
  var st=f.querySelector(".fstatus"), btn=f.querySelector("[type=submit]");
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function show(cls,h){st.className="fstatus "+cls;st.innerHTML=h;st.hidden=false;st.focus();}
  f.addEventListener("submit",function(e){
    e.preventDefault();
    if(f.elements["_gotcha"]&&f.elements["_gotcha"].value){return;}
    if(!f.checkValidity()){f.reportValidity();return;}
    if(f.classList.contains("is-sending"))return;
    var mail=f.getAttribute("data-mail"), mailto="mailto:"+mail+"?subject="+encodeURIComponent(subject(f))+"&body="+encodeURIComponent(bodyFn(f));
    f.classList.add("is-sending"); btn.disabled=true; show("is-wait","Wird gesendet …");
    var ctl=window.AbortController?new AbortController():null, tm=setTimeout(function(){ctl&&ctl.abort();},20000);
    fetch(f.getAttribute("action"),{method:"POST",body:new FormData(f),headers:{Accept:"application/json"},signal:ctl?ctl.signal:undefined})
      .then(function(r){return r.json().catch(function(){return null;}).then(function(j){return {r:r,j:j};});})
      .then(function(x){if(!x.r.ok||!x.j||x.j.ok!==true)throw new Error((x.j&&x.j.fehler)||"");
        f.reset(); show("is-ok","<b>Danke, Ihre Anfrage ist angekommen.</b> Ich melde mich in der Regel innerhalb von 3 Werktagen.");})
      .catch(function(err){show("is-err","<b>Das hat leider nicht geklappt.</b> "+(err&&err.message&&err.name!=="AbortError"?esc(err.message)+" ":"")+"Ihre Eingaben bleiben erhalten. Bitte später erneut versuchen oder <a href=\""+mailto+"\">per E-Mail senden</a> an <a href=\"mailto:"+mail+"\">"+mail+"</a>.");})
      .then(function(){clearTimeout(tm);f.classList.remove("is-sending");btn.disabled=false;});
  });
}
document.documentElement.classList.remove("js-off");
(function(){
  var b=document.querySelector(".burger"), n=document.getElementById("nav");
  if(b&&n){b.addEventListener("click",function(){var o=n.classList.toggle("open");b.setAttribute("aria-expanded",o);b.setAttribute("aria-label",o?"Menü schließen":"Menü öffnen");});
    n.addEventListener("click",function(e){if(e.target.tagName==="A"&&!e.target.hasAttribute("data-soon")){n.classList.remove("open");b.setAttribute("aria-expanded","false");}});}
  document.querySelectorAll("[data-soon]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();alert("Der Login unter app.mantis1024.ai startet mit Version 1.2. Bis dahin: Beta-Platz anfragen.");});});
  var f=document.getElementById("beta-form");
  if(f){p1024Send(f,function(){return "Beta-Anfrage M.A.N.T.I.S. 1024";},function(f){var v=function(k){return f.elements[k].value;};
    return "Name: "+v("name")+"\nE-Mail: "+v("email")+"\nBereich: "+v("bereich")+"\n\nVorhaben:\n"+v("vorhaben");});}
})();
