import{ac as m,z as h,ad as g,ae as y}from"./three-BGGDK56p.js";import{G as u}from"./three-gltf-loader-DT0Rnvbh.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function p(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=p(e);fetch(e.href,t)}})();let L=document.getElementById("threejs"),a,s,n,d,f=.01,o;P();async function P(){s=new m,a=new h(75,window.innerWidth/window.innerHeight,.1,100),a.position.z=5;const i=new g(16777147,526368);i.position.set(0,5,0),s.add(i),n=new y({antialias:!0}),n.setClearColor(15790320),n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),L.appendChild(n.domElement),await z(),await b(),w(),window.addEventListener("resize",F)}function w(){requestAnimationFrame(w),d.rotation.z+=f,o.rotation.z+=f,n.render(s,a)}async function z(){d=(await new u().setPath("chef/").loadAsync("scene.gltf")).scene.children[0],d.position.set(-5,0,-5),s.add(d)}async function b(){o=(await new u().loadAsync("karen/female_cartoon_character/scene.gltf")).scene.children[0],o.position.set(5,0,-5),o.scale.set(3,3,3),s.add(o)}function F(){a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight)}