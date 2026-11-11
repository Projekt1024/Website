/* Echtzeit-Ansicht der eigenen STEP-Daten "Schleife n=2" — reines WebGL, keine Bibliothek */
(()=>{
const nodes=document.querySelectorAll('canvas[data-model]');
if(!nodes.length) return;
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const VS=`attribute vec3 p;attribute vec3 n;uniform mat4 M,P;varying vec3 vn,vw;
void main(){vec4 w=M*vec4(p,1.);vw=w.xyz;vn=mat3(M)*n;gl_Position=P*w;}`;
const FS=`precision highp float;varying vec3 vn,vw;uniform vec3 cam;uniform float t,bright,light;
void main(){vec3 N=normalize(vn);vec3 V=normalize(cam-vw);if(dot(N,V)<0.)N=-N;
vec3 L=normalize(vec3(.4,.8,.6));float dif=max(dot(N,L),0.);
float fr=pow(1.-max(dot(N,V),0.),2.2);
vec3 H=normalize(L+V);float sp=pow(max(dot(N,H),0.),60.);
vec3 spec=.5+.5*cos(6.2831*(vec3(0.,.33,.67)+fr*.9+vw.y*.35+t*.03));
vec3 base=mix(vec3(.30,.29,.35)*(.30+.95*dif),vec3(.10,.095,.12)*(.55+.7*dif),light);
vec3 c=base+spec*fr*mix(1.05,1.25,light)*bright+vec3(1.)*sp*mix(.55,.35,light);
gl_FragColor=vec4(c,1.);}`;
function m4p(f,a,n,fa){const t=1/Math.tan(f/2);return[t/a,0,0,0,0,t,0,0,0,0,(fa+n)/(n-fa),-1,0,0,2*fa*n/(n-fa),0];}
function mul(a,b){const r=new Array(16);for(let i=0;i<4;i++)for(let j=0;j<4;j++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+j]*b[i*4+k];r[i*4+j]=s;}return r;}
const rx=a=>{const c=Math.cos(a),s=Math.sin(a);return[1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1]};
const ry=a=>{const c=Math.cos(a),s=Math.sin(a);return[c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1]};
const rz=a=>{const c=Math.cos(a),s=Math.sin(a);return[c,s,0,0,-s,c,0,0,0,0,1,0,0,0,0,1]};
const tr=(x,y,z)=>[1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1];
let meshP=null;
function load(url){return meshP||(meshP=fetch(url).then(r=>r.arrayBuffer()).then(buf=>{
  const h=new Uint32Array(buf,0,3),nv=h[0],ni=h[1];
  const q=new Int16Array(buf,12,nv*3),pos=new Float32Array(nv*3);
  for(let i=0;i<nv*3;i++)pos[i]=q[i]/32767;
  // Modell zentrieren
  let mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];
  for(let i=0;i<nv;i++)for(let k=0;k<3;k++){const v=pos[i*3+k];mn[k]=Math.min(mn[k],v);mx[k]=Math.max(mx[k],v);}
  const c=[0,1,2].map(k=>(mn[k]+mx[k])/2);let r=0;
  for(let i=0;i<nv;i++){for(let k=0;k<3;k++)pos[i*3+k]-=c[k];r=Math.max(r,Math.hypot(pos[i*3],pos[i*3+1],pos[i*3+2]));}
  for(let i=0;i<nv*3;i++)pos[i]/=r;
  const off=12+nv*6, idx=h[2]===4?new Uint32Array(buf,off+(off%4?4-off%4:0),ni):new Uint16Array(buf,off,ni);
  const nor=new Float32Array(nv*3);
  for(let i=0;i<ni;i+=3){const a=idx[i]*3,b=idx[i+1]*3,cc=idx[i+2]*3;
    const ux=pos[b]-pos[a],uy=pos[b+1]-pos[a+1],uz=pos[b+2]-pos[a+2],vx=pos[cc]-pos[a],vy=pos[cc+1]-pos[a+1],vz=pos[cc+2]-pos[a+2];
    const nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;
    for(const j of[a,b,cc]){nor[j]+=nx;nor[j+1]+=ny;nor[j+2]+=nz;}}
  return{pos,nor,idx};}));}
nodes.forEach(cv=>{
  const gl=cv.getContext('webgl',{antialias:true,alpha:true,premultipliedAlpha:false,preserveDrawingBuffer:true});
  const poster=cv.parentElement.querySelector('img.poster');
  if(!gl){cv.remove();return;}
  if(poster) poster.style.display='none';
  const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o;};
  const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);gl.useProgram(pr);
  gl.getExtension('OES_element_index_uint');
  const U=n=>gl.getUniformLocation(pr,n);
  const zoom=parseFloat(cv.dataset.zoom||'1'), ox=parseFloat(cv.dataset.ox||'0'), bright=parseFloat(cv.dataset.bright||'1'), light=cv.dataset.tone==='light'?1:0;
  load(cv.dataset.model).then(m=>{
    const buf=(d,loc)=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,d,gl.STATIC_DRAW);const l=gl.getAttribLocation(pr,loc);gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,3,gl.FLOAT,false,0,0);};
    buf(m.pos,'p');buf(m.nor,'n');
    const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,m.idx,gl.STATIC_DRAW);
    const type=m.idx instanceof Uint32Array?gl.UNSIGNED_INT:gl.UNSIGNED_SHORT;
    gl.enable(gl.DEPTH_TEST);
    let vis=true,px=0,py=0,tx=0,ty=0,t0=performance.now();
    new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)raf();}).observe(cv);
    if(!rm) addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5);ty=(e.clientY/innerHeight-.5);},{passive:true});
    let pending=false;
    function raf(){if(!pending){pending=true;requestAnimationFrame(draw);}}
    function draw(now){pending=false;
      const dpr=Math.min(devicePixelRatio||1,2),w=cv.clientWidth,h=cv.clientHeight;
      if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);}
      gl.viewport(0,0,cv.width,cv.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      const t=rm?6:(now-t0)/1000+6;
      px+=(tx-px)*.04;py+=(ty-py)*.04;
      const M=mul(tr(ox,0,0),mul(rx(-1.05+py*.2),rz(t*.16+px*.6)));
      const P=mul(m4p(.5,w/h,.1,20),tr(0,0,-4.2/zoom));
      gl.uniformMatrix4fv(U('M'),false,new Float32Array(M));gl.uniformMatrix4fv(U('P'),false,new Float32Array(P));
      gl.uniform3f(U('cam'),0,0,4.2/zoom);gl.uniform1f(U('t'),t);gl.uniform1f(U('bright'),bright);gl.uniform1f(U('light'),light);
      gl.drawElements(gl.TRIANGLES,m.idx.length,type,0);
      if(!rm&&vis) raf();
    }
    raf();
  });
});
})();
