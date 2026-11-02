/** Bancos examen català 15-10, Pro i entrenador infinit (legacy catala/posat_a_prova_1). */

export const EX1_WORDS = [
  { word: 'Número', syllables: ['Nú', 'me', 'ro'], tonicIdx: 0 },
  { word: 'Dissabte', syllables: ['Dis', 'sab', 'te'], tonicIdx: 1 },
  { word: 'Sabata', syllables: ['Sa', 'ba', 'ta'], tonicIdx: 1 },
  { word: 'Camisa', syllables: ['Ca', 'mi', 'sa'], tonicIdx: 1 },
  { word: 'Menjador', syllables: ['Men', 'ja', 'dor'], tonicIdx: 2 },
  { word: 'Ordre', syllables: ['Or', 'dre'], tonicIdx: 0 },
  { word: 'Ordinaris', syllables: ['Or', 'di', 'na', 'ris'], tonicIdx: 2 },
  { word: 'Sabó', syllables: ['Sa', 'bó'], tonicIdx: 1 },
  { word: 'Cadira', syllables: ['Ca', 'di', 'ra'], tonicIdx: 1 },
  { word: 'Cargol', syllables: ['Car', 'gol'], tonicIdx: 1 },
]

export const EX2_ROWS = [
  { word: 'Finestres', gender: 'F', number: 'P' },
  { word: 'Taula', gender: 'F', number: 'S' },
  { word: 'Llibre', gender: 'M', number: 'S' },
  { word: 'Mapes', gender: 'M', number: 'P' },
  { word: 'Ploma', gender: 'F', number: 'S' },
  { word: 'Màquines', gender: 'F', number: 'P' },
  { word: 'Jocs', gender: 'M', number: 'P' },
  { word: 'Llibreta', gender: 'F', number: 'S' },
  { word: 'Plàtans', gender: 'M', number: 'P' },
  { word: 'Tassa', gender: 'F', number: 'S' },
]

export const EX3_ITEMS = [
  { word: 'Banyera', correctSplit: 'ba-nye-ra', tonic: 'nye' },
  { word: 'Balena', correctSplit: 'ba-le-na', tonic: 'le' },
  { word: 'Classe', correctSplit: 'clas-se', tonic: 'clas' },
  { word: 'Peix', correctSplit: 'peix', tonic: 'peix' },
  { word: 'Llop', correctSplit: 'llop', tonic: 'llop' },
  { word: 'Calaix', correctSplit: 'ca-laix', tonic: 'laix' },
  { word: 'Col·legi', correctSplit: 'col-le-gi', tonic: 'le' },
  { word: 'Quadrat', correctSplit: 'qua-drat', tonic: 'drat' },
  { word: 'Carretera', correctSplit: 'car-re-te-ra', tonic: 'te' },
  { word: 'Fetge', correctSplit: 'fet-ge', tonic: 'fet' },
]

export const EX4_COLLECTIVES = [
  { id: 'pineda', prompt: 'Pineda → individual', accept: ['pi', 'pins'] },
  { id: 'colomar', prompt: 'Colomar → individual', accept: ['colom', 'coloms'] },
  { id: 'orquestra', prompt: 'Orquestra → individual', accept: ['músic', 'music', 'músics', 'instrumentista'] },
  { id: 'equip', prompt: 'Equip → individual', accept: ['jugador', 'jugadors'] },
  { id: 'eixam', prompt: 'Eixam → individual', accept: ['abella', 'abelles'] },
]

export const EX5_READING = [
  {
    id: 'r1',
    prompt: 'Com respiren els dofins si viuen a l\'aigua?',
    options: [
      'Amb brànquies com els peixos',
      'Mitjançant l\'espiracle al cap',
      'Absorbint oxigen per la pell',
    ],
    correct: 'Mitjançant l\'espiracle al cap',
  },
  {
    id: 'r2',
    prompt: 'Quins sons utilitzen per comunicar-se?',
    options: ['Clics, xiulets i crits', 'Només rugits greus', 'Cop de cua a l\'aigua'],
    correct: 'Clics, xiulets i crits',
  },
  {
    id: 'r3',
    prompt: 'Per a què serveix l\'ecolocalització?',
    options: [
      'Per nedar més ràpid',
      'Per detectar obstacles i menjar amb ones de so',
      'Per avisar pescadors',
    ],
    correct: 'Per detectar obstacles i menjar amb ones de so',
  },
  {
    id: 'r4',
    prompt: 'De què s\'alimenten principalment?',
    options: ['Algues i plàncton', 'Peixos petits i calamars', 'Crancs i cloïsses'],
    correct: 'Peixos petits i calamars',
  },
  {
    id: 'r5',
    prompt: 'Què fan a prop de les embarcacions?',
    options: [
      'Amagar-se al fons',
      'Saltar o fer acrobàcies',
      'Empènyer vaixells a la costa',
    ],
    correct: 'Saltar o fer acrobàcies',
  },
]

export const EX6_HUNT = {
  mono: { title: '5 monosíl·labes', min: 5, options: ['molt', 'que', 'són', 'com', 'del', 'cap', 'en', 'per', 'so', 'fora'] },
  tri: {
    title: '5 trissíl·labes',
    min: 5,
    options: ['sociables', 'mamífers', 'animals', 'orifici', 'calamars', 'juganers'],
  },
  digraph: {
    title: '3 paraules amb dígraf',
    min: 3,
    options: ['intel·ligents', 'necessiten', 'que', 'acrobàcies', 'mitjançant'],
  },
}

export const EX7_SYN_ANT = [
  { id: 'syn-casa', prompt: 'Sinònim de «casa»', accept: ['llar', 'habitatge', 'domicili'] },
  { id: 'syn-parlar', prompt: 'Sinònim de «parlar»', accept: ['xerrar', 'conversar', 'enraonar', 'parla'] },
  { id: 'syn-rapid', prompt: 'Sinònim de «ràpid»', accept: ['veloç', 'veloc', 'lleuger', 'cuitacorrents', 'cuita-corrents'] },
  { id: 'syn-tenda', prompt: 'Sinònim de «tenda»', accept: ['botiga', 'comerc', 'comerç', 'establiment'] },
  { id: 'ant-generos', prompt: 'Antònim de «generós»', accept: ['garrepa', 'avar', 'egoista', 'tacaño'] },
  { id: 'ant-content', prompt: 'Antònim de «content»', accept: ['trist', 'afligit', 'descontent', 'amoïnat'] },
  { id: 'ant-divertit', prompt: 'Antònim de «divertit»', accept: ['avorrit', 'tediòs', 'monòton'] },
  { id: 'ant-antipatic', prompt: 'Antònim d\'«antipàtic»', accept: ['simpàtic', 'simpatic', 'amable', 'agradable'] },
]

export const EX10_CLASSIFY = [
  { id: 'w1', label: 'Alegria', zone: 'abstractes' },
  { id: 'w2', label: 'Cadira', zone: 'concrets' },
  { id: 'w3', label: 'Llibertat', zone: 'abstractes' },
  { id: 'w4', label: 'Muntanya', zone: 'concrets' },
  { id: 'w5', label: 'Por', zone: 'abstractes' },
  { id: 'w6', label: 'Llapis', zone: 'concrets' },
  { id: 'w7', label: 'Amistat', zone: 'abstractes' },
  { id: 'w8', label: 'Flor', zone: 'concrets' },
  { id: 'w9', label: 'Generositat', zone: 'abstractes' },
  { id: 'w10', label: 'Sorra', zone: 'concrets' },
  { id: 'w11', label: 'Enveja', zone: 'abstractes' },
  { id: 'w12', label: 'Ordinador', zone: 'concrets' },
  { id: 'w13', label: 'Vergonya', zone: 'abstractes' },
  { id: 'w14', label: 'Cotxe', zone: 'concrets' },
]

export const PRO1_WORDS = [
  { word: 'Màquina', syllables: ['Mà', 'qui', 'na'], tonicIdx: 0 },
  { word: 'Telèfon', syllables: ['Te', 'lè', 'fon'], tonicIdx: 1 },
  { word: 'Excursió', syllables: ['Ex', 'cur', 'sió'], tonicIdx: 2 },
  { word: 'Farmàcia', syllables: ['Far', 'mà', 'cia'], tonicIdx: 1 },
  { word: 'Humit', syllables: ['Hu', 'mit'], tonicIdx: 1 },
]

export const PRO2_SPLITS = [
  { word: 'Metgessa', split: 'met-ges-sa' },
  { word: 'Passadís', split: 'pas-sa-dís' },
  { word: 'Rocallós', split: 'ro-cal-lós' },
  { word: 'Esquitxar', split: 'es-quit-xar' },
  { word: 'Guixeta', split: 'gui-xe-ta' },
]

export const PRO3_DIHAT = [
  { id: 'aire', label: 'Ai-re', correct: 'diftong' },
  { id: 'pais', label: 'Pa-ís', correct: 'hiat' },
  { id: 'reina', label: 'Rei-na', correct: 'diftong' },
  { id: 'teatre', label: 'Te-a-tre', correct: 'hiat' },
]

export const PRO4_COLLECTIVES = [
  { id: 'arx', prompt: 'Arxipèlag →', accept: ['illa', 'illes'] },
  { id: 'ramat', prompt: 'Ramat →', accept: ['ovella', 'ovelles', 'be'] },
  { id: 'banc', prompt: 'Banc (peixos) →', accept: ['peix', 'peixos'] },
  { id: 'const', prompt: 'Constel·lació →', accept: ['estrella', 'estrelles'] },
  { id: 'fageda', prompt: 'Fageda →', accept: ['faig', 'faigs'] },
]

export const PRO5_SUBTLE = [
  { id: 'aire', label: 'Aire', correct: 'C' },
  { id: 'justicia', label: 'Justícia', correct: 'A' },
  { id: 'fum', label: 'Fum', correct: 'C' },
  { id: 'paciencia', label: 'Paciència', correct: 'A' },
]

export const INFINITE_WORDS = [
  { word: 'Oceà', syllables: ['O', 'ce', 'à'], tonic: 2, type: 'abstractes' },
  { word: 'Intel·ligència', syllables: ['In', 'tel', 'li', 'gèn', 'cia'], tonic: 3, type: 'abstractes' },
  { word: 'Espiracle', syllables: ['Es', 'pi', 'ra', 'cle'], tonic: 2, type: 'concrets' },
  { word: 'Vergonya', syllables: ['Ver', 'go', 'nya'], tonic: 1, type: 'abstractes' },
  { word: 'Plàtan', syllables: ['Plà', 'tan'], tonic: 0, type: 'concrets' },
  { word: 'Llibertat', syllables: ['Lli', 'ber', 'tat'], tonic: 2, type: 'abstractes' },
  { word: 'Xiulet', syllables: ['Xiu', 'let'], tonic: 1, type: 'concrets' },
  { word: 'Amistat', syllables: ['A', 'mis', 'tat'], tonic: 2, type: 'abstractes' },
  { word: 'Calamar', syllables: ['Ca', 'la', 'mar'], tonic: 2, type: 'concrets' },
  { word: 'Generositat', syllables: ['Ge', 'ne', 'ro', 'si', 'tat'], tonic: 4, type: 'abstractes' },
]

export const DIGRAPH_PAIRS = [
  { pair: 'rr (carretera)', sep: true },
  { pair: 'ny (banyera)', sep: false },
  { pair: 'ss (classe)', sep: true },
  { pair: 'qu (quadrat)', sep: false },
  { pair: 'l·l (col·legi)', sep: true },
  { pair: 'll (cavall)', sep: false },
  { pair: 'tg (fetge)', sep: true },
]

export const PAP_TRAINER_QUIZ = [
  {
    question: '«ll» és un dígraf?',
    options: ['Sí', 'No'],
    correct: 0,
    hint: 'Dígraf = dues lletres, un sol so.',
  },
  {
    question: '«escola» és nom…',
    options: ['Propi', 'Comú'],
    correct: 1,
    hint: 'Comú a tot el català.',
  },
  {
    question: 'Antònim de «alt»',
    options: ['baix', 'llarg'],
    correct: 0,
    hint: 'Contrari d\'altura.',
  },
  {
    question: '«orquestra» és nom…',
    options: ['Individual', 'Col·lectiu'],
    correct: 1,
    hint: 'Designa un conjunt de músics.',
  },
  {
    question: '«amistat» és…',
    options: ['Concret', 'Abstracte'],
    correct: 1,
    hint: 'Sentiment, no es toca.',
  },
  {
    question: 'Tònica de «sabó»',
    options: ['sa', 'bó'],
    correct: 1,
    hint: 'Truc del crit: bó!',
  },
  {
    question: 'Separació correcta de «col·legi»',
    options: ['col-le-gi', 'co-l·le-gi', 'col·l-e-gi'],
    correct: 0,
    hint: 'l·l es separa com l-l.',
  },
  {
    question: '«peix» a final de línia',
    options: ['No es parteix (monosíl·lab)', 'pe-ix', 'p-eix'],
    correct: 0,
    hint: 'Monosíl·lab, sense guió.',
  },
  {
    question: 'Sinònim genuí de «tenda»',
    options: ['botiga', 'compre', 'mercat'],
    correct: 0,
    hint: 'Català viu: botiga.',
  },
  {
    question: 'Col·lectiu «eixam» designa…',
    options: ['Abelles', 'Pins', 'Coloms'],
    correct: 0,
    hint: 'Enjambre d\'abelles.',
  },
  {
    question: '«camió» és paraula…',
    options: ['Aguda', 'Plana', 'Esdrúixola'],
    correct: 0,
    hint: 'Tònica al final.',
  },
  {
    question: '«dissabte» és paraula…',
    options: ['Aguda', 'Plana', 'Esdrúixola'],
    correct: 1,
    hint: 'Tònica en penúltima.',
  },
  {
    question: 'El dígraf «ny»…',
    options: ['Mai es separa', 'Sempre es separa ny-e'],
    correct: 0,
    hint: 'Millors amics.',
  },
  {
    question: 'Antònim d\'«generós»',
    options: ['garrepa', 'mentir', 'mentida'],
    correct: 0,
    hint: 'Error típic de l\'examen.',
  },
  {
    question: 'Definició de nom col·lectiu',
    options: [
      'Un sol element en singular',
      'Nom propi de ciutat',
      'Singular per a un grup de la mateixa espècie',
    ],
    correct: 2,
    hint: 'Exercici 9 de l\'examen.',
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

export function cleanString(str) {
  return (str || '').toLowerCase().trim().replace(/\s+/g, '')
}
