/* Rutina de la semana. Este archivo es lo único que cambia cada semana.
   Tipos de ejercicio:
     reps    -> series × repeticiones, con descanso automático entre series
                (seg opcional: tiempo estimado por serie; con él, "Reproducir bloque"
                 avanza solo; sin él, espera que toquen "Listo")
     tiempo  -> series × segundos (planchas, holds), con cuenta regresiva
     tabata  -> trabajo/pausa × rondas, rota entre los ejercicios
     emom    -> cada minuto, rota entre los ejercicios
     amrap   -> máximas rondas del circuito en X minutos
   Bloques: "entrada" (calor + movilidad), "principal", "calma".
   transicion (en bloque o ejercicio): segundos para cambiar de ejercicio; la voz anuncia el que sigue (default 15).
   claves: se leen en voz alta en modo "detallada". */
window.RUTINA = {
  id: "2026-10-17",
  ejemplo: true,
  semana: "Semana del 17 al 23 de octubre",
  sesiones: [
    {
      id: "sabado",
      nombre: "Sábado en la rivera",
      sub: "Clase grupal · 2 h · técnica de la semana",
      bloques: [
        { tipo: "entrada", nombre: "Entrada en calor y movilidad", transicion: 10, items: [
          { tipo: "tiempo", nombre: "Trote suave o jumping jacks", series: 1, seg: 180 },
          { tipo: "reps", nombre: "Círculos de hombros", series: 1, reps: "10 c/sentido", seg: 40 },
          { tipo: "tiempo", nombre: "Movilidad de muñecas en cuadrupedia", series: 1, seg: 60,
            claves: ["Dedos hacia adelante, atrás y a los costados", "Cargá el peso de a poco"] },
          { tipo: "reps", nombre: "Cat-camel", series: 1, reps: "10", seg: 45 },
          { tipo: "tiempo", nombre: "Sentadilla profunda sostenida", series: 2, seg: 45, descanso: 20,
            claves: ["Talones apoyados", "Codos empujan las rodillas hacia afuera"] },
          { tipo: "reps", nombre: "Retracciones escapulares colgado", series: 2, reps: "8", seg: 30, descanso: 45,
            claves: ["Brazos estirados todo el tiempo", "Solo se mueven las escápulas: bajan y se juntan"] }
        ]},
        { tipo: "principal", nombre: "Técnica", items: [
          { tipo: "reps", nombre: "Dominada negativa", series: 4, reps: "3 · bajada de 5 s", descanso: 120,
            claves: ["Subí con salto o con un banco", "Bajá controlado hasta brazos estirados", "Pecho al frente, escápulas activas"],
            facil: "Australianas con pies apoyados", dificil: "Dominada completa + negativa" },
          { tipo: "reps", nombre: "Fondos en paralelas", series: 4, reps: "6–8", descanso: 90,
            claves: ["Hombros lejos de las orejas", "Bajá hasta 90° de codo", "Torso levemente inclinado"],
            facil: "Fondos en banco con pies en el piso", dificil: "Pausa de 2 s abajo" },
          { tipo: "tiempo", nombre: "Hollow hold", series: 3, seg: 20, descanso: 40,
            claves: ["Zona lumbar pegada al piso", "Si se despega, doblá las rodillas"] }
        ]},
        { tipo: "principal", nombre: "Bloque principal", items: [
          { tipo: "emom", nombre: "EMOM 12'", minutos: 12,
            ejercicios: ["5 dominadas (o 8 australianas)", "10 flexiones"],
            claves: ["Lo que sobra del minuto es descanso", "Si no llegás, bajá las repeticiones"] },
          { tipo: "amrap", nombre: "AMRAP 8'", minutos: 8,
            ejercicios: ["5 dominadas", "10 fondos", "15 sentadillas"],
            claves: ["Ritmo sostenible, técnica primero", "Anotá cuántas rondas hiciste"] }
        ]},
        { tipo: "calma", nombre: "Vuelta a la calma", transicion: 10, items: [
          { tipo: "tiempo", nombre: "Colgado pasivo en barra", series: 2, seg: 30, descanso: 20 },
          { tipo: "tiempo", nombre: "Estiramiento de pectoral en pared", series: 2, seg: 30, descanso: 5, claves: ["Una serie por lado"] },
          { tipo: "tiempo", nombre: "Isquiotibiales sentado", series: 1, seg: 45 },
          { tipo: "tiempo", nombre: "Respiración diafragmática acostado", series: 1, seg: 120 }
        ]}
      ]
    },
    {
      id: "a",
      nombre: "Sesión A · Tirón y core",
      sub: "Martes o miércoles · solo o en grupo · ~50 min",
      bloques: [
        { tipo: "entrada", nombre: "Entrada en calor y movilidad", transicion: 10, items: [
          { tipo: "tiempo", nombre: "Jumping jacks", series: 1, seg: 120 },
          { tipo: "reps", nombre: "Círculos de hombros", series: 1, reps: "10 c/sentido", seg: 40 },
          { tipo: "reps", nombre: "Dislocaciones con banda o palo", series: 2, reps: "10", seg: 35, descanso: 20 },
          { tipo: "reps", nombre: "Retracciones escapulares colgado", series: 2, reps: "8", seg: 30, descanso: 45 }
        ]},
        { tipo: "principal", nombre: "Bloque principal", items: [
          { tipo: "reps", nombre: "Dominadas australianas", series: 4, reps: "8–10", descanso: 90,
            claves: ["Cuerpo en tabla", "Pecho a la barra", "Bajada controlada"],
            facil: "Pies más cerca de la barra", dificil: "Pies elevados en un banco" },
          { tipo: "reps", nombre: "Dominada negativa", series: 3, reps: "4 · bajada de 5 s", descanso: 120,
            facil: "Bajada de 3 s", dificil: "Agregá 1 dominada completa antes" },
          { tipo: "tiempo", nombre: "Hollow hold", series: 3, seg: 25, descanso: 40 },
          { tipo: "tabata", nombre: "Tabata de core", trabajo: 20, pausa: 10, rondas: 8,
            ejercicios: ["Elevaciones de piernas", "Plancha con toque de hombros"] }
        ]},
        { tipo: "calma", nombre: "Vuelta a la calma", transicion: 10, items: [
          { tipo: "tiempo", nombre: "Colgado pasivo en barra", series: 2, seg: 30, descanso: 20 },
          { tipo: "tiempo", nombre: "Postura del niño", series: 1, seg: 60 },
          { tipo: "tiempo", nombre: "Respiración diafragmática", series: 1, seg: 90 }
        ]}
      ]
    },
    {
      id: "b",
      nombre: "Sesión B · Empuje y piernas",
      sub: "Jueves o viernes · solo o en grupo · ~50 min",
      bloques: [
        { tipo: "entrada", nombre: "Entrada en calor y movilidad", transicion: 10, items: [
          { tipo: "tiempo", nombre: "Trote suave", series: 1, seg: 120 },
          { tipo: "tiempo", nombre: "Movilidad de muñecas", series: 1, seg: 60 },
          { tipo: "reps", nombre: "Balanceos de pierna frontal y lateral", series: 1, reps: "10 c/pierna", seg: 60 },
          { tipo: "tiempo", nombre: "Sentadilla profunda sostenida", series: 2, seg: 45, descanso: 20 }
        ]},
        { tipo: "principal", nombre: "Bloque principal", items: [
          { tipo: "reps", nombre: "Flexiones", series: 4, reps: "10–12", descanso: 75,
            claves: ["Codos a 45° del cuerpo", "Glúteos y abdomen firmes"],
            facil: "Manos elevadas en un banco", dificil: "Pies elevados" },
          { tipo: "reps", nombre: "Fondos en paralelas", series: 4, reps: "6–8", descanso: 90,
            facil: "Fondos en banco", dificil: "Pausa de 2 s abajo" },
          { tipo: "reps", nombre: "Pike push-up", series: 3, reps: "8", descanso: 75,
            claves: ["Cadera alta, forma de V invertida", "La cabeza va adelante de las manos"] },
          { tipo: "reps", nombre: "Sentadilla búlgara", series: 3, reps: "10 c/pierna", descanso: 75 },
          { tipo: "tiempo", nombre: "Plancha", series: 3, seg: 40, descanso: 30,
            claves: ["Línea recta de hombros a talones", "Apretá glúteos"] }
        ]},
        { tipo: "calma", nombre: "Vuelta a la calma", transicion: 10, items: [
          { tipo: "tiempo", nombre: "Estiramiento de cuádriceps de pie", series: 2, seg: 30, descanso: 5, claves: ["Una serie por pierna"] },
          { tipo: "tiempo", nombre: "Estiramiento de pectoral en pared", series: 2, seg: 30, descanso: 5 },
          { tipo: "tiempo", nombre: "Respiración diafragmática", series: 1, seg: 90 }
        ]}
      ]
    }
  ]
};
