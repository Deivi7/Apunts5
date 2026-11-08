/** Bancs de dades i exercicis del tema funcions_enters. */

/** Activitat 1: Robot de funcions +8 */
export const P57_ROBOT_INTRO = [
  {
    id: 'r1a',
    badge: 'Norma +8',
    prompt: 'a) Si al robot hi entra un 10, quin nombre en surt?',
    sub: 'Aplica la norma del robot al nombre d\'entrada.',
    answer: '18',
    placeholder: 'Escriu la sortida (y)…',
  },
  {
    id: 'r1b',
    badge: 'Norma +8',
    prompt: 'b) Si del robot en surt un 16, quin nombre hi havia entrat?',
    sub: 'Pensa a l\'inrevés: fes l\'operació contrària a la norma.',
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
    sub: 'Entra per l\'esquerra i segueix la fletxa.',
    answer: '13',
    placeholder: 'y = …',
  },
  {
    id: 'fl2',
    badge: 'Troba la sortida y',
    prompt: '7 ──(+28)──► y',
    sub: 'Entra per l\'esquerra i segueix la fletxa.',
    answer: '35',
    placeholder: 'y = …',
  },
  {
    id: 'fl3',
    badge: 'Fletxa cap a l\'esquerra ◄──',
    prompt: 'y ◄──(+18)── 5',
    sub: 'Fixa\'t que la fletxa va de dreta a esquerra!',
    answer: '23',
    placeholder: 'y = …',
  },
  {
    id: 'fl4',
    badge: 'Troba l\'entrada x',
    prompt: '13 ◄──(+7)── x',
    sub: 'La fletxa surt de x i arriba al 13. Fes el camí invers.',
    answer: '6',
    placeholder: 'x = …',
  },
  {
    id: 'fl5',
    badge: 'Troba la sortida y',
    prompt: '4 ──(+0)──► y',
    sub: 'Entra per l\'esquerra i aplica la norma.',
    answer: '4',
    placeholder: 'y = …',
  },
  {
    id: 'fl6',
    badge: 'Descobreix la norma (?)',
    prompt: '25 ──(?)──► 25',
    sub: 'Compara el nombre que entra amb el nombre que surt.',
    answer: '+0',
    accept: ['+0', '0', '-0'],
    placeholder: 'Norma…',
  },
  {
    id: 'fl7',
    badge: 'Descobreix la norma (?)',
    prompt: '5 ──(?)──► 30',
    sub: 'Quina operació transforma el primer nombre en el segon?',
    answer: '+25',
    accept: ['+25', '25'],
    placeholder: 'Ex: +…',
  },
  {
    id: 'fl8',
    badge: 'Troba l\'entrada x',
    prompt: '7 ◄──(−18)── x',
    sub: 'La fletxa surt de x i arriba al 7. Fes l\'operació contrària.',
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
    sub: 'Quina operació transforma el primer nombre en el segon?',
    answer: '+17',
    accept: ['+17', '17'],
    placeholder: 'Ex: +…',
  },
  {
    id: 'fr2',
    badge: 'Troba l\'entrada x',
    prompt: 'x ──(+12)──► 12',
    sub: 'Coneixes la sortida i la norma: fes el camí invers.',
    answer: '0',
    placeholder: 'x = …',
  },
  {
    id: 'fr3',
    badge: 'Troba l\'entrada x',
    prompt: '15 ◄──(+5)── x',
    sub: 'La fletxa surt de x i arriba al 15. Fes el camí invers.',
    answer: '10',
    placeholder: 'x = …',
  },
  {
    id: 'fr4',
    badge: 'Troba la sortida y',
    prompt: '7 ──(+38)──► y',
    sub: 'Entra per l\'esquerra i segueix la fletxa.',
    answer: '45',
    placeholder: 'y = …',
  },
  {
    id: 'fr5',
    badge: 'Troba la sortida y',
    prompt: '6 ──(+9)──► y',
    sub: 'Entra per l\'esquerra i segueix la fletxa.',
    answer: '15',
    placeholder: 'y = …',
  },
  {
    id: 'fr6',
    badge: 'Descobreix la norma (?)',
    prompt: '7 ──(?)──► 13',
    sub: 'Quina operació transforma el primer nombre en el segon?',
    answer: '+6',
    accept: ['+6', '6'],
    placeholder: 'Ex: +…',
  },
  {
    id: 'fr7',
    badge: 'Troba la sortida y',
    prompt: '7 ──(+8)──► y',
    sub: 'Entra per l\'esquerra i segueix la fletxa.',
    answer: '15',
    placeholder: 'y = …',
  },
  {
    id: 'fr8',
    badge: 'Troba l\'entrada x',
    prompt: 'x ──(+8)──► 39',
    sub: 'Coneixes la sortida i la norma: fes l\'operació contrària.',
    answer: '31',
    placeholder: 'x = …',
  },
]

/** Estratègia per deduir la norma i l'entrada */
export const P57_STRATEGY_MC = [
  {
    id: 'st1',
    prompt: 'PER ACABAR: Quina estratègia serveix per deduir la norma (?) quan coneixes l\'entrada (x) i la sortida (y)?',
    options: [
      'Mirar si el nombre creix o disminueix i calcular la diferència entre la sortida i l\'entrada',
      'Sumar sempre l\'entrada i la sortida sense mirar la fletxa',
      'Posar el mateix nombre que hi ha a l\'entrada',
    ],
    correct: 'Mirar si el nombre creix o disminueix i calcular la diferència entre la sortida i l\'entrada',
  },
  {
    id: 'st2',
    prompt: 'Si coneixes la sortida (y) i la norma del robot, com trobes el nombre d\'entrada (x)?',
    options: [
      'Fent l\'operació inversa (contrària) a la norma des de la sortida',
      'Tornant a fer la mateixa operació de la norma sobre la sortida',
      'Multiplicant la sortida per la norma',
    ],
    correct: 'Fent l\'operació inversa (contrària) a la norma des de la sortida',
  },
]

/** Joc de cubs (Anàlisi de la partida Helena vs Leo) */
export const P58_GAME_ANALYSIS_MC = [
  {
    id: 'ga1',
    prompt: 'A la partida d\'exemple han sortit els cubs x = 5, 4, 6, 8. Per què guanya l\'Helena amb la norma +18 (suma = 95) i no en Leo amb +20 (suma = 103)?',
    options: [
      'Perquè l\'objectiu és apropar-se a 100 SENSE passar-se, i en Leo s\'ha passat de 100',
      'Perquè 95 és més gran que 103',
      'Perquè no es pot triar la norma +20',
    ],
    correct: 'Perquè l\'objectiu és apropar-se a 100 SENSE passar-se, i en Leo s\'ha passat de 100',
  },
  {
    id: 'ga2',
    prompt: 'Amb els mateixos cubs (5, 4, 6, 8), si algú tria la norma +19, quina seria la suma dels quatre valors de y?',
    options: [
      '99',
      '96',
      '100',
      '101',
    ],
    correct: '99',
  },
  {
    id: 'ga3',
    prompt: 'Si sumes una mateixa norma a cadascun dels 4 nombres x de la taula, quant augmenta la suma total respecte a la suma de les x?',
    options: [
      'Augmenta 4 vegades la norma, perquè la sumes a les 4 files',
      'Augmenta només 1 vegada la norma',
      'Es multiplica per 100',
    ],
    correct: 'Augmenta 4 vegades la norma, perquè la sumes a les 4 files',
  },
]

/** Activitat 1: Taula 1 (Funció +8) */
export const P59_TABLE_PLUS8 = [
  {
    id: 't1_1',
    badge: 'Norma: +8',
    prompt: 'Entrada x = 4   ───►   Sortida y =',
    sub: 'Aplica la funció +8 al valor d\'entrada x.',
    answer: '12',
    placeholder: 'y = …',
  },
  {
    id: 't1_2',
    badge: 'Norma: +8',
    prompt: 'Entrada x = 12   ───►   Sortida y =',
    sub: 'Aplica la funció +8 al valor d\'entrada x.',
    answer: '20',
    placeholder: 'y = …',
  },
  {
    id: 't1_3',
    badge: 'Norma: +8',
    prompt: 'Entrada x = 10   ───►   Sortida y =',
    sub: 'Aplica la funció +8 al valor d\'entrada x.',
    answer: '18',
    placeholder: 'y = …',
  },
  {
    id: 't1_4',
    badge: 'Norma: +8',
    prompt: 'Entrada x = 976   ───►   Sortida y =',
    sub: 'Aplica la funció +8 al valor d\'entrada x.',
    answer: '984',
    placeholder: 'y = …',
  },
  {
    id: 't1_5',
    badge: 'Norma: +8',
    prompt: 'Entrada x = 54   ───►   Sortida y =',
    sub: 'Aplica la funció +8 al valor d\'entrada x.',
    answer: '62',
    placeholder: 'y = …',
  },
  {
    id: 't1_6',
    badge: 'Norma: +8',
    prompt: 'Entrada x = 0   ───►   Sortida y =',
    sub: 'Aplica la funció +8 al valor d\'entrada x.',
    answer: '8',
    placeholder: 'y = …',
  },
]

/** Activitat 1: Taula 2 (Funció −5) */
export const P59_TABLE_MINUS5 = [
  {
    id: 't2_1',
    badge: 'Norma: −5',
    prompt: 'Entrada x = 203   ───►   Sortida y =',
    sub: 'Aplica la funció −5 al valor d\'entrada x.',
    answer: '198',
    placeholder: 'y = …',
  },
  {
    id: 't2_2',
    badge: 'Norma: −5',
    prompt: 'Entrada x = 137   ───►   Sortida y =',
    sub: 'Aplica la funció −5 al valor d\'entrada x.',
    answer: '132',
    placeholder: 'y = …',
  },
  {
    id: 't2_3',
    badge: 'Norma: −5',
    prompt: 'Entrada x = 81   ───►   Sortida y =',
    sub: 'Aplica la funció −5 al valor d\'entrada x.',
    answer: '76',
    placeholder: 'y = …',
  },
  {
    id: 't2_4',
    badge: 'Norma: −5',
    prompt: 'Entrada x = 76   ───►   Sortida y =',
    sub: 'Aplica la funció −5 al valor d\'entrada x.',
    answer: '71',
    placeholder: 'y = …',
  },
  {
    id: 't2_5',
    badge: 'Norma: −5',
    prompt: 'Entrada x = 12   ───►   Sortida y =',
    sub: 'Aplica la funció −5 al valor d\'entrada x.',
    answer: '7',
    placeholder: 'y = …',
  },
  {
    id: 't2_6',
    badge: 'Norma: −5',
    prompt: 'Entrada x = 954   ───►   Sortida y =',
    sub: 'Aplica la funció −5 al valor d\'entrada x.',
    answer: '949',
    placeholder: 'y = …',
  },
]

/** Activitat 1: Taula 3 (Funció ×2) */
export const P59_TABLE_MUL2 = [
  {
    id: 't3_1',
    badge: 'Norma: ×2',
    prompt: 'Entrada x = 3   ───►   Sortida y =',
    sub: 'Aplica la funció ×2 al valor d\'entrada x.',
    answer: '6',
    placeholder: 'y = …',
  },
  {
    id: 't3_2',
    badge: 'Norma: ×2',
    prompt: 'Entrada x = 16   ───►   Sortida y =',
    sub: 'Aplica la funció ×2 al valor d\'entrada x.',
    answer: '32',
    placeholder: 'y = …',
  },
  {
    id: 't3_3',
    badge: 'Norma: ×2',
    prompt: 'Entrada x = 21   ───►   Sortida y =',
    sub: 'Aplica la funció ×2 al valor d\'entrada x.',
    answer: '42',
    placeholder: 'y = …',
  },
  {
    id: 't3_4',
    badge: 'Norma: ×2',
    prompt: 'Entrada x = 344   ───►   Sortida y =',
    sub: 'Aplica la funció ×2 al valor d\'entrada x.',
    answer: '688',
    placeholder: 'y = …',
  },
  {
    id: 't3_5',
    badge: 'Norma: ×2',
    prompt: 'Entrada x = 108   ───►   Sortida y =',
    sub: 'Aplica la funció ×2 al valor d\'entrada x.',
    answer: '216',
    placeholder: 'y = …',
  },
  {
    id: 't3_6',
    badge: 'Norma: ×2',
    prompt: 'Entrada x = 65   ───►   Sortida y =',
    sub: 'Aplica la funció ×2 al valor d\'entrada x.',
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
      'Sí',
      'No',
      'Només si prems × 2 =',
    ],
    correct: 'Sí',
  },
  {
    id: 'pr2',
    prompt: '2b) Com ho saps que arribaràs a 15?',
    options: [
      'Perquè començant en un nombre senar (5) i sumant de 2 en 2 passem per tots els senars majors que 5',
      'Perquè tots els nombres acaben sortint a la calculadora',
      'Perquè 15 és un nombre parell',
    ],
    correct: 'Perquè començant en un nombre senar (5) i sumant de 2 en 2 passem per tots els senars majors que 5',
  },
  {
    id: 'pr3',
    prompt: '2c) I arribaràs a 20 començant pel 5 i sumant de 2 en 2?',
    options: [
      'No, mai',
      'Sí, prement = deu vegades',
      'Sí, just després del 18',
    ],
    correct: 'No, mai',
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
    badge: 'Desplaçament: Baixa 5 m',
    prompt: 'Ubicació inicial: −20 metres   ───►   Nova ubicació =',
    sub: 'Pensa si en baixar s\'allunya o s\'acosta a la superfície (0 m).',
    answer: '-25',
    accept: ['-25', '-25 m', '-25m', '-25 metres'],
    placeholder: 'Metres (amb signe)…',
  },
  {
    id: 'j2',
    badge: 'Desplaçament: Puja 5 m',
    prompt: 'Ubicació inicial: −10 metres   ───►   Nova ubicació =',
    sub: 'Pensa si en pujar s\'acosta cap al nivell del mar (0 m).',
    answer: '-5',
    accept: ['-5', '-5 m', '-5m', '-5 metres'],
    placeholder: 'Metres (amb signe)…',
  },
  {
    id: 'j3',
    badge: 'Desplaçament: Baixa 10 m',
    prompt: 'Ubicació inicial: −15 metres   ───►   Nova ubicació =',
    sub: 'Baixa més metres sota el nivell del mar.',
    answer: '-25',
    accept: ['-25', '-25 m', '-25m', '-25 metres'],
    placeholder: 'Metres (amb signe)…',
  },
  {
    id: 'j4',
    badge: 'Desplaçament: Puja 20 m',
    prompt: 'Ubicació inicial: −25 metres   ───►   Nova ubicació =',
    sub: 'Puja cap a la superfície sense arribar a sortir de l\'aigua.',
    answer: '-5',
    accept: ['-5', '-5 m', '-5m', '-5 metres'],
    placeholder: 'Metres (amb signe)…',
  },
]

/** Activitat 3: Suma o resta sense fer servir la calculadora */
export const P61_CALC_NO_CALC = [
  { id: 'nc1', badge: 'Operació 1', prompt: '(−7) + 4 =', answer: '-3' },
  { id: 'nc2', badge: 'Operació 2', prompt: '4 − 6 =', answer: '-2' },
  { id: 'nc3', badge: 'Operació 3', prompt: '(−7) − 8 =', answer: '-15' },
  { id: 'nc4', badge: 'Operació 4', prompt: '30 − 35 =', answer: '-5' },
  { id: 'nc5', badge: 'Operació 5', prompt: '10 − 12 =', answer: '-2' },
  { id: 'nc6', badge: 'Operació 6', prompt: '(−6) + 5 =', answer: '-1' },
  { id: 'nc7', badge: 'Operació 7', prompt: '60 − 50 =', answer: '10', accept: ['10', '+10'] },
  { id: 'nc8', badge: 'Operació 8', prompt: '6 − 9 =', answer: '-3' },
  { id: 'nc9', badge: 'Operació 9', prompt: '(−25) + 25 =', answer: '0', accept: ['0', '+0', '-0'] },
]

/** Activitat 4: Escriu = o ≠ */
export const P61_COMPARE_MC = [
  {
    id: 'cmp1',
    prompt: 'Compara les dues operacions:   9 − 12   ____   (−12) + 9',
    options: ['= (Donen el mateix resultat)', '≠ (Donen resultats diferents)'],
    correct: '= (Donen el mateix resultat)',
  },
  {
    id: 'cmp2',
    prompt: 'Compara les dues operacions:   0 − 15   ____   15 − 0',
    options: ['= (Donen el mateix resultat)', '≠ (Donen resultats diferents)'],
    correct: '≠ (Donen resultats diferents)',
  },
  {
    id: 'cmp3',
    prompt: 'Compara les dues operacions:   (−2) + 5   ____   (−5) − 2',
    options: ['= (Donen el mateix resultat)', '≠ (Donen resultats diferents)'],
    correct: '≠ (Donen resultats diferents)',
  },
  {
    id: 'cmp4',
    prompt: 'Compara les dues operacions:   (−7) − 1   ____   (−1) − 7',
    options: ['= (Donen el mateix resultat)', '≠ (Donen resultats diferents)'],
    correct: '= (Donen el mateix resultat)',
  },
]

/** MasterQuiz de repàs final (índex 0..3 a correct) */
export const FUNCIONS_ENTERS_QUIZ = [
  {
    question: 'Al robot de funcions amb norma +8, si hi entra un 10, quin nombre en surt?',
    options: ['2', '18', '80', '16'],
    correct: 1,
    hint: 'Aplica la norma de suma sobre el nombre que entra.',
  },
  {
    question: 'Al robot amb norma +8, si en surt un 16, quin nombre hi havia entrat?',
    options: ['24', '8', '6', '10'],
    correct: 1,
    hint: 'Com que busques l\'entrada, aplica l\'operació contrària a la norma.',
  },
  {
    question: 'Completa la funció amb fletxa cap a l\'esquerra: 13 ◄──(+7)── x. Quant val x?',
    options: ['20', '6', '7', '13'],
    correct: 1,
    hint: 'La fletxa surt de x i arriba a 13. Fes l\'operació inversa.',
  },
  {
    question: 'Completa: 7 ◄──(−18)── x. Quant val x?',
    options: ['11', '−11', '25', '18'],
    correct: 2,
    hint: 'Si en restar 18 queda 7, l\'entrada inicial havia de ser més gran.',
  },
  {
    question: 'Quina és la norma secreta a 25 ──(?)──► 25?',
    options: ['+25', '+1', '+0', '−25'],
    correct: 2,
    hint: 'Fixa\'t si el nombre ha canviat entre l\'entrada i la sortida.',
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
    hint: 'Recorda què li passava a qui superava el número 100.',
  },
  {
    question: 'A la calculadora, si la converteixes en funció −5 i prems 203 =, què surt?',
    options: ['208', '198', '195', '200'],
    correct: 1,
    hint: 'Aplica la norma guardada a la memòria sobre el nombre introduït.',
  },
  {
    question: 'A la calculadora amb funció ×2, si hi poses x = 344, quina sortida y obtens?',
    options: ['688', '346', '172', '648'],
    correct: 0,
    hint: 'Multiplica cada xifra pel factor de la funció.',
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
    hint: 'Pensa si els nombres que van sortint són parells o senars.',
  },
  {
    question: 'En Joan busseja a −20 m i baixa 15 m més. A quina profunditat és ara?',
    options: ['−5 m', '−35 m', '+35 m', '−15 m'],
    correct: 1,
    hint: 'Si ja és sota l\'aigua i baixa més, s\'allunya encara més del 0.',
  },
  {
    question: 'En Joan és a −25 m i puja 20 m cap a la superfície. On es troba ara?',
    options: ['−45 m', '+5 m', '−5 m', '0 m'],
    correct: 2,
    hint: 'Pujar vol dir apropar-se al 0, però fixa\'t si arriba a sortir de l\'aigua.',
  },
  {
    question: 'Quant dóna (−7) − 8 sense calculadora?',
    options: ['−1', '+1', '−15', '+15'],
    correct: 2,
    hint: 'Comences sota zero i baixes encara més.',
  },
  {
    question: 'Quant dóna (−25) + 25?',
    options: ['−50', '+50', '0', '−25'],
    correct: 2,
    hint: 'Si estàs sota l\'aigua i puges exactament la mateixa distància, on arribes?',
  },
  {
    question: 'Compara: 9 − 12  i  (−12) + 9',
    options: [
      'Són iguals (=)',
      'Són diferents (≠)',
      'Tots dos donen positiu',
      'No es poden calcular',
    ],
    correct: 0,
    hint: 'Calcula cada costat per separat tenint en compte el signe.',
  },
  {
    question: 'Compara: (−2) + 5  i  (−5) − 2',
    options: [
      'Són iguals (=)',
      'Són diferents (≠)',
      'Tots dos donen negatiu',
      'Tots dos donen positiu',
    ],
    correct: 1,
    hint: 'En el primer puges (+5) i en el segon baixes (−2).',
  },
]
