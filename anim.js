/* Animaciones de ejercicios — estilo "Técnica + músculos".
   Silueta gris con los músculos que trabajan encendidos según el esfuerzo,
   y encima la línea técnica con el ángulo de codo y rodilla.
   API: ANIM.tiene(ej) · ANIM.svg(ej, clase) · ANIM.musculos(ej) · ANIM.iniciar()
   Cualquier <svg data-anim="id"> visible en la página se anima solo. */
(function(){
const L = { thigh:46, shin:46, torso:56, upper:31, fore:29 };
const C = { box:"#1A2124", floor:"#3A4649", bar:"#7C8A8D", G:"#4C585B", GF:"#38423F", ON:"#A6E35A", I:"#E9EFEE", A:"#58B3D3", J:"#1A2124" };
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
  const up=unit(sub(p.shoulder,p.hip)), hu=rot(up,p.head||0);
  // esc: escápulas (+ deprimidas: el tronco y la cabeza suben respecto del hombro; − elevadas: la cabeza se hunde)
  const ev=mul(up,(p.esc||0)*7), chest=add(p.shoulder,ev);
  const head=add(chest,mul(hu,27)), neck=add(chest,mul(rot(up,(p.head||0)/2),10));
  const fwd=rot(hu,90), toe=add(p.ankle,ex.foot), off={x:-3,y:-2};
  const ladoMuslo=unit(sub(k,lerpP(p.hip,p.ankle,.5))), ladoBrazo=unit(sub(e,lerpP(p.shoulder,p.wrist,.5)));
  // brazo y pierna del lado de atrás: copia corrida, o independientes si la pose trae ankle2 / wrist2
  const m=q=>add(q,off), fh=m(p.hip), fs=m(p.shoulder), fa=m(p.ankle2||p.ankle), fw=m(p.wrist2||p.wrist);
  const F={hip:fh,shoulder:fs,ankle:fa,wrist:fw,toe:add(fa,ex.foot),knee:ik(fh,fa,L.thigh,L.shin,ex.knee2||ex.knee),elbow:ik(fs,fw,L.upper,L.fore,ex.elbow2||ex.elbow)};
  return {...p,knee:k,elbow:e,up,hu,head,neck,chest,fwd,toe,off,ladoMuslo,ladoBrazo,F};
}
const lejos=s=>s.F;

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
    lumbar:  ()=>elipse(add(lerpP(s.hip,s.shoulder,.28),mul(s.fwd,-9)),s.up,11,5,ON),
    serrato: ()=>elipse(add(lerpP(s.hip,s.shoulder,.66),mul(s.fwd,4)),s.up,9,4.5,ON),
    trapecio:()=>elipse(add(lerpP(s.hip,s.chest,.86),mul(s.fwd,-8)),s.up,8,5,ON),
    isquios: ()=>elipse(add(lerpP(s.hip,s.knee,.5),mul(s.ladoMuslo,-4)),sub(s.knee,s.hip),15,4.5,ON) };
  const on=ej.musculos.map(([m,w])=>`<g opacity="${(.25+.75*a*w).toFixed(2)}">${M[m]()}</g>`).join("");
  const base=sil(lejos(s),C.GF)+cap(s.hip,s.chest,14,16,C.G)+(s.prot!=null?elipse(add(lerpP(s.hip,s.chest,.78),mul(s.fwd,-(9+s.prot*6))),s.up,13,7,C.G):"")+cap(s.neck,s.chest,5,6,C.G)+circ(s.head,13,C.G)+sil(s,C.G)+on;
  const ln=(p,q,w=2.6)=>seg(p,q,w,C.I), j=p=>circ(p,3.2,C.J,`stroke="${C.I}" stroke-width="1.8"`);
  const ae=angulo(s.shoulder,s.elbow,s.wrist), ak=angulo(s.hip,s.knee,s.ankle);
  const tagE=add(s.elbow,mul(s.hu,19)), tagK=add(s.knee,mul(s.ladoMuslo,21));
  const txt=(p,v)=>`<text x="${f1(p.x)}" y="${f1(p.y+4)}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" font-weight="700" fill="${C.A}" stroke="${C.box}" stroke-width="3" paint-order="stroke">${v}°</text>`;
  return base+'<g opacity=".85">'+ln(s.hip,s.chest,3)+ln(s.chest,s.neck)+(s.esc?ln(s.chest,s.shoulder,2):"")+ln(s.hip,s.knee)+ln(s.knee,s.ankle)+ln(s.ankle,s.toe,2.2)+ln(s.shoulder,s.elbow)+ln(s.elbow,s.wrist)+'</g>'
    +arco(s.elbow,s.shoulder,s.wrist,11,C.A)+arco(s.knee,s.hip,s.ankle,11,C.A)+txt(tagE,ae)+txt(tagK,ak)
    +[s.hip,s.knee,s.ankle,s.shoulder,s.elbow,s.wrist].map(j).join("");
}

/* ---------- ejercicios (posiciones clave; act = esfuerzo 0–1) ---------- */
const P=(x,y)=>({x,y});
const piso=`<line x1="10" y1="300" x2="290" y2="300" stroke="${C.floor}" stroke-width="4" stroke-linecap="round"/>`;
const FLEX={ vb:"20 180 260 132", knee:P(0,-1), elbow:P(-1,-.4), foot:P(5,11),
  musculos:[["pecho",1],["triceps",1],["hombro",.8],["abdomen",.5]],
  keys:[
    {t:0,   cue:"Cuerpo alineado", pose:{ankle:P(48,288),hip:P(134.6,255.9),shoulder:P(187,235.6),wrist:P(190,295.5),act:.3}},
    {t:.4,  cue:"Bajá controlado", pose:{ankle:P(48,288),hip:P(134.6,255.9),shoulder:P(187,235.6),wrist:P(190,295.5),act:.4}},
    {t:1.5, cue:"Pecho cerca del piso", pose:{ankle:P(48,288),hip:P(139.7,280.5),shoulder:P(195.5,276),wrist:P(190,296),act:.8}},
    {t:1.75,cue:"Empujá el piso", pose:{ankle:P(48,288),hip:P(139.7,280.5),shoulder:P(195.5,276),wrist:P(190,296),act:1}},
    {t:2.6, cue:"Cuerpo alineado", pose:{ankle:P(48,288),hip:P(134.6,255.9),shoulder:P(187,235.6),wrist:P(190,295.5),act:.3}}],
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
/* cuerpo en tabla: cadera y hombro sobre la recta que sale del tobillo con ese ángulo (grados sobre la horizontal, hacia la derecha) */
const tabla=(ank,deg)=>{ const r=deg*Math.PI/180, u={x:Math.cos(r),y:-Math.sin(r)}; return {ankle:ank,hip:add(ank,mul(u,92)),shoulder:add(ank,mul(u,148))}; };
const K=(t,cue,pose)=>({t,cue,pose});
const barra=(x,y)=>`<circle cx="${x}" cy="${y}" r="6" fill="${C.bar}"/>`;

const AUS_A=tabla(P(60,292),12), AUS_B=tabla(P(60,292),29);
const AUSTR={ vb:"30 150 250 160", knee:P(0,-1), elbow:P(-.3,1), foot:P(3,-11),
  musculos:[["dorsal",1],["biceps",.8],["antebrazo",.5],["abdomen",.5]],
  keys:[
    K(0,"Cuerpo en tabla",{...AUS_A,wrist:P(205,201.5),act:.3}),
    K(.4,"Hombros atrás y abajo",{...AUS_A,wrist:P(205,201.5),act:.5}),
    K(1.4,"Barra debajo del pecho",{...AUS_B,wrist:P(205,201.5),act:1}),
    K(1.7,"Bajá controlado",{...AUS_B,wrist:P(205,201.5),act:.9}),
    K(2.8,"Cuerpo en tabla",{...AUS_A,wrist:P(205,201.5),act:.3})],
  escena:()=>`<path d="M205 203 H255 V300" fill="none" stroke="${C.floor}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`+piso,
  barra:()=>barra(205,203) };

const FONDOS={ vb:"30 140 200 170", knee:P(0,-1), elbow:P(-1,0), foot:P(3,-11),
  musculos:[["triceps",1],["hombro",.7],["pecho",.5],["abdomen",.3]],
  keys:[
    K(0,"Cerca del cajón",{ankle:P(192,292),hip:P(120,236),shoulder:P(112,179.5),wrist:P(108,240),act:.3}),
    K(.3,"Bajá controlado",{ankle:P(192,292),hip:P(120,236),shoulder:P(112,179.5),wrist:P(108,240),act:.4}),
    K(1.4,"Codos a 90°",{ankle:P(192,292),hip:P(124,256),shoulder:P(117,200),wrist:P(108,240),act:.9}),
    K(1.65,"Empujá el cajón",{ankle:P(192,292),hip:P(124,256),shoulder:P(117,200),wrist:P(108,240),act:1}),
    K(2.6,"Cerca del cajón",{ankle:P(192,292),hip:P(120,236),shoulder:P(112,179.5),wrist:P(108,240),act:.3})],
  escena:()=>`<rect x="40" y="244" width="70" height="56" rx="4" fill="${C.floor}"/>`+piso };

const LEAN0={ankle:P(48,288),hip:P(134.6,255.9),shoulder:P(187,235.6),wrist:P(190,295.5)};
const LEAN1={ankle:P(70,288),hip:P(158,256),shoulder:P(212,240),wrist:P(190,295.5)};
const LEAN={ vb:"20 180 260 132", knee:P(0,-1), elbow:P(-1,-.4), foot:P(5,11),
  musculos:[["hombro",1],["pecho",.7],["abdomen",.8],["biceps",.4]],
  keys:[
    K(0,"Plancha alta",{...LEAN0,prot:1,act:.3}),
    K(.4,"Espalda redondeada",{...LEAN0,prot:1,act:.4}),
    K(1.6,"Inclinate hacia adelante",{...LEAN1,prot:1,act:1}),
    K(3.2,"Codos bloqueados, sostené",{...LEAN1,prot:1,act:1}),
    K(4.2,"Plancha alta",{...LEAN0,prot:1,act:.3})],
  escena:()=>piso };

const SUP0={ankle:P(58,293),hip:P(150,287),shoulder:P(206,285),wrist:P(266,292),head:0};
const SUP1={ankle:P(64,272),hip:P(150,287),shoulder:P(205,278),wrist:P(262,262),head:-8};
const SUPER={ vb:"30 220 270 90", knee:P(0,1), elbow:P(0,1), foot:P(-11,4),
  musculos:[["lumbar",1],["gluteo",.8],["isquios",.5],["trapecio",.5]],
  keys:[
    K(0,"Boca abajo, brazos estirados",{...SUP0,act:.2}),
    K(.5,"Subí brazos y piernas",{...SUP0,act:.3}),
    K(1.4,"Sostené arriba",{...SUP1,act:1}),
    K(2.6,"Bajá controlado",{...SUP1,act:.9}),
    K(3.4,"Boca abajo, brazos estirados",{...SUP0,act:.2})],
  escena:()=>piso };

const HOL0={hip:P(152,287),shoulder:P(98,278),wrist:P(40,262),ankle:P(240,266),head:14};
const HOL1={hip:P(152,288),shoulder:P(98,274),wrist:P(40,257),ankle:P(240,262),head:16};
const HOLLOW={ vb:"20 210 250 100", knee:P(0,-1), elbow:P(0,-1), foot:P(10,-6),
  musculos:[["abdomen",1],["cuadriceps",.4],["hombro",.3]],
  keys:[
    K(0,"Zona lumbar pegada al piso",{...HOL0,act:.8}),
    K(1.5,"Brazos y piernas lejos",{...HOL1,act:1}),
    K(3,"Zona lumbar pegada al piso",{...HOL0,act:.8})],
  escena:()=>piso };

const BOL0={hip:P(152,288),shoulder:P(98,279),wrist:P(42,266),ankle:P(240,268),head:12};
const BOL1={hip:P(150,290),shoulder:P(111,251),wrist:P(170,238),ankle:P(168,248),head:24};
const BOLITA={ vb:"20 190 250 120", knee:P(-.6,-1), elbow:P(0,-1), foot:P(10,-6),
  musculos:[["abdomen",1],["cuadriceps",.3]],
  keys:[
    K(0,"Estirado, sin tocar el piso",{...BOL0,act:.5}),
    K(.3,"Juntá rodillas y pecho",{...BOL0,act:.6}),
    K(1.1,"Bolita",{...BOL1,act:1}),
    K(1.4,"Abrí controlado",{...BOL1,act:.9}),
    K(2.4,"Estirado, sin tocar el piso",{...BOL0,act:.5})],
  escena:()=>piso };

const ELE0={hip:P(152,288),shoulder:P(98,286),wrist:P(156,294),ankle:P(242,281),head:6};
const ELE1={hip:P(152,288),shoulder:P(98,286),wrist:P(156,294),ankle:P(166,197),head:6};
const ELEV={ vb:"30 170 240 140", knee:P(0,-1), elbow:P(0,1), foot:P(10,-6),
  musculos:[["abdomen",1],["cuadriceps",.5]],
  keys:[
    K(0,"Zona lumbar pegada al piso",{...ELE0,act:.5}),
    K(.3,"Subí las piernas",{...ELE0,act:.6}),
    K(1.3,"Piernas arriba",{...ELE1,act:.7}),
    K(1.5,"Bajá lento",{...ELE1,act:.8}),
    K(3,"Sin tocar el piso",{...ELE0,act:1}),
    K(3.3,"Zona lumbar pegada al piso",{...ELE0,act:.5})],
  escena:()=>piso };

const ESC_B={hip:P(136,257),shoulder:P(187,235.6),wrist:P(190,295.5)}, atras=P(52,288), adelante=P(160,284);
const ESCAL={ vb:"20 180 260 132", knee:P(.4,1), elbow:P(-1,-.4), foot:P(5,11),
  musculos:[["abdomen",1],["hombro",.6],["cuadriceps",.5]],
  keys:[
    K(0,"Plancha firme",{...ESC_B,ankle:atras,ankle2:adelante,act:.8}),
    K(.35,"Rodilla al pecho",{...ESC_B,ankle:adelante,ankle2:atras,act:1}),
    K(.7,"Cambiá rápido",{...ESC_B,ankle:atras,ankle2:adelante,act:.8})],
  escena:()=>piso };

const SK_A={hip:P(150,197),shoulder:P(151,141),ankle:P(194,246),ankle2:P(148,290),wrist:P(128,186),wrist2:P(178,166),head:0};
const SK_B={hip:P(150,197),shoulder:P(151,141),ankle:P(148,290),ankle2:P(194,246),wrist:P(178,166),wrist2:P(128,186),head:0};
const SKIP={ vb:"60 100 190 210", knee:P(1,-.2), elbow:P(-.2,1), foot:P(18,6),
  musculos:[["cuadriceps",1],["gluteo",.5],["abdomen",.4],["isquios",.3]],
  keys:[
    K(0,"Rodilla a la cadera",{...SK_A,act:.9}),
    K(.32,"Brazos acompañan",{...SK_B,act:.9}),
    K(.64,"Rodilla a la cadera",{...SK_A,act:.9})],
  escena:()=>piso };

const RP0={ankle:P(48,288),hip:P(134.6,255.9),shoulder:P(187,235.6),wrist:P(190,295.5)};
const RECH_PL={ vb:"20 180 260 132", knee:P(0,-1), elbow:P(-1,-.4), foot:P(5,11),
  musculos:[["serrato",1],["trapecio",.7],["abdomen",.5]],
  keys:[
    K(0,"Codos bloqueados",{...RP0,prot:0,act:.3}),
    K(.3,"Juntá los omóplatos",{...RP0,prot:-1,act:.5}),
    K(1.1,"Pecho baja, brazos rectos",{...RP0,prot:-1,act:.6}),
    K(1.8,"Separá los omóplatos",{...RP0,prot:1.2,act:1}),
    K(2.4,"Empujá el piso",{...RP0,prot:1.2,act:1}),
    K(3,"Codos bloqueados",{...RP0,prot:0,act:.3})],
  escena:()=>piso };

const CG0={ankle:P(157,262),hip:P(154,171),shoulder:P(154,113),wrist:P(156,52),head:0,esc:-.7};
const CG1={ankle:P(157,250),hip:P(154,159),shoulder:P(154,113),wrist:P(156,52),head:0,esc:.8};
const colgar=()=>`<path d="M156 46 H246 V300" fill="none" stroke="${C.floor}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`+piso;
const DEPR={ vb:"50 14 220 296", knee:P(-1,0), elbow:P(1,.3), foot:P(3,14),
  musculos:[["dorsal",1],["trapecio",.8],["antebrazo",.6]],
  keys:[
    K(0,"Colgado, hombros a las orejas",{...CG0,act:.2}),
    K(.4,"Brazos estirados",{...CG0,act:.3}),
    K(1.3,"Bajá y juntá las escápulas",{...CG1,act:1}),
    K(2.1,"Sostené",{...CG1,act:1}),
    K(3,"Colgado, hombros a las orejas",{...CG0,act:.2})],
  escena:colgar, barra:()=>barra(156,46) };
const COLG={ vb:"50 14 220 296", knee:P(-1,0), elbow:P(1,.3), foot:P(3,14),
  musculos:[["dorsal",.6],["antebrazo",.8]],
  keys:[
    K(0,"Colgado, aflojá la espalda",{...CG0,act:.3}),
    K(2,"Respirá y soltá",{...CG0,ankle:P(158,264),hip:P(154,172),act:.4}),
    K(4,"Colgado, aflojá la espalda",{...CG0,act:.3})],
  escena:colgar, barra:()=>barra(156,46) };

const PA0={ankle:P(150,282),hip:P(150,188),shoulder:P(150,132),wrist:P(152,192),head:0,esc:-.7};
const PA1={ankle:P(150,270),hip:P(150,176),shoulder:P(150,132),wrist:P(152,192),head:0,esc:.8};
const RECH_PA={ vb:"60 80 200 230", knee:P(-1,0), elbow:P(-1,0), foot:P(3,14),
  musculos:[["trapecio",1],["dorsal",.7],["triceps",.5],["pecho",.4]],
  keys:[
    K(0,"Codos bloqueados",{...PA0,act:.3}),
    K(.3,"Hombros hundidos",{...PA0,act:.4}),
    K(1.2,"Alejá los hombros de las orejas",{...PA1,act:1}),
    K(2,"Sostené",{...PA1,act:1}),
    K(2.8,"Codos bloqueados",{...PA0,act:.3})],
  escena:()=>`<path d="M92 300 V198 H222 V300" fill="none" stroke="${C.floor}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`+piso };

/* id del catálogo → animación (solo ejercicios con el mismo movimiento) */
const EJ={ flexiones:FLEX, sentadilla:SENT, dominadas:DOMI,
  australians:AUSTR, "fondos-cajon":FONDOS, "lean-planche":LEAN, superman:SUPER, "hollow-hold":HOLLOW, "abs-bolita":BOLITA,
  "elevaciones-piernas":ELEV, escaladores:ESCAL, skipping:SKIP, "rechazo-escapular-plancha":RECH_PL,
  "depresion-escapular-colgado":DEPR, "est-dorsal":COLG, "rechazo-escapular-paralelas":RECH_PA };
Object.values(EJ).forEach(e=>e.dur=e.keys.at(-1).t);

const NOMBRE={pecho:"Pecho",triceps:"Tríceps",hombro:"Hombro",abdomen:"Abdomen",cuadriceps:"Cuádriceps",gluteo:"Glúteo",isquios:"Isquiotibiales",dorsal:"Dorsal",biceps:"Bíceps",antebrazo:"Antebrazo",lumbar:"Lumbares",serrato:"Serrato",trapecio:"Trapecio"};
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
  const t=window.ANIM.fijo!=null ? window.ANIM.fijo : now/1000*(lento?.4:1);
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
    <figcaption><span class="anim-cue">${cuadro(id,performance.now()/1000*(lento?.4:1)).cue}</span><span class="anim-mus" aria-label="Músculos que trabajan">${ANIM.musculos(id).map(m=>`<span class="mchip"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></i>${m}</span>`).join("")}</span></figcaption></figure>`:"",
  ids:()=>Object.keys(EJ),
  /* dibujo animado suelto (sin textos) */
  svg:id=>EJ[id]?`<svg data-anim="${id}" viewBox="${EJ[id].vb}" role="img" aria-label="Animación del ejercicio">${cuadro(id,performance.now()/1000).svg}</svg>`:"",
  /* miniatura fija en el momento de más esfuerzo, encuadrada en cuadrado */
  mini:id=>{ const e=EJ[id]; if(!e) return ""; const k=e.keys.reduce((m,x)=>(x.pose.act??0)>(m.pose.act??0)?x:m,e.keys[0]);
    const [x,y,w,h]=e.vb.split(" ").map(Number), sz=Math.max(h,(w+h)/2*.85), cx=x+w/2, cy=y+h/2;
    return `<svg viewBox="${(cx-sz/2).toFixed(1)} ${(cy-sz/2).toFixed(1)} ${sz.toFixed(1)} ${sz.toFixed(1)}" aria-hidden="true">${cuadro(id,k.t).svg}</svg>`; },
  iniciar(){ if(!corriendo){ corriendo=true; requestAnimationFrame(frame); } }
};
})();
