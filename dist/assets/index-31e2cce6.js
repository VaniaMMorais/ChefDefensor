import{S as w,P as l,H as f,W as h,G as d}from"./GLTFLoader-03712c64.js";let p=document.getElementById("threejs"),t,i,e,o,r=.01,n;m();async function m(){i=new w,t=new l(75,window.innerWidth/window.innerHeight,.1,100),t.position.z=5;const a=new f(16777147,526368);a.position.set(0,5,0),i.add(a),e=new h({antialias:!0}),e.setClearColor(15790320),e.setPixelRatio(window.devicePixelRatio),e.setSize(window.innerWidth,window.innerHeight),p.appendChild(e.domElement),await L(),await g(),s(),window.addEventListener("resize",y)}function s(){requestAnimationFrame(s),o.rotation.z+=r,n.rotation.z+=r,e.render(i,t)}async function L(){o=(await new d().setPath("/chef/").loadAsync("scene.gltf")).scene.children[0],o.position.set(-5,0,-5),i.add(o)}async function g(){n=(await new d().loadAsync("/karen/female_cartoon_character/scene.gltf")).scene.children[0],n.position.set(5,0,-5),n.scale.set(3,3,3),i.add(n)}function y(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight)}