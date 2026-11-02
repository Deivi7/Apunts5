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
    sprint: [
      {
        id: 'mates-op-sprint',
        type: 'custom',
        title: 'Sprint 2 minutos',
        maxScore: 20,
        config: { xp: 1, component: 'MentalSprint', hideCheck: true },
        content: { component: 'MentalSprint', ops: ['+', '-', '×', '÷'] },
      },
    ],
    multiplication: [
      {
        id: 'mates-op-mult',
        type: 'custom',
        title: 'Pizarra de multiplicación',
        maxScore: 10,
        config: { xp: 10, component: 'MultiplicationBoard', hideCheck: true },
        content: { component: 'MultiplicationBoard', level: '3x2' },
      },
    ],
    division: [
      {
        id: 'mates-op-div',
        type: 'custom',
        title: 'División con prueba',
        maxScore: 10,
        config: { xp: 18, component: 'DivisionBoard', hideCheck: true, hint: 'Dividendo = (divisor × cociente) + resto' },
        content: { component: 'DivisionBoard', level: '3div2' },
      },
    ],
    worksheet: [
      {
        id: 'mates-op-sheet',
        type: 'custom',
        title: 'Fichas imprimibles (+ − × ÷)',
        instructions: 'Elige sumas, restas, multiplicaciones y/o divisiones. Genera la ficha e imprímela o guárdala en PDF.',
        maxScore: 12,
        config: { xp: 15, component: 'PracticeWorksheet', hideCheck: true },
        content: { component: 'PracticeWorksheet' },
      },
    ],
    parentheses: [
      {
        id: 'mates-op-pemdas',
        type: 'custom',
        title: 'Paréntesis combinados (PEMDAS)',
        maxScore: 12,
        config: { xp: 12, component: 'PemdasGenerator', hideCheck: true },
        content: { component: 'PemdasGenerator' },
      },
      {
        id: 'mates-op-paren-mc',
        type: 'multiple_choice',
        title: 'Jerarquía: repaso rápido',
        maxScore: 4,
        config: { xp: 8 },
        content: {
          questions: [
            {
              id: 'p1',
              prompt: '5 + 3 × 2 =',
              options: ['16', '11', '10'],
              correct: '11',
            },
            {
              id: 'p2',
              prompt: '(8 + 2) × 3 =',
              options: ['26', '30', '24'],
              correct: '30',
            },
            {
              id: 'p3',
              prompt: '20 − 4 × 2 + 6 =',
              options: ['18', '28', '12'],
              correct: '18',
            },
            {
              id: 'p4',
              prompt: '¿Qué se resuelve primero en 7 + (5 − 2) × 4?',
              options: ['La suma 7 + 5', 'Lo del paréntesis (5 − 2)', 'La multiplicación × 4'],
              correct: 'Lo del paréntesis (5 − 2)',
            },
          ],
        },
      },
    ],
    problems: [
      {
        id: 'mates-op-problems-lab',
        type: 'custom',
        title: 'Banco de 32 problemas razonados',
        maxScore: 32,
        config: { xp: 10, component: 'ProblemsLab', hideCheck: true, hint: 'Lee el enunciado, anota datos y opera paso a paso' },
        content: { component: 'ProblemsLab', minComplete: 12 },
      },
    ],
    cheatsheet: [
      {
        id: 'mates-op-tricks',
        type: 'multiple_choice',
        title: 'Trucos relámpago',
        maxScore: 4,
        config: { xp: 12 },
        content: {
          questions: [
            {
              id: 't1',
              prompt: '34 × 5 usando el truco (×10 y ÷2) =',
              options: ['170', '340', '85'],
              correct: '170',
            },
            {
              id: 't2',
              prompt: '25 × 9 usando el truco (×10 − número) =',
              options: ['225', '250', '200'],
              correct: '225',
            },
            {
              id: 't3',
              prompt: '400 × 30 (ceros al final) =',
              options: ['1200', '12000', '120000'],
              correct: '12000',
            },
            {
              id: 't4',
              prompt: '53 × 11 (separar cifras y sumar en medio) =',
              options: ['583', '5311', '553'],
              correct: '583',
            },
          ],
        },
      },
    ],
  },
})
