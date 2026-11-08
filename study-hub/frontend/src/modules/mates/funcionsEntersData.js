/** Bancs de dades i exercicis del tema funcions_enters (EMAT pàg. 57, 58, 59 i 61). */

/** Pàgina 57 - Activitat 1: Robot de funcions +8 */
export const P57_ROBOT_INTRO = [
  {
    id: 'r1a',
    prompt: 'a) Norma +8: Si hi poses un 10 (Entra = 10), quin nombre en surt?',
    answer: '18',
    placeholder: 'y = …',
  },
  {
    id: 'r1b',
    prompt: 'b) Norma +8: Si en surt un 16 (Surt = 16), quin nombre ha entrat?',
    answer: '8',
    placeholder: 'x = …',
  },
]

/** Pàgina 57 - Activitat 2 (Columna esquerra) */
export const P57_COL_LEFT = [
  { id: 'fl1', prompt: '5 ──(+8)──► y   ⇒   y =', answer: '13' },
  { id: 'fl2', prompt: '7 ──(+28)──► y   ⇒   y =', answer: '35' },
  { id: 'fl3', prompt: 'y ◄──(+18)── 5   ⇒   y =', answer: '23' },
  { id: 'fl4', prompt: '13 ◄──(+7)── x   ⇒   x =', answer: '6' },
  { id: 'fl5', prompt: '4 ──(+0)──► y   ⇒   y =', answer: '4' },
  { id: 'fl6', prompt: '25 ──(?)──► 25   ⇒   norma =', answer: '+0', accept: ['+0', '0', '-0'], placeholder: '+0' },
  { id: 'fl7', prompt: '5 ──(?)──► 30   ⇒   norma =', answer: '+25', accept: ['+25', '25'], placeholder: '+…' },
  { id: 'fl8', prompt: '7 ◄──(−18)── x   ⇒   x =', answer: '25' },
]

/** Pàgina 57 - Activitat 2 (Columna dreta) */
export const P57_COL_RIGHT = [
  { id: 'fr1', prompt: '7 ──(?)──► 24   ⇒   norma =', answer: '+17', accept: ['+17', '17'], placeholder: '+…' },
  { id: 'fr2', prompt: 'x ──(+12)──► 12   ⇒   x =', answer: '0' },
  { id: 'fr3', prompt: '15 ◄──(+5)── x   ⇒   x =', answer: '10' },
  { id: 'fr4', prompt: '7 ──(+38)──► y   ⇒   y =', answer: '45' },
  { id: 'fr5', prompt: '6 ──(+9)──► y   ⇒   y =', answer: '15' },
  { id: 'fr6', prompt: '7 ──(?)──► 13   ⇒   norma =', answer: '+6', accept: ['+6', '6'], placeholder: '+…' },
  { id: 'fr7', prompt: '7 ──(+8)──► y   ⇒   y =', answer: '15' },
  { id: 'fr8', prompt: 'x ──(+8)──► 39   ⇒   x =', answer: '31' },
]

/** Pàgina 57 - Peu de pàgina: Estratègia per deduir la norma i l'entrada */
export const P57_STRATEGY_MC = [
  {
    id: 'st1',
    prompt: 'PER ACABAR (Pàg. 57): Quina estratègia serveix per deduir la norma (?) quan coneixes l\'entrada (x) i la sortida (y), com a 5 ──(?)──► 30?',
    options: [
      'Mirar si el nombre creix o disminueix i calcular la diferència entre sortida i entrada (30 − 5 = +25)',
      'Sumar sempre l\'entrada i la sortida (5 + 30 = +35)',
      'Posar el mateix nombre que hi ha a l\'entrada (+5)',
    ],
    correct: 'Mirar si el nombre creix o disminueix i calcular la diferència entre sortida i entrada (30 − 5 = +25)',
  },
  {
    id: 'st2',
    prompt: 'Si coneixes la sortida i la norma (p. ex. 7 ◄──(−18)── x, on x − 18 = 7), com trobes el nombre d\'entrada x?',
    options: [
      'Fent l\'operació inversa a la norma: 7 + 18 = 25',
      'Restant 18 a 7: 7 − 18 = −11',
      'Multiplicant 7 per 18',
    ],
    correct: 'Fent l\'operació inversa a la norma: 7 + 18 = 25',
  },
]

/** Pàgina 58 - Joc de cubs (Anàlisi de la partida Helena vs Leo) */
export const P58_GAME_ANALYSIS_MC = [
  {
    id: 'ga1',
    prompt: 'A la partida d\'exemple han sortit els cubs x = 5, 4, 6, 8 (suma de les x = 23). Per què guanya l\'Helena amb la norma +18 (suma = 95) i no en Leo amb +20 (suma = 103)?',
    options: [
      'Perquè l\'objectiu és apropar-se a 100 SENSE passar-se, i en Leo s\'ha passat (103 > 100)',
      'Perquè 95 és més gran que 103',
      'Perquè no es pot triar la norma +20',
    ],
    correct: 'Perquè l\'objectiu és apropar-se a 100 SENSE passar-se, i en Leo s\'ha passat (103 > 100)',
  },
  {
    id: 'ga2',
    prompt: 'Amb els mateixos cubs (5, 4, 6, 8), si algú tria la norma +19, quina seria la suma dels quatre valors de y?',
    options: [
      '99 (perquè 24 + 23 + 25 + 27 = 99, a només 1 punt de 100!)',
      '96',
      '100 exactes',
      '101 (es passa)',
    ],
    correct: '99 (perquè 24 + 23 + 25 + 27 = 99, a només 1 punt de 100!)',
  },
  {
    id: 'ga3',
    prompt: 'Truc ràpid del joc: si sumes una norma N a cadascun dels 4 nombres x, quant augmenta la suma total respecte a la suma de les x?',
    options: [
      'Augmenta 4 vegades la norma (4 × N), perquè la norma se suma a les 4 files',
      'Augmenta només 1 vegada la norma (N)',
      'Es multiplica per 100',
    ],
    correct: 'Augmenta 4 vegades la norma (4 × N), perquè la norma se suma a les 4 files',
  },
]

/** Pàgina 59 - Activitat 1: Taula 1 (Funció +8) */
export const P59_TABLE_PLUS8 = [
  { id: 't1_1', prompt: 'Funció +8  ·  x = 4  →  y =', answer: '12' },
  { id: 't1_2', prompt: 'Funció +8  ·  x = 12  →  y =', answer: '20' },
  { id: 't1_3', prompt: 'Funció +8  ·  x = 10  →  y =', answer: '18' },
  { id: 't1_4', prompt: 'Funció +8  ·  x = 976  →  y =', answer: '984' },
  { id: 't1_5', prompt: 'Funció +8  ·  x = 54  →  y =', answer: '62' },
  { id: 't1_6', prompt: 'Funció +8  ·  x = 0  →  y =', answer: '8' },
]

/** Pàgina 59 - Activitat 1: Taula 2 (Funció −5) */
export const P59_TABLE_MINUS5 = [
  { id: 't2_1', prompt: 'Funció −5  ·  x = 203  →  y =', answer: '198' },
  { id: 't2_2', prompt: 'Funció −5  ·  x = 137  →  y =', answer: '132' },
  { id: 't2_3', prompt: 'Funció −5  ·  x = 81  →  y =', answer: '76' },
  { id: 't2_4', prompt: 'Funció −5  ·  x = 76  →  y =', answer: '71' },
  { id: 't2_5', prompt: 'Funció −5  ·  x = 12  →  y =', answer: '7' },
  { id: 't2_6', prompt: 'Funció −5  ·  x = 954  →  y =', answer: '949' },
]

/** Pàgina 59 - Activitat 1: Taula 3 (Funció ×2) */
export const P59_TABLE_MUL2 = [
  { id: 't3_1', prompt: 'Funció ×2  ·  x = 3  →  y =', answer: '6' },
  { id: 't3_2', prompt: 'Funció ×2  ·  x = 16  →  y =', answer: '32' },
  { id: 't3_3', prompt: 'Funció ×2  ·  x = 21  →  y =', answer: '42' },
  { id: 't3_4', prompt: 'Funció ×2  ·  x = 344  →  y =', answer: '688' },
  { id: 't3_5', prompt: 'Funció ×2  ·  x = 108  →  y =', answer: '216' },
  { id: 't3_6', prompt: 'Funció ×2  ·  x = 65  →  y =', answer: '130' },
]

/** Pàgina 59 - Activitat 2: Prediccions amb la calculadora (comences pel 5 i prems + 2 =) */
export const P59_PREDICTIONS_MC = [
  {
    id: 'pr1',
    prompt: '2a) Si comences pel 5 i prems + 2 = repetidament, arribaràs a 15?',
    options: [
      'Sí, prement = cinc vegades (5 → 7 → 9 → 11 → 13 → 15)',
      'No, passa del 14 al 16',
      'Només si prems × 2 =',
    ],
    correct: 'Sí, prement = cinc vegades (5 → 7 → 9 → 11 → 13 → 15)',
  },
  {
    id: 'pr2',
    prompt: '2b) Com ho saps que arribaràs a 15?',
    options: [
      'Perquè 5 és senar i en sumar 2 cada cop sempre obtenim nombres senars (i 15 − 5 = 10, que és múltiple de 2)',
      'Perquè tots els nombres acaben sortint a la calculadora',
      'Perquè 15 és un nombre parell',
    ],
    correct: 'Perquè 5 és senar i en sumar 2 cada cop sempre obtenim nombres senars (i 15 − 5 = 10, que és múltiple de 2)',
  },
  {
    id: 'pr3',
    prompt: '2c) I arribaràs a 20 començant pel 5 i sumant de 2 en 2?',
    options: [
      'No, mai (passarà del 19 al 21)',
      'Sí, prement = deu vegades',
      'Sí, després del 18',
    ],
    correct: 'No, mai (passaràs del 19 al 21)'.replace('passaràs', 'passarà'),
  },
  {
    id: 'pr4',
    prompt: '2d) Com ho saps que NO arribaràs a 20?',
    options: [
      'Perquè 5 és senar i sumant de 2 en 2 només surten nombres senars, mentre que 20 és parell',
      'Perquè la calculadora s\'atura al 15',
      'Perquè 20 és més petit que 5',
    ],
    correct: 'Perquè 5 és senar i sumant de 2 en 2 només surten nombres senars, mentre que 20 és parell',
  },
]

/** Pàgina 61 - Activitat 2: Taula de busseig d'en Joan */
export const P61_JOAN_TABLE = [
  {
    id: 'j1',
    prompt: 'Ubicació inicial: −20 m  ·  Desplaçament: Baixa 5 m  [(−20) − 5]  →  Nova ubicació (m) =',
    answer: '-25',
    accept: ['-25', '-25 m', '-25m', '-25 metres'],
    placeholder: '-25',
  },
  {
    id: 'j2',
    prompt: 'Ubicació inicial: −10 m  ·  Desplaçament: Puja 5 m  [(−10) + 5]  →  Nova ubicació (m) =',
    answer: '-5',
    accept: ['-5', '-5 m', '-5m', '-5 metres'],
    placeholder: '-5',
  },
  {
    id: 'j3',
    prompt: 'Ubicació inicial: −15 m  ·  Desplaçament: Baixa 10 m  [(−15) − 10]  →  Nova ubicació (m) =',
    answer: '-25',
    accept: ['-25', '-25 m', '-25m', '-25 metres'],
    placeholder: '-25',
  },
  {
    id: 'j4',
    prompt: 'Ubicació inicial: −25 m  ·  Desplaçament: Puja 20 m  [(−25) + 20]  →  Nova ubicació (m) =',
    answer: '-5',
    accept: ['-5', '-5 m', '-5m', '-5 metres'],
    placeholder: '-5',
  },
]

/** Pàgina 61 - Activitat 3: Suma o resta sense fer servir la calculadora */
export const P61_CALC_NO_CALC = [
  { id: 'nc1', prompt: '(−7) + 4 =', answer: '-3' },
  { id: 'nc2', prompt: '4 − 6 =', answer: '-2' },
  { id: 'nc3', prompt: '(−7) − 8 =', answer: '-15' },
  { id: 'nc4', prompt: '30 − 35 =', answer: '-5' },
  { id: 'nc5', prompt: '10 − 12 =', answer: '-2' },
  { id: 'nc6', prompt: '(−6) + 5 =', answer: '-1' },
  { id: 'nc7', prompt: '60 − 50 =', answer: '10', accept: ['10', '+10'] },
  { id: 'nc8', prompt: '6 − 9 =', answer: '-3' },
  { id: 'nc9', prompt: '(−25) + 25 =', answer: '0', accept: ['0', '+0', '-0'] },
]

/** Pàgina 61 - Activitat 4: Escriu = o ≠ */
export const P61_COMPARE_MC = [
  {
    id: 'cmp1',
    prompt: '9 − 12   ____   (−12) + 9     (Pista: 9 − 12 = −3  i  (−12) + 9 = −3)',
    options: ['= (Són iguals: tots dos donen −3)', '≠ (Són diferents)'],
    correct: '= (Són iguals: tots dos donen −3)',
  },
  {
    id: 'cmp2',
    prompt: '0 − 15   ____   15 − 0     (Pista: 0 − 15 = −15  però  15 − 0 = +15)',
    options: ['= (Són iguals)', '≠ (Són diferents: −15 i +15)'],
    correct: '≠ (Són diferents: −15 i +15)',
  },
  {
    id: 'cmp3',
    prompt: '(−2) + 5   ____   (−5) − 2     (Pista: (−2) + 5 = +3  però  (−5) − 2 = −7)',
    options: ['= (Són iguals)', '≠ (Són diferents: +3 i −7)'],
    correct: '≠ (Són diferents: +3 i −7)',
  },
  {
    id: 'cmp4',
    prompt: '(−7) − 1   ____   (−1) − 7     (Pista: (−7) − 1 = −8  i  (−1) − 7 = −8)',
    options: ['= (Són iguals: tots dos donen −8)', '≠ (Són diferents)'],
    correct: '= (Són iguals: tots dos donen −8)',
  },
]

/** MasterQuiz de repàs final (índex 0..3 a correct) */
export const FUNCIONS_ENTERS_QUIZ = [
  {
    question: 'Al robot de funcions amb norma +8, si hi entra un 10, quin nombre en surt?',
    options: ['2', '18', '80', '16'],
    correct: 1,
    hint: '10 + 8 = 18.',
  },
  {
    question: 'Al robot amb norma +8, si en surt un 16, quin nombre hi havia entrat?',
    options: ['24', '8', '6', '10'],
    correct: 1,
    hint: 'Fem l\'operació contrària: 16 − 8 = 8.',
  },
  {
    question: 'Completa la funció amb fletxa cap a l\'esquerra: 13 ◄──(+7)── x. Quant val x?',
    options: ['20', '6', '7', '13'],
    correct: 1,
    hint: 'La fletxa surt de x i arriba a 13 sumant 7: x + 7 = 13 → x = 6.',
  },
  {
    question: 'Completa: 7 ◄──(−18)── x. Quant val x?',
    options: ['11', '−11', '25', '18'],
    correct: 2,
    hint: 'A x li restem 18 i surt 7 → x = 7 + 18 = 25.',
  },
  {
    question: 'Quina és la norma secreta a 25 ──(?)──► 25?',
    options: ['+25', '+1', '+0', '−25'],
    correct: 2,
    hint: 'Si entra 25 i surt 25, no hem afegit res: norma +0.',
  },
  {
    question: 'Al Joc de Cubs (Pàg. 58), quin és l\'objectiu amb la suma dels 4 valors de y?',
    options: [
      'Aconseguir el nombre més gran possible sense límit',
      'Apropar-se el màxim a 100 sense passar-se',
      'Que tots els nombres donin 0',
      'Sumar exactament 50',
    ],
    correct: 1,
    hint: 'Guanya qui tingui la suma més pròxima a 100 sense passar-se\'n.',
  },
  {
    question: 'A la calculadora, si la converteixes en funció −5 i prems 203 =, què surt?',
    options: ['208', '198', '195', '200'],
    correct: 1,
    hint: '203 − 5 = 198.',
  },
  {
    question: 'A la calculadora amb funció ×2, si hi poses x = 344, quina sortida y obtens?',
    options: ['688', '346', '172', '648'],
    correct: 0,
    hint: '344 × 2 = 688.',
  },
  {
    question: 'Si comences pel 5 i prems + 2 = moltes vegades, per què mai no arribaràs al 20?',
    options: [
      'Perquè 5 és senar i sumant 2 sempre surten nombres senars (i 20 és parell)',
      'Perquè cal prémer − 2 =',
      'Perquè 20 és massa gran',
      'Sí que s\'hi arriba',
    ],
    correct: 0,
    hint: 'Senar + parell (2) = sempre senar (5, 7, 9, 11, 13, 15, 17, 19, 21…).',
  },
  {
    question: 'En Joan busseja a −20 m i baixa 15 m més. A quina profunditat és ara?',
    options: ['−5 m', '−35 m', '+35 m', '−15 m'],
    correct: 1,
    hint: '(−20) + (−15) = −20 − 15 = −35 m.',
  },
  {
    question: 'En Joan és a −25 m i puja 20 m cap a la superfície. On es troba ara?',
    options: ['−45 m', '+5 m', '−5 m', '0 m'],
    correct: 2,
    hint: '(−25) + 20 = −5 m (encara 5 m sota el nivell del mar).',
  },
  {
    question: 'Quant dóna (−7) − 8 sense calculadora?',
    options: ['−1', '+1', '−15', '+15'],
    correct: 2,
    hint: 'Ets a −7 i baixes 8 més → −15.',
  },
  {
    question: 'Quant dóna (−25) + 25?',
    options: ['−50', '+50', '0', '−25'],
    correct: 2,
    hint: 'Dos nombres oposats sumats sempre donen 0.',
  },
  {
    question: 'Compara: 9 − 12  i  (−12) + 9',
    options: [
      'Són iguals (=), tots dos donen −3',
      'Són diferents (≠), un dóna 3 i l\'altre −3',
      'Tots dos donen +21',
      'No es poden calcular',
    ],
    correct: 0,
    hint: '9 − 12 = −3 i (−12) + 9 = −3.',
  },
  {
    question: 'Compara: (−2) + 5  i  (−5) − 2',
    options: [
      'Són iguals (=)',
      'Són diferents (≠): el primer dóna +3 i el segon dóna −7',
      'Tots dos donen −3',
      'Tots dos donen +7',
    ],
    correct: 1,
    hint: '(−2) + 5 = 3, mentre que (−5) − 2 = −7.',
  },
]

