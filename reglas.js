/* Reglas de armado de rutinas (reglamento del grupo, estructura del 01/11/2026).
   Las usan la app (modo profe: avisa) y build.js (frena). Trabajan sobre el formato de rutina.js. */
(function (root) {
  const LETRA = { basico: "B", "int-sup": "S", "int-inf": "I", avanzado: "A" };
  const ORDEN_ENTRADA = ["movilidad", "temperatura", "core", "escapulas", "activacion"];
  const BASICOS = ["empuje", "traccion", "piernas"];
  const ORDEN_BLOQUES = ["entrada", "principal", "fuerza", "cierre", "calma"];
  const ENTRADA = { vueltas: 2, ejercicios: 3, maxReps: 5, maxSeg: 20 };
  const PRINCIPAL = { ejercicios: [4, 5], series: 3, reps: [6, 8], skills: [1, 2] };
  const HOLD_CORE = { B: 30, S: 60, I: 60, A: 60 };
  // EMOM (cada N min) y AMRAP: desde intermedio (pág. 213). El tabata va fijo en el cierre, de core.
  const METODOS_FUERZA = { B: [], S: ["emom", "amrap"], I: ["emom", "amrap"], A: ["emom", "amrap"] };
  const RELOJ_SABADO = { B: [], S: ["emom", "amrap"], I: ["emom", "amrap"], A: ["emom", "amrap"] };
  const MAX_INTENTOS_BASICO = 4;       // pág. 79
  const ESTIRAMIENTO = [20, 40];
  const DURACION_MAX = { sabado: 130, otra: 70 };

  const esIntervalo = it => ["tabata", "emom", "amrap"].includes(it.tipo);
  const ejIds = it => it.tipo === "reps" || it.tipo === "tiempo" ? [it.ej]
    : it.tipo === "circuito" ? it.ejercicios.map(e => e.ej) : (it.ejs || []);
  const nums = s => (String(s ?? "").match(/\d+/g) || []).map(Number);

  function validar(R, C) {
    const errores = [], avisos = [], info = [];
    const err = (d, m) => errores.push(`${d}: ${m}`), avi = (d, m) => avisos.push(`${d}: ${m}`);
    const parteDe = id => { const p = C[id]?.parte; return BASICOS.includes(p) ? "activacion" : p; };
    const nombre = id => C[id]?.n || id;
    const niveles = R.niveles.map(n => n.id);
    const nomNivel = id => R.niveles.find(n => n.id === id)?.nombre || id;
    const porNivel = {};

    R.sesiones.forEach(ses => {
      const nivs = ses.nivel ? [ses.nivel] : niveles;
      nivs.forEach(n => (porNivel[n] ||= []).push(ses.id));
      if (ses.bloques[0]?.tipo !== "entrada") err(ses.nombre, "tiene que empezar con la entrada en calor");
      if (ses.bloques.at(-1)?.tipo !== "calma") err(ses.nombre, "tiene que terminar con la vuelta a la calma");

      for (const N of nivs) {
        const L = LETRA[N], bloques = ses.bloques.filter(b => !b.nivel || b.nivel === N), donde = `${ses.nombre} [${nomNivel(N)}]`;
        if (!bloques.some(b => b.tipo === "principal")) err(donde, "no tiene rutina de ejercicios");
        let ult = -1;
        bloques.forEach(b => { const i = ORDEN_BLOQUES.indexOf(b.tipo);
          if (i < 0) err(donde, `tipo de bloque desconocido: ${b.tipo}`); else if (i < ult) err(donde, `"${b.nombre}" está fuera de orden (entrada → rutina → fuerza → calma)`); else ult = i; });

        // ejercicios: catálogo y nivel
        bloques.forEach(b => b.items.forEach(it => ejIds(it).forEach(id => {
          const d = `${donde} › ${b.nombre}`;
          if (!C[id]) return err(d, `"${id}" no está en el catálogo`);
          if (!C[id].niv.includes(L)) err(d, `"${C[id].n}" no está permitido para ${nomNivel(N)}`);
          if (C[id].extra) avi(d, `"${C[id].n}" es un agregado nuestro, no está en el curso`);
        })));

        // entrada en calor: movilidad + 4 circuitos de 2 vueltas × 3 ejercicios, máx. 5 repes o 20 s
        let idx = -1; const vistas = new Set();
        bloques.filter(b => b.tipo === "entrada").flatMap(b => b.items).forEach(it => {
          const ids = ejIds(it), partes = [...new Set(ids.map(parteDe))], d = `${donde} › Entrada en calor › ${it.nombre || nombre(ids[0])}`;
          if (partes.length > 1) return err(d, `mezcla partes distintas (${partes.join(", ")}); cada circuito es de una sola parte`);
          const p = partes[0], i = ORDEN_ENTRADA.indexOf(p);
          if (i < 0) return err(d, `en la entrada en calor no va un ejercicio de tipo "${p}"`);
          if (i < idx) err(d, `fuera de orden: "${p}" va antes de "${ORDEN_ENTRADA[idx]}"`); else idx = i;
          vistas.add(p);
          if (p === "movilidad") return;
          if (it.tipo !== "circuito") return err(d, `"${p}" va como circuito de ${ENTRADA.vueltas} vueltas de ${ENTRADA.ejercicios} ejercicios`);
          if (it.vueltas !== ENTRADA.vueltas) err(d, `${it.vueltas} vueltas; van ${ENTRADA.vueltas}`);
          if (it.ejercicios.length !== ENTRADA.ejercicios) err(d, `${it.ejercicios.length} ejercicios; van ${ENTRADA.ejercicios}`);
          it.ejercicios.forEach(e => {
            if (e.reps != null && Math.max(...nums(e.reps)) > ENTRADA.maxReps) err(d, `${nombre(e.ej)}: ${e.reps} repes; máximo ${ENTRADA.maxReps}`);
            if (e.reps == null && e.seg > ENTRADA.maxSeg) err(d, `${nombre(e.ej)}: ${e.seg} s; máximo ${ENTRADA.maxSeg} s`);
          });
        });
        ORDEN_ENTRADA.forEach(p => { if (!vistas.has(p)) err(donde, `a la entrada en calor le falta: ${p}`); });

        // rutina: 4–5 ejercicios × 3 series × 6–8 repes, 1–2 skills al principio.
        // Sábado por reloj (Intermedios y Avanzado): después de las skills, los básicos pueden ir en un EMOM o AMRAP.
        const ppal = bloques.filter(b => b.tipo === "principal").flatMap(b => b.items.map(it => ({ it, b })));
        const nEj = ppal.reduce((t, { it }) => t + (esIntervalo(it) ? ejIds(it).length : 1), 0);
        if (nEj < PRINCIPAL.ejercicios[0] || nEj > PRINCIPAL.ejercicios[1]) err(donde, `${nEj} ejercicios en la rutina; van ${PRINCIPAL.ejercicios[0]} a ${PRINCIPAL.ejercicios[1]}`);
        let skills = 0, vioOtro = null;
        ppal.forEach(({ it, b }) => {
          const c = C[ejIds(it)[0]], d = `${donde} › ${b.nombre} › ${it.nombre || c?.n}`; if (!c) return;
          if (esIntervalo(it)) {
            if (ses.id !== "sabado") return err(d, "en las sesiones de la semana la rutina va en series × repes; EMOM y AMRAP van en el bloque de fuerza");
            if (!RELOJ_SABADO[L].includes(it.tipo)) return err(d, `${it.tipo.toUpperCase()} no está permitido para ${nomNivel(N)} (pág. 213); Básico va en series`);
            if (ejIds(it).some(id => C[id]?.skill)) err(d, "las skills van antes, en series, no dentro del EMOM o AMRAP");
            if (!vioOtro) vioOtro = it.nombre;
            return;
          }
          if (it.tipo === "circuito") return err(d, "en la rutina no van circuitos");
          if (c.skill) { skills++; if (vioOtro) err(d, `las skills van al principio, en el momento de fuerza máxima (está después de "${vioOtro}")`); }
          else if (!vioOtro) vioOtro = c.n;
          if (it.series !== PRINCIPAL.series) err(d, `${it.series} series; van ${PRINCIPAL.series}`);
          if (!c.skill && it.tipo === "reps") {
            const r = nums(it.reps), [a, z] = PRINCIPAL.reps;
            if (!r.length || Math.min(...r) < a || Math.max(...r) > z) err(d, `${it.reps} repes; van ${a} a ${z}`);
          }
          if (it.tipo === "tiempo" && c.parte === "core" && it.seg > HOLD_CORE[L]) err(d, `${it.seg} s de aguante; el tope es ${HOLD_CORE[L]} s`);
        });
        if (skills < PRINCIPAL.skills[0] || skills > PRINCIPAL.skills[1]) err(donde, `${skills} skills; van ${PRINCIPAL.skills[0]} o ${PRINCIPAL.skills[1]}, al principio`);
        if (L === "B" && skills * PRINCIPAL.series > MAX_INTENTOS_BASICO) err(donde, `${skills * PRINCIPAL.series} intentos de estáticos; Básico hace como máximo ${MAX_INTENTOS_BASICO} por clase (pág. 79): 1 skill`);

        // bloque de fuerza (opcional): 2 ejercicios casi al fallo, o un EMOM/AMRAP (desde intermedio)
        bloques.filter(b => b.tipo === "fuerza").forEach(b => {
          const d = `${donde} › ${b.nombre}`, ints = b.items.filter(esIntervalo), ser = b.items.filter(it => it.tipo === "reps" || it.tipo === "tiempo");
          if (ints.length && ser.length) return err(d, "o son 2 ejercicios casi al fallo, o un EMOM/AMRAP; no las dos cosas");
          if (ints.length) {
            if (ints.length > 1) err(d, "un solo EMOM o AMRAP");
            ints.forEach(it => {
              if (it.tipo === "tabata") return err(d, "el tabata va en el cierre (de core)");
              if (!METODOS_FUERZA[L].includes(it.tipo)) err(d, `${it.tipo.toUpperCase()} no está permitido para ${nomNivel(N)} (pág. 213)`);
              if (ejIds(it).some(id => C[id]?.skill)) err(d, "EMOM y AMRAP solo con ejercicios de baja dificultad, nunca skills (clase 3)");
            });
            return;
          }
          if (ser.length !== 2) err(d, `${ser.length} ejercicios; van 2 casi al fallo`);
          ser.forEach(it => {
            const c = C[it.ej]; if (!c) return;
            if (c.skill) err(`${d} › ${c.n}`, "las skills van al principio de la rutina, no en el bloque de fuerza");
            if (!/fallo/i.test(String(it.reps ?? ""))) avi(`${d} › ${c.n}`, `las repes deberían decir "casi al fallo" (dejar 1–2 en reserva)`);
          });
        });

        // cierre fijo: un tabata de core en todas las sesiones (pág. 54, 79)
        const cierre = bloques.filter(b => b.tipo === "cierre").flatMap(b => b.items);
        if (!cierre.length) err(donde, "falta el cierre: tabata de core");
        else if (cierre.length > 1 || cierre[0].tipo !== "tabata") err(donde, "el cierre es un solo tabata de core");
        else ejIds(cierre[0]).forEach(id => { if (C[id] && C[id].parte !== "core") err(`${donde} › Cierre`, `"${C[id].n}" no es de core`); });

        // otros bloques y duración
        let minutos = 0;
        bloques.forEach(b => b.items.forEach(it => {
          const c = C[ejIds(it)[0]], d = `${donde} › ${b.nombre} › ${it.nombre || c?.n}`;
          if (it.tipo === "reps" || it.tipo === "tiempo") {
            if (c && it.tipo === "tiempo" && c.parte === "estiramiento" && (it.seg < ESTIRAMIENTO[0] || it.seg > ESTIRAMIENTO[1]))
              err(d, `estiramiento de ${it.seg} s; tiene que ser de ${ESTIRAMIENTO[0]} a ${ESTIRAMIENTO[1]} s`);
            if (c && b.tipo === "calma" && !["estiramiento", "respiracion"].includes(c.parte)) err(d, "en la vuelta a la calma solo van estiramientos y respiración");
            const porSerie = it.tipo === "tiempo" ? it.seg : (it.seg || 40);
            minutos += (it.series * porSerie + (it.series - 1) * (it.descanso || 0) + 15) / 60;
          } else if (it.tipo === "circuito") {
            const vuelta = it.ejercicios.reduce((t, e) => t + (e.seg || 20) + (it.pausa ?? 5), 0);
            minutos += (it.vueltas * vuelta + (it.vueltas - 1) * (it.descanso || 0) + 15) / 60;
            if (b.tipo === "calma") err(d, "en la vuelta a la calma no van circuitos");
          } else {
            minutos += (it.tipo === "tabata" ? it.rondas * (it.trabajo + it.pausa) : it.minutos * 60) / 60 + 0.5;
            if (!["fuerza", "cierre", "principal"].includes(b.tipo)) err(d, "tabata, EMOM y AMRAP no van en este bloque");
          }
        }));
        // Básico entrena mixto: empuje y tracción en la misma sesión (clase 1)
        if (L === "B" && ses.id !== "sabado") {
          const partes = bloques.filter(b => b.tipo === "principal" || b.tipo === "fuerza").flatMap(b => b.items.flatMap(ejIds)).map(id => C[id]?.parte);
          ["empuje", "traccion"].forEach(p => { if (!partes.includes(p)) err(donde, `Básico entrena mixto: falta ${p} en la sesión (clase 1)`); });
        }
        const tope = ses.id === "sabado" ? DURACION_MAX.sabado : DURACION_MAX.otra;
        if (minutos > tope) avi(donde, `dura unos ${Math.round(minutos)} min (tope sugerido ${tope})`);
        else info.push(`${donde}: ~${Math.round(minutos)} min`);
      }
    });
    niveles.forEach(n => { if ((porNivel[n] || []).length < 3) err(nomNivel(n), "tiene que tener el sábado + 2 sesiones"); });
    return { errores, avisos, info };
  }

  const api = { validar, ejIds, LETRA };
  if (typeof module !== "undefined") module.exports = api; else root.REGLAS = api;
})(this);
