/** Bancs d'exercicis del tema decimals_unitats (examen pàg. 39–56 + ampliacions). */

export const POWER10_MUL = [
  { prompt: '0,975 × 10', answer: '9,75' },
  { prompt: '95,17 × 10', answer: '951,7' },
  { prompt: '20,1 × 10', answer: '201' },
  { prompt: '12,3 × 100', answer: '1230' },
  { prompt: '0,004 × 100', answer: '0,4' },
  { prompt: '3,14 × 1000', answer: '3140' },
  { prompt: '0,36781 × 1000000', answer: '367810' },
  { prompt: '10 × 75', answer: '750' },
  { prompt: '10 × 62,937', answer: '629,37' },
  { prompt: '100 × 0,473', answer: '47,3' },
  { prompt: '10 × 8,245', answer: '82,45' },
  { prompt: '15,1 × 10', answer: '151' },
  { prompt: '0,5 × 10', answer: '5' },
  { prompt: '0,97653 × 10000', answer: '9765,3' },
]

export const POWER10_DIV = [
  { prompt: '42,7 ÷ 10', answer: '4,27' },
  { prompt: '0,76 ÷ 10', answer: '0,076' },
  { prompt: '423 ÷ 100', answer: '4,23' },
  { prompt: '0,07 ÷ 10', answer: '0,007' },
  { prompt: '36,143 ÷ 1000', answer: '0,036143' },
  { prompt: '25,7 ÷ 10', answer: '2,57' },
  { prompt: '48,20 ÷ 10', answer: '4,82' },
  { prompt: '1,83 ÷ 10', answer: '0,183' },
  { prompt: '123,9 ÷ 10', answer: '12,39' },
  { prompt: '132,7 ÷ 10', answer: '13,27' },
  { prompt: '347,26 ÷ 100', answer: '3,4726' },
  { prompt: '146,6 ÷ 1000', answer: '0,1466' },
  { prompt: '0,3 ÷ 100', answer: '0,003' },
  { prompt: '42,9 ÷ 100', answer: '0,429' },
]

export const ROUND_DESENA = [
  { prompt: '745 → desena', answer: '750' },
  { prompt: '2561 → desena', answer: '2560' },
  { prompt: '3760 → desena', answer: '3760' },
]

export const ROUND_CENTENA = [
  { prompt: '1255 → centena', answer: '1300' },
  { prompt: '750 → centena', answer: '800' },
  { prompt: '2050 → centena', answer: '2100' },
  { prompt: '1315 → centena', answer: '1300' },
  { prompt: '239 → centena', answer: '200' },
  { prompt: '4250 → centena', answer: '4300' },
]

export const ROUND_MILER = [
  { prompt: '39417 → miler', answer: '39000' },
  { prompt: '1500 → miler', answer: '2000' },
  { prompt: '3205 → miler', answer: '3000' },
  { prompt: '27436 → miler', answer: '27000' },
  { prompt: '48965 → miler', answer: '49000' },
  { prompt: '5050 → miler', answer: '5000' },
]

export const ROUND_ENTER = [
  { prompt: '14,5 → enter', answer: '15' },
  { prompt: '17,63 → enter', answer: '18' },
  { prompt: '16,09 → enter', answer: '16' },
]

export const METRIC_CONVERT = [
  { prompt: '14 m = ? cm', answer: '1400', unit: 'cm' },
  { prompt: '1000 ml = ? dl', answer: '10', unit: 'dl' },
  { prompt: '200 ml = ? l', answer: '0,2', unit: 'l' },
  { prompt: '3 dm = ? m', answer: '0,3', unit: 'm' },
  { prompt: '16,2 mg = ? cg', answer: '1,62', unit: 'cg' },
  { prompt: '17,241 km = ? m', answer: '17241', unit: 'm' },
  { prompt: '4000 g = ? kg', answer: '4', unit: 'kg' },
  { prompt: '1796 m = ? km', answer: '1,796', unit: 'km' },
  { prompt: '17,2 cg = ? mg', answer: '172', unit: 'mg' },
]

export const METRIC_RESULT_UNIT = [
  {
    prompt: '0,36 km × 1000 → quina unitat?',
    options: ['m', 'cm', 'hm', 'mm'],
    correct: 'm',
    hint: 'De km a m hi ha 3 graons cap avall (×1000).',
  },
  {
    prompt: '1735 dl ÷ 100 → quina unitat?',
    options: ['hl', 'dal', 'l', 'kl'],
    correct: 'dal',
    hint: 'De dl a dal: 2 graons amunt (÷100). No és hl (serien 3 graons).',
  },
  {
    prompt: '13,752 dam × 10000 → quina unitat?',
    options: ['mm', 'cm', 'm', 'km'],
    correct: 'mm',
    hint: '4 graons avall des de dam: dam→m→dm→cm→mm.',
  },
  {
    prompt: '12 dag × 10 → quina unitat?',
    options: ['g', 'kg', 'mg', 'cg'],
    correct: 'g',
    hint: '1 graó avall: dag → g.',
  },
  {
    prompt: '253 hl ÷ 10 → quina unitat?',
    options: ['kl', 'dal', 'l', 'hl'],
    correct: 'kl',
    hint: '1 graó amunt: hl → kl.',
  },
  {
    prompt: '1358 mg ÷ 100 → quina unitat?',
    options: ['dg', 'cg', 'g', 'dag'],
    correct: 'dg',
    hint: '2 graons amunt: mg → cg → dg.',
  },
]

export const ORDER_LENGTH_ITEMS = [
  '0,04 hm',
  '4500 mm',
  '48 dm',
  '0,49 dam',
  '497 cm',
]

export const ORDER_LENGTH_ORDER = [
  '0,04 hm',
  '4500 mm',
  '48 dm',
  '0,49 dam',
  '497 cm',
]

export const ORDER_CAPACITY_ITEMS = [
  '3 l',
  '33 dl',
  '333 cl',
  '3333 ml',
  '0,3 hl',
]

export const ORDER_CAPACITY_ORDER = [
  '3 l',
  '33 dl',
  '333 cl',
  '3333 ml',
  '0,3 hl',
]

export const DECIMAL_MULT = [
  { prompt: '2,4 × 5', answer: '12' },
  { prompt: '173 × 1,2', answer: '207,6' },
  { prompt: '173 × 0,12', answer: '20,76' },
  { prompt: '12 × 8,1', answer: '97,2' },
]

export const DIVISION_DECIMAL = [
  { prompt: '36 ÷ 5', answer: '7,2' },
  { prompt: '10 ÷ 4', answer: '2,5' },
  { prompt: '98 ÷ 4', answer: '24,5' },
  { prompt: '51 ÷ 6', answer: '8,5' },
  { prompt: '64 ÷ 5', answer: '12,8' },
]

export const DIVISION_CONTEXT = [
  {
    prompt: '34 persones en cotxes de 5 places. Quants cotxes calen?',
    options: ['6', '7', '6,8', '5'],
    correct: '7',
    hint: 'Variable discreta: no es poden deixar persones a peu → s\'arrodoneix amunt.',
  },
  {
    prompt: '34 m de tela, 5 m per vestit. Quants vestits completes?',
    options: ['7', '6', '6,8', '5'],
    correct: '6',
    hint: 'Sobren 4 m: no arriben per a un altre vestit → truncament.',
  },
  {
    prompt: '34 € a repartir entre 5 comensals. Quant paga cadascú?',
    options: ['6 €', '7 €', '6,80 €', '6 R 4'],
    correct: '6,80 €',
    hint: 'Diners: es pot dividir en cèntims → 6,80 €.',
  },
  {
    prompt: '34 ampolles, 5 al dia. Quants dies complets i quantes sobren?',
    options: ['6 R 4', '7', '6,8', '5 R 4'],
    correct: '6 R 4',
    hint: 'Quocient enter i residu explícit.',
  },
  {
    prompt: '34 barres de pa entre 5 persones (es poden partir). Quant en rep cadascú?',
    options: ['6', '7', '6 4/5', '6 R 4'],
    correct: '6 4/5',
    hint: 'Magnitud contínua: 6 barres senceres + 4/5.',
  },
]

export const POLYGON_TF = [
  { id: 'p1', prompt: 'Un trapezi isòsceles té exactament un parell de costats paral·lels.', correct: true },
  { id: 'p2', prompt: 'Tot trapezi és un paral·lelogram.', correct: false },
  { id: 'p3', prompt: 'Tot quadrilàter té exactament 2 diagonals.', correct: true },
  { id: 'p4', prompt: 'Un polígon convex té totes les diagonals a l\'interior.', correct: true },
  { id: 'p5', prompt: 'La fórmula de diagonals és D = n(n − 3)/2.', correct: true },
]

export const CARTESIAN_MC = [
  {
    prompt: 'Amb el conveni (Carrer, Avinguda), el punt B a Carrer 4 i 3a Avinguda és…',
    options: ['(4, 3)', '(3, 4)', '(4, 4)', '(3, 3)'],
    correct: '(4, 3)',
    hint: 'Primer component = carrer (x); segon = avinguda (y).',
  },
  {
    prompt: 'Si confons (1, 5a) amb (5, 1a), quina errada comes?',
    options: [
      'Inverteixes abscissa i ordenada',
      'Sumes les coordenades',
      'Ignores el pla cartesià',
      'Canvies d\'escala',
    ],
    correct: 'Inverteixes abscissa i ordenada',
    hint: 'L\'ordre del parell (x, y) és estricte.',
  },
  {
    prompt: 'La trobada «2 amb 8a» amb (Carrer, Avinguda) correspon a…',
    options: ['(2, 8)', '(8, 2)', '(2, 2)', '(8, 8)'],
    correct: '(2, 8)',
    hint: 'Carrer 2 → x=2; 8a Avinguda → y=8.',
  },
]

/** MasterQuiz: correct = índex a options */
export const DECIMALS_MASTER_QUIZ = [
  {
    question: '0,975 × 10 = ?',
    options: ['0,0975', '9,75', '97,5', '975'],
    correct: 1,
    hint: 'Multiplicar per 10 = moure la coma 1 lloc a la dreta.',
  },
  {
    question: '0,76 ÷ 10 = ?',
    options: ['7,6', '0,76', '0,076', '0,0076'],
    correct: 2,
    hint: 'Dividir per 10 = moure la coma 1 lloc a l\'esquerra.',
  },
  {
    question: '745 arrodonit a la desena més propera és…',
    options: ['740', '750', '700', '800'],
    correct: 1,
    hint: 'La unitat és 5 → s\'arrodoneix amunt.',
  },
  {
    question: '1500 a la unitat de miler més propera és…',
    options: ['1000', '1500', '2000', '1600'],
    correct: 2,
    hint: 'La centena és 5 → puja el miler a 2000.',
  },
  {
    question: '14 m en cm són…',
    options: ['140 cm', '1400 cm', '1,4 cm', '14 cm'],
    correct: 1,
    hint: 'De m a cm: 2 graons avall (×100).',
  },
  {
    question: 'Quina és la unitat base de longitud?',
    options: ['km', 'cm', 'm', 'mm'],
    correct: 2,
    hint: 'El metre (m) és la unitat base del sistema mètric.',
  },
  {
    question: 'Un trapezi…',
    options: [
      'Té 2 parells de costats paral·lels',
      'Té exactament 1 parell de costats paral·lels',
      'No té costats paral·lels',
      'Sempre és còncau',
    ],
    correct: 1,
    hint: 'Si en tingués 2, seria un paral·lelogram.',
  },
  {
    question: 'Diagonals d\'un quadrilàter (n=4):',
    options: ['1', '2', '3', '4'],
    correct: 1,
    hint: 'D = 4(4−3)/2 = 2.',
  },
  {
    question: '2,4 × 5 = ?',
    options: ['10', '12', '1,2', '120'],
    correct: 1,
    hint: '24×5=120 amb 1 decimal → 12,0.',
  },
  {
    question: '91 × 6,3 davant de 631 × 0,9…',
    options: ['Dóna menys', 'Dóna més', 'Dóna igual', 'No es pot comparar'],
    correct: 1,
    hint: '573,3 > 567,9: millor repartir dígits alts en ordres alts amb multiplicador >1.',
  },
  {
    question: '36 ÷ 5 en decimal exacte és…',
    options: ['7', '7,2', '7,5', '6,2'],
    correct: 1,
    hint: 'Residu 1 → afegeix zero → 10÷5=2.',
  },
  {
    question: '106 ÷ 3 és…',
    options: ['Exacte', 'Periòdic (35,333…)', 'Enter', 'Impossible'],
    correct: 1,
    hint: 'El 3 no és factor 2 ni 5 → decimal periòdic.',
  },
  {
    question: 'El parell (4, 3) i el parell (3, 4)…',
    options: ['Són el mateix punt', 'Són punts diferents', 'No són coordenades', 'Només serveixen en mapes'],
    correct: 1,
    hint: 'L\'ordre (x, y) és estricte.',
  },
  {
    question: '4 arxivadors a 8,48 € amb 40 €: si arrodoneixes a 9 €…',
    options: ['4×9=36 < 40 → sí n\'hi ha prou', 'No n\'hi ha prou', 'Cal exactament 40', 'Cal 34 € exactes'],
    correct: 0,
    hint: 'Estimació a l\'alça: 36 € < 40 €.',
  },
  {
    question: 'Mig kg de cigrons = 500 000 mg. Si n\'hi ha 862, la massa aproximada d\'un és…',
    options: ['58 mg', '580 mg', '5800 mg', '5,8 mg'],
    correct: 1,
    hint: '500000÷862 ≈ 580 mg.',
  },
]
