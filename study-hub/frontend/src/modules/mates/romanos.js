import { createModule } from '../createModule.js'

export default createModule({
  sections: [],
  theoryHtml: '',
  resources: [
    {
      title: 'Drive Mates',
      url: 'https://drive.google.com/open?id=1pKvH1edDYiNEwQ8Ynq6a2wuzNIqK60tv&usp=drive_copy',
    },
  ],
  documents: [],
  exercisesBySection: {
    'tab-conversor': [
      {
        id: 'rom-conv',
        type: 'custom',
        title: 'Conversor mágico',
        maxScore: 10,
        config: { xp: 10, component: 'RomanConverter' },
        content: { component: 'RomanConverter' },
      },
    ],
    'tab-practica': [
      {
        id: 'rom-pract-dec',
        type: 'fill_blank',
        title: 'Decimal → romano',
        maxScore: 4,
        config: { xp: 12, hint: 'Recuerda IV, IX, XL, XC…' },
        content: {
          blanks: [
            { id: 'rp1', prompt: 'Escribe en romano el 14', answer: 'XIV', accept: ['xiv'] },
            { id: 'rp2', prompt: 'Escribe en romano el 49', answer: 'XLIX', accept: ['xlix'] },
            { id: 'rp3', prompt: 'Escribe en romano el 99', answer: 'XCIX', accept: ['xcix'] },
            { id: 'rp4', prompt: 'Escribe en romano el 2026', answer: 'MMXXVI', accept: ['mmxxvi'] },
          ],
        },
      },
      {
        id: 'rom-pract-rom',
        type: 'fill_blank',
        title: 'Romano → decimal',
        maxScore: 3,
        config: { xp: 9 },
        content: {
          blanks: [
            { id: 'rp5', prompt: 'XL =', answer: '40' },
            { id: 'rp6', prompt: 'CM =', answer: '900' },
            { id: 'rp7', prompt: 'MDCLXVI =', answer: '1666' },
          ],
        },
      },
    ],
    'tab-detective': [
      {
        id: 'rom-det',
        type: 'custom',
        title: 'Detective de errores (aleatorio)',
        instructions: '¿Está bien escrito el número romano? Cada ronda muestra formas correctas o errores típicos generados al azar.',
        maxScore: 10,
        config: { xp: 15, component: 'RomanDetectiveLab', hideCheck: true, rounds: 10 },
        content: { component: 'RomanDetectiveLab', rounds: 10 },
      },
    ],
    'tab-siglos': [
      {
        id: 'rom-siglo',
        type: 'custom',
        title: 'Calculadora de siglos',
        maxScore: 5,
        config: { xp: 5, component: 'CenturyCalculator' },
        content: { component: 'CenturyCalculator', year: 1492 },
      },
      {
        id: 'rom-clock',
        type: 'custom',
        title: 'Reloj romano interactivo',
        instructions: 'Lee las manecillas y escribe la hora. Cada acierto genera una nueva hora.',
        maxScore: 5,
        config: { xp: 15, component: 'RomanClockLab' },
        content: { component: 'RomanClockLab' },
      },
      {
        id: 'rom-siglo-quiz',
        type: 'multiple_choice',
        title: '¿Qué siglo es?',
        maxScore: 3,
        config: { xp: 9 },
        content: {
          questions: [
            { id: 's1', prompt: 'El año 1492 pertenece al siglo…', options: ['XIV', 'XV', 'XVI'], correct: 'XV' },
            { id: 's2', prompt: 'El año 1789 pertenece al siglo…', options: ['XVII', 'XVIII', 'XIX'], correct: 'XVIII' },
            { id: 's3', prompt: 'El año 1800 pertenece al siglo…', options: ['XVIII', 'XIX', 'XX'], correct: 'XIX' },
          ],
        },
      },
    ],
    'tab-print': [
      {
        id: 'rom-print-sheet',
        type: 'custom',
        title: 'Ficha imprimible A4 (generador)',
        instructions: 'Genera una ficha nueva, practícala en papel o en pantalla y muestra las soluciones.',
        maxScore: 10,
        config: { xp: 10, component: 'PrintableRomanSheet' },
        content: { component: 'PrintableRomanSheet' },
      },
    ],
    'tab-coliseo': [
      {
        id: 'rom-coliseo',
        type: 'custom',
        title: 'Coliseo contrarreloj (2 minutos)',
        instructions: 'Responde el máximo de preguntas antes de que acabe el tiempo.',
        maxScore: 8,
        config: { xp: 16, component: 'TimedChoiceLab', seconds: 120 },
        content: {
          component: 'TimedChoiceLab',
          seconds: 120,
          questions: [
            { prompt: '¿Cuánto vale VII?', options: ['5', '7', '12'], correct: '7' },
            { prompt: '¿Cuánto vale IX?', options: ['11', '9', '8'], correct: '9' },
            { prompt: '¿Cuánto vale XLII?', options: ['42', '52', '32'], correct: '42' },
            { prompt: '¿Cuánto vale XC?', options: ['90', '110', '60'], correct: '90' },
            { prompt: 'El número romano de 50 es…', options: ['L', 'D', 'C'], correct: 'L' },
            { prompt: '¿Cuál es incorrecto?', options: ['IV', 'IX', 'IL'], correct: 'IL' },
            { prompt: 'MMXXVI vale…', options: ['2026', '226', '20026'], correct: '2026' },
            { prompt: 'CD vale…', options: ['400', '600', '1400'], correct: '400' },
          ],
        },
      },
    ],
  },
})
