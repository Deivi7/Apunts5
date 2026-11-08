/** Bancs de dades i exercicis del tema perimetres_arees (Quadrats i Rectangles). */

/** Secció 2: Perímetre de quadrats i rectangles */
export const PERIM_SQUARES = [
  {
    id: 'ps1',
    badge: 'Quadrat',
    prompt: 'Quadrat de costat 6 cm   ───►   Perímetre =',
    sub: 'Recorda quants costats iguals té un quadrat.',
    answer: '24',
    accept: ['24', '24 cm', '24cm'],
    placeholder: 'cm',
  },
  {
    id: 'ps2',
    badge: 'Quadrat',
    prompt: 'Quadrat de costat 9 cm   ───►   Perímetre =',
    sub: 'Calcula la longitud total del contorn.',
    answer: '36',
    accept: ['36', '36 cm', '36cm'],
    placeholder: 'cm',
  },
  {
    id: 'ps3',
    badge: 'Quadrat',
    prompt: 'Quadrat de costat 15 m   ───►   Perímetre =',
    sub: 'Calcula la longitud total del contorn.',
    answer: '60',
    accept: ['60', '60 m', '60m'],
    placeholder: 'm',
  },
  {
    id: 'ps4',
    badge: 'Quadrat',
    prompt: 'Quadrat de costat 25 cm   ───►   Perímetre =',
    sub: 'Calcula la longitud total del contorn.',
    answer: '100',
    accept: ['100', '100 cm', '100cm'],
    placeholder: 'cm',
  },
]

export const PERIM_RECTANGLES = [
  {
    id: 'pr1',
    badge: 'Rectangle',
    prompt: 'Base = 8 cm  ·  Altura = 3 cm   ───►   Perímetre =',
    sub: 'Compte: recorda sumar tots els costats de la figura!',
    answer: '22',
    accept: ['22', '22 cm', '22cm'],
    placeholder: 'cm',
  },
  {
    id: 'pr2',
    badge: 'Rectangle',
    prompt: 'Base = 10 m  ·  Altura = 4 m   ───►   Perímetre =',
    sub: 'Calcula el contorn complet del rectangle.',
    answer: '28',
    accept: ['28', '28 m', '28m'],
    placeholder: 'm',
  },
  {
    id: 'pr3',
    badge: 'Rectangle',
    prompt: 'Base = 12 cm  ·  Altura = 5 cm   ───►   Perímetre =',
    sub: 'Calcula el contorn complet del rectangle.',
    answer: '34',
    accept: ['34', '34 cm', '34cm'],
    placeholder: 'cm',
  },
  {
    id: 'pr4',
    badge: 'Rectangle',
    prompt: 'Base = 20 m  ·  Altura = 15 m   ───►   Perímetre =',
    sub: 'Calcula el contorn complet del rectangle.',
    answer: '70',
    accept: ['70', '70 m', '70m'],
    placeholder: 'm',
  },
  {
    id: 'pr5',
    badge: 'Rectangle',
    prompt: 'Base = 7 cm  ·  Altura = 4 cm   ───►   Perímetre =',
    sub: 'Calcula el contorn complet del rectangle.',
    answer: '22',
    accept: ['22', '22 cm', '22cm'],
    placeholder: 'cm',
  },
  {
    id: 'pr6',
    badge: 'Rectangle',
    prompt: 'Base = 50 m  ·  Altura = 25 m   ───►   Perímetre =',
    sub: 'Calcula el contorn complet del rectangle.',
    answer: '150',
    accept: ['150', '150 m', '150m'],
    placeholder: 'm',
  },
]

export const PERIM_TRAPS_MC = [
  {
    id: 'pt1',
    prompt: 'Un company diu que el perímetre d\'un rectangle de base 10 cm i altura 6 cm és 16 cm. Quina errada ha comès?',
    options: [
      'Només ha sumat dos costats (una base i una altura) i s\'ha deixat els altres dos costats',
      'Havia de multiplicar la base per l\'altura',
      'Cap errada, el perímetre és 16 cm',
    ],
    correct: 'Només ha sumat dos costats (una base i una altura) i s\'ha deixat els altres dos costats',
  },
  {
    id: 'pt2',
    prompt: 'En quines unitats es mesura sempre el perímetre d\'una figura?',
    options: [
      'En unitats de longitud normals (cm, m, km…), perquè és una longitud al voltant de la figura',
      'En centímetres quadrats (cm²) o metres quadrats (m²)',
      'En litres (l)',
    ],
    correct: 'En unitats de longitud normals (cm, m, km…), perquè és una longitud al voltant de la figura',
  },
]

/** Secció 3: Àrea de quadrats i rectangles */
export const AREA_SQUARES = [
  {
    id: 'as1',
    badge: 'Quadrat',
    prompt: 'Quadrat de costat 5 cm   ───►   Àrea =',
    sub: 'Calcula la superfície interior en cm² (no ho confonguis amb el perímetre!).',
    answer: '25',
    accept: ['25', '25 cm2', '25 cm²', '25cm2', '25cm²'],
    placeholder: 'cm²',
  },
  {
    id: 'as2',
    badge: 'Quadrat',
    prompt: 'Quadrat de costat 8 cm   ───►   Àrea =',
    sub: 'Calcula la superfície interior en cm².',
    answer: '64',
    accept: ['64', '64 cm2', '64 cm²', '64cm2', '64cm²'],
    placeholder: 'cm²',
  },
  {
    id: 'as3',
    badge: 'Quadrat',
    prompt: 'Quadrat de costat 10 m   ───►   Àrea =',
    sub: 'Calcula la superfície interior en m².',
    answer: '100',
    accept: ['100', '100 m2', '100 m²', '100m2', '100m²'],
    placeholder: 'm²',
  },
  {
    id: 'as4',
    badge: 'Quadrat',
    prompt: 'Quadrat de costat 12 cm   ───►   Àrea =',
    sub: 'Calcula la superfície interior en cm².',
    answer: '144',
    accept: ['144', '144 cm2', '144 cm²', '144cm2', '144cm²'],
    placeholder: 'cm²',
  },
]

export const AREA_RECTANGLES = [
  {
    id: 'ar1',
    badge: 'Rectangle',
    prompt: 'Base = 7 cm  ·  Altura = 4 cm   ───►   Àrea =',
    sub: 'Calcula quants quadradets d\'1 cm² caben a l\'interior.',
    answer: '28',
    accept: ['28', '28 cm2', '28 cm²', '28cm2', '28cm²'],
    placeholder: 'cm²',
  },
  {
    id: 'ar2',
    badge: 'Rectangle',
    prompt: 'Base = 9 m  ·  Altura = 6 m   ───►   Àrea =',
    sub: 'Calcula la superfície interior en m².',
    answer: '54',
    accept: ['54', '54 m2', '54 m²', '54m2', '54m²'],
    placeholder: 'm²',
  },
  {
    id: 'ar3',
    badge: 'Rectangle',
    prompt: 'Base = 15 m  ·  Altura = 4 m   ───►   Àrea =',
    sub: 'Calcula la superfície interior en m².',
    answer: '60',
    accept: ['60', '60 m2', '60 m²', '60m2', '60m²'],
    placeholder: 'm²',
  },
  {
    id: 'ar4',
    badge: 'Rectangle',
    prompt: 'Base = 11 cm  ·  Altura = 8 cm   ───►   Àrea =',
    sub: 'Calcula la superfície interior en cm².',
    answer: '88',
    accept: ['88', '88 cm2', '88 cm²', '88cm2', '88cm²'],
    placeholder: 'cm²',
  },
  {
    id: 'ar5',
    badge: 'Rectangle',
    prompt: 'Base = 20 m  ·  Altura = 9 m   ───►   Àrea =',
    sub: 'Calcula la superfície interior en m².',
    answer: '180',
    accept: ['180', '180 m2', '180 m²', '180m2', '180m²'],
    placeholder: 'm²',
  },
  {
    id: 'ar6',
    badge: 'Rectangle',
    prompt: 'Base = 14 cm  ·  Altura = 10 cm   ───►   Àrea =',
    sub: 'Calcula la superfície interior en cm².',
    answer: '140',
    accept: ['140', '140 cm2', '140 cm²', '140cm2', '140cm²'],
    placeholder: 'cm²',
  },
]

export const AREA_VS_PERIM_TF = [
  {
    id: 'ap1',
    prompt: 'L\'àrea mesura la superfície de dins d\'una figura i s\'expressa en unitats quadrades (cm², m²).',
    correct: true,
  },
  {
    id: 'ap2',
    prompt: 'L\'àrea d\'un quadrat de costat 6 cm és 24 cm².',
    correct: false,
  },
  {
    id: 'ap3',
    prompt: 'Per posar una tanca al voltant d\'un jardí hem de calcular el perímetre; per posar gespa a tot el terra hem de calcular l\'àrea.',
    correct: true,
  },
  {
    id: 'ap4',
    prompt: 'Dues figures poden tenir el mateix perímetre però àrees diferents.',
    correct: true,
  },
]

/** Secció 4: Reptes inversos (trobar el costat que falta) */
export const INVERSE_CHALLENGES = [
  {
    id: 'inv1',
    badge: 'Perímetre conegut → Busca el costat',
    prompt: 'Un quadrat té un perímetre total de 36 cm. Quant mesura cada costat?',
    sub: 'Pensa com es reparteix el perímetre total entre els costats iguals del quadrat.',
    answer: '9',
    accept: ['9', '9 cm', '9cm'],
    placeholder: 'Costat (cm)…',
  },
  {
    id: 'inv2',
    badge: 'Perímetre conegut → Busca el costat',
    prompt: 'Un quadrat té un perímetre total de 80 m. Quant mesura cada costat?',
    sub: 'Tots els costats d\'un quadrat mesuren el mateix.',
    answer: '20',
    accept: ['20', '20 m', '20m'],
    placeholder: 'Costat (m)…',
  },
  {
    id: 'inv3',
    badge: 'Àrea coneguda → Busca el costat',
    prompt: 'Un quadrat té una àrea de 49 cm². Quant mesura el seu costat?',
    sub: 'Recorda com es calcula l\'àrea d\'un quadrat i busca quin costat dóna 49.',
    answer: '7',
    accept: ['7', '7 cm', '7cm'],
    placeholder: 'Costat (cm)…',
  },
  {
    id: 'inv4',
    badge: 'Àrea coneguda → Busca el costat',
    prompt: 'Un quadrat té una àrea de 81 m². Quant mesura el seu costat?',
    sub: 'Busca quin nombre multiplicat per ell mateix dóna l\'àrea.',
    answer: '9',
    accept: ['9', '9 m', '9m'],
    placeholder: 'Costat (m)…',
  },
  {
    id: 'inv5',
    badge: 'Àrea de rectangle → Busca l\'altura',
    prompt: 'Un rectangle té una àrea de 45 cm² i la base mesura 9 cm. Quant mesura l\'altura?',
    sub: 'Fes l\'operació inversa de la fórmula de l\'àrea del rectangle.',
    answer: '5',
    accept: ['5', '5 cm', '5cm'],
    placeholder: 'Altura (cm)…',
  },
  {
    id: 'inv6',
    badge: 'Perímetre de rectangle → Busca l\'altura',
    prompt: 'Un rectangle té un perímetre de 30 cm i la base mesura 10 cm. Quant mesura l\'altura?',
    sub: 'Tingues en compte que el rectangle té dues bases i dues altures.',
    answer: '5',
    accept: ['5', '5 cm', '5cm'],
    placeholder: 'Altura (cm)…',
  },
]

/** Secció 5: Problemes de la vida real */
export const REAL_WORLD_PROBLEMS_MC = [
  {
    id: 'rw1',
    prompt: '1. Volem posar una tanca de fusta al voltant d\'un hort rectangular de 12 m de llarg i 8 m d\'ample. Quants metres de tanca necessitem?',
    options: [
      '40 m de tanca',
      '96 m de tanca',
      '20 m de tanca',
    ],
    correct: '40 m de tanca',
  },
  {
    id: 'rw2',
    prompt: '2. Ara volem plantar gespa a tot l\'interior del mateix hort (12 m de llarg per 8 m d\'ample). Quants metres quadrats (m²) de gespa calen?',
    options: [
      '96 m² de gespa',
      '40 m² de gespa',
      '20 m² de gespa',
    ],
    correct: '96 m² de gespa',
  },
  {
    id: 'rw3',
    prompt: '3. Una habitació quadrada fa 4 m de costat. Si el parquet costa 10 € per cada metre quadrat (m²), quant costarà posar parquet a tota l\'habitació?',
    options: [
      '160 €',
      '40 €',
      '80 €',
    ],
    correct: '160 €',
  },
  {
    id: 'rw4',
    prompt: '4. Un camp de futbol sala fa 40 m de llarg i 20 m d\'ample. Si un jugador fa 2 voltes completes seguint les línies de la vora del camp, quants metres ha corregut?',
    options: [
      '240 m',
      '800 m',
      '120 m',
    ],
    correct: '240 m',
  },
]

export const REAL_WORLD_BLANKS = [
  {
    id: 'rwb1',
    badge: 'Marc exterior del quadre',
    prompt: 'Un quadre rectangular fa 30 cm de base i 20 cm d\'altura. Quants cm de llistó de fusta calen per fer el marc?',
    sub: 'Pensa si el marc va per la vora exterior o per l\'interior.',
    answer: '100',
    accept: ['100', '100 cm', '100cm'],
    placeholder: 'cm de llistó…',
  },
  {
    id: 'rwb2',
    badge: 'Vidre interior del quadre',
    prompt: 'Pel mateix quadre de 30 cm × 20 cm, quants cm² de vidre necessitem per cobrir-lo tot per dins?',
    sub: 'Pensa si el vidre cobreix la superfície interior.',
    answer: '600',
    accept: ['600', '600 cm2', '600 cm²', '600cm2', '600cm²'],
    placeholder: 'cm² de vidre…',
  },
]

/** MasterQuiz de repàs final */
export const PERIMETRES_AREES_QUIZ = [
  {
    question: 'Què mesura el perímetre d\'un polígon?',
    options: [
      'La superfície de dins en quadradets',
      'La longitud total del seu contorn (la suma de tots els costats)',
      'Només la base multiplicada per l\'altura',
      'El nombre de vèrtexs',
    ],
    correct: 1,
    hint: 'Pensa en la tanca exterior que envolta una figura.',
  },
  {
    question: 'Quin és el perímetre d\'un quadrat de 7 cm de costat?',
    options: ['14 cm', '28 cm', '49 cm', '21 cm'],
    correct: 1,
    hint: 'Recorda quants costats iguals té un quadrat i suma\'ls tots.',
  },
  {
    question: 'Quina és l\'àrea d\'un quadrat de 7 cm de costat?',
    options: ['28 cm²', '14 cm²', '49 cm²', '70 cm²'],
    correct: 2,
    hint: 'L\'àrea és la superfície interior: multiplica el costat per ell mateix.',
  },
  {
    question: 'Quin és el perímetre d\'un rectangle de base 9 cm i altura 4 cm?',
    options: ['13 cm', '26 cm', '36 cm', '18 cm'],
    correct: 1,
    hint: 'No t\'oblidis que té dues bases i dues altures!',
  },
  {
    question: 'Quina és l\'àrea d\'un rectangle de base 9 cm i altura 4 cm?',
    options: ['26 cm²', '13 cm²', '36 cm²', '45 cm²'],
    correct: 2,
    hint: 'Multiplica les columnes de la base per les files de l\'altura.',
  },
  {
    question: 'Si volem enrajolar el terra d\'una cuina, què hem de calcular?',
    options: ['El perímetre en metres (m)', 'L\'àrea en metres quadrats (m²)', 'Només un costat', 'El volum en litres'],
    correct: 1,
    hint: 'Les rajoles cobreixen tota la superfície de dins del terra.',
  },
  {
    question: 'Un quadrat té un perímetre de 40 cm. Quant mesura el seu costat?',
    options: ['10 cm', '20 cm', '160 cm', '8 cm'],
    correct: 0,
    hint: 'Reparteix el perímetre total entre els quatre costats iguals.',
  },
  {
    question: 'Un quadrat té una àrea de 64 cm². Quant mesura el seu costat?',
    options: ['16 cm', '8 cm', '32 cm', '6 cm'],
    correct: 1,
    hint: 'Quin nombre multiplicat per ell mateix dóna 64?',
  },
  {
    question: 'Un rectangle té una àrea de 50 m² i una base de 10 m. Quant mesura la seva altura?',
    options: ['40 m', '5 m', '15 m', '25 m'],
    correct: 1,
    hint: 'Busca quin nombre multiplicat per la base dóna l\'àrea total.',
  },
  {
    question: 'Quina figura té MÉS àrea: un quadrat de costat 6 cm o un rectangle de 9 cm × 3 cm?',
    options: [
      'El quadrat de costat 6 cm',
      'El rectangle de 9 cm × 3 cm',
      'Tenen exactament la mateixa àrea',
      'No es pot saber',
    ],
    correct: 0,
    hint: 'Calcula l\'àrea de cadascuna per separat i compara els dos nombres.',
  },
]
