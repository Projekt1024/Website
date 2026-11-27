// Endless on Fire · Menü + Anfrageformular (mailto)
document.documentElement.classList.remove("js-off");
(function(){
  var b=document.querySelector(".burger"), n=document.getElementById("nav");
  if(b&&n){b.addEventListener("click",function(){var o=n.classList.toggle("open");b.setAttribute("aria-expanded",o);});
    n.addEventListener("click",function(e){if(e.target.tagName==="A"){n.classList.remove("open");b.setAttribute("aria-expanded","false");}});}
  var f=document.getElementById("eof-form");
  if(f){f.addEventListener("submit",function(e){
    if(f.elements["_gotcha"].value){e.preventDefault();return;}
    if(!f.checkValidity())return; e.preventDefault();
    var v=function(k){return f.elements[k].value;};
    var body="Name: "+v("name")+"\nE-Mail: "+v("email")+"\nAnlass: "+v("anlass")+"\n\n"+v("nachricht");
    location.href="mailto:"+f.getAttribute("data-mail")+"?subject="+encodeURIComponent("Anfrage "+v("anlass"))+"&body="+encodeURIComponent(body);
  });}
})();
