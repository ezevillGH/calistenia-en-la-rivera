/* Ajustada desde el modo profe el 1/11 a las 22:59. */
window.RUTINA = {
 "id": "prueba",
 "semana": "Rutina de prueba",
 "ciclo": 1,
 "semanaCiclo": 1,
 "descarga": false,
 "niveles": [
  {
   "id": "basico",
   "nombre": "Básico",
   "desc": ""
  },
  {
   "id": "int-sup",
   "nombre": "Intermedio · Tren superior",
   "desc": ""
  },
  {
   "id": "int-inf",
   "nombre": "Intermedio · Tren inferior",
   "desc": ""
  },
  {
   "id": "avanzado",
   "nombre": "Avanzado",
   "desc": ""
  }
 ],
 "sesiones": [
  {
   "id": "sabado",
   "nombre": "Sábado en la rivera",
   "sub": "Prueba · por reloj",
   "foco": {
    "basico": "Cuerpo completo",
    "int-sup": "Día de tracción",
    "int-inf": "Piernas a fondo",
    "avanzado": "Camino a la vertical"
   },
   "bloques": [
    {
     "tipo": "entrada",
     "nombre": "Entrada en calor",
     "transicion": 10,
     "items": [
      {
       "tipo": "tiempo",
       "ej": "movilidad-articular",
       "series": 1,
       "seg": 180,
       "nombre": "Movilidad articular de pies a cabeza",
       "claves": [
        "Tobillos, rodillas, cadera, tronco, hombros, codos, muñecas y cuello",
        "Círculos lentos en ambos sentidos"
       ]
      },
      {
       "tipo": "circuito",
       "nombre": "Elevación de temperatura",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "jumping-jacks",
         "nombre": "Jumping jacks",
         "seg": 20
        },
        {
         "ej": "escaladores",
         "nombre": "Escaladores",
         "seg": 20
        },
        {
         "ej": "skipping",
         "nombre": "Skipping",
         "seg": 20
        }
       ],
       "descanso": 20
      },
      {
       "tipo": "circuito",
       "nombre": "Activación de core",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "elevaciones-piernas",
         "nombre": "Elevaciones de piernas en el piso",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "hollow-hold",
         "nombre": "Hollow body",
         "seg": 15
        },
        {
         "ej": "abs-bolita",
         "nombre": "Abdominales bolita",
         "reps": "5",
         "seg": 15
        }
       ],
       "descanso": 20
      },
      {
       "tipo": "circuito",
       "nombre": "Activación escapular",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "rechazo-escapular-plancha",
         "nombre": "Rechazos escapulares en plancha",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "depresion-escapular-colgado",
         "nombre": "Depresión escapular colgado",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "rechazo-escapular-paralelas",
         "nombre": "Rechazos escapulares en paralelas",
         "reps": "5",
         "seg": 15
        }
       ],
       "descanso": 20
      },
      {
       "tipo": "circuito",
       "nombre": "Activación de básicos",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "flexiones",
         "nombre": "Flexiones",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "australians",
         "nombre": "Australians",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "sentadilla",
         "nombre": "Sentadilla",
         "reps": "5",
         "seg": 15
        }
       ],
       "descanso": 20
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina",
     "nivel": "basico",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      },
      {
       "tipo": "reps",
       "ej": "sentadilla",
       "series": 3,
       "reps": "8",
       "descanso": 90,
       "nombre": "Sentadilla",
       "claves": [
        "Talones apoyados, espalda recta",
        "Abrí los pies lo que tu cuerpo necesite",
        "Bajá hasta 90° o más"
       ]
      },
      {
       "tipo": "reps",
       "ej": "fondos-cajon",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Fondos de tríceps en cajón",
       "claves": [
        "Quedate cerca del cajón: si te alejás, sufre el hombro",
        "Piernas juntas, core activo",
        "Bajá hasta 90° si la movilidad lo permite"
       ]
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina por reloj",
     "nivel": "int-sup",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "emom",
       "nombre": "Básicos",
       "minutos": 8,
       "ejercicios": [
        "8 flexiones",
        "8 australians",
        "8 sentadilla"
       ],
       "cada": 2,
       "ejs": [
        "flexiones",
        "australians",
        "sentadilla"
       ]
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina por reloj",
     "nivel": "int-inf",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "emom",
       "nombre": "Básicos",
       "minutos": 8,
       "ejercicios": [
        "8 flexiones",
        "8 australians",
        "8 sentadilla"
       ],
       "cada": 2,
       "ejs": [
        "flexiones",
        "australians",
        "sentadilla"
       ]
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina por reloj",
     "nivel": "avanzado",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "emom",
       "nombre": "Básicos",
       "minutos": 8,
       "ejercicios": [
        "8 flexiones",
        "8 australians",
        "8 sentadilla"
       ],
       "cada": 2,
       "ejs": [
        "flexiones",
        "australians",
        "sentadilla"
       ]
      }
     ]
    },
    {
     "tipo": "cierre",
     "nombre": "Cierre",
     "items": [
      {
       "tipo": "tabata",
       "nombre": "Tabata de core",
       "trabajo": 20,
       "pausa": 10,
       "rondas": 8,
       "ejercicios": [
        "Hollow body",
        "Abdominales bolita",
        "Superman",
        "Abdominales rusos"
       ],
       "ejs": [
        "hollow-hold",
        "abs-bolita",
        "superman",
        "abs-rusas"
       ]
      }
     ]
    },
    {
     "tipo": "calma",
     "nombre": "Vuelta a la calma",
     "transicion": 10,
     "items": [
      {
       "tipo": "tiempo",
       "ej": "est-dorsal",
       "series": 1,
       "seg": 30,
       "nombre": "Colgado pasivo"
      },
      {
       "tipo": "tiempo",
       "ej": "est-pectoral",
       "series": 1,
       "seg": 30,
       "nombre": "Estiramiento de pectoral en la barra"
      },
      {
       "tipo": "tiempo",
       "ej": "respiracion",
       "series": 1,
       "seg": 60,
       "nombre": "Respiración profunda"
      }
     ]
    }
   ]
  },
  {
   "id": "a",
   "nombre": "Sesión A",
   "sub": "Prueba",
   "foco": {
    "basico": "Cuerpo completo",
    "int-sup": "Día de tracción",
    "int-inf": "Piernas a fondo",
    "avanzado": "Camino a la vertical"
   },
   "bloques": [
    {
     "tipo": "entrada",
     "nombre": "Entrada en calor",
     "transicion": 10,
     "items": [
      {
       "tipo": "tiempo",
       "ej": "movilidad-articular",
       "series": 1,
       "seg": 120,
       "nombre": "Movilidad articular de pies a cabeza",
       "claves": [
        "Tobillos, rodillas, cadera, tronco, hombros, codos, muñecas y cuello",
        "Círculos lentos en ambos sentidos"
       ]
      },
      {
       "tipo": "circuito",
       "nombre": "Elevación de temperatura",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "jumping-jacks",
         "nombre": "Jumping jacks",
         "seg": 20
        },
        {
         "ej": "escaladores",
         "nombre": "Escaladores",
         "seg": 20
        },
        {
         "ej": "skipping",
         "nombre": "Skipping",
         "seg": 20
        }
       ],
       "descanso": 20
      },
      {
       "tipo": "circuito",
       "nombre": "Activación de core",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "elevaciones-piernas",
         "nombre": "Elevaciones de piernas en el piso",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "hollow-hold",
         "nombre": "Hollow body",
         "seg": 15
        },
        {
         "ej": "abs-bolita",
         "nombre": "Abdominales bolita",
         "reps": "5",
         "seg": 15
        }
       ],
       "descanso": 20
      },
      {
       "tipo": "circuito",
       "nombre": "Activación escapular",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "rechazo-escapular-plancha",
         "nombre": "Rechazos escapulares en plancha",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "depresion-escapular-colgado",
         "nombre": "Depresión escapular colgado",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "rechazo-escapular-paralelas",
         "nombre": "Rechazos escapulares en paralelas",
         "reps": "5",
         "seg": 15
        }
       ],
       "descanso": 20
      },
      {
       "tipo": "circuito",
       "nombre": "Activación de básicos",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "flexiones",
         "nombre": "Flexiones",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "australians",
         "nombre": "Australians",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "sentadilla",
         "nombre": "Sentadilla",
         "reps": "5",
         "seg": 15
        }
       ],
       "descanso": 20
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina",
     "nivel": "basico",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      },
      {
       "tipo": "reps",
       "ej": "sentadilla",
       "series": 3,
       "reps": "8",
       "descanso": 90,
       "nombre": "Sentadilla",
       "claves": [
        "Talones apoyados, espalda recta",
        "Abrí los pies lo que tu cuerpo necesite",
        "Bajá hasta 90° o más"
       ]
      },
      {
       "tipo": "reps",
       "ej": "fondos-cajon",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Fondos de tríceps en cajón",
       "claves": [
        "Quedate cerca del cajón: si te alejás, sufre el hombro",
        "Piernas juntas, core activo",
        "Bajá hasta 90° si la movilidad lo permite"
       ]
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina",
     "nivel": "int-sup",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      },
      {
       "tipo": "reps",
       "ej": "sentadilla",
       "series": 3,
       "reps": "8",
       "descanso": 90,
       "nombre": "Sentadilla",
       "claves": [
        "Talones apoyados, espalda recta",
        "Abrí los pies lo que tu cuerpo necesite",
        "Bajá hasta 90° o más"
       ]
      },
      {
       "tipo": "reps",
       "ej": "fondos-cajon",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Fondos de tríceps en cajón",
       "claves": [
        "Quedate cerca del cajón: si te alejás, sufre el hombro",
        "Piernas juntas, core activo",
        "Bajá hasta 90° si la movilidad lo permite"
       ]
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina",
     "nivel": "int-inf",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      },
      {
       "tipo": "reps",
       "ej": "sentadilla",
       "series": 3,
       "reps": "8",
       "descanso": 90,
       "nombre": "Sentadilla",
       "claves": [
        "Talones apoyados, espalda recta",
        "Abrí los pies lo que tu cuerpo necesite",
        "Bajá hasta 90° o más"
       ]
      },
      {
       "tipo": "reps",
       "ej": "fondos-cajon",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Fondos de tríceps en cajón",
       "claves": [
        "Quedate cerca del cajón: si te alejás, sufre el hombro",
        "Piernas juntas, core activo",
        "Bajá hasta 90° si la movilidad lo permite"
       ]
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina",
     "nivel": "avanzado",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      },
      {
       "tipo": "reps",
       "ej": "sentadilla",
       "series": 3,
       "reps": "8",
       "descanso": 90,
       "nombre": "Sentadilla",
       "claves": [
        "Talones apoyados, espalda recta",
        "Abrí los pies lo que tu cuerpo necesite",
        "Bajá hasta 90° o más"
       ]
      },
      {
       "tipo": "reps",
       "ej": "fondos-cajon",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Fondos de tríceps en cajón",
       "claves": [
        "Quedate cerca del cajón: si te alejás, sufre el hombro",
        "Piernas juntas, core activo",
        "Bajá hasta 90° si la movilidad lo permite"
       ]
      }
     ]
    },
    {
     "tipo": "fuerza",
     "nombre": "Ganancia de fuerza",
     "items": [
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 1,
       "reps": "Casi al fallo (dejá 1–2)",
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 1,
       "reps": "Casi al fallo (dejá 1–2)",
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      }
     ]
    },
    {
     "tipo": "cierre",
     "nombre": "Cierre",
     "items": [
      {
       "tipo": "tabata",
       "nombre": "Tabata de core",
       "trabajo": 20,
       "pausa": 10,
       "rondas": 8,
       "ejercicios": [
        "Hollow body",
        "Abdominales bolita",
        "Superman",
        "Abdominales rusos"
       ],
       "ejs": [
        "hollow-hold",
        "abs-bolita",
        "superman",
        "abs-rusas"
       ]
      }
     ]
    },
    {
     "tipo": "calma",
     "nombre": "Vuelta a la calma",
     "transicion": 10,
     "items": [
      {
       "tipo": "tiempo",
       "ej": "est-dorsal",
       "series": 1,
       "seg": 30,
       "nombre": "Colgado pasivo"
      },
      {
       "tipo": "tiempo",
       "ej": "est-pectoral",
       "series": 1,
       "seg": 30,
       "nombre": "Estiramiento de pectoral en la barra"
      },
      {
       "tipo": "tiempo",
       "ej": "respiracion",
       "series": 1,
       "seg": 60,
       "nombre": "Respiración profunda"
      }
     ]
    }
   ]
  },
  {
   "id": "b",
   "nombre": "Sesión B",
   "sub": "Prueba",
   "foco": {
    "basico": "Cuerpo completo",
    "int-sup": "Día de tracción",
    "int-inf": "Piernas a fondo",
    "avanzado": "Camino a la vertical"
   },
   "bloques": [
    {
     "tipo": "entrada",
     "nombre": "Entrada en calor",
     "transicion": 10,
     "items": [
      {
       "tipo": "tiempo",
       "ej": "movilidad-articular",
       "series": 1,
       "seg": 120,
       "nombre": "Movilidad articular de pies a cabeza",
       "claves": [
        "Tobillos, rodillas, cadera, tronco, hombros, codos, muñecas y cuello",
        "Círculos lentos en ambos sentidos"
       ]
      },
      {
       "tipo": "circuito",
       "nombre": "Elevación de temperatura",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "jumping-jacks",
         "nombre": "Jumping jacks",
         "seg": 20
        },
        {
         "ej": "escaladores",
         "nombre": "Escaladores",
         "seg": 20
        },
        {
         "ej": "skipping",
         "nombre": "Skipping",
         "seg": 20
        }
       ],
       "descanso": 20
      },
      {
       "tipo": "circuito",
       "nombre": "Activación de core",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "elevaciones-piernas",
         "nombre": "Elevaciones de piernas en el piso",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "hollow-hold",
         "nombre": "Hollow body",
         "seg": 15
        },
        {
         "ej": "abs-bolita",
         "nombre": "Abdominales bolita",
         "reps": "5",
         "seg": 15
        }
       ],
       "descanso": 20
      },
      {
       "tipo": "circuito",
       "nombre": "Activación escapular",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "rechazo-escapular-plancha",
         "nombre": "Rechazos escapulares en plancha",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "depresion-escapular-colgado",
         "nombre": "Depresión escapular colgado",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "rechazo-escapular-paralelas",
         "nombre": "Rechazos escapulares en paralelas",
         "reps": "5",
         "seg": 15
        }
       ],
       "descanso": 20
      },
      {
       "tipo": "circuito",
       "nombre": "Activación de básicos",
       "vueltas": 2,
       "ejercicios": [
        {
         "ej": "flexiones",
         "nombre": "Flexiones",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "australians",
         "nombre": "Australians",
         "reps": "5",
         "seg": 15
        },
        {
         "ej": "sentadilla",
         "nombre": "Sentadilla",
         "reps": "5",
         "seg": 15
        }
       ],
       "descanso": 20
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina",
     "nivel": "basico",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      },
      {
       "tipo": "reps",
       "ej": "sentadilla",
       "series": 3,
       "reps": "8",
       "descanso": 90,
       "nombre": "Sentadilla",
       "claves": [
        "Talones apoyados, espalda recta",
        "Abrí los pies lo que tu cuerpo necesite",
        "Bajá hasta 90° o más"
       ]
      },
      {
       "tipo": "reps",
       "ej": "fondos-cajon",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Fondos de tríceps en cajón",
       "claves": [
        "Quedate cerca del cajón: si te alejás, sufre el hombro",
        "Piernas juntas, core activo",
        "Bajá hasta 90° si la movilidad lo permite"
       ]
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina",
     "nivel": "int-sup",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      },
      {
       "tipo": "reps",
       "ej": "sentadilla",
       "series": 3,
       "reps": "8",
       "descanso": 90,
       "nombre": "Sentadilla",
       "claves": [
        "Talones apoyados, espalda recta",
        "Abrí los pies lo que tu cuerpo necesite",
        "Bajá hasta 90° o más"
       ]
      },
      {
       "tipo": "reps",
       "ej": "fondos-cajon",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Fondos de tríceps en cajón",
       "claves": [
        "Quedate cerca del cajón: si te alejás, sufre el hombro",
        "Piernas juntas, core activo",
        "Bajá hasta 90° si la movilidad lo permite"
       ]
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina",
     "nivel": "int-inf",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      },
      {
       "tipo": "reps",
       "ej": "sentadilla",
       "series": 3,
       "reps": "8",
       "descanso": 90,
       "nombre": "Sentadilla",
       "claves": [
        "Talones apoyados, espalda recta",
        "Abrí los pies lo que tu cuerpo necesite",
        "Bajá hasta 90° o más"
       ]
      },
      {
       "tipo": "reps",
       "ej": "fondos-cajon",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Fondos de tríceps en cajón",
       "claves": [
        "Quedate cerca del cajón: si te alejás, sufre el hombro",
        "Piernas juntas, core activo",
        "Bajá hasta 90° si la movilidad lo permite"
       ]
      }
     ]
    },
    {
     "tipo": "principal",
     "nombre": "Rutina",
     "nivel": "avanzado",
     "items": [
      {
       "tipo": "tiempo",
       "ej": "lean-planche",
       "series": 3,
       "seg": 10,
       "descanso": 60,
       "nombre": "Lean planche",
       "claves": [
        "Espalda redondeada, empujá el piso",
        "Hombros abajo, codos bloqueados",
        "Inclinate hacia adelante sin perder la postura"
       ]
      },
      {
       "tipo": "reps",
       "ej": "flexiones",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Flexiones",
       "claves": [
        "Marcá un poco el hollow: empujá el piso",
        "Cola ni arriba ni hundida",
        "Codos sin abrirse a los costados"
       ]
      },
      {
       "tipo": "reps",
       "ej": "australians",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Australians",
       "claves": [
        "Hombros atrás y abajo",
        "Core firme, cuerpo en tabla",
        "La barra llega debajo del pecho"
       ]
      },
      {
       "tipo": "reps",
       "ej": "sentadilla",
       "series": 3,
       "reps": "8",
       "descanso": 90,
       "nombre": "Sentadilla",
       "claves": [
        "Talones apoyados, espalda recta",
        "Abrí los pies lo que tu cuerpo necesite",
        "Bajá hasta 90° o más"
       ]
      },
      {
       "tipo": "reps",
       "ej": "fondos-cajon",
       "series": 3,
       "reps": "6–8",
       "descanso": 90,
       "nombre": "Fondos de tríceps en cajón",
       "claves": [
        "Quedate cerca del cajón: si te alejás, sufre el hombro",
        "Piernas juntas, core activo",
        "Bajá hasta 90° si la movilidad lo permite"
       ]
      }
     ]
    },
    {
     "tipo": "cierre",
     "nombre": "Cierre",
     "items": [
      {
       "tipo": "tabata",
       "nombre": "Tabata de core",
       "trabajo": 20,
       "pausa": 10,
       "rondas": 8,
       "ejercicios": [
        "Hollow body",
        "Abdominales bolita",
        "Superman",
        "Abdominales rusos"
       ],
       "ejs": [
        "hollow-hold",
        "abs-bolita",
        "superman",
        "abs-rusas"
       ]
      }
     ]
    },
    {
     "tipo": "calma",
     "nombre": "Vuelta a la calma",
     "transicion": 10,
     "items": [
      {
       "tipo": "tiempo",
       "ej": "est-dorsal",
       "series": 1,
       "seg": 30,
       "nombre": "Colgado pasivo"
      },
      {
       "tipo": "tiempo",
       "ej": "est-pectoral",
       "series": 1,
       "seg": 30,
       "nombre": "Estiramiento de pectoral en la barra"
      },
      {
       "tipo": "tiempo",
       "ej": "respiracion",
       "series": 1,
       "seg": 60,
       "nombre": "Respiración profunda"
      }
     ]
    }
   ]
  }
 ]
};
