/** Datos oficiales del legacy castellano/tema2/Apuntes.html */

export const DELE_FRASES = [
  { id: 'd1', text: 'Los niños están ___ al baloncesto.', sol: 'jugando', opts: ['jugado', 'jugar', 'jugando'], tip: "Acción en desarrollo tras 'estar' → gerundio" },
  { id: 'd2', text: '___ español es muy útil.', sol: 'hablar', opts: ['Hablado', 'Hablando', 'Hablar'], tip: 'Actúa como sujeto de la frase → infinitivo' },
  { id: 'd3', text: 'Ya he ___.', sol: 'desayunado', opts: ['desayunado', 'desayunando', 'desayunar'], tip: "Tiempo compuesto con 'haber' → participio" },
  { id: 'd4', text: 'Tengo que ___ mi habitación.', sol: 'ordenar', opts: ['ordenar', 'ordenado', 'ordenando'], tip: "Perífrasis de obligación con 'que' → infinitivo" },
  { id: 'd5', text: '¿Qué quieres ___ hoy?', sol: 'comer', opts: ['comido', 'comer', 'comiendo'], tip: "Detrás del verbo de deseo 'querer' → infinitivo" },
  { id: 'd6', text: '¿Has ___ alguna vez en Tailandia?', sol: 'estado', opts: ['estado', 'estando', 'estar'], tip: "Pretérito perfecto con 'has' → participio" },
  { id: 'd7', text: 'Todavía no hemos ___ ese castillo.', sol: 'visitado', opts: ['visitar', 'visitado', 'visitando'], tip: "Con 'hemos' → participio" },
  { id: 'd8', text: '¿Quién está ___ tanto ruido?', sol: 'haciendo', opts: ['haciendo', 'hacer', 'hecho'], tip: "Acción continua tras 'está' → gerundio" },
  { id: 'd9', text: 'En este momento están ___ el proyecto.', sol: 'presentando', opts: ['presentar', 'presentando', 'presentado'], tip: "Acción simultánea con 'están' → gerundio" },
  { id: 'd10', text: '___ en esta ciudad es maravilloso.', sol: 'vivir', opts: ['Vivido', 'Vivir', 'Viviendo'], tip: 'Sujeto de la oración → infinitivo' },
]

export const VERB_CONJ_ROWS = [
  { id: 'vc0', form: 'cantaré', inf: 'cantar', conj: 1 },
  { id: 'vc1', form: 'vendría', inf: 'venir', conj: 3 },
  { id: 'vc2', form: 'dormido', inf: 'dormir', conj: 3 },
  { id: 'vc3', form: 'mueven', inf: 'mover', conj: 2 },
  { id: 'vc4', form: 'bebía', inf: 'beber', conj: 2 },
  { id: 'vc5', form: 'solía', inf: 'soler', conj: 2 },
  { id: 'vc6', form: 'saltando', inf: 'saltar', conj: 1 },
  { id: 'vc7', form: 'convencerá', inf: 'convencer', conj: 2 },
  { id: 'vc8', form: 'subíamos', inf: 'subir', conj: 3 },
  { id: 'vc9', form: 'anhelado', inf: 'anhelar', conj: 1 },
  { id: 'vc10', form: 'contábamos', inf: 'contar', conj: 1 },
  { id: 'vc11', form: 'digo', inf: 'decir', conj: 3 },
]

export const ORACIONES_VERBALES = [
  { id: 'ov1', sentence: 'Hemos participado en el concurso', highlight: 'participado', sol: 'participio', tip: '«participado» termina en -ado y va tras el verbo haber' },
  { id: 'ov2', sentence: 'María quiere cruzar el puente', highlight: 'cruzar', sol: 'infinitivo', tip: '«cruzar» termina en -ar y es el nombre de la acción' },
  { id: 'ov3', sentence: 'Sus amigos quieren ver el partido', highlight: 'ver', sol: 'infinitivo', tip: '«ver» termina en -er' },
  { id: 'ov4', sentence: 'Todos están durmiendo tranquilos', highlight: 'durmiendo', sol: 'gerundio', tip: '«durmiendo» termina en -iendo e indica una acción en progreso' },
]

export const VALID_TECNICISMOS = [
  'procesador', 'software', 'microchip', 'algoritmo', 'batería', 'bateria',
  'telemetría', 'telemetria', 'circuito', 'órbita', 'orbita', 'cuántico',
  'cuantico', 'laboratorio', 'radiación', 'radiacion', 'sensor', 'antena', 'hardware',
]

/** Palabras LearningApps (30) → ids de zona DragClassify */
export const LEARNING_APPS_ACCENT = [
  { label: 'MURCIÉLAGO', zone: 'esdrujulas' },
  { label: 'CLÁSICO', zone: 'esdrujulas' },
  { label: 'OXÍGENO', zone: 'esdrujulas' },
  { label: 'AUTOMÁTICO', zone: 'esdrujulas' },
  { label: 'FANÁTICO', zone: 'esdrujulas' },
  { label: 'MICROSCÓPICO', zone: 'esdrujulas' },
  { label: 'HERMANO', zone: 'llanas' },
  { label: 'PARQUE', zone: 'llanas' },
  { label: 'ÁRBOL', zone: 'llanas' },
  { label: 'DÓCIL', zone: 'llanas' },
  { label: 'PULSERA', zone: 'llanas' },
  { label: 'VAJILLA', zone: 'llanas' },
  { label: 'BALÓN', zone: 'agudas' },
  { label: 'BEBÉ', zone: 'agudas' },
  { label: 'CAMIÓN', zone: 'agudas' },
  { label: 'BOTÓN', zone: 'agudas' },
  { label: 'EDREDÓN', zone: 'agudas' },
  { label: 'COMPRENSIÓN', zone: 'agudas' },
]

/** Banco master quiz (legacy §10) + extras para barajar */
export const TEMA2_MASTER_QUIZ = [
  {
    question: '¿Qué es un tecnicismo?',
    options: [
      'Una palabra que solo se usa en cuentos',
      'Una palabra específica de una ciencia, oficio o profesión',
      'Una palabra que siempre lleva tilde',
      'Un tipo de verbo irregular',
    ],
    correct: 1,
    hint: 'Los tecnicismos pertenecen a un ámbito profesional o científico concreto.',
  },
  {
    question: 'Las palabras «afecto» y «efecto» son:',
    options: ['Sinónimas', 'Antónimas', 'Parónimas', 'Neologismos'],
    correct: 2,
    hint: 'Suenan parecido pero significan cosas distintas → parónimas.',
  },
  {
    question: '¿Cuáles son las tres formas no personales del verbo?',
    options: ['Presente, pasado y futuro', 'Singular, plural y neutro', 'Infinitivo, gerundio y participio', 'Primera, segunda y tercera'],
    correct: 2,
    hint: 'Infinitivo (-ar/-er/-ir), gerundio (-ando/-iendo) y participio (-ado/-ido).',
  },
  {
    question: 'En la oración «Ellos están desayunando», «desayunando» es un:',
    options: ['Participio', 'Gerundio', 'Infinitivo', 'Adjetivo'],
    correct: 1,
    hint: 'Tras «estar» suele ir gerundio (acción en curso).',
  },
  {
    question: '¿Cuál es la raíz del verbo «escribíamos»?',
    options: ['escrib-', 'escribí-', '-íamos', 'es-'],
    correct: 0,
    hint: 'La raíz es la parte que no cambia: escrib- + desinencia.',
  },
  {
    question: 'En las palabras agudas, la sílaba tónica es la:',
    options: ['Antepenúltima sílaba', 'Penúltima sílaba', 'Última sílaba', 'Primera sílaba'],
    correct: 2,
    hint: 'Aguda = acento en la última sílaba.',
  },
  {
    question: 'Las palabras llanas llevan tilde cuando:',
    options: ['Terminan en n, s o vocal', 'NO terminan en n, s o vocal', 'Terminan en vocal', 'Siempre llevan tilde'],
    correct: 1,
    hint: 'Llana/grave: tilde si NO terminan en n, s o vocal.',
  },
  {
    question: '¿Por qué «murciélago» lleva tilde obligatoria?',
    options: ['Porque termina en vocal', 'Porque es esdrújula y las esdrújulas llevan tilde siempre', 'Porque es aguda', 'Porque es un animal'],
    correct: 1,
    hint: 'Todas las esdrújulas llevan tilde.',
  },
  {
    question: '¿Cuál está escrita con tilde correctamente?',
    options: ['árbol', 'exámen', 'cása', 'papél'],
    correct: 0,
    hint: '«Árbol» es llana con tilde; «examen» y «papel» no llevan en singular.',
  },
  {
    question: '¿Qué palabra es un neologismo reciente de la tecnología?',
    options: ['Cantar', 'Chatear', 'Mesa', 'Lápiz'],
    correct: 1,
    hint: 'Neologismos nuevos ligados a internet y redes.',
  },
  {
    question: 'El gerundio de «comer» es…',
    options: ['comido', 'comiendo', 'comer'],
    correct: 1,
    hint: 'Gerundio de -er: -iendo.',
  },
  {
    question: '«reloj» es aguda y…',
    options: ['Lleva tilde', 'No lleva tilde', 'Siempre es esdrújula'],
    correct: 1,
    hint: 'Aguda sin tilde: no termina en n, s ni vocal.',
  },
]
