import { createModule, theoryBlock } from '../createModule.js'
import { SIGNOS_CARDS } from './signosCards.js'
import { WORKSHOP_SENTENCES, SORTER_CASES, ALPHA_LEVELS } from './signosLabData.js'

export default createModule({
  theoryHtml: theoryBlock({
    what: 'Los signos de puntuación organizan las frases para que se lean y se entiendan bien.',
    rules: [
      'Punto: termina una idea completa; tras punto, mayúscula inicial.',
      'Coma: separa elementos, aclaraciones o vocativos (pausa breve).',
      'Dos puntos: anuncian enumeración, cita o encabezado de carta.',
      '¿? y ¡!: signos dobles obligatorios en preguntas y exclamaciones.',
      'Tras ? o ! no se escribe punto adicional.',
    ],
    examples: [
      '<strong>Bien:</strong> ¿Vienes al parque?',
      '<strong>Mal:</strong> vienes al parque?',
      '<strong>Bien:</strong> Hola, mamá.',
      '<strong>Mal:</strong> Hola mamá (falta coma vocativa).',
    ],
    trick: 'Si la frase «pregunta», abre con ¿ y cierra con ?. Si «grita» emoción, usa ¡ y !.',
    summary: 'Punto · coma · dos puntos · ¿? · ¡! · mayúsculas → practica con tarjetas, memoria, taller y quiz.',
  }),
  resources: [],
  documents: [],
  exercisesBySection: {
    flashcards: [
      {
        id: 'signos-flash-1',
        type: 'custom',
        title: 'Tarjetas interactivas de puntuación (15)',
        instructions: 'Toca cualquier tarjeta para voltearla y pulsa 🔊 para escuchar la explicación.',
        maxScore: 15,
        config: { xp: 15, component: 'FlashcardsSpeak', lang: 'es-ES' },
        content: {
          component: 'FlashcardsSpeak',
          searchPlaceholder: 'Buscar signo o concepto (ej. Coma, Cita…)',
          flipHint: 'Toca para voltear y ver la regla de oro',
          tipLabel: 'Clave de examen',
          filters: [
            { id: 'all', label: '✨ Todos (15)' },
            { id: 'pausa', label: '⏱️ Pausas (Punto, Coma, ;)' },
            { id: 'expresion', label: '💬 Expresión (¿?, ¡!, …)' },
            { id: 'auxiliar', label: '📐 Auxiliares (Dos puntos, (), "", -)' },
            { id: 'lengua', label: '📖 Diccionario & Abecedario' },
          ],
          cards: SIGNOS_CARDS,
        },
      },
    ],
    memory: [
      {
        id: 'signos-memory-1',
        type: 'memory',
        title: 'Parejas: signo y regla',
        maxScore: 6,
        config: { xp: 12 },
        content: {
          pairs: [
            { left: 'Punto', right: 'Fin de oración y mayúscula después' },
            { left: 'Coma', right: 'Pausa breve y separar elementos' },
            { left: '¿ ?', right: 'Pregunta con signos dobles' },
            { left: '¡ !', right: 'Exclamación con signos dobles' },
            { left: 'Dos puntos', right: 'Antes de lista o cita' },
            { left: 'Comillas', right: 'Cita textual o título' },
          ],
        },
      },
    ],
    workshop: [
      {
        id: 'signos-workshop-lab',
        type: 'custom',
        title: 'Taller: puntúa las 14 frases oficiales',
        instructions: 'Inserta signos, comprueba y revela la solución oficial de clase.',
        maxScore: 14,
        config: { xp: 20, component: 'PunctuationWorkshop' },
        content: {
          component: 'PunctuationWorkshop',
          filters: [
            { id: 'all', label: '✨ Todas' },
            { id: 'puntos_comas', label: 'Puntos y comas' },
            { id: 'punto_coma', label: 'Punto y coma' },
            { id: 'dos_puntos', label: 'Dos puntos' },
            { id: 'expresion_citas', label: 'Suspensivos & comillas' },
          ],
          sentences: WORKSHOP_SENTENCES,
        },
      },
      {
        id: 'signos-alpha-lab',
        type: 'custom',
        title: 'Mini-reto: orden alfabético (3 niveles)',
        instructions: 'Los 3 niveles oficiales del taller de signos.',
        maxScore: 30,
        config: { xp: 20, component: 'AlphaOrderLab' },
        content: {
          component: 'AlphaOrderLab',
          groups: ALPHA_LEVELS.map((lvl) => ({
            name: lvl.name,
            words: lvl.words,
            correctOrder: lvl.sorted,
          })),
          words10: ALPHA_LEVELS[2]?.words || [],
          correct10: ALPHA_LEVELS[2]?.sorted || [],
          words24: ALPHA_LEVELS[0]?.words || [],
          correct24: ALPHA_LEVELS[0]?.sorted || [],
        },
      },
    ],
    sorter: [
      {
        id: 'signos-sorter-lab',
        type: 'custom',
        title: 'Clasificador veloz (casos oficiales)',
        instructions: 'Elige el signo o concepto que completa cada frase.',
        maxScore: 12,
        config: { xp: 15, component: 'PunctuationSorter' },
        content: {
          component: 'PunctuationSorter',
          cases: SORTER_CASES,
        },
      },
    ],
    quiz: [
      {
        id: 'signos-quiz-1',
        type: 'custom',
        title: 'Quiz de examen (10 preguntas)',
        maxScore: 10,
        config: { xp: 20, component: 'MasterQuiz' },
        content: {
          component: 'MasterQuiz',
          questions: [
            {
              question: 'Frase interrogativa correcta:',
              options: ['Como estas?', '¿Cómo estás?', '¡Cómo estás!', 'Cómo estás.'],
              correct: 1,
              hint: 'En español se abren y cierran las preguntas con ¿ ?.',
            },
            {
              question: 'Tras un punto suele ir…',
              options: ['Minúscula', 'Mayúscula', 'Coma', 'Puntos suspensivos'],
              correct: 1,
              hint: 'El punto cierra la oración; la siguiente empieza con mayúscula.',
            },
            {
              question: 'Separar elementos de una lista (antes de «y»):',
              options: ['Punto', 'Coma', 'Dos puntos', 'Paréntesis'],
              correct: 1,
              hint: 'La coma separa elementos de una enumeración.',
            },
            {
              question: 'Exclamación correcta:',
              options: ['Que bien!', '¡Qué bien!', '¿Qué bien?', 'Qué bien.'],
              correct: 1,
              hint: 'Las exclamaciones también son dobles: ¡ !',
            },
            {
              question: 'Los signos de interrogación en español son…',
              options: ['Solo al final', 'Dobles (apertura y cierre)', 'Opcionales', 'Solo al inicio'],
              correct: 1,
              hint: 'Siempre ¿ al inicio y ? al final.',
            },
            {
              question: '«Querido abuelo:» lleva…',
              options: ['Coma', 'Dos puntos', 'Punto y coma', 'Puntos suspensivos'],
              correct: 1,
              hint: 'Tras el saludo de carta van dos puntos.',
            },
            {
              question: 'Puntos suspensivos son…',
              options: ['Dos puntos', 'Tres puntos', 'Cuatro puntos', 'Cinco puntos'],
              correct: 1,
              hint: 'Siempre exactamente tres puntos.',
            },
            {
              question: '«¿Vienes?» al final…',
              options: ['Lleva punto', 'No lleva punto', 'Lleva coma', 'Lleva dos puntos'],
              correct: 1,
              hint: 'El cierre ? ya hace de punto.',
            },
            {
              question: 'Comillas sirven para…',
              options: ['Solo números', 'Citas textuales', 'Solo títulos en inglés', 'Separar listas'],
              correct: 1,
              hint: 'Encierran citas o términos especiales.',
            },
            {
              question: 'Entre frases del mismo párrafo se usa…',
              options: ['Punto y aparte', 'Punto y seguido', 'Solo coma', 'Guion'],
              correct: 1,
              hint: 'Punto y seguido separa oraciones dentro del mismo párrafo.',
            },
          ],
        },
      },
    ],
  },
})
