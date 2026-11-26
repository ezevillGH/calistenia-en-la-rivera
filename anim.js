/* Animaciones de ejercicios — estilo "Técnica + músculos".
   Silueta gris con los músculos que trabajan encendidos según el esfuerzo,
   y encima la línea técnica con el ángulo de codo y rodilla.
   API: ANIM.tiene(ej) · ANIM.svg(ej, clase) · ANIM.musculos(ej) · ANIM.iniciar()
   Cualquier <svg data-anim="id"> visible en la página se anima solo. */
(function(){
const L = { thigh:46, shin:46, torso:56, upper:31, fore:29 };
const C = { box:"#EAF1F2", floor:"#BFD0D4", bar:"#8EA8AE", G:"#B9C7CA", GF:"#9DAEB2", ON:"#E4572E", I:"#0E3A44", A:"#1F7FA3", J:"#F4F7F5" };
const add=(a,b)=>({x:a.x+b.x,y:a.y+b.y}), sub=(a,b)=>({x:a.x-b.x,y:a.y-b.y}), mul=(a,k)=>({x:a.x*k,y:a.y*k});
const len=a=>Math.hypot(a.x,a.y), unit=a=>mul(a,1/(len(a)||1)), lerpP=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
const rot=(a,deg)=>{ const r=deg*Math.PI/180, c=Math.cos(r), s=Math.sin(r); return {x:a.x*c-a.y*s, y:a.x*s+a.y*c}; };
const perp=u=>({x:-u.y,y:u.x}), dotP=(a,b)=>a.x*b.x+a.y*b.y;
function ik(A,B,l1,l2,hint){
  let d=len(sub(B,A)); const u=unit(sub(B,A));
  d=Math.min(Math.max(d,Math.abs(l1-l2)+.01),l1+l2-.01);
  const a=(l1*l1-l2*l2+d*d)/(2*d), h=Math.sqrt(Math.max(0,l1*l1-a*a)), P=add(A,mul(u,a)), n=perp(u);
  return add(P,mul(n,h*(dotP(n,hint)>=0?1:-1)));
}
const f1=n=>n.toFixed(1);
const seg=(a,b,w,c)=>`<line x1="${f1(a.x)}" y1="${f1(a.y)}" x2="${f1(b.x)}" y2="${f1(b.y)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const circ=(p,r,c,extra="")=>`<circle cx="${f1(p.x)}" cy="${f1(p.y)}" r="${r}" fill="${c}" ${extra}/>`;
function cap(a,b,ra,rb,fill){
  const n=perp(unit(sub(b,a))), p=[add(a,mul(n,ra)),add(b,mul(n,rb)),add(b,mul(n,-rb)),add(a,mul(n,-ra))];
  return `<polygon points="${p.map(q=>f1(q.x)+","+f1(q.y)).join(" ")}" fill="${fill}"/>`+circ(a,ra,fill)+circ(b,rb,fill);
}
function elipse(c,dir,rx,ry,fill){ const ang=Math.atan2(dir.y,dir.x)*180/Math.PI;
  return `<ellipse cx="${f1(c.x)}" cy="${f1(c.y)}" rx="${rx}" ry="${ry}" transform="rotate(${f1(ang)} ${f1(c.x)} ${f1(c.y)})" fill="${fill}"/>`; }
function angulo(A,J,B){ const u=unit(sub(A,J)), v=unit(sub(B,J)); return Math.round(Math.acos(Math.max(-1,Math.min(1,dotP(u,v))))*180/Math.PI); }
function arco(J,A,B,r,c){ const u=unit(sub(A,J)), v=unit(sub(B,J)), a=add(J,mul(u,r)), b=add(J,mul(v,r));
  const cross=u.x*v.y-u.y*v.x; return `<path d="M${f1(a.x)} ${f1(a.y)} A${r} ${r} 0 0 ${cross>0?1:0} ${f1(b.x)} ${f1(b.y)}" fill="none" stroke="${c}" stroke-width="2"/>`; }

function resolver(p,ex){
  const k=ik(p.hip,p.ankle,L.thigh,L.shin,ex.knee), e=ik(p.shoulder,p.wrist,L.upper,L.fore,ex.elbow);
  const up=unit(sub(p.shoulder,p.hip)), hu=rot(up,p.head||0), head=add(p.shoulder,mul(hu,27)), neck=add(p.shoulder,mul(rot(up,(p.head||0)/2),10));
  const fwd=rot(hu,90), toe=add(p.ankle,ex.foot), off={x:-3,y:-2};
  const ladoMuslo=unit(sub(k,lerpP(p.hip,p.ankle,.5))), ladoBrazo=unit(sub(e,lerpP(p.shoulder,p.wrist,.5)));
  return {...p,knee:k,elbow:e,up,hu,head,neck,fwd,toe,off,ladoMuslo,ladoBrazo};
}
const lejos=s=>{ const m=q=>add(q,s.off); return {...s,hip:m(s.hip),knee:m(s.knee),ankle:m(s.ankle),toe:m(s.toe),shoulder:m(s.shoulder),elbow:m(s.elbow),wrist:m(s.wrist)}; };

function dibujar(s,ej){
  const a=s.act??.5;
  const sil=(q,c)=>cap(q.ankle,q.toe,5,4,c)+cap(q.knee,q.ankle,6.5,4.5,c)+cap(q.hip,q.knee,10,6.8,c)+cap(q.shoulder,q.elbow,7.5,5.2,c)+cap(q.elbow,q.wrist,5.6,4.2,c)+circ(q.wrist,5.2,c);
  const ON=C.ON, M={
    pecho:   ()=>elipse(add(lerpP(s.hip,s.shoulder,.78),mul(s.fwd,9)),s.up,11,6,ON),
    dorsal:  ()=>elipse(add(lerpP(s.hip,s.shoulder,.68),mul(s.fwd,-9)),s.up,15,6,ON),
    abdomen: ()=>elipse(add(lerpP(s.hip,s.shoulder,.35),mul(s.fwd,9)),s.up,11,5,ON),
    hombro:  ()=>circ(s.shoulder,8,ON),
    triceps: ()=>elipse(add(lerpP(s.shoulder,s.elbow,.5),mul(s.ladoBrazo,3.5)),sub(s.elbow,s.shoulder),11,4.5,ON),
    biceps:  ()=>elipse(add(lerpP(s.shoulder,s.elbow,.5),mul(s.ladoBrazo,-3.5)),sub(s.elbow,s.shoulder),11,4.5,ON),
    antebrazo:()=>elipse(lerpP(s.elbow,s.wrist,.4),sub(s.wrist,s.elbow),9,4,ON),
    cuadriceps:()=>elipse(add(lerpP(s.hip,s.knee,.5),mul(s.ladoMuslo,3.5)),sub(s.knee,s.hip),18,6,ON),
    gluteo:  ()=>elipse(add(s.hip,mul(s.fwd,-8)),s.up,9,8,ON),
    isquios: ()=>elipse(add(lerpP(s.hip,s.knee,.5),mul(s.ladoMuslo,-4)),sub(s.knee,s.hip),15,4.5,ON) };
  const on=ej.musculos.map(([m,w])=>`<g opacity="${(.25+.75*a*w).toFixed(2)}">${M[m]()}</g>`).join("");
  const base=sil(lejos(s),C.GF)+cap(s.hip,s.shoulder,14,16,C.G)+cap(s.neck,s.shoulder,5,6,C.G)+circ(s.head,13,C.G)+sil(s,C.G)+on;
  const ln=(p,q,w=2.6)=>seg(p,q,w,C.I), j=p=>circ(p,3.2,C.J,`stroke="${C.I}" stroke-width="1.8"`);
  const ae=angulo(s.shoulder,s.elbow,s.wrist), ak=angulo(s.hip,s.knee,s.ankle);
  const tagE=add(s.elbow,mul(s.hu,19)), tagK=add(s.knee,mul(s.ladoMuslo,21));
  const txt=(p,v)=>`<text x="${f1(p.x)}" y="${f1(p.y+4)}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" font-weight="700" fill="${C.A}" stroke="${C.box}" stroke-width="3" paint-order="stroke">${v}°</text>`;
  return base+'<g opacity=".85">'+ln(s.hip,s.shoulder,3)+ln(s.shoulder,s.neck)+ln(s.hip,s.knee)+ln(s.knee,s.ankle)+ln(s.ankle,s.toe,2.2)+ln(s.shoulder,s.elbow)+ln(s.elbow,s.wrist)+'</g>'
    +arco(s.elbow,s.shoulder,s.wrist,11,C.A)+arco(s.knee,s.hip,s.ankle,11,C.A)+txt(tagE,ae)+txt(tagK,ak)
    +[s.hip,s.knee,s.ankle,s.shoulder,s.elbow,s.wrist].map(j).join("");
}

/* ---------- ejercicios (posiciones clave; act = esfuerzo 0–1) ---------- */
const P=(x,y)=>({x,y});
const piso=`<line x1="10" y1="300" x2="290" y2="300" stroke="${C.floor}" stroke-width="4" stroke-linecap="round"/>`;
const FLEX={ vb:"20 180 260 132", knee:P(0,-1), elbow:P(-1,-.4), foot:P(5,11),
  musculos:[["pecho",1],["triceps",1],["hombro",.8],["abdomen",.5]],
  keys:[
    {t:0,   cue:"Cuerpo alineado", pose:{ankle:P(48,288),hip:P(134.6,256.9),shoulder:P(187,238),wrist:P(190,296),act:.3}},
    {t:.4,  cue:"Bajá controlado", pose:{ankle:P(48,288),hip:P(134.6,256.9),shoulder:P(187,238),wrist:P(190,296),act:.4}},
    {t:1.5, cue:"Pecho cerca del piso", pose:{ankle:P(48,288),hip:P(139.7,280.5),shoulder:P(195.5,276),wrist:P(190,296),act:.8}},
    {t:1.75,cue:"Empujá el piso", pose:{ankle:P(48,288),hip:P(139.7,280.5),shoulder:P(195.5,276),wrist:P(190,296),act:1}},
    {t:2.6, cue:"Cuerpo alineado", pose:{ankle:P(48,288),hip:P(134.6,256.9),shoulder:P(187,238),wrist:P(190,296),act:.3}}],
  escena:()=>piso };
const SENT={ vb:"40 104 220 206", knee:P(1,0), elbow:P(0,1), foot:P(20,7),
  musculos:[["cuadriceps",1],["gluteo",1],["isquios",.5],["abdomen",.4]],
  keys:[
    {t:0,   cue:"Parado, core activo", pose:{ankle:P(150,290),hip:P(150,199),shoulder:P(150,143),wrist:P(208,148),head:0,act:.2}},
    {t:.3,  cue:"Cadera atrás y abajo", pose:{ankle:P(150,290),hip:P(150,199),shoulder:P(150,143),wrist:P(208,148),head:0,act:.3}},
    {t:1.5, cue:"Talones apoyados", pose:{ankle:P(150,290),hip:P(104,250),shoulder:P(140,207),wrist:P(200,203),head:-22,act:.8}},
    {t:1.8, cue:"Empujá el piso", pose:{ankle:P(150,290),hip:P(104,250),shoulder:P(140,207),wrist:P(200,203),head:-22,act:1}},
    {t:2.8, cue:"Parado, core activo", pose:{ankle:P(150,290),hip:P(150,199),shoulder:P(150,143),wrist:P(208,148),head:0,act:.2}}],
  escena:()=>piso };
const DOMI={ vb:"50 14 220 296", knee:P(-1,0), elbow:P(1,.3), foot:P(3,14),
  musculos:[["dorsal",1],["biceps",1],["antebrazo",.6],["abdomen",.4]],
  keys:[
    {t:0,   cue:"Colgado", pose:{ankle:P(157,262),hip:P(154,171),shoulder:P(154,115),wrist:P(156,52),head:0,act:.2}},
    {t:.5,  cue:"Activá escápulas", pose:{ankle:P(157,256),hip:P(154,165),shoulder:P(154,109),wrist:P(156,52),head:0,act:.5}},
    {t:.7,  cue:"Tirá, codos abajo", pose:{ankle:P(157,256),hip:P(154,165),shoulder:P(154,109),wrist:P(156,52),head:0,act:.7}},
    {t:1.7, cue:"Mentón sobre la barra", pose:{ankle:P(149,213),hip:P(141,122),shoulder:P(140,66),wrist:P(156,52),head:-6,act:1}},
    {t:2.0, cue:"Bajá controlado", pose:{ankle:P(149,213),hip:P(141,122),shoulder:P(140,66),wrist:P(156,52),head:-6,act:.9}},
    {t:3.5, cue:"Colgado", pose:{ankle:P(157,262),hip:P(154,171),shoulder:P(154,115),wrist:P(156,52),head:0,act:.2}}],
  escena:()=>`<path d="M156 46 H246 V300" fill="none" stroke="${C.floor}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`+piso,
  barra:()=>`<circle cx="156" cy="46" r="6" fill="${C.bar}"/>` };
/* id del catálogo → animación (solo ejercicios con el mismo movimiento) */
const EJ={ flexiones:FLEX, sentadilla:SENT, dominadas:DOMI };
Object.values(EJ).forEach(e=>e.dur=e.keys.at(-1).t);

const NOMBRE={pecho:"Pecho",triceps:"Tríceps",hombro:"Hombro",abdomen:"Abdomen",cuadriceps:"Cuádriceps",gluteo:"Glúteo",isquios:"Isquiotibiales",dorsal:"Dorsal",biceps:"Bíceps",antebrazo:"Antebrazo"};
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function poseEn(e,t){
  const k=e.keys; let i=0; while(i<k.length-2 && t>=k[i+1].t) i++;
  const a=k[i], b=k[i+1], f=b.t===a.t?0:ease(Math.min(1,Math.max(0,(t-a.t)/(b.t-a.t)))), p={};
  for(const n of Object.keys(a.pose)) p[n]= typeof a.pose[n]==="number" ? a.pose[n]+(b.pose[n]-a.pose[n])*f : lerpP(a.pose[n],b.pose[n],f);
  return {p, cue:a.cue};
}
function cuadro(id,t){ const e=EJ[id]; const {p,cue}=poseEn(e,t%e.dur);
  return {svg:`<rect x="-500" y="-500" width="1300" height="1300" fill="${C.box}"/>`+e.escena()+dibujar(resolver(p,e),e)+(e.barra?e.barra():""), cue}; }

const lento = typeof matchMedia==="function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
let corriendo=false;
function frame(now){
  const t=now/1000*(lento?.4:1);
  document.querySelectorAll("svg[data-anim]").forEach(el=>{
    if(!el.getClientRects().length) return;                      // oculto (details cerrado, timer cerrado)
    const r=el.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
    const id=el.dataset.anim; if(!EJ[id]) return;
    if(el.getAttribute("viewBox")!==EJ[id].vb) el.setAttribute("viewBox",EJ[id].vb);
    const {svg,cue}=cuadro(id,t); el.innerHTML=svg;
    const c=el.parentElement?.querySelector(".anim-cue"); if(c && c.textContent!==cue) c.textContent=cue;
  });
  requestAnimationFrame(frame);
}
window.ANIM={
  tiene:id=>!!EJ[id],
  musculos:id=>EJ[id]?EJ[id].musculos.map(m=>NOMBRE[m[0]]):[],
  /* bloque listo para insertar: dibujo + frase técnica + músculos */
  html:(id,clase="")=>EJ[id]?`<figure class="anim ${clase}"><svg data-anim="${id}" viewBox="${EJ[id].vb}" role="img" aria-label="Animación del ejercicio">${cuadro(id,performance.now()/1000*(lento?.4:1)).svg}</svg>
    <figcaption><span class="anim-cue">${cuadro(id,performance.now()/1000*(lento?.4:1)).cue}</span><span class="anim-mus">Trabajan: ${ANIM.musculos(id).join(" · ")}</span></figcaption></figure>`:"",
  iniciar(){ if(!corriendo){ corriendo=true; requestAnimationFrame(frame); } }
};
})();
