export const PEMDAS_DATABASE = {
  "1": [
    {
      "expr": "4 × (6 + 3)",
      "steps": [
        "Resolver paréntesis: (6 + 3) = 9",
        "Multiplicar: 4 × 9 = 36"
      ],
      "ans": 36,
      "focusPart": "(6 + 3)"
    },
    {
      "expr": "(18 - 9) × 5",
      "steps": [
        "Resolver paréntesis: (18 - 9) = 9",
        "Multiplicar: 9 × 5 = 45"
      ],
      "ans": 45,
      "focusPart": "(18 - 9)"
    },
    {
      "expr": "32 + (4 × 7)",
      "steps": [
        "Resolver paréntesis: (4 × 7) = 28",
        "Sumar: 32 + 28 = 60"
      ],
      "ans": 60,
      "focusPart": "(4 × 7)"
    },
    {
      "expr": "(45 ÷ 5) - 6",
      "steps": [
        "Resolver paréntesis: (45 ÷ 5) = 9",
        "Restar: 9 - 6 = 3"
      ],
      "ans": 3,
      "focusPart": "(45 ÷ 5)"
    },
    {
      "expr": "60 - (8 × 6)",
      "steps": [
        "Resolver paréntesis: (8 × 6) = 48",
        "Restar: 60 - 48 = 12"
      ],
      "ans": 12,
      "focusPart": "(8 × 6)"
    }
  ],
  "2": [
    {
      "expr": "15 + (4 × 5) - 8",
      "steps": [
        "Resolver paréntesis: (4 × 5) = 20",
        "Expresión queda: 15 + 20 - 8",
        "Sumas y restas de izq a der: 35 - 8 = 27"
      ],
      "ans": 27,
      "focusPart": "(4 × 5)"
    },
    {
      "expr": "(20 - 8) × 3 + 14",
      "steps": [
        "Resolver paréntesis: (20 - 8) = 12",
        "Multiplicación: 12 × 3 = 36",
        "Sumar: 36 + 14 = 50"
      ],
      "ans": 50,
      "focusPart": "(20 - 8)"
    },
    {
      "expr": "50 - (36 ÷ 6) × 4",
      "steps": [
        "Resolver paréntesis: (36 ÷ 6) = 6",
        "Multiplicar antes de restar: 6 × 4 = 24",
        "Restar: 50 - 24 = 26"
      ],
      "ans": 26,
      "focusPart": "(36 ÷ 6)"
    },
    {
      "expr": "(7 + 5) × (9 - 4)",
      "steps": [
        "Primer paréntesis: (7 + 5) = 12",
        "Segundo paréntesis: (9 - 4) = 5",
        "Multiplicar los resultados: 12 × 5 = 60"
      ],
      "ans": 60,
      "focusPart": "(7 + 5)"
    }
  ],
  "3": [
    {
      "expr": "65 - (3 × 8 + 6) + 12",
      "steps": [
        "Dentro del paréntesis, multiplicación primero: 3 × 8 = 24",
        "Terminar paréntesis: 24 + 6 = 30",
        "Expresión queda: 65 - 30 + 12",
        "De izq a der: 35 + 12 = 47"
      ],
      "ans": 47,
      "focusPart": "(3 × 8 + 6)"
    },
    {
      "expr": "(14 + 16) ÷ (12 - 7) + 8 × 3",
      "steps": [
        "Paréntesis 1: (14 + 16) = 30",
        "Paréntesis 2: (12 - 7) = 5",
        "División y multiplicación: (30 ÷ 5) = 6, (8 × 3) = 24",
        "Sumar finales: 6 + 24 = 30"
      ],
      "ans": 30,
      "focusPart": "(14 + 16)"
    },
    {
      "expr": "4 × (18 - 3 × 4) + 25",
      "steps": [
        "Dentro del paréntesis, multiplicar primero: 3 × 4 = 12",
        "Terminar paréntesis: (18 - 12) = 6",
        "Multiplicar fuera: 4 × 6 = 24",
        "Sumar: 24 + 25 = 49"
      ],
      "ans": 49,
      "focusPart": "3 × 4"
    }
  ],
  "4": [
    {
      "expr": "100 - [4 × (15 - 8) + 12] ÷ 2",
      "steps": [
        "Paréntesis interior: (15 - 8) = 7",
        "Dentro de corchetes, multiplicar: 4 × 7 = 28",
        "Sumar corchetes: 28 + 12 = 40",
        "División antes de restar: 40 ÷ 2 = 20",
        "Resultado: 100 - 20 = 80"
      ],
      "ans": 80,
      "focusPart": "(15 - 8)"
    },
    {
      "expr": "(45 - 5 × 6) × (24 ÷ 4 - 2)",
      "steps": [
        "Paréntesis 1 (multiplicar primero): 5 × 6 = 30 ➔ (45 - 30) = 15",
        "Paréntesis 2 (dividir primero): 24 ÷ 4 = 6 ➔ (6 - 2) = 4",
        "Multiplicar ambos bloques: 15 × 4 = 60"
      ],
      "ans": 60,
      "focusPart": "5 × 6"
    },
    {
      "expr": "8 + 3 × (25 - 4 × 5) - (18 ÷ 3)",
      "steps": [
        "Dentro de paréntesis: 4 × 5 = 20 ➔ (25 - 20) = 5",
        "Otro paréntesis: (18 ÷ 3) = 6",
        "Multiplicar: 3 × 5 = 15",
        "Expresión queda: 8 + 15 - 6 = 17"
      ],
      "ans": 17,
      "focusPart": "4 × 5"
    }
  ]
}

export const OPERATIONS_PROBLEMS = [
  {
    "id": 1,
    "cat": "gaming",
    "catName": "Gaming & Ocio",
    "title": "El Torneo de Mario Kart",
    "statement": "Álvaro y sus 3 amigos compiten en un torneo de 4 copas de Mario Kart. Cada victoria otorga 15 puntos y el segundo puesto da 12 puntos. Si Álvaro gana 3 copas y queda segundo en una, ¿cuántos puntos consigue en total?",
    "unit": "puntos",
    "ans": 57,
    "hint": "Calcula los puntos de las 3 victorias por un lado, luego suma los puntos del segundo puesto."
  },
  {
    "id": 2,
    "cat": "escuela",
    "catName": "Escuela & Excursiones",
    "title": "La Excursión en Autobús",
    "statement": "Los 148 alumnos de primaria van de excursión a un parque multiaventura. Cada autobús tiene capacidad para 35 plazas. ¿Cuántos autobuses completos se llenarán y cuántos alumnos irán en el último autobús?",
    "unit": "alumnos",
    "ans": 8,
    "hint": "Haz una división entera: 148 entre 35. El cociente son los autobuses llenos y el resto los alumnos restantes."
  },
  {
    "id": 3,
    "cat": "tiendas",
    "catName": "Compras & Dinero",
    "title": "La Compra en la Tienda de Videojuegos",
    "statement": "Álvaro compra 2 videojuegos que cuestan 45€ cada uno y unos auriculares gaming de 38€. Paga en caja con dos billetes de 100€. ¿Cuánto dinero le devuelven de cambio?",
    "unit": "€",
    "ans": 72,
    "hint": "Calcula primero cuánto dinero entrega en total y réstale el coste de los 2 juegos y los auriculares."
  },
  {
    "id": 4,
    "cat": "gaming",
    "catName": "Gaming & Ocio",
    "title": "Los Cofres de Minecraft",
    "statement": "En su base secreta, Álvaro guarda 8 cofres con 27 lingotes de hierro cada uno y 5 cofres con 16 lingotes de oro cada uno. ¿Cuántos lingotes tiene guardados entre hierro y oro?",
    "unit": "lingotes",
    "ans": 296,
    "hint": "Multiplica los cofres de hierro por sus lingotes y los de oro por los suyos. Luego suma ambos totales."
  },
  {
    "id": 5,
    "cat": "escuela",
    "catName": "Escuela & Excursiones",
    "title": "La Biblioteca del Colegio",
    "statement": "La biblioteca del colegio ha recibido un envío de 1.560 libros nuevos para repartirlos en 12 estanterías exactamente iguales. ¿Cuántos libros se colocarán en cada estantería?",
    "unit": "libros",
    "ans": 130,
    "hint": "Es una división exacta de 4 cifras entre 2 cifras: 1.560 ÷ 12."
  },
  {
    "id": 6,
    "cat": "ciencia",
    "catName": "Ciencia & Vida",
    "title": "La Cosecha de Manzanas",
    "statement": "Un agricultor recoge 24 cajas con 48 manzanas en cada caja. Durante la selección de calidad, descubre que 65 manzanas están golpeadas y no se pueden vender. ¿Cuántas manzanas sanas quedan listas para vender?",
    "unit": "manzanas",
    "ans": 1087,
    "hint": "Multiplica las cajas por las manzanas por caja y luego resta las manzanas estropeadas."
  },
  {
    "id": 7,
    "cat": "deportes",
    "catName": "Deportes",
    "title": "El Álbum de Cromos de LaLiga",
    "statement": "El álbum de fútbol tiene 450 cromos. Álvaro ya ha pegado 285 cromos y se compra 25 sobres con 5 cromos cada uno. Si tiene la suerte de que no le sale ninguno repetido, ¿cuántos cromos le faltarán todavía para completar el álbum?",
    "unit": "cromos",
    "ans": 40,
    "hint": "Calcula cuántos cromos nuevos consigue con los 25 sobres, súmaselos a los que ya tiene y resta de 450."
  },
  {
    "id": 8,
    "cat": "deportes",
    "catName": "Deportes",
    "title": "Equipaciones de Baloncesto",
    "statement": "Un club de baloncesto encarga 135 camisetas deportivas a 14€ cada una. La federación les concede una ayuda de 450€. ¿Cuánto dinero tiene que pagar el club finalmente de su propio presupuesto?",
    "unit": "€",
    "ans": 1440,
    "hint": "Calcula el precio total de las 135 camisetas y réstale la ayuda de 450€."
  },
  {
    "id": 9,
    "cat": "gaming",
    "catName": "Gaming & Ocio",
    "title": "Fiesta de Pizzas con Amigos",
    "statement": "16 amigos se reúnen para celebrar un cumpleaños. Cada pizza se corta en 8 porciones. Si calculan que cada amigo comerá 3 porciones, ¿cuántas pizzas completas deben pedir como mínimo para que nadie se quede con hambre?",
    "unit": "pizzas",
    "ans": 6,
    "hint": "Calcula cuántas porciones necesitan en total (16 × 3) y divide entre 8 porciones por pizza."
  },
  {
    "id": 10,
    "cat": "tiendas",
    "catName": "Compras & Dinero",
    "title": "Ahorrando para la Consola",
    "statement": "Una nueva consola cuesta 299€. Álvaro tiene ahorrados 143€ y su abuela le regala 60€ por su santo. Si se propone ahorrar 12€ cada semana de su paga, ¿en cuántas semanas conseguirá el dinero que le falta?",
    "unit": "semanas",
    "ans": 8,
    "hint": "Calcula cuánto dinero tiene en total (143 + 60), resta de 299€ y divide el resultado entre 12€ por semana."
  },
  {
    "id": 11,
    "cat": "ciencia",
    "catName": "Ciencia & Vida",
    "title": "El Huerto Escolar de Tomates",
    "statement": "En el huerto del colegio han plantado 16 filas con 35 plantas de tomate cada una. Si cada planta produce una media de 8 tomates a lo largo de la temporada, ¿cuántos tomates recogerán en total?",
    "unit": "tomates",
    "ans": 4480,
    "hint": "Multiplica las filas por las plantas de cada fila para saber el total de plantas, y luego multiplica por 8."
  },
  {
    "id": 12,
    "cat": "escuela",
    "catName": "Escuela & Excursiones",
    "title": "Fábrica de Lápices de Colores",
    "statement": "Una fábrica elabora 7.680 lápices de colores al día. Los empaquetan en cajas de 24 lápices cada una. ¿Cuántas cajas completas se preparan al cabo del día?",
    "unit": "cajas",
    "ans": 320,
    "hint": "Divide el número total de lápices entre los 24 lápices que caben en cada caja."
  },
  {
    "id": 13,
    "cat": "ciencia",
    "catName": "Ciencia & Vida",
    "title": "La Batería del Dron Explorador",
    "statement": "Un dron tiene una batería que dura 54 minutos con carga completa. Álvaro realiza 4 vuelos de 8 minutos cada uno y otro vuelo de 12 minutos. ¿Cuántos minutos de batería le quedan al dron?",
    "unit": "minutos",
    "ans": 10,
    "hint": "Suma el tiempo de los vuelos realizados y réstaselo a los 54 minutos iniciales."
  },
  {
    "id": 14,
    "cat": "tiendas",
    "catName": "Compras & Dinero",
    "title": "Las Entradas del Teatro",
    "statement": "Un teatro tiene 650 butacas. En la sesión de tarde se vendieron 420 entradas a 15€ cada una, y en la sesión de noche se vendieron todas las 650 butacas a 18€ cada una. ¿Cuánto dinero recaudó el teatro en total entre ambas sesiones?",
    "unit": "€",
    "ans": 18000,
    "hint": "Calcula lo recaudado por la tarde (420 × 15) y lo de la noche (650 × 18), y suma ambas cantidades."
  },
  {
    "id": 15,
    "cat": "ciencia",
    "catName": "Ciencia & Vida",
    "title": "El Tanque del Acuario Municipal",
    "statement": "Un acuario municipal tiene un tanque de 5.400 litros. Ya contiene 1.800 litros de agua. Si se abre una manguera que vierte 45 litros por minuto, ¿cuántos minutos tardará en llenarse por completo el tanque?",
    "unit": "minutos",
    "ans": 80,
    "hint": "Calcula cuántos litros faltan para llenarlo (5.400 - 1.800) y divide entre los 45 litros por minuto."
  },
  {
    "id": 16,
    "cat": "escuela",
    "catName": "Escuela & Excursiones",
    "title": "Campaña Solidaria de Alimentos",
    "statement": "En el colegio hay 6 cursos de primaria, con 3 clases por curso y 24 alumnos en cada clase. Si cada alumno aporta 2 kg de alimentos para el comedor social, ¿cuántos kilos de comida recogen en total?",
    "unit": "kg",
    "ans": 864,
    "hint": "Multiplica cursos × clases × alumnos × 2 kg por alumno."
  },
  {
    "id": 17,
    "cat": "tiendas",
    "catName": "Compras & Dinero",
    "title": "El Obrador de Magdalenas",
    "statement": "Un pastelero hornea 32 bandejas con 24 magdalenas cada una. Las empaqueta en bolsas de 6 magdalenas para venderlas a 3€ la bolsa. ¿Cuánto dinero ingresará si vende todas las bolsas preparadas?",
    "unit": "€",
    "ans": 384,
    "hint": "Calcula el total de magdalenas (32 × 24), divide entre 6 para saber las bolsas y multiplica por 3€."
  },
  {
    "id": 18,
    "cat": "deportes",
    "catName": "Deportes",
    "title": "El Entrenamiento en Pista de Atletismo",
    "statement": "Un atleta corre 12 vueltas completas a una pista de atletismo que mide 400 metros de longitud. ¿Cuántos kilómetros ha recorrido en total?",
    "unit": "km",
    "ans": 4.8,
    "hint": "Multiplica las vueltas por los metros (12 × 400 = 4.800 m) y convierte los metros a kilómetros dividiendo entre 1.000."
  },
  {
    "id": 19,
    "cat": "gaming",
    "catName": "Gaming & Ocio",
    "title": "Cartas Pokémon entre Amigos",
    "statement": "Álvaro tiene 14 sobres con 10 cartas cada uno. Su amigo Lucas tiene 18 sobres con 8 cartas cada uno. ¿Quién tiene más cartas y cuántas cartas más tiene?",
    "unit": "cartas",
    "ans": 4,
    "hint": "Calcula las cartas de Álvaro (14 × 10 = 140) y las de Lucas (18 × 8 = 144), y halla la diferencia."
  },
  {
    "id": 20,
    "cat": "tiendas",
    "catName": "Compras & Dinero",
    "title": "Parqué para la Habitación",
    "statement": "La habitación de Álvaro mide 4 metros de largo por 3 metros de ancho. Si el metro cuadrado de suelo de parqué cuesta 26€ y la mano de obra de instalación cuesta 95€ fijos, ¿cuánto costará renovar el suelo en total?",
    "unit": "€",
    "ans": 407,
    "hint": "Calcula el área de la habitación (largo × ancho = 4 × 3 = 12 m²), multiplica por 26€ y suma los 95€."
  },
  {
    "id": 21,
    "cat": "ciencia",
    "catName": "Ciencia & Vida",
    "title": "El Camión de Reparto de Leche",
    "statement": "Un camión transporta 15 palés de leche. Cada palé contiene 28 cajas, y en cada caja van 6 botellas de 1 litro de leche. ¿Cuántos litros de leche lleva el camión en total?",
    "unit": "litros",
    "ans": 2520,
    "hint": "Es una multiplicación de 3 términos: palés × cajas por palé × botellas por caja."
  },
  {
    "id": 22,
    "cat": "escuela",
    "catName": "Escuela & Excursiones",
    "title": "El Festival de Cortometrajes",
    "statement": "En el salón de actos del colegio proyectan 5 cortometrajes de 16 minutos cada uno. Entre cada corto y el siguiente hacen un descanso de 3 minutos para cambiar de grupo. ¿Cuántos minutos dura todo el evento desde que empieza el primero hasta que acaba el quinto?",
    "unit": "minutos",
    "ans": 92,
    "hint": "Atención: entre 5 películas hay 4 descansos (no 5). Suma los 5 cortos (5 × 16) más los 4 descansos (4 × 3)."
  },
  {
    "id": 23,
    "cat": "tiendas",
    "catName": "Compras & Dinero",
    "title": "La Siembra de Girasoles",
    "statement": "Un agricultor compra 4 sacos de semillas de girasol de 25 kg cada saco a 2€ el kilo. Si tras la cosecha vende las pipas recolectadas por un valor de 2.650€, ¿cuál ha sido su beneficio neto descontando el coste de las semillas?",
    "unit": "€",
    "ans": 2450,
    "hint": "Calcula primero cuánto gastó en las semillas (4 sacos × 25 kg × 2€ = 200€) y réstaselo a los 2.650€ de ingresos."
  },
  {
    "id": 24,
    "cat": "ciencia",
    "catName": "Ciencia & Vida",
    "title": "El Hotel Rural de Vacaciones",
    "statement": "Un hotel rural tiene 3 plantas con 24 habitaciones en cada planta. Cada habitación tiene capacidad para alojar a 4 personas. Si durante el puente festivo está lleno al 100%, ¿cuántos huéspedes hay alojados?",
    "unit": "huéspedes",
    "ans": 288,
    "hint": "Multiplica las 3 plantas por las 24 habitaciones, y luego por las 4 personas que caben en cada una."
  },
  {
    "id": 25,
    "cat": "deportes",
    "catName": "Deportes",
    "title": "La Prueba de Natación de 1.500 Metros",
    "statement": "En una competición de natación en piscina olímpica de 50 metros de largo, los nadadores deben completar una prueba de fondo de 1.500 metros. ¿Cuántos largos de piscina debe nadar cada participante?",
    "unit": "largos",
    "ans": 30,
    "hint": "Divide la distancia total (1.500 m) entre la longitud de la piscina (50 m)."
  },
  {
    "id": 26,
    "cat": "gaming",
    "catName": "Gaming & Ocio",
    "title": "Taller de Robótica con Engranajes",
    "statement": "En el club de robótica tienen una caja con 740 piezas de engranajes. Cada robot requiere exactamente 35 engranajes para su montaje. ¿Cuántos robots completos pueden montar y cuántas piezas sobrarán?",
    "unit": "robots",
    "ans": 21,
    "hint": "Haz una división entera: 740 ÷ 35. El cociente es la cantidad de robots completos."
  },
  {
    "id": 27,
    "cat": "gaming",
    "catName": "Gaming & Ocio",
    "title": "Puntos de Maná en el Juego de Estrategia",
    "statement": "Álvaro tiene 1.450 puntos de maná en su partida de rol. Lanza un encantamiento protector que gasta 350 puntos y luego realiza 4 ataques mágicos que consumen 220 puntos de maná cada uno. ¿Cuántos puntos de maná le quedan?",
    "unit": "puntos",
    "ans": 220,
    "hint": "Calcula el gasto de los 4 ataques (4 × 220 = 880), suma el encantamiento (350) y resta de 1.450."
  },
  {
    "id": 28,
    "cat": "tiendas",
    "catName": "Compras & Dinero",
    "title": "El Beneficio en la Frutería",
    "statement": "Un frutero compra 140 kg de plátanos a 0,80€ el kilo. Durante la semana vende 125 kg a 1,60€ el kilo y los 15 kg restantes se maduran demasiado y los liquida a 0,60€ el kilo. ¿Cuál es su ganancia o beneficio final?",
    "unit": "€",
    "ans": 97,
    "hint": "Calcula lo que le costaron (140 × 0,80 = 112€), luego suma las ventas (125 × 1,60 = 200€ y 15 × 0,60 = 9€) y resta los costes."
  },
  {
    "id": 29,
    "cat": "escuela",
    "catName": "Escuela & Excursiones",
    "title": "La Impresora de la Escuela",
    "statement": "Una máquina fotocopiadora imprime 85 hojas por minuto. Para preparar los cuadernos del trimestre funciona de forma continua durante 1 hora y 45 minutos (105 minutos). ¿Cuántas hojas imprime en total?",
    "unit": "hojas",
    "ans": 8925,
    "hint": "Pasa el tiempo a minutos (1 h y 45 min = 60 + 45 = 105 minutos) y multiplica por las 85 hojas por minuto."
  },
  {
    "id": 30,
    "cat": "escuela",
    "catName": "Escuela & Excursiones",
    "title": "Los Monitores del Campamento",
    "statement": "A un campamento de verano asisten 240 niños que se alojan en cabañas de 15 plazas cada una. La normativa exige que haya 2 monitores adultos asignados por cada cabaña. ¿Cuántos monitores en total se necesitan para cubrir todas las cabañas?",
    "unit": "monitores",
    "ans": 32,
    "hint": "Calcula cuántas cabañas se ocupan (240 ÷ 15 = 16 cabañas) y multiplica por 2 monitores por cabaña."
  },
  {
    "id": 31,
    "cat": "ciencia",
    "catName": "Ciencia & Vida",
    "title": "El Viaje del Tren de Alta Velocidad",
    "statement": "Un tren de alta velocidad viaja a una velocidad constante de 220 kilómetros por hora. Si el trayecto entre dos ciudades dura 3 horas y media (3,5 horas), ¿cuántos kilómetros recorre el tren en el viaje?",
    "unit": "km",
    "ans": 770,
    "hint": "Multiplica 220 km/h por 3 horas (660 km) y añade la media hora (la mitad de 220 = 110 km)."
  },
  {
    "id": 32,
    "cat": "deportes",
    "catName": "Deportes",
    "title": "El Circuito de Karting",
    "statement": "En una carrera de karts, Álvaro da 35 vueltas a un circuito cerrado que tiene 640 metros de cuerda. ¿Cuántos metros ha recorrido en total y cuántos kilómetros supone esa distancia?",
    "unit": "metros",
    "ans": 22400,
    "hint": "Multiplica las 35 vueltas por los 640 metros de cada vuelta."
  }
]
