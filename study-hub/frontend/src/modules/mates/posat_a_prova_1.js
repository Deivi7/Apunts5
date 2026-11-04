import { createModule } from '../createModule.js'
import { CENSUS_MC, EMAT_TRAINER_QUIZ, EXAM_DIVISIONS, PRO_DIVISIONS } from './posat_a_prova_1Data.js'

const pvOpts = (keys) =>
  keys.map((k) => {
    const map = {
      unitats: 'Unidades (U)',
      desenes: 'Decenas (D)',
      centenes: 'Centenas (C)',
      unitats_miler: 'Unidades de millar (UM)',
      desenes_miler: 'Decenas de millar (DM)',
      centenes_miler: 'Centenas de millar (CM)',
      unitats_milio: 'Unidades de millón (UMi)',
      desenes_milio: 'Decenas de millón (DMi)',
    }
    return map[k]
  })

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
    'tab-examen': [
      {
        id: 'emat-ex1-rutas',
        type: 'fill_blank',
        title: 'Ejercicio 1 — Rutas en el mapa (Palma, Berlín, Atenes)',
        instructions: 'a) Palma–París (1.033) + París–Berlín (878). b) km de más Atenes–Moscú vía Zagreb vs directo (2.231).',
        maxScore: 2,
        config: { xp: 20 },
        content: {
          blanks: [
            { id: 'a', prompt: 'a) Palma a Berlín pasando por París (km)', answer: '1911' },
            { id: 'b', prompt: 'b) km de más pasando por Zagreb', answer: '716' },
          ],
        },
      },
      {
        id: 'emat-ex2-recorrido',
        type: 'multiple_choice',
        title: 'Ejercicio 2 — ¿Qué recorrido es más corto?',
        maxScore: 1,
        config: { xp: 12 },
        content: {
          questions: [
            {
              id: 'r2',
              prompt: 'A: Palma–Zagreb–Atenes–Palma (4.200 km) · B: Londres–Bilbao–París–Londres (2.028 km)',
              options: ['Recorrido A', 'Recorrido B'],
              correct: 'Recorrido B',
            },
          ],
        },
      },
      {
        id: 'emat-ex3-papallones-expr',
        type: 'multiple_choice',
        title: 'Ejercicio 3 — Operación (abuela y Mariposas)',
        maxScore: 1,
        config: { xp: 8 },
        content: {
          questions: [
            {
              id: 'e3',
              prompt: 'Marta vio 5 mariposas; la abuela el doble más 3. ¿Qué expresión?',
              options: ['5 × (2 + 3)', '(2 × 3) + 5', '(2 × 5) + 3', '(5 × 3) + 2'],
              correct: '(2 × 5) + 3',
            },
          ],
        },
      },
      {
        id: 'emat-ex3-papallones-total',
        type: 'fill_blank',
        title: 'Ejercicio 3 — Total de mariposas de la abuela',
        maxScore: 1,
        config: { xp: 8 },
        content: {
          blanks: [{ id: 'n', prompt: 'Mariposas en total', answer: '13' }],
        },
      },
      {
        id: 'emat-ex4-donana-area',
        type: 'fill_blank',
        title: 'Ejercicio 4 — Área del Parque de Doñana (29 × 19 km)',
        maxScore: 1,
        config: { xp: 12 },
        content: {
          blanks: [{ id: 'area', prompt: 'Superficie (km²)', answer: '551' }],
        },
      },
      {
        id: 'emat-ex5-donana-valla',
        type: 'fill_blank',
        title: 'Ejercicio 5 — Valla en metros (perímetro 96 km)',
        maxScore: 1,
        config: { xp: 12 },
        content: {
          blanks: [{ id: 'm', prompt: 'Metros de valla', answer: '96000' }],
        },
      },
      {
        id: 'emat-ex6-valor',
        type: 'multiple_choice',
        title: 'Ejercicio 6 — Valor posicional',
        maxScore: 2,
        config: { xp: 12 },
        content: {
          questions: [
            {
              id: '6a',
              prompt: 'En 497.873, ¿qué posición ocupa el 9?',
              options: pvOpts(['unitats', 'desenes_miler', 'centenes_miler', 'unitats_milio']),
              correct: 'Decenas de millar (DM)',
            },
            {
              id: '6b',
              prompt: 'En 10.953.214, ¿qué posición ocupa el 0?',
              options: pvOpts(['unitats_miler', 'unitats_milio', 'desenes_milio']),
              correct: 'Unidades de millón (UMi)',
            },
          ],
        },
      },
      {
        id: 'emat-ex7-galetes',
        type: 'fill_blank',
        title: 'Ejercicio 7 — 354 galletas en cajas de 15',
        maxScore: 2,
        config: { xp: 14 },
        content: {
          blanks: [
            { id: 'q', prompt: 'Cajas completas (cociente)', answer: '23' },
            { id: 'r', prompt: 'Galletas que sobran (resto)', answer: '9' },
          ],
        },
      },
      {
        id: 'emat-ex8-multiplicacio',
        type: 'fill_blank',
        title: 'Ejercicio 8 — 164 × 18 €',
        maxScore: 1,
        config: { xp: 12 },
        content: {
          blanks: [{ id: 'total', prompt: 'Euros recaudados', answer: '2952' }],
        },
      },
      {
        id: 'emat-ex9-divisions',
        type: 'fill_blank',
        title: 'Ejercicio 9 — Las 4 divisiones del examen',
        maxScore: 4,
        config: { xp: 18 },
        content: {
          columns: 2,
          compact: true,
          hideHint: true,
          blanks: EXAM_DIVISIONS.flatMap((d) => [
            { id: `${d.id}-q`, prompt: `${d.label} → cociente`, answer: d.q },
            { id: `${d.id}-r`, prompt: `${d.label} → resto`, answer: d.r },
          ]),
        },
      },
      {
        id: 'emat-ex10-cens-totals',
        type: 'fill_blank',
        title: 'Ejercicio 10a — Totales de la tabla censal',
        instructions: 'Suma águila + lince + cangrejo por año.',
        maxScore: 3,
        config: { xp: 14 },
        content: {
          blanks: [
            { id: '2013', prompt: 'Total 2013', answer: '517' },
            { id: '2014', prompt: 'Total 2014', answer: '517' },
            { id: '2015', prompt: 'Total 2015', answer: '559' },
            { id: '2016', prompt: 'Total 2016', answer: '605' },
            { id: '2017', prompt: 'Total 2017', answer: '610' },
          ],
        },
      },
      {
        id: 'emat-ex10-cens-preg',
        type: 'multiple_choice',
        title: 'Ejercicio 10b-d — Preguntas sobre la tabla',
        maxScore: 3,
        config: { xp: 12 },
        content: { questions: CENSUS_MC },
      },
    ],
    'tab-pro': [
      {
        id: 'emat-pro1-ruta',
        type: 'fill_blank',
        title: 'Pro 1 — Lisboa–Varsovia (ahorro vol directo)',
        maxScore: 1,
        config: { xp: 16 },
        content: {
          blanks: [{ id: 'km', prompt: 'Km de ahorro (3.072 − 2.760)', answer: '312' }],
        },
      },
      {
        id: 'emat-pro2-lapis',
        type: 'fill_blank',
        title: 'Pro 2 — [(4×12)−6]÷3',
        maxScore: 2,
        config: { xp: 18 },
        content: {
          blanks: [
            { id: 'expr', prompt: 'Letra de la expresión correcta (A/B/C)', answer: 'A', accept: ['A', 'a'] },
            { id: 'val', prompt: 'Lápices por primo', answer: '14' },
          ],
        },
      },
      {
        id: 'emat-pro3-geometria',
        type: 'fill_blank',
        title: 'Pro 3 — Terreno en L (área y perímetro)',
        maxScore: 2,
        config: { xp: 20 },
        content: {
          blanks: [
            { id: 'area', prompt: 'Área (m²)', answer: '1050' },
            { id: 'perim', prompt: 'Perímetro exterior (m)', answer: '140' },
          ],
        },
      },
      {
        id: 'emat-pro4-autobusos',
        type: 'fill_blank',
        title: 'Pro 4 — 620 ÷ 48 (autobuses)',
        maxScore: 3,
        config: { xp: 20 },
        content: {
          blanks: [
            { id: 'plens', prompt: 'Autobuses llenos', answer: '12' },
            { id: 'residu', prompt: 'Personas que sobran', answer: '44' },
            { id: 'total', prompt: 'Autobuses totales necesarios', answer: '13' },
          ],
        },
      },
      {
        id: 'emat-pro5-xifres',
        type: 'fill_blank',
        title: 'Pro 5 — 48.270.513 (CM y UMi)',
        maxScore: 2,
        config: { xp: 16 },
        content: {
          blanks: [
            { id: 'cm', prompt: 'Cifra de centenas de millar', answer: '2' },
            { id: 'val8', prompt: 'Valor del 8 (unidades)', answer: '8000000' },
          ],
        },
      },
      {
        id: 'emat-pro-divisions',
        type: 'fill_blank',
        title: 'Pro — 4 divisiones avanzadas',
        maxScore: 4,
        config: { xp: 24 },
        content: {
          blanks: PRO_DIVISIONS.flatMap((d) => [
            { id: `${d.id}-q`, prompt: `${d.label} → cociente`, answer: d.q },
            { id: `${d.id}-r`, prompt: `${d.label} → resto`, answer: d.r },
          ]),
        },
      },
    ],
    'tab-generator': [
      {
        id: 'emat-gen-lab',
        type: 'custom',
        title: 'Entrenador infinito — divisiones y rectángulos',
        maxScore: 4,
        config: { xp: 20, component: 'EmatInfiniteLab', hideCheck: true },
        content: { component: 'EmatInfiniteLab' },
      },
      {
        id: 'emat-gen-sprint',
        type: 'custom',
        title: 'Sprint de cálculo mental',
        maxScore: 20,
        config: { xp: 1, component: 'MentalSprint', seconds: 120, hideCheck: true },
        content: { component: 'MentalSprint', ops: ['+', '-', '×', '÷'] },
      },
      {
        id: 'emat-gen-quiz',
        type: 'custom',
        title: 'Quiz EMAT (banco completo, barajado)',
        maxScore: 18,
        config: { xp: 18, component: 'MasterQuiz', hideCheck: true },
        content: { component: 'MasterQuiz', questions: EMAT_TRAINER_QUIZ },
      },
    ],
  },
})
