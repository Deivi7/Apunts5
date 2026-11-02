import { createModule, theoryBlock } from '../createModule.js'

export default createModule({
  theoryHtml: theoryBlock({
    what: 'La comunicación es el proceso de transmitir un mensaje entre un emisor y un receptor.',
    rules: [
      'Elementos: emisor, receptor, mensaje, canal, código y contexto.',
      'El diccionario ordena palabras y explica significados (entradas, acepciones, abreviaturas).',
      'El orden alfabético sigue las normas de la RAE letra a letra.',
    ],
    examples: [
      '<strong>Bien:</strong> emisor = quien habla o escribe',
      '<strong>Mal:</strong> confundir canal (cómo viaja) con código (idioma/signos)',
    ],
    trick: 'Piensa en un móvil: tú (emisor), amigo (receptor), WhatsApp (canal), español (código), el patio (contexto).',
    summary: '6 elementos → cuento Datealpié → diccionario → orden alfabético → cómic → quiz.',
  }),
  resources: [],
  documents: [],
  exercisesBySection: {
    comunicacion: [
      {
        id: 'com-circuit-explorer',
        type: 'custom',
        title: 'Explora el circuito de la comunicación',
        instructions: 'Pulsa cada nodo para leer su rol. Al explorar los 6, ganas la actividad.',
        maxScore: 6,
        config: { xp: 12, component: 'CircuitExplorer' },
        content: { component: 'CircuitExplorer' },
      },
      {
        id: 'com-circuit-1',
        type: 'matching',
        title: 'Los 6 elementos del circuito',
        maxScore: 6,
        config: { xp: 12 },
        content: {
          pairs: [
            { left: 'Emisor', right: 'Quien envía el mensaje' },
            { left: 'Receptor', right: 'Quien lo recibe' },
            { left: 'Mensaje', right: 'La información transmitida' },
            { left: 'Canal', right: 'Medio por donde viaja (aire, papel, pantalla…)' },
            { left: 'Código', right: 'Idioma o sistema de signos compartido' },
            { left: 'Contexto', right: 'Lugar, momento y situación' },
          ],
        },
      },
      {
        id: 'com-circuit-2',
        type: 'true_false',
        title: 'Verdadero o falso: circuito',
        maxScore: 4,
        config: { xp: 8 },
        content: {
          items: [
            { id: 'tf1', prompt: 'El emisor elabora y envía el mensaje.', correct: true },
            { id: 'tf2', prompt: 'El canal es el mismo que el código.', correct: false },
            { id: 'tf3', prompt: 'El contexto ayuda a interpretar el mensaje.', correct: true },
            { id: 'tf4', prompt: 'Sin receptor no hay acto comunicativo completo.', correct: true },
          ],
        },
      },
    ],
    datealpie: [
      {
        id: 'com-date-1',
        type: 'multiple_choice',
        title: 'Comprensión lectora: El Gran Invento del Señor Datealpié',
        instructions: 'Lee primero el cuento de arriba y responde.',
        maxScore: 4,
        config: { xp: 12 },
        content: {
          questions: [
            {
              id: 'd1',
              prompt: '¿Qué ingenioso artefacto inventó el señor Datealpié?',
              options: [
                'Unos zapatos con muelles para saltar',
                'Los primeros patines de ruedas acoplados a la suela',
                'Un violín que tocaba música solo',
              ],
              correct: 'Los primeros patines de ruedas acoplados a la suela',
            },
            {
              id: 'd2',
              prompt: '¿Qué instrumento llevaba Datealpié bajo el brazo en el baile?',
              options: ['El violín', 'La guitarra española', 'La trompeta de gala'],
              correct: 'El violín',
            },
            {
              id: 'd3',
              prompt: '¿Por qué no pudo frenar ni girar en el salón?',
              options: [
                'Porque se apagaron las velas del salón',
                'Porque alguien le puso una zancadilla',
                'Porque no había ideado frenos ni mecanismo para girar',
              ],
              correct: 'Porque no había ideado frenos ni mecanismo para girar',
            },
            {
              id: 'd4',
              prompt: '¿En qué ciudad ocurrió el accidente y qué lección deja el cuento?',
              options: [
                'Bruselas; que innovar requiere aprender de los errores y probar frenos',
                'París; que nunca hay que bailar con zapatos',
                'Londres; que los espejos deben ser de plástico',
              ],
              correct: 'Bruselas; que innovar requiere aprender de los errores y probar frenos',
            },
          ],
        },
      },
    ],
    situaciones: [
      {
        id: 'com-sit-lab',
        type: 'custom',
        title: 'Casos reales: identifica el elemento (+15 XP)',
        instructions: 'Los 5 casos oficiales del módulo. Responde y pulsa «Siguiente caso».',
        maxScore: 5,
        config: { xp: 15, component: 'SituationsLab' },
        content: { component: 'SituationsLab' },
      },
    ],
    diccionario: [
      {
        id: 'com-rae-sim',
        type: 'custom',
        title: 'Simulador RAE (palabras de clase)',
        instructions: 'Consulta ventana, comer, comí, lápices, cóctel… Aprende a buscar infinitivo y singular.',
        maxScore: 10,
        config: { xp: 10, component: 'RaeSimulator' },
        content: { component: 'RaeSimulator' },
      },
      {
        id: 'com-abbr-lab',
        type: 'custom',
        title: 'Laboratorio de las 25 abreviaturas XTEC',
        instructions: 'Consulta la tabla y supera el desafío en vivo de significados.',
        maxScore: 25,
        config: { xp: 20, component: 'AbbreviationLab' },
        content: { component: 'AbbreviationLab' },
      },
      {
        id: 'com-dic-1',
        type: 'multiple_choice',
        title: 'Diccionario y abreviaturas RAE (repaso)',
        maxScore: 5,
        config: { xp: 12 },
        content: {
          questions: [
            { id: 'dic1', prompt: 'Abreviatura de «adjetivo»:', options: ['adv.', 'adj.', 's.'], correct: 'adj.' },
            { id: 'dic2', prompt: 'Abreviatura de «sustantivo»:', options: ['s.', 'v.', 'adj.'], correct: 's.' },
            { id: 'dic3', prompt: 'Una «acepción» en el diccionario es…', options: ['Un sinónimo obligatorio', 'Un significado de la palabra', 'Un mapa'], correct: 'Un significado de la palabra' },
            { id: 'dic4', prompt: 'Para buscar un verbo en el DLE conviene…', options: ['Buscar en infinitivo', 'Buscar solo en plural', 'No aparecen verbos'], correct: 'Buscar en infinitivo' },
            { id: 'dic5', prompt: 'El diccionario de la RAE ordena las palabras…', options: ['Por tamaño', 'Alfabéticamente', 'Por color'], correct: 'Alfabéticamente' },
          ],
        },
      },
    ],
    tipos_dicc: [
      {
        id: 'com-tipos-lab',
        type: 'custom',
        title: 'Retos XTEC: tipos y artículos reales',
        instructions: 'Mini-juego de situaciones + clasificación de 8 fragmentos auténticos.',
        maxScore: 20,
        config: { xp: 25, component: 'DictTypesLab' },
        content: { component: 'DictTypesLab' },
      },
      {
        id: 'com-tipos-1',
        type: 'matching',
        title: 'Tipos de diccionarios (emparejar)',
        maxScore: 4,
        config: { xp: 10 },
        content: {
          pairs: [
            { left: 'De sinónimos', right: 'Palabras con significado parecido' },
            { left: 'Bilingüe', right: 'Traduce entre dos idiomas' },
            { left: 'De definiciones (DLE)', right: 'Explica significados en un idioma' },
            { left: 'Enciclopédico', right: 'Información sobre muchos temas' },
          ],
        },
      },
    ],
    alfabetico: [
      {
        id: 'com-alpha-lab',
        type: 'custom',
        title: 'Laboratorio de Orden Alfabético (ficha PDF)',
        instructions: 'Los 3 retos oficiales: grupos de 4, las 10 palabras y el gran reto de 24.',
        maxScore: 30,
        config: { xp: 40, component: 'AlphaOrderLab' },
        content: {
          component: 'AlphaOrderLab',
          groups: [
            {
              name: 'Grupo 1 (Letras P / A)',
              words: ['Pared', 'Panadero', 'Panadería', 'Amistad'],
              correctOrder: ['Amistad', 'Panadería', 'Panadero', 'Pared'],
            },
            {
              name: 'Grupo 2 (Letra R)',
              words: ['Refrescar', 'Río', 'Reír', 'Riqueza'],
              correctOrder: ['Refrescar', 'Reír', 'Riqueza', 'Río'],
            },
            {
              name: 'Grupo 3 (Letra M)',
              words: ['Mañana', 'Mar', 'Maceta', 'Misterio'],
              correctOrder: ['Maceta', 'Mañana', 'Mar', 'Misterio'],
            },
            {
              name: 'Grupo 4 (Letra A)',
              words: ['Automóvil', 'Animal', 'Ave', 'Amor'],
              correctOrder: ['Amor', 'Animal', 'Automóvil', 'Ave'],
            },
          ],
          words10: [
            'Conquistar', 'Regalar', 'Tipografía', 'Cosechar', 'Volar',
            'Bien', 'Doble', 'Existir', 'Habitación', 'Fruta',
          ],
          correct10: [
            'Bien', 'Conquistar', 'Cosechar', 'Doble', 'Existir',
            'Fruta', 'Habitación', 'Regalar', 'Tipografía', 'Volar',
          ],
          words24: [
            'Aceituna', 'Aguacate', 'Descubrir', 'Estudiar', 'Gallo',
            'Chapulín', 'Ecuación', 'Coche', 'Panda', 'Marisco',
            'Radio', 'Tenis', 'Correr', 'Educar', 'Búfalo',
            'Amor', 'Número', 'Elefante', 'Preguntar', 'Rosa',
            'Examen', 'Secundaria', 'Paquidermo', 'Taco',
          ],
          correct24: [
            'Aceituna', 'Aguacate', 'Amor', 'Búfalo', 'Chapulín',
            'Coche', 'Correr', 'Descubrir', 'Ecuación', 'Educar',
            'Elefante', 'Estudiar', 'Examen', 'Gallo', 'Marisco',
            'Número', 'Panda', 'Paquidermo', 'Preguntar', 'Radio',
            'Rosa', 'Secundaria', 'Taco', 'Tenis',
          ],
        },
      },
    ],
    comic: [
      {
        id: 'com-comic-workshop',
        type: 'custom',
        title: 'Taller de Cómic & Puntuación',
        instructions: 'Escribe 3 viñetas usando punto, coma, ¿? y ¡!. Luego analiza los signos.',
        maxScore: 40,
        config: { xp: 40, component: 'ComicWorkshop' },
        content: { component: 'ComicWorkshop' },
      },
    ],
    quiz: [
      {
        id: 'com-master-quiz',
        type: 'custom',
        title: 'Quiz Maestro (10 preguntas aleatorias)',
        instructions: 'Banco oficial del tema: baraja, pistas y puntuación final.',
        maxScore: 10,
        config: { xp: 25, component: 'MasterQuiz' },
        content: { component: 'MasterQuiz' },
      },
    ],
  },
})
