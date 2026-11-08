/** Bancs de dades i exercicis del tema perimetres_arees (Quadrats i Rectangles). */

/** Secció 2: Perímetre de quadrats i rectangles */
export const PERIM_SQUARES = [
  {
    id: 'ps1',
    badge: 'Quadrat (4 costats iguals)',
    prompt: 'Quadrat de costat 6 cm  →  Perímetre =',
    sub: 'Suma els 4 costats (6 + 6 + 6 + 6) o multiplica 4 × 6',
    answer: '24',
    accept: ['24', '24 cm', '24cm'],
    placeholder: 'cm',
  },
  {
    id: 'ps2',
    badge: 'Quadrat (4 costats iguals)',
    prompt: 'Quadrat de costat 9 cm  →  Perímetre =',
    sub: 'Calcula: 4 × 9',
    answer: '36',
    accept: ['36', '36 cm', '36cm'],
    placeholder: 'cm',
  },
  {
    id: 'ps3',
    badge: 'Quadrat (4 costats iguals)',
    prompt: 'Quadrat de costat 15 m  →  Perímetre =',
    sub: 'Calcula: 4 × 15',
    answer: '60',
    accept: ['60', '60 m', '60m'],
    placeholder: 'm',
  },
  {
    id: 'ps4',
    badge: 'Quadrat (4 costats iguals)',
    prompt: 'Quadrat de costat 25 cm  →  Perímetre =',
    sub: 'Calcula: 4 × 25',
    answer: '100',
    accept: ['100', '100 cm', '100cm'],
    placeholder: 'cm',
  },
]

export const PERIM_RECTANGLES = [
  {
    id: 'pr1',
    badge: 'Rectangle (2 bases + 2 altures)',
    prompt: 'Rectangle de base 8 cm i altura 3 cm  →  Perímetre =',
    sub: 'Suma els 4 costats: 8 + 8 + 3 + 3 (Compte: no oblidis cap costat!)',
    answer: '22',
    accept: ['22', '22 cm', '22cm'],
    placeholder: 'cm',
  },
  {
    id: 'pr2',
    badge: 'Rectangle (2 bases + 2 altures)',
    prompt: 'Rectangle de base 10 m i altura 4 m  →  Perímetre =',
    sub: 'Suma els 4 costats: 10 + 10 + 4 + 4',
    answer: '28',
    accept: ['28', '28 m', '28m'],
    placeholder: 'm',
  },
  {
    id: 'pr3',
    badge: 'Rectangle (2 bases + 2 altures)',
    prompt: 'Rectangle de base 12 cm i altura 5 cm  →  Perímetre =',
    sub: 'Suma els 4 costats: 12 + 12 + 5 + 5',
    answer: '34',
    accept: ['34', '34 cm', '34cm'],
    placeholder: 'cm',
  },
  {
    id: 'pr4',
    badge: 'Rectangle (2 bases + 2 altures)',
    prompt: 'Rectangle de base 20 m i altura 15 m  →  Perímetre =',
    sub: 'Suma els 4 costats: 20 + 20 + 15 + 15',
    answer: '70',
    accept: ['70', '70 m', '70m'],
    placeholder: 'm',
  },
  {
    id: 'pr5',
    badge: 'Rectangle (2 bases + 2 altures)',
    prompt: 'Rectangle de base 7 cm i altura 4 cm  →  Perímetre =',
    sub: 'Suma els 4 costats: 7 + 7 + 4 + 4',
    answer: '22',
    accept: ['22', '22 cm', '22cm'],
    placeholder: 'cm',
  },
  {
    id: 'pr6',
    badge: 'Rectangle (2 bases + 2 altures)',
    prompt: 'Rectangle de base 50 m i altura 25 m  →  Perímetre =',
    sub: 'Suma els 4 costats: 50 + 50 + 25 + 25',
    answer: '150',
    accept: ['150', '150 m', '150m'],
    placeholder: 'm',
  },
]

export const PERIM_TRAPS_MC = [
  {
    id: 'pt1',
    prompt: 'Un company diu que el perímetre d\'un rectangle de base 10 cm i altura 6 cm és 16 cm (perquè ha fet 10 + 6). Quina errada ha comès?',
    options: [
      'Només ha sumat 2 costats i un rectangle en té 4: cal fer 10 + 10 + 6 + 6 = 32 cm',
      'Havia de multiplicar 10 × 6 = 60 cm',
      'Cap errada, el perímetre és 16 cm',
    ],
    correct: 'Només ha sumat 2 costats i un rectangle en té 4: cal fer 10 + 10 + 6 + 6 = 32 cm',
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
    badge: 'Àrea del quadrat (costat × costat)',
    prompt: 'Quadrat de costat 5 cm  →  Àrea =',
    sub: 'Multiplica costat per costat: 5 × 5 (NO facis 5 × 4!)',
    answer: '25',
    accept: ['25', '25 cm2', '25 cm²', '25cm2', '25cm²'],
    placeholder: 'cm²',
  },
  {
    id: 'as2',
    badge: 'Àrea del quadrat (costat × costat)',
    prompt: 'Quadrat de costat 8 cm  →  Àrea =',
    sub: 'Multiplica costat per costat: 8 × 8',
    answer: '64',
    accept: ['64', '64 cm2', '64 cm²', '64cm2', '64cm²'],
    placeholder: 'cm²',
  },
  {
    id: 'as3',
    badge: 'Àrea del quadrat (costat × costat)',
    prompt: 'Quadrat de costat 10 m  →  Àrea =',
    sub: 'Multiplica costat per costat: 10 × 10',
    answer: '100',
    accept: ['100', '100 m2', '100 m²', '100m2', '100m²'],
    placeholder: 'm²',
  },
  {
    id: 'as4',
    badge: 'Àrea del quadrat (costat × costat)',
    prompt: 'Quadrat de costat 12 cm  →  Àrea =',
    sub: 'Multiplica costat per costat: 12 × 12',
    answer: '144',
    accept: ['144', '144 cm2', '144 cm²', '144cm2', '144cm²'],
    placeholder: 'cm²',
  },
]

export const AREA_RECTANGLES = [
  {
    id: 'ar1',
    badge: 'Àrea del rectangle (base × altura)',
    prompt: 'Rectangle de base 7 cm i altura 4 cm  →  Àrea =',
    sub: 'Multiplica les 7 columnes per les 4 files: 7 × 4',
    answer: '28',
    accept: ['28', '28 cm2', '28 cm²', '28cm2', '28cm²'],
    placeholder: 'cm²',
  },
  {
    id: 'ar2',
    badge: 'Àrea del rectangle (base × altura)',
    prompt: 'Rectangle de base 9 m i altura 6 m  →  Àrea =',
    sub: 'Multiplica base per altura: 9 × 6',
    answer: '54',
    accept: ['54', '54 m2', '54 m²', '54m2', '54m²'],
    placeholder: 'm²',
  },
  {
    id: 'ar3',
    badge: 'Àrea del rectangle (base × altura)',
    prompt: 'Rectangle de base 15 m i altura 4 m  →  Àrea =',
    sub: 'Multiplica base per altura: 15 × 4',
    answer: '60',
    accept: ['60', '60 m2', '60 m²', '60m2', '60m²'],
    placeholder: 'm²',
  },
  {
    id: 'ar4',
    badge: 'Àrea del rectangle (base × altura)',
    prompt: 'Rectangle de base 11 cm i altura 8 cm  →  Àrea =',
    sub: 'Multiplica base per altura: 11 × 8',
    answer: '88',
    accept: ['88', '88 cm2', '88 cm²', '88cm2', '88cm²'],
    placeholder: 'cm²',
  },
  {
    id: 'ar5',
    badge: 'Àrea del rectangle (base × altura)',
    prompt: 'Rectangle de base 20 m i altura 9 m  →  Àrea =',
    sub: 'Multiplica base per altura: 20 × 9',
    answer: '180',
    accept: ['180', '180 m2', '180 m²', '180m2', '180m²'],
    placeholder: 'm²',
  },
  {
    id: 'ar6',
    badge: 'Àrea del rectangle (base × altura)',
    prompt: 'Rectangle de base 14 cm i altura 10 cm  →  Àrea =',
    sub: 'Multiplica base per altura: 14 × 10',
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
    prompt: 'L\'àrea d\'un quadrat de costat 6 cm és 24 cm² (perquè fem 6 × 4).',
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
    sub: 'Com que els 4 costats són iguals, divideix el perímetre entre 4: 36 ÷ 4',
    answer: '9',
    accept: ['9', '9 cm', '9cm'],
    placeholder: 'Costat (cm)…',
  },
  {
    id: 'inv2',
    badge: 'Perímetre conegut → Busca el costat',
    prompt: 'Un quadrat té un perímetre total de 80 m. Quant mesura cada costat?',
    sub: 'Divideix el perímetre entre 4 costats: 80 ÷ 4',
    answer: '20',
    accept: ['20', '20 m', '20m'],
    placeholder: 'Costat (m)…',
  },
  {
    id: 'inv3',
    badge: 'Àrea coneguda → Busca el costat',
    prompt: 'Un quadrat té una àrea de 49 cm². Quant mesura el seu costat?',
    sub: 'Quin nombre multiplicat per ell mateix dóna 49? (? × ? = 49)',
    answer: '7',
    accept: ['7', '7 cm', '7cm'],
    placeholder: 'Costat (cm)…',
  },
  {
    id: 'inv4',
    badge: 'Àrea coneguda → Busca el costat',
    prompt: 'Un quadrat té una àrea de 81 m². Quant mesura el seu costat?',
    sub: 'Quin nombre multiplicat per ell mateix dóna 81? (? × ? = 81)',
    answer: '9',
    accept: ['9', '9 m', '9m'],
    placeholder: 'Costat (m)…',
  },
  {
    id: 'inv5',
    badge: 'Àrea de rectangle → Busca l\'altura',
    prompt: 'Un rectangle té una àrea de 45 cm² i la base mesura 9 cm. Quant mesura l\'altura?',
    sub: 'Si 9 × altura = 45, divideix l\'àrea entre la base: 45 ÷ 9',
    answer: '5',
    accept: ['5', '5 cm', '5cm'],
    placeholder: 'Altura (cm)…',
  },
  {
    id: 'inv6',
    badge: 'Perímetre de rectangle → Busca l\'altura',
    prompt: 'Un rectangle té un perímetre de 30 cm i la base mesura 10 cm. Quant mesura l\'altura?',
    sub: 'Les dues bases sumen 10 + 10 = 20 cm. Falten 10 cm a repartir entre les 2 altures (10 ÷ 2)',
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
      '40 m de tanca (Perímetre = 12 + 12 + 8 + 8)',
      '96 m de tanca (12 × 8)',
      '20 m de tanca (12 + 8)',
    ],
    correct: '40 m de tanca (Perímetre = 12 + 12 + 8 + 8)',
  },
  {
    id: 'rw2',
    prompt: '2. Ara volem plantar gespa a tot l\'interior del mateix hort (12 m de llarg per 8 m d\'ample). Quants metres quadrats (m²) de gespa calen?',
    options: [
      '96 m² de gespa (Àrea = 12 × 8)',
      '40 m² de gespa (12 + 12 + 8 + 8)',
      '20 m² de gespa',
    ],
    correct: '96 m² de gespa (Àrea = 12 × 8)',
  },
  {
    id: 'rw3',
    prompt: '3. Una habitació quadrada fa 4 m de costat. Si el parquet costa 10 € per cada metre quadrat (m²), quant costarà posar parquet a tota l\'habitació?',
    options: [
      '160 € (perquè l\'àrea és 4 × 4 = 16 m², i 16 × 10 € = 160 €)',
      '40 € (perquè 4 × 10 = 40 €)',
      '80 €',
    ],
    correct: '160 € (perquè l\'àrea és 4 × 4 = 16 m², i 16 × 10 € = 160 €)',
  },
  {
    id: 'rw4',
    prompt: '4. Un camp de futbol sala fa 40 m de llarg i 20 m d\'ample. Si un jugador fa 2 voltes completes seguint les línies de la vora del camp, quants metres ha corregut?',
    options: [
      '240 m (1 volta és el perímetre: 40+40+20+20 = 120 m; 2 voltes són 240 m)',
      '800 m (40 × 20)',
      '120 m',
    ],
    correct: '240 m (1 volta és el perímetre: 40+40+20+20 = 120 m; 2 voltes són 240 m)',
  },
]

export const REAL_WORLD_BLANKS = [
  {
    id: 'rwb1',
    badge: 'Marc d\'un quadre (Perímetre)',
    prompt: 'Un quadre rectangular fa 30 cm de base i 20 cm d\'altura. Quants cm de llistó de fusta calen per fer el marc?',
    sub: 'Calcula el perímetre: 30 + 30 + 20 + 20',
    answer: '100',
    accept: ['100', '100 cm', '100cm'],
    placeholder: 'cm de llistó…',
  },
  {
    id: 'rwb2',
    badge: 'Vidre del quadre (Àrea)',
    prompt: 'Pel mateix quadre de 30 cm × 20 cm, quants cm² de vidre necessitem per cobrir-lo tot per dins?',
    sub: 'Calcula l\'àrea: 30 × 20',
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
    hint: 'Perímetre = vora exterior (com una tanca).',
  },
  {
    question: 'Quin és el perímetre d\'un quadrat de 7 cm de costat?',
    options: ['14 cm', '28 cm', '49 cm', '21 cm'],
    correct: 1,
    hint: 'Té 4 costats iguals: 4 × 7 = 28 cm.',
  },
  {
    question: 'Quina és l\'àrea d\'un quadrat de 7 cm de costat?',
    options: ['28 cm²', '14 cm²', '49 cm²', '70 cm²'],
    correct: 2,
    hint: 'Àrea del quadrat = costat × costat = 7 × 7 = 49 cm².',
  },
  {
    question: 'Quin és el perímetre d\'un rectangle de base 9 cm i altura 4 cm?',
    options: ['13 cm', '26 cm', '36 cm', '18 cm'],
    correct: 1,
    hint: 'Suma els 4 costats: 9 + 9 + 4 + 4 = 26 cm.',
  },
  {
    question: 'Quina és l\'àrea d\'un rectangle de base 9 cm i altura 4 cm?',
    options: ['26 cm²', '13 cm²', '36 cm²', '45 cm²'],
    correct: 2,
    hint: 'Àrea del rectangle = base × altura = 9 × 4 = 36 cm².',
  },
  {
    question: 'Si volem enrajolar el terra d\'una cuina, què hem de calcular?',
    options: ['El perímetre en metres (m)', 'L\'àrea en metres quadrats (m²)', 'Només un costat', 'El volum en litres'],
    correct: 1,
    hint: 'Cobrir el terra per dins és superfície → Àrea (m²).',
  },
  {
    question: 'Un quadrat té un perímetre de 40 cm. Quant mesura el seu costat?',
    options: ['10 cm', '20 cm', '160 cm', '8 cm'],
    correct: 0,
    hint: '40 ÷ 4 costats iguals = 10 cm cada costat.',
  },
  {
    question: 'Un quadrat té una àrea de 64 cm². Quant mesura el seu costat?',
    options: ['16 cm', '8 cm', '32 cm', '6 cm'],
    correct: 1,
    hint: '8 × 8 = 64 → el costat mesura 8 cm.',
  },
  {
    question: 'Un rectangle té una àrea de 50 m² i una base de 10 m. Quant mesura la seva altura?',
    options: ['40 m', '5 m', '15 m', '25 m'],
    correct: 1,
    hint: '10 × 5 = 50 m² → l\'altura és 5 m.',
  },
  {
    question: 'Quina figura té MÉS àrea: un quadrat de costat 6 cm o un rectangle de 9 cm × 3 cm?',
    options: [
      'El quadrat de costat 6 cm (perquè 6 × 6 = 36 cm² > 27 cm²)',
      'El rectangle de 9 cm × 3 cm (perquè 9 × 3 = 27 cm²)',
      'Tenen exactament la mateixa àrea',
      'No es pot saber',
    ],
    correct: 0,
    hint: 'Encara que tots dos tenen perímetre 24 cm, el quadrat té àrea 36 cm² i el rectangle 27 cm²!',
  },
]

