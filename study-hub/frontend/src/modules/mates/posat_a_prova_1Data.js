/** Bancos EMAT — examen oficial 14-10, nivel Pro e infinito (legacy mates/posat_a_prova_1). */

export const EXAM_DIVISIONS = [
  { id: 'd1', label: '984 ÷ 8', q: '123', r: '0' },
  { id: 'd2', label: '196 ÷ 6', q: '32', r: '4' },
  { id: 'd3', label: '420 ÷ 12', q: '35', r: '0' },
  { id: 'd4', label: '390 ÷ 15', q: '26', r: '0' },
]

export const PRO_DIVISIONS = [
  { id: 'p1', label: '1.458 ÷ 6', q: '243', r: '0' },
  { id: 'p2', label: '2.845 ÷ 23', q: '123', r: '16' },
  { id: 'p3', label: '4.180 ÷ 35', q: '119', r: '15' },
  { id: 'p4', label: '6.840 ÷ 45', q: '152', r: '0' },
]

export const PLACE_VALUE_OPTIONS = [
  { value: 'unitats', label: 'Unidades (U)' },
  { value: 'desenes', label: 'Decenas (D)' },
  { value: 'centenes', label: 'Centenas (C)' },
  { value: 'unitats_miler', label: 'Unidades de millar (UM)' },
  { value: 'desenes_miler', label: 'Decenas de millar (DM)' },
  { value: 'centenes_miler', label: 'Centenas de millar (CM)' },
  { value: 'unitats_milio', label: 'Unidades de millón (UMi)' },
  { value: 'desenes_milio', label: 'Decenas de millón (DMi)' },
]

export const CENSUS_MC = [
  {
    id: 'b',
    prompt: '¿Qué especie tenía más ejemplares en 2014?',
    options: ['Águila imperial ibérica (95)', 'Lince ibérico (327)', 'Cangrejo de río (95)'],
    correct: 'Lince ibérico (327)',
  },
  {
    id: 'c',
    prompt: '¿Qué especie tenía menos ejemplares en 2017?',
    options: ['Águila imperial ibérica (108)', 'Lince ibérico (402)', 'Cangrejo de río (100)'],
    correct: 'Cangrejo de río (100)',
  },
  {
    id: 'd',
    prompt: '¿En qué año hubo más águilas imperiales?',
    options: ['2013 (91)', '2014 (95)', '2015 (102)', '2016 (111)', '2017 (108)'],
    correct: '2016 (111)',
  },
]

/** Quiz mezclado para entrenador (baraja en MasterQuiz). `correct` = índice en options. */
export const EMAT_TRAINER_QUIZ = [
  {
    question: 'El perímetro de una figura plana es…',
    options: ['La suma de todos sus lados', 'El espacio interior (superficie)', 'Base × altura'],
    correct: 0,
    hint: 'Perímetro = recorrido alrededor; área = interior.',
  },
  {
    question: 'Área de un rectángulo =',
    options: ['2 × (base + altura)', 'base × altura', 'base + altura'],
    correct: 1,
    hint: 'Doñana: 29 × 19 = 551 km².',
  },
  {
    question: 'Prueba de la división: dividendo =',
    options: ['divisor + cociente + resto', 'divisor × cociente + resto', 'divisor × resto − cociente'],
    correct: 1,
    hint: '354 = 15 × 23 + 9.',
  },
  {
    question: 'En una operación combinada, lo primero es…',
    options: ['El paréntesis', 'Siempre la suma', 'La multiplicación antes que todo sin reglas'],
    correct: 0,
    hint: 'Paréntesis → × y ÷ → + y −.',
  },
  {
    question: '96 km expresados en metros son…',
    options: ['960 m', '9.600 m', '96.000 m'],
    correct: 2,
    hint: '1 km = 1.000 m → 96 × 1.000.',
  },
  {
    question: 'Palma–París (1.033) + París–Berlín (878) =',
    options: ['1.811 km', '1.911 km', '2.011 km'],
    correct: 1,
    hint: 'Suma los dos tramos del mapa.',
  },
  {
    question: 'Atenes–Moscú por Zagreb (2.947) menos ruta directa (2.231) = km de más',
    options: ['716 km', '626 km', '816 km'],
    correct: 0,
    hint: 'Pregunta clave del examen: resta la ruta directa.',
  },
  {
    question: '¿Qué recorrido es más corto?',
    options: ['Palma–Zagreb–Atenes–Palma (4.200 km)', 'Londres–Bilbao–París–Londres (2.028 km)', 'Igual de largos'],
    correct: 1,
    hint: 'Compara 4.200 con 2.028.',
  },
  {
    question: 'En 497.873, la cifra 9 ocupa la posición de…',
    options: ['Unidades', 'Decenas de millar', 'Centenas de millar'],
    correct: 1,
    hint: 'Cuenta desde la derecha: …9 (DM).',
  },
  {
    question: 'En 10.953.214, el 0 es…',
    options: ['Unidad de millón', 'Decena de millar', 'Unidad de millar'],
    correct: 0,
    hint: 'Grupo de millones: 10 → el 0 es UMi.',
  },
  {
    question: '354 ÷ 15 → cociente y resto',
    options: ['23 y 9', '24 y 4', '22 y 14'],
    correct: 0,
    hint: '15 × 23 = 345; sobran 9.',
  },
  {
    question: '164 × 18 =',
    options: ['2.852 €', '2.952 €', '2.752 €'],
    correct: 1,
    hint: '1.312 + 1.640 = 2.952.',
  },
  {
    question: '984 ÷ 8 → cociente y resto',
    options: ['123 y 0', '122 y 8', '124 y 0'],
    correct: 0,
    hint: 'División exacta del examen.',
  },
  {
    question: 'Totales censales 2013–2017 (águila + linx + cangrejo)',
    options: ['517, 517, 559, 605, 610', '507, 517, 549, 595, 600', '527, 527, 569, 615, 620'],
    correct: 0,
    hint: 'Suma las tres filas por columna.',
  },
  {
    question: 'Vol Lisboa–Varsovia con escalas (3.072) menos directo (2.760) = ahorro',
    options: ['312 km', '212 km', '412 km'],
    correct: 0,
    hint: 'Nivel Pro 1.',
  },
  {
    question: '[(4 × 12) − 6] ÷ 3 =',
    options: ['14 lápices', '16 lápices', '18 lápices'],
    correct: 0,
    hint: '48 − 6 = 42; 42 ÷ 3 = 14.',
  },
  {
    question: 'Rectángulo 40×30 menos recorte 15×10: área restante',
    options: ['1.050 m²', '1.200 m²', '900 m²'],
    correct: 0,
    hint: '1.200 − 150 = 1.050.',
  },
  {
    question: '620 ÷ 48 (autobuses): ¿cuántos buses en total hacen falta?',
    options: ['12', '13', '14'],
    correct: 1,
    hint: '12 llenos + 44 personas → un bus más.',
  },
]

export function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
