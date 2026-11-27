// M.A.N.T.I.S. 1024 · Menü, "bald"-Login, Beta-Formular (mailto, kein Versand-Backend)
document.documentElement.classList.remove("js-off");
(function(){
  var b=document.querySelector(".burger"), n=document.getElementById("nav");
  if(b&&n){b.addEventListener("click",function(){var o=n.classList.toggle("open");b.setAttribute("aria-expanded",o);b.setAttribute("aria-label",o?"Menü schließen":"Menü öffnen");});
    n.addEventListener("click",function(e){if(e.target.tagName==="A"&&!e.target.hasAttribute("data-soon")){n.classList.remove("open");b.setAttribute("aria-expanded","false");}});}
  document.querySelectorAll("[data-soon]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();alert("Der Login unter app.mantis1024.ai startet mit Version 1.2. Bis dahin: Beta-Platz anfragen.");});});
  var f=document.getElementById("beta-form");
  if(f){f.addEventListener("submit",function(e){
    if(f.elements["_gotcha"]&&f.elements["_gotcha"].value){e.preventDefault();return;}
    if(!f.checkValidity()){return;}
    e.preventDefault();
    var v=function(k){return f.elements[k].value;};
    var body="Name: "+v("name")+"\nE-Mail: "+v("email")+"\nBereich: "+v("bereich")+"\n\nVorhaben:\n"+v("vorhaben")+"\n\nEinwilligung Datenschutz: ja";
    location.href="mailto:"+f.getAttribute("data-mail")+"?subject="+encodeURIComponent("Beta-Anfrage M.A.N.T.I.S. 1024")+"&body="+encodeURIComponent(body);
  });}
})();
