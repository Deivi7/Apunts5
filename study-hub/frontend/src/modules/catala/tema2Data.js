/** Bancs d'exercicis — paritat amb catala/tema2/Apuntes.html */

export const WORDWALL_LEVELS = {
  1: [
    { id: 'w1_1', label: 'matalàs', zone: 'aguda' },
    { id: 'w1_2', label: 'camió', zone: 'aguda' },
    { id: 'w1_3', label: 'emoció', zone: 'aguda' },
    { id: 'w1_4', label: 'teclat', zone: 'aguda' },
    { id: 'w1_5', label: 'només', zone: 'aguda' },
    { id: 'w1_6', label: 'misteri', zone: 'plana' },
    { id: 'w1_7', label: 'arbre', zone: 'plana' },
    { id: 'w1_8', label: 'tònica', zone: 'esdruixola' },
    { id: 'w1_9', label: 'pèrdua', zone: 'esdruixola' },
    { id: 'w1_10', label: 'polític', zone: 'esdruixola' },
    { id: 'w1_11', label: 'ambulància', zone: 'esdruixola' },
    { id: 'w1_12', label: 'plàstic', zone: 'esdruixola' },
    { id: 'w1_13', label: 'tornàvem', zone: 'esdruixola' },
    { id: 'w1_14', label: 'història', zone: 'esdruixola' },
    { id: 'w1_15', label: 'ciència', zone: 'esdruixola' },
  ],
  2: [
    { id: 'w2_1', label: 'Mitjó', zone: 'aguda' },
    { id: 'w2_2', label: 'Demà', zone: 'aguda' },
    { id: 'w2_3', label: 'Sabó', zone: 'aguda' },
    { id: 'w2_4', label: 'Carbassó', zone: 'aguda' },
    { id: 'w2_5', label: 'Arròs', zone: 'aguda' },
    { id: 'w2_6', label: 'Germà', zone: 'aguda' },
    { id: 'w2_7', label: 'Camió', zone: 'aguda' },
    { id: 'w2_8', label: 'Casa', zone: 'plana' },
    { id: 'w2_9', label: 'Foto', zone: 'plana' },
    { id: 'w2_10', label: 'Córrer', zone: 'plana' },
    { id: 'w2_11', label: 'Mosca', zone: 'plana' },
    { id: 'w2_12', label: 'Préssec', zone: 'plana' },
    { id: 'w2_13', label: 'Boca', zone: 'plana' },
    { id: 'w2_14', label: 'Llàpis', zone: 'plana' },
    { id: 'w2_15', label: 'Llàgrima', zone: 'esdruixola' },
    { id: 'w2_16', label: 'Fàbrica', zone: 'esdruixola' },
    { id: 'w2_17', label: 'Mònica', zone: 'esdruixola' },
    { id: 'w2_18', label: 'Màquina', zone: 'esdruixola' },
    { id: 'w2_19', label: 'Química', zone: 'esdruixola' },
    { id: 'w2_20', label: 'Colònia', zone: 'esdruixola' },
    { id: 'w2_21', label: 'Fórmula', zone: 'esdruixola' },
  ],
}

export const ACCENT_WORDWALL_ZONES = [
  { id: 'aguda', title: 'Aguda', color: '#dc2626' },
  { id: 'plana', title: 'Plana', color: '#2563eb' },
  { id: 'esdruixola', title: 'Esdrúixola', color: '#7c3aed' },
]

export const ENXANETA44 = [
  { num: 1, mot: 'ningu', sol: 'ningú', hint: 'Aguda acabada en vocal (u tancada)' },
  { num: 2, mot: 'passadis', sol: 'passadís', hint: 'Aguda acabada en vocal + s' },
  { num: 3, mot: 'pingui', sol: 'pingüí', hint: 'Aguda amb dièresi a la ü i accent a la í' },
  { num: 4, mot: 'urba', sol: 'urbà', hint: 'Aguda acabada en vocal (a oberta)' },
  { num: 5, mot: 'ratoli', sol: 'ratolí', hint: 'Aguda acabada en vocal' },
  { num: 6, mot: 'monoton', sol: 'monòton', hint: 'Esdrúixola (accent obert a la o)' },
  { num: 7, mot: 'esglais', sol: 'esglais', hint: 'Aguda acabada en diftong decreixent (sense accent)' },
  { num: 8, mot: 'algun', sol: 'algun', hint: 'Aguda acabada en -un (no -en/-in, sense accent)' },
  { num: 9, mot: 'princep', sol: 'príncep', hint: 'Plana acabada en consonant que no és norma aguda' },
  { num: 10, mot: 'nuvols', sol: 'núvols', hint: 'Plana acabada en consonant diferent de les de norma aguda' },
  { num: 11, mot: 'correspon', sol: 'correspon', hint: 'Aguda acabada en -on (no -en/-in, sense accent)' },
  { num: 12, mot: 'platan', sol: 'plàtan', hint: 'Plana acabada en -an (accent obert)' },
  { num: 13, mot: 'germa', sol: 'germà', hint: 'Aguda acabada en vocal (a oberta)' },
  { num: 14, mot: 'italia', sol: 'italià', hint: 'Aguda acabada en vocal (a oberta)' },
  { num: 15, mot: 'permis', sol: 'permís', hint: 'Aguda acabada en vocal + s' },
  { num: 16, mot: 'pais', sol: 'país', hint: 'Aguda acabada en vocal + s (accent a la í)' },
  { num: 17, mot: 'plastic', sol: 'plàstic', hint: 'Plana acabada en consonant (-ic)' },
  { num: 18, mot: 'renou', sol: 'renou', hint: 'Aguda acabada en diftong (sense accent)' },
  { num: 19, mot: 'padri', sol: 'padrí', hint: 'Aguda acabada en vocal' },
  { num: 20, mot: 'submari', sol: 'submarí', hint: 'Aguda acabada en vocal' },
  { num: 21, mot: 'vei', sol: 'veí', hint: 'Aguda acabada en vocal (accent a la í)' },
  { num: 22, mot: 'acabaran', sol: 'acabaran', hint: 'Plana acabada en -an (sense accent)' },
  { num: 23, mot: 'remei', sol: 'remei', hint: 'Aguda acabada en diftong (sense accent)' },
  { num: 24, mot: 'sindria', sol: 'síndria', hint: 'Esdrúixola (totes porten accent)' },
  { num: 25, mot: 'tornavis', sol: 'tornavís', hint: 'Aguda acabada en vocal + s' },
  { num: 26, mot: 'semafor', sol: 'semàfor', hint: 'Plana acabada en consonant (-or)' },
]

export const ADJ_FEM_DATA = [
  { num: 1, base: 'Un jersei ample', prompt: 'una bota', sol: 'ampla', tip: 'Adjectiu variable (canvia -e per -a)' },
  { num: 2, base: 'Un tuf pestilent', prompt: 'una olor', sol: 'pestilent', tip: "Invariable d'una terminació (-ent)" },
  { num: 3, base: 'Un problema difícil', prompt: 'una situació', sol: 'difícil', tip: "Invariable d'una terminació (-il)" },
  { num: 4, base: 'Un orador culte', prompt: 'una professora', sol: 'culta', tip: 'Adjectiu variable (canvia -e per -a)' },
  { num: 5, base: 'Un nen obedient', prompt: 'una nena', sol: 'obedient', tip: "Invariable d'una terminació (-ent)" },
  { num: 6, base: 'Un esforç inútil', prompt: 'una dedicació', sol: 'inútil', tip: "Invariable d'una terminació (-il)" },
  { num: 7, base: 'Un cafè doble', prompt: 'una partida', sol: 'doble', tip: "Invariable d'una terminació (-ble)" },
  { num: 8, base: 'Un home dèbil', prompt: 'una dona', sol: 'dèbil', tip: "Invariable d'una terminació (-il)" },
  { num: 9, base: 'Un problema simple', prompt: 'una solució', sol: 'simple', tip: "Invariable d'una terminació (-le)" },
  { num: 10, base: 'Un plat picant', prompt: 'unes salses', sol: 'picants', tip: "Plural femení d'adjectiu en -ant (-ants)" },
  { num: 11, base: 'Un ofici solemne', prompt: 'una missa', sol: 'solemne', tip: "Invariable d'una terminació (-ne)" },
  { num: 12, base: 'Un negoci fraudulent', prompt: 'una acció', sol: 'fraudulenta', tip: 'Variable (fraudulent → fraudulenta)' },
  { num: 13, base: 'Un país lliure', prompt: 'una societat', sol: 'lliure', tip: "Invariable d'una terminació (-re)" },
  { num: 14, base: 'Un home prudent', prompt: 'una dona', sol: 'prudent', tip: "Invariable d'una terminació (-ent)" },
  { num: 15, base: 'Un poble tranquil', prompt: 'una vila', sol: 'tranquil·la', tip: 'Variable amb ela geminada (l·l)!' },
  { num: 16, base: 'Un so tènue', prompt: 'una claror', sol: 'tènue', tip: "Invariable d'una terminació (-ue)" },
]

export const ADJ_PLURAL_DATA = [
  { num: 1, sing: 'el meu amic anglès', sol: 'els meus amics anglesos', tip: '-ès → -esos' },
  { num: 2, sing: 'un pic antic', sol: 'uns pics antics', tip: '-ic → -ics' },
  { num: 3, sing: 'una boca xica', sol: 'unes boques xiques', tip: '-ca → -ques' },
  { num: 4, sing: 'la clínica principal', sol: 'les clíniques principals', tip: '-al → -als' },
  { num: 5, sing: 'una fàbrica groga', sol: 'unes fàbriques grogues', tip: '-ga → -gues' },
  { num: 6, sing: 'el peix mallorquí', sol: 'els peixos mallorquins', tip: '-í → -ins' },
  { num: 7, sing: 'un nus mariner', sol: 'uns nusos mariners', tip: '-s → -sos' },
  { num: 8, sing: 'un cas difícil', sol: 'uns casos difícils', tip: '-il → -ils' },
  { num: 9, sing: 'una euga poruga', sol: 'unes eugues porugues', tip: '-ga → -gues' },
]

export const ACCENT_KEYBOARD = ['à', 'è', 'é', 'í', 'ò', 'ó', 'ú', 'ï', 'ü', 'ç', '·']

/** Quiz master — format MasterQuiz.vue (correct = índex a options) */
export const TEMA2_MASTER_QUIZ = [
  {
    question: "Com s'anomena la síl·laba que es pronuncia amb més força en una paraula?",
    options: ['Síl·laba àtona', 'Síl·laba tònica', 'Síl·laba inversa', 'Dígraf'],
    correct: 1,
    hint: 'És la síl·laba on posaríem el crit si cridéssim la paraula des de lluny.',
  },
  {
    question: "Les paraules agudes s'accentuen quan acaben en:",
    options: ['Consonant que no sigui -s', 'Qualsevol consonant', 'Vocal, vocal+s, -en, -in', 'Sempre sense excepció'],
    correct: 2,
    hint: 'Recorda la regla de les agudes: vocal, -s, -en o -in.',
  },
  {
    question: 'Quina d\'aquestes paraules és plana i porta accent perquè acaba en consonant -c?',
    options: ['Camió', 'Plàstic', 'Biologia', 'Ciència'],
    correct: 1,
    hint: 'Plana + consonant (excepte norma aguda) → accent.',
  },
  {
    question: 'Quina regla segueixen SEMPRE les paraules esdrúixoles en català?',
    options: ["S'accentuen totes", "Només s'accentuen si acaben en vocal", "S'accentuen si acaben en -s", 'Mai porten accent'],
    correct: 0,
    hint: 'Totes les esdrúixoles porten accent gràfic.',
  },
  {
    question: "Quin accent porta SEMPRE la vocal «a» en català?",
    options: ['Accent tancat (´)', 'Accent obert (`)', 'Depèn de la paraula', 'Dièresi'],
    correct: 1,
    hint: 'La «a» catalana va amb accent obert (`).',
  },
  {
    question: 'Què és una paraula polisèmica?',
    options: ['Una paraula inventada', "Una paraula amb més d'un significat", 'Una paraula sense vocals', 'Un adjectiu plural'],
    correct: 1,
    hint: 'Poli = molts; sèmica = significats.',
  },
  {
    question: "Quin és el femení correcte de l'adjectiu «tranquil»?",
    options: ['Tranquila', 'Tranquil·la', 'Tranquil·les', 'Tranquila amb accent'],
    correct: 1,
    hint: 'Cal la ela geminada: tranquil·la.',
  },
  {
    question: 'Quin és el plural del sintagma «el meu amic anglès»?',
    options: ['Els meus amics anglesos', 'Els meus amics angles', 'Els meus amics angleses', 'Els amics anglès'],
    correct: 0,
    hint: 'Anglès → anglesos en plural.',
  },
  {
    question: 'A quin camp del correu electrònic hem de posar un resum breu del motiu del missatge?',
    options: ['Destinatari (Per a)', 'CCO', 'Assumpte', 'Signatura'],
    correct: 2,
    hint: 'Assumpte = títol curt del mail.',
  },
  {
    question: "Per què no s'ha d'escriure un correu electrònic tot en MAJÚSCULES?",
    options: ['Perquè gasta més bateria', 'Perquè a Internet significa cridar', 'Perquè el correu no arriba', "Perquè s'esborra sol"],
    correct: 1,
    hint: 'En xarxa, les majúscules equivalen a cridar.',
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

export function normalizeText(str) {
  return (str || '').trim().toLowerCase().replace(/\s+/g, ' ')
}
