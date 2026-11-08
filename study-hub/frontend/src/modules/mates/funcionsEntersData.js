/** Bancs de dades i exercicis del tema funcions_enters. */

/** Activitat 1: Robot de funcions +8 */
export const P57_ROBOT_INTRO = [
  {
    id: 'r1a',
    badge: 'Norma +8',
    prompt: 'a) Si al robot hi entra un 10, quin nombre en surt?',
    sub: 'Càlcul: 10 + 8 = ?',
    answer: '18',
    placeholder: 'Escriu la sortida (y)…',
  },
  {
    id: 'r1b',
    badge: 'Norma +8',
    prompt: 'b) Si del robot en surt un 16, quin nombre hi havia entrat?',
    sub: 'Pensa a l\'inrevés: quin nombre + 8 dóna 16? (16 − 8)',
    answer: '8',
    placeholder: 'Escriu l\'entrada (x)…',
  },
]

/** Activitat 2 (Columna esquerra) */
export const P57_COL_LEFT = [
  {
    id: 'fl1',
    badge: 'Troba la sortida y',
    prompt: '5 ──(+8)──► y',
    sub: 'Entra el 5 i el robot suma 8. Quant val y?',
    answer: '13',
    placeholder: 'y = …',
  },
  {
    id: 'fl2',
    badge: 'Troba la sortida y',
    prompt: '7 ──(+28)──► y',
    sub: 'Entra el 7 i el robot suma 28. Quant val y?',
    answer: '35',
    placeholder: 'y = …',
  },
  {
    id: 'fl3',
    badge: 'Fletxa cap a l\'esquerra ◄──',
    prompt: 'y ◄──(+18)── 5',
    sub: 'Entra el 5 per la dreta i suma 18 cap a l\'esquerra. Quant val y?',
    answer: '23',
    placeholder: 'y = …',
  },
  {
    id: 'fl4',
    badge: 'Troba l\'entrada x',
    prompt: '13 ◄──(+7)── x',
    sub: 'A x li sumem 7 i surt 13 (13 − 7). Quant val x?',
    answer: '6',
    placeholder: 'x = …',
  },
  {
    id: 'fl5',
    badge: 'Troba la sortida y',
    prompt: '4 ──(+0)──► y',
    sub: 'Entra el 4 i sumem 0. Quant val y?',
    answer: '4',
    placeholder: 'y = …',
  },
  {
    id: 'fl6',
    badge: 'Descobreix la norma (?)',
    prompt: '25 ──(?)──► 25',
    sub: 'Entra 25 i surt el mateix 25. Quina és la norma?',
    answer: '+0',
    accept: ['+0', '0', '-0'],
    placeholder: 'Ex: +0',
  },
  {
    id: 'fl7',
    badge: 'Descobreix la norma (?)',
    prompt: '5 ──(?)──► 30',
    sub: 'Entra un 5 i surt un 30. Quant ha sumat el robot?',
    answer: '+25',
    accept: ['+25', '25'],
    placeholder: 'Ex: +25',
  },
  {
    id: 'fl8',
    badge: 'Troba l\'entrada x',
    prompt: '7 ◄──(−18)── x',
    sub: 'A x li restem 18 i surt 7 (fes el contrari: 7 + 18). Quant val x?',
    answer: '25',
    placeholder: 'x = …',
  },
]

/** Activitat 2 (Columna dreta) */
export const P57_COL_RIGHT = [
  {
    id: 'fr1',
    badge: 'Descobreix la norma (?)',
    prompt: '7 ──(?)──► 24',
    sub: 'Entra un 7 i surt un 24. Quant ha sumat el robot?',
    answer: '+17',
    accept: ['+17', '17'],
    placeholder: 'Ex: +17',
  },
  {
    id: 'fr2',
    badge: 'Troba l\'entrada x',
    prompt: 'x ──(+12)──► 12',
    sub: 'Quin nombre + 12 dóna 12? (12 − 12)',
    answer: '0',
    placeholder: 'x = …',
  },
  {
    id: 'fr3',
    badge: 'Troba l\'entrada x',
    prompt: '15 ◄──(+5)── x',
    sub: 'A x li sumem 5 i surt 15 (15 − 5). Quant val x?',
    answer: '10',
    placeholder: 'x = …',
  },
  {
    id: 'fr4',
    badge: 'Troba la sortida y',
    prompt: '7 ──(+38)──► y',
    sub: 'Entra el 7 i el robot suma 38. Quant val y?',
    answer: '45',
    placeholder: 'y = …',
  },
  {
    id: 'fr5',
    badge: 'Troba la sortida y',
    prompt: '6 ──(+9)──► y',
    sub: 'Entra el 6 i el robot suma 9. Quant val y?',
    answer: '15',
    placeholder: 'y = …',
  },
  {
    id: 'fr6',
    badge: 'Descobreix la norma (?)',
    prompt: '7 ──(?)──► 13',
    sub: 'Entra un 7 i surt un 13. Quant ha sumat el robot?',
    answer: '+6',
    accept: ['+6', '6'],
    placeholder: 'Ex: +6',
  },
  {
    id: 'fr7',
    badge: 'Troba la sortida y',
    prompt: '7 ──(+8)──► y',
    sub: 'Entra el 7 i el robot suma 8. Quant val y?',
    answer: '15',
    placeholder: 'y = …',
  },
  {
    id: 'fr8',
    badge: 'Troba l\'entrada x',
    prompt: 'x ──(+8)──► 39',
    sub: 'A x li sumem 8 i surt 39 (fes el contrari: 39 − 8). Quant val x?',
    answer: '31',
    placeholder: 'x = …',
  },
]

/** Estratègia per deduir la norma i l'entrada */
export const P57_STRATEGY_MC = [
  {
    id: 'st1',
    prompt: 'PER ACABAR: Quina estratègia serveix per deduir la norma (?) quan coneixes l\'entrada (x) i la sortida (y), com a 5 ──(?)──► 30?',
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

/** Joc de cubs (Anàlisi de la partida Helena vs Leo) */
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

/** Activitat 1: Taula 1 (Funció +8) */
export const P59_TABLE_PLUS8 = [
  {
    id: 't1_1',
    badge: 'Suma +8',
    prompt: 'Si entra x = 4   ──(+8)──►   Surt y =',
    sub: 'Calcula: 4 + 8',
    answer: '12',
    placeholder: 'y = …',
  },
  {
    id: 't1_2',
    badge: 'Suma +8',
    prompt: 'Si entra x = 12   ──(+8)──►   Surt y =',
    sub: 'Calcula: 12 + 8',
    answer: '20',
    placeholder: 'y = …',
  },
  {
    id: 't1_3',
    badge: 'Suma +8',
    prompt: 'Si entra x = 10   ──(+8)──►   Surt y =',
    sub: 'Calcula: 10 + 8',
    answer: '18',
    placeholder: 'y = …',
  },
  {
    id: 't1_4',
    badge: 'Suma +8',
    prompt: 'Si entra x = 976   ──(+8)──►   Surt y =',
    sub: 'Calcula: 976 + 8',
    answer: '984',
    placeholder: 'y = …',
  },
  {
    id: 't1_5',
    badge: 'Suma +8',
    prompt: 'Si entra x = 54   ──(+8)──►   Surt y =',
    sub: 'Calcula: 54 + 8',
    answer: '62',
    placeholder: 'y = …',
  },
  {
    id: 't1_6',
    badge: 'Suma +8',
    prompt: 'Si entra x = 0   ──(+8)──►   Surt y =',
    sub: 'Calcula: 0 + 8',
    answer: '8',
    placeholder: 'y = …',
  },
]

/** Activitat 1: Taula 2 (Funció −5) */
export const P59_TABLE_MINUS5 = [
  {
    id: 't2_1',
    badge: 'Resta −5',
    prompt: 'Si entra x = 203   ──(−5)──►   Surt y =',
    sub: 'Resta 5 al nombre d\'entrada: 203 − 5',
    answer: '198',
    placeholder: 'y = …',
  },
  {
    id: 't2_2',
    badge: 'Resta −5',
    prompt: 'Si entra x = 137   ──(−5)──►   Surt y =',
    sub: 'Resta 5 al nombre d\'entrada: 137 − 5',
    answer: '132',
    placeholder: 'y = …',
  },
  {
    id: 't2_3',
    badge: 'Resta −5',
    prompt: 'Si entra x = 81   ──(−5)──►   Surt y =',
    sub: 'Resta 5 al nombre d\'entrada: 81 − 5',
    answer: '76',
    placeholder: 'y = …',
  },
  {
    id: 't2_4',
    badge: 'Resta −5',
    prompt: 'Si entra x = 76   ──(−5)──►   Surt y =',
    sub: 'Resta 5 al nombre d\'entrada: 76 − 5',
    answer: '71',
    placeholder: 'y = …',
  },
  {
    id: 't2_5',
    badge: 'Resta −5',
    prompt: 'Si entra x = 12   ──(−5)──►   Surt y =',
    sub: 'Resta 5 al nombre d\'entrada: 12 − 5',
    answer: '7',
    placeholder: 'y = …',
  },
  {
    id: 't2_6',
    badge: 'Resta −5',
    prompt: 'Si entra x = 954   ──(−5)──►   Surt y =',
    sub: 'Resta 5 al nombre d\'entrada: 954 − 5',
    answer: '949',
    placeholder: 'y = …',
  },
]

/** Activitat 1: Taula 3 (Funció ×2) */
export const P59_TABLE_MUL2 = [
  {
    id: 't3_1',
    badge: 'Multiplica ×2',
    prompt: 'Si entra x = 3   ──(×2)──►   Surt y =',
    sub: 'Calcula el doble: 3 × 2',
    answer: '6',
    placeholder: 'y = …',
  },
  {
    id: 't3_2',
    badge: 'Multiplica ×2',
    prompt: 'Si entra x = 16   ──(×2)──►   Surt y =',
    sub: 'Calcula el doble: 16 × 2',
    answer: '32',
    placeholder: 'y = …',
  },
  {
    id: 't3_3',
    badge: 'Multiplica ×2',
    prompt: 'Si entra x = 21   ──(×2)──►   Surt y =',
    sub: 'Calcula el doble: 21 × 2',
    answer: '42',
    placeholder: 'y = …',
  },
  {
    id: 't3_4',
    badge: 'Multiplica ×2',
    prompt: 'Si entra x = 344   ──(×2)──►   Surt y =',
    sub: 'Calcula el doble: 344 × 2',
    answer: '688',
    placeholder: 'y = …',
  },
  {
    id: 't3_5',
    badge: 'Multiplica ×2',
    prompt: 'Si entra x = 108   ──(×2)──►   Surt y =',
    sub: 'Calcula el doble: 108 × 2',
    answer: '216',
    placeholder: 'y = …',
  },
  {
    id: 't3_6',
    badge: 'Multiplica ×2',
    prompt: 'Si entra x = 65   ──(×2)──►   Surt y =',
    sub: 'Calcula el doble: 65 × 2',
    answer: '130',
    placeholder: 'y = …',
  },
]

/** Activitat 2: Prediccions amb la calculadora (comences pel 5 i prems + 2 =) */
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
    correct: 'No, mai (passarà del 19 al 21)',
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

/** Activitat 2: Taula de busseig d'en Joan */
export const P61_JOAN_TABLE = [
  {
    id: 'j1',
    badge: 'Baixa 5 m (−5)',
    prompt: 'Ubicació inicial: −20 metres  →  Baixa 5 metres',
    sub: 'S\'enfonsa 5 m més avall: (−20) − 5 = ?',
    answer: '-25',
    accept: ['-25', '-25 m', '-25m', '-25 metres'],
    placeholder: 'Ex: -25',
  },
  {
    id: 'j2',
    badge: 'Puja 5 m (+5)',
    prompt: 'Ubicació inicial: −10 metres  →  Puja 5 metres',
    sub: 'S\'acosta 5 m cap a la superfície: (−10) + 5 = ?',
    answer: '-5',
    accept: ['-5', '-5 m', '-5m', '-5 metres'],
    placeholder: 'Ex: -5',
  },
  {
    id: 'j3',
    badge: 'Baixa 10 m (−10)',
    prompt: 'Ubicació inicial: −15 metres  →  Baixa 10 metres',
    sub: 'S\'enfonsa 10 m més avall: (−15) − 10 = ?',
    answer: '-25',
    accept: ['-25', '-25 m', '-25m', '-25 metres'],
    placeholder: 'Ex: -25',
  },
  {
    id: 'j4',
    badge: 'Puja 20 m (+20)',
    prompt: 'Ubicació inicial: −25 metres  →  Puja 20 metres',
    sub: 'S\'acosta 20 m cap a la superfície: (−25) + 20 = ?',
    answer: '-5',
    accept: ['-5', '-5 m', '-5m', '-5 metres'],
    placeholder: 'Ex: -5',
  },
]

/** Activitat 3: Suma o resta sense fer servir la calculadora */
export const P61_CALC_NO_CALC = [
  { id: 'nc1', badge: 'Puja +4', prompt: '(−7) + 4 =', sub: 'Ets a −7 i puges 4 cap al 0', answer: '-3' },
  { id: 'nc2', badge: 'Baixa −6', prompt: '4 − 6 =', sub: 'Ets a +4 i baixes 6 (passes sota 0)', answer: '-2' },
  { id: 'nc3', badge: 'Baixa −8', prompt: '(−7) − 8 =', sub: 'Ets a −7 i baixes 8 més avall', answer: '-15' },
  { id: 'nc4', badge: 'Baixa −35', prompt: '30 − 35 =', sub: 'A 30 li restes 35 (5 sota zero)', answer: '-5' },
  { id: 'nc5', badge: 'Baixa −12', prompt: '10 − 12 =', sub: 'A 10 li restes 12 (2 sota zero)', answer: '-2' },
  { id: 'nc6', badge: 'Puja +5', prompt: '(−6) + 5 =', sub: 'Ets a −6 i puges 5 cap al 0', answer: '-1' },
  { id: 'nc7', badge: 'Resta normal', prompt: '60 − 50 =', sub: '60 menys 50 (positiu)', answer: '10', accept: ['10', '+10'] },
  { id: 'nc8', badge: 'Baixa −9', prompt: '6 − 9 =', sub: 'Ets a +6 i baixes 9 (3 sota zero)', answer: '-3' },
  { id: 'nc9', badge: 'Nombres oposats', prompt: '(−25) + 25 =', sub: 'Ets a −25 i puges 25 exactes', answer: '0', accept: ['0', '+0', '-0'] },
]

/** Activitat 4: Escriu = o ≠ */
export const P61_COMPARE_MC = [
  {
    id: 'cmp1',
    prompt: 'Compara:   9 − 12     i     (−12) + 9     (Pista: calcula quant dóna cada costat)',
    options: ['= (Són iguals: tots dos donen −3)', '≠ (Són diferents)'],
    correct: '= (Són iguals: tots dos donen −3)',
  },
  {
    id: 'cmp2',
    prompt: 'Compara:   0 − 15     i     15 − 0     (Pista: 0 − 15 dóna −15, però 15 − 0 dóna +15)',
    options: ['= (Són iguals)', '≠ (Són diferents: −15 i +15)'],
    correct: '≠ (Són diferents: −15 i +15)',
  },
  {
    id: 'cmp3',
    prompt: 'Compara:   (−2) + 5     i     (−5) − 2     (Pista: (−2) + 5 dóna +3, però (−5) − 2 dóna −7)',
    options: ['= (Són iguals)', '≠ (Són diferents: +3 i −7)'],
    correct: '≠ (Són diferents: +3 i −7)',
  },
  {
    id: 'cmp4',
    prompt: 'Compara:   (−7) − 1     i     (−1) − 7     (Pista: tots dos baixen fins a −8)',
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
    question: 'Al Joc de Cubs, quin és l\'objectiu amb la suma dels 4 valors de y?',
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
