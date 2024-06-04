import{S as Q,P as V,W as Y,a as Z,s as W,B as f,M as p,b as r,C as v,c as F,d as T,D as j,T as _,e as N,f as ee,A as oe,G as k,R as K,g as te,h as H}from"./GLTFLoader-03712c64.js";function X(e){const o=new Map,t=new Map,a=e.clone();return q(e,a,function(s,i){o.set(i,s),t.set(s,i)}),a.traverse(function(s){if(!s.isSkinnedMesh)return;const i=s,c=o.get(s),m=c.skeleton.bones;i.skeleton=c.skeleton.clone(),i.bindMatrix.copy(c.bindMatrix),i.skeleton.bones=m.map(function(d){return t.get(d)}),i.bind(i.skeleton,i.bindMatrix)}),a}function q(e,o,t){t(e,o);for(let a=0;a<e.children.length;a++)q(e.children[a],o.children[a],t)}let ne=document.getElementById("threejs"),L,n,u,b={},l,M=[],z,G=[],P=[],E,A,ae=[],O,I=0,C=3;const ie=document.getElementById("score"),R=document.getElementById("lives");let se=2e3;re();async function re(){n=new Q,L=new V(90,window.innerWidth/window.innerHeight,1,1e3),L.rotation.x=-Math.PI/2,O=new te,u=new Y({antialias:!0}),u.setPixelRatio(window.devicePixelRatio),u.setClearColor(16177078),u.setSize(window.innerWidth,window.innerHeight),u.shadowMap.enabled=!0,u.shadowMap.type=Z,u.outputEncoding=W,ne.appendChild(u.domElement),await Me(),await ze(),le(),ce(),we(),pe(),he(),de(),fe(),me(),ye(),ue(),U(),Se(),be()}function U(){ge(),Ge(),Le(),Ee(),Pe(),u.render(n,L),requestAnimationFrame(U);const e=O.getDelta();for(const o of ae)o.update(e)}function ce(){const e=new f(20,15,.2),o=new p({color:8404992}),t=new r(e,o);t.position.set(0,0,-120),t.castShadow=!0,n.add(t);const a=new v(.5,.5,3,32),s=new p({color:11119017}),i=new r(a,s);i.position.set(-1,0,-90),i.castShadow=!0,n.add(i);const c=new r(a,s);c.position.set(1,0,-90),c.castShadow=!0,n.add(c)}function de(){const e=new f(10,.5,5),o=new v(.25,.25,4,32),t=new F({color:9127187}),a=new r(e,t);a.position.set(-30,2,-10),a.castShadow=!0,a.receiveShadow=!0,n.add(a),[[-35,0,-12.5],[-25,0,-12.5],[-35,0,-7.8],[-25,0,-7.5]].forEach(h=>{const w=new r(o,t);w.position.set(h[0],h[1],h[2]),w.castShadow=!0,w.receiveShadow=!0,n.add(w)});const i=new f(2,.5,2),c=new v(.125,.125,2,32),m=new f(2,2,.5),d=new F({color:11896936}),x=new r(i,d);x.position.set(-35,1.25,-10),x.castShadow=!0,x.receiveShadow=!0,n.add(x),[[-36,0,-9],[-34,0,-9],[-36,0,-11],[-34,0,-10.55]].forEach(h=>{const w=new r(c,d);w.position.set(h[0],h[1],h[2]),w.castShadow=!0,w.receiveShadow=!0,n.add(w)});const g=new r(m,d);g.position.set(-35,2.5,-9),g.castShadow=!0,g.receiveShadow=!0,n.add(g);const S=new r(i,d);S.position.set(-25,1.25,-10),S.castShadow=!0,S.receiveShadow=!0,n.add(S),[[-26,0,-9],[-24,0,-9],[-26,0,-11],[-24,0,-10.5]].forEach(h=>{const w=new r(c,d);w.position.set(h[0],h[1],h[2]),w.castShadow=!0,w.receiveShadow=!0,n.add(w)});const y=new r(m,d);y.position.set(-24,2.5,-9.5),y.castShadow=!0,y.receiveShadow=!0,n.add(y)}function le(){const e=new f(20,.1,.2),o=new p({color:7500402}),t=new r(e,o);t.position.set(-65,5,-90),t.rotation.z=Math.PI/2-.2,t.castShadow=!0,n.add(t);const a=new f(20,.1,.2),s=new p({color:7500402}),i=new r(a,s);i.position.set(65,5,-90),i.rotation.z=Math.PI/2+.2,i.castShadow=!0,n.add(i);const c=new T(200,300),m=new p({color:11184810,side:j}),d=new r(c,m);d.position.set(0,20,0),d.rotation.x=Math.PI/2,n.add(d)}function we(){const e=new T(4,8),o=new p({color:11393254,transparent:!0,opacity:.5}),t=new r(e,o);t.position.set(30,5,0),t.rotation.z=Math.PI/2+.05,n.add(t);const a=new f(8,.5,.2),s=new p({color:8404992}),i=new r(a,s);i.position.set(30,7,0),i.rotation.y=Math.PI,i.rotation.z=Math.PI+.05,n.add(i);const c=new f(8,.5,.2),m=new p({color:8404992}),d=new r(c,m);d.position.set(30,3,0),d.rotation.y=Math.PI,d.rotation.z=Math.PI+.05,n.add(d);const x=new f(4.5,.5,.2),B=new p({color:8404992}),g=new r(x,B);g.position.set(34,4.8,0),g.rotation.z=t.rotation.z,n.add(g);const S=new f(4.5,.5,.2),D=new p({color:8404992}),y=new r(S,D);y.position.set(26,5.2,0),y.rotation.z=t.rotation.z,n.add(y)}function pe(){new _().load("/painting.png",function(o){o.encoding=W,o.anisotropy=u.capabilities.getMaxAnisotropy();const t=new T(4,2),a=new F({map:o}),s=new r(t,a);s.position.set(-30,7,0),s.castShadow=!0,s.receiveShadow=!0,n.add(s)})}function he(){const e=new v(.5,.5,8,32),o=new p({color:8421504}),t=new r(e,o);t.position.set(0,18,-10),t.castShadow=!0,n.add(t);const a=new N(1,32,32),s=new p({color:16776960}),i=new r(a,s);i.position.set(0,14,-10),i.castShadow=!0,n.add(i);const c=new ee(16777167,2,3e3,0);c.position.set(0,14,-10),c.castShadow=!0,c.shadow.mapSize.width=512,c.shadow.mapSize.height=512,c.shadow.camera.near=.5,c.shadow.camera.far=500,n.add(c);const m=new oe(16777215,.5);n.add(m)}async function fe(){l=(await new k().setPath("/chef/").loadAsync("scene.gltf")).scene.children[0],l.rotation.z=Math.PI,l.scale.set(.75,.75,.75),l.position.set(0,0,15),l.castShadow=!0,n.add(l),L.position.set(l.position.x,l.position.y+5,l.position.z+10),L.lookAt(l.position)}function me(){new _().load("/floor/brownFloor.png",function(e){e.wrapS=K,e.wrapT=K,e.repeat.set(4,4);const o=new f(200,0,300),t=new p({map:e,color:8415054}),a=new r(o,t);a.position.set(0,-10,0),a.receiveShadow=!0,n.add(a)})}function ue(){window.addEventListener("keydown",function(e){b[e.keyCode]=!0},!1),window.addEventListener("keyup",function(e){b[e.keyCode]=!1},!1),window.addEventListener("keyup",e=>{if(!(e.isComposing||e.keyCode===229)&&e.keyCode==32){let o=z.clone();o.position.x=l.position.x+3,o.position.y=l.position.y,o.position.z=l.position.z,o.castShadow=!0,n.add(o),M.push(o)}})}function ge(){b[65]&&l.position.x>-20&&(l.position.x-=.25),b[68]&&l.position.x<20&&(l.position.x+=.25)}async function ye(){z=(await new k().setPath("/rollingPin/").loadAsync("scene.gltf")).scene,z.scale.set(.3,.3,.3),z.castShadow=!0}async function Me(){A=await new k().loadAsync("/karen/female_cartoon_character/scene.gltf"),A.scene.scale.set(2,2,2)}function xe(e){let o=X(A.scene),t={};A.animations.forEach(i=>{t[i.name]=i});const a=new H(o),s=t.mixamorig_KarenAnimation;s?a.clipAction(s).play():console.error("A animação 'mixamorig_KarenAnimation' não foi encontrada."),o.position.x=e,o.position.y=0,o.position.z=-30,o.castShadow=!0,G.push(o),n.add(o)}function Se(){let e;setInterval(()=>{e=Math.floor(Math.random()*20)-10,xe(e)},se)}function Le(){G.forEach((e,o)=>{e.position.z+=.1,e.position.z>20&&(n.remove(e),G.splice(o,1),$())})}function Ge(){M.forEach((e,o)=>{e.position.z-=.5,e.position.z<-20&&(n.remove(e),M.splice(o,1))})}function Pe(){G.forEach((e,o)=>{M.forEach((t,a)=>{e.position.x>=t.position.x-2&&e.position.x<=t.position.x+2&&e.position.z>=t.position.z-2&&e.position.z<=t.position.z+2&&(n.remove(e),G.splice(o,1),n.remove(t),M.splice(a,1),I++,J())})}),P.forEach((e,o)=>{M.forEach((t,a)=>{e.position.x>=t.position.x-2&&e.position.x<=t.position.x+2&&e.position.z>=t.position.z-2&&e.position.z<=t.position.z+2&&(n.remove(e),P.splice(o,1),n.remove(t),M.splice(a,1),$())})})}function $(){C--,J(),C===0&&(alert(`Game Over! Final Score: ${I}`),window.location.href="index.html")}function J(){ie.innerText=I,R.innerHTML="";for(let e=0;e<C;e++){const o=document.createElement("span");o.className="heart",R.appendChild(o)}}async function ze(){E=await new k().loadAsync("/dipper/scene.gltf"),E.scene.scale.set(1,1,1)}function ve(e){let o=X(E.scene),t={};E.animations.forEach(i=>{t[i.name]=i});const a=new H(o),s=t.mixamorig_DipperAnimation;s?a.clipAction(s).play():console.error("A animação 'mixamorig_DipperAnimation' não foi encontrada."),o.position.x=e,o.position.y=0,o.position.z=-30,o.castShadow=!0,P.push(o),n.add(o)}function be(){let e;setInterval(()=>{e=Math.floor(Math.random()*20)-10,ve(e)},5e3)}function Ee(){P.forEach((e,o)=>{e.position.z+=.1,e.position.z>20&&(n.remove(e),P.splice(o,1))})}