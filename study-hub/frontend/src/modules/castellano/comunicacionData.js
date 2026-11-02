export const CIRCUIT_DETAILS = {
  emisor: {
    tag: 'DETALLE SELECCIONADO: EMISOR',
    title: '¿Quién transmite la información?',
    desc: 'Es el punto de origen. Elabora y transmite el mensaje a través de un código. Puede ser una persona, un animal, un letrero o un dispositivo.',
    icon: '🗣️',
    label: '1. Emisor',
  },
  receptor: {
    tag: 'DETALLE SELECCIONADO: RECEPTOR',
    title: '¿Quién recibe la información?',
    desc: 'Es el destinatario. Recibe la señal física y descodifica el mensaje para comprenderlo. Si no conoce el código, la comunicación fracasa.',
    icon: '👂',
    label: '2. Receptor',
  },
  mensaje: {
    tag: 'DETALLE SELECCIONADO: MENSAJE',
    title: '¿Qué información se transmite?',
    desc: 'Es la idea, dato, orden, sentimiento o pregunta que se expresa. Todo mensaje adquiere significado gracias al código y al contexto.',
    icon: '✉️',
    label: '3. Mensaje',
  },
  codigo: {
    tag: 'DETALLE SELECCIONADO: CÓDIGO',
    title: '¿Qué sistema de signos se usa?',
    desc: 'Es la lengua (español, inglés...), los símbolos matemáticos, el código morse, los colores de un semáforo o los gestos con las manos.',
    icon: '🔤',
    label: '4. Código',
  },
  canal: {
    tag: 'DETALLE SELECCIONADO: CANAL',
    title: '¿Por qué medio físico viaja?',
    desc: 'Es el soporte material que transporta la señal: el aire (en la voz), el papel (en un libro), la fibra óptica (en internet) o un hilo de lana tenso (en el teléfono de lata).',
    icon: '📡',
    label: '5. Canal',
  },
  contexto: {
    tag: 'DETALLE SELECCIONADO: CONTEXTO O SITUACIÓN',
    title: '¿Dónde y cuándo ocurre?',
    desc: 'Conjunto de circunstancias espaciales, temporales y culturales que rodean la comunicación y permiten interpretar correctamente las palabras.',
    icon: '🌍',
    label: '6. Contexto',
  },
}

export const COMM_SITUATIONS = [
  {
    scenario: 'Raquel habla con su amigo mediante dos vasos de plástico unidos por un hilo de lana tenso.',
    question: '¿Cuál es el CANAL por donde viaja el sonido en esta situación?',
    correct: 'El hilo de lana tenso',
    options: ['El hilo de lana tenso', 'El idioma español', 'Raquel', 'El patio de la escuela'],
  },
  {
    scenario: 'El árbitro hace sonar fuertemente su silbato en mitad de un partido de fútbol para detener el juego.',
    question: '¿Quién es el EMISOR en esta situación comunicativa?',
    correct: 'El árbitro',
    options: ['El árbitro', 'Los futbolistas', 'El balón', 'El estadio'],
  },
  {
    scenario: 'Un semáforo se pone en color ROJO ante un conductor que circula por la avenida.',
    question: '¿Cuál es el CÓDIGO utilizado en esta comunicación?',
    correct: 'El sistema de luces y colores de tráfico',
    options: ['El sistema de luces y colores de tráfico', 'El asfalto de la calle', 'El coche', 'El claxon'],
  },
  {
    scenario: 'Álvaro recibe un mensaje de WhatsApp en su teléfono móvil que dice: «¡Mañana tenemos examen de lengua!»',
    question: '¿Quién es el RECEPTOR de este mensaje?',
    correct: 'Álvaro',
    options: ['Álvaro', 'El teléfono móvil', 'La pantalla de cristal', 'El servidor de internet'],
  },
  {
    scenario: 'Un cartel en la biblioteca municipal muestra el dibujo de una persona con el dedo sobre los labios pidiendo silencio.',
    question: '¿De qué tipo de comunicación se trata?',
    correct: 'Comunicación no verbal (gesto/icono)',
    options: ['Comunicación no verbal (gesto/icono)', 'Comunicación verbal oral', 'Comunicación auditiva', 'Código morse'],
  },
]

export const DICT_DATABASE = {
  ventana: {
    word: 'ventana',
    etymology: "Del lat. vulg. *ventāna, der. de ventus 'viento'.",
    pos: 'f. (Sustantivo femenino)',
    senses: [
      'Abertura en una pared o muro que se hace para dar luz y ventilación a una habitación.',
      'Hoja u hojas de madera, metal o cristal con que se cierra dicha abertura.',
      'Informática. Área rectangular en la pantalla del ordenador que muestra los contenidos de un programa o documento.',
    ],
    notes: "Tiene 3 acepciones principales. En el diccionario la abreviatura 'f.' indica que es femenino ('la ventana').",
  },
  comer: {
    word: 'comer',
    etymology: 'Del lat. comedĕre.',
    pos: 'v. tr. e intr. (Verbo transitivo e intransitivo)',
    senses: [
      'Masticar y deglutir un alimento sólido para nutrirse.',
      'Tomar la comida del mediodía.',
      'Corroer o desgastar algo por fricción o acción química.',
    ],
    notes: 'Los verbos en el diccionario SIEMPRE aparecen en su forma en infinitivo (comer, vivir, saltar).',
  },
  comí: {
    word: 'comí (¡Forma Conjugada!)',
    etymology: '1.ª persona del singular del pretérito perfecto simple del verbo comer.',
    pos: 'Forma flexiva verbal',
    senses: [
      "⚠️ ¡Regla de Oro del Diccionario!: Los verbos conjugados (como 'comí', 'jugaban', 'saldremos') NO tienen entrada propia.",
      'Debes buscar SIEMPRE el infinitivo correspondiente: COMER.',
    ],
    notes: "En los diccionarios online actuales, buscar 'comí' te redirige automáticamente a 'comer'.",
  },
  lápices: {
    word: 'lápices (¡Forma Plural!)',
    etymology: 'Plural regular de lápiz.',
    pos: 'Plural gramatical',
    senses: [
      '⚠️ ¡Regla de Oro del Diccionario!: Los sustantivos y adjetivos NO se buscan en plural.',
      "Debes buscar SIEMPRE su forma en singular: LÁPIZ (del latín lapis, 'piedra').",
    ],
    notes: "Recuerda además la regla ortográfica: el singular 'lápiz' termina en 'z', y su plural cambia a 'c' ('lápices').",
  },
  cóctel: {
    word: 'cóctel (o coctel)',
    etymology: "Del inglés cocktail (literalmente 'cola de gallo').",
    pos: 'm. (Sustantivo masculino)',
    senses: [
      'Bebida compuesta de una mezcla de licores a la que se añaden otros ingredientes como zumos o hielo.',
      'Reunión o fiesta donde se sirven este tipo de bebidas y aperitivos de pie.',
    ],
    notes: 'Es un extranjerismo adaptado al español. Lleva tilde por ser palabra llana terminada en consonante distinta de -n o -s.',
  },
  comunicar: {
    word: 'comunicar',
    etymology: "Del lat. communicāre 'compartir, poner en común'.",
    pos: 'v. tr. e intr.',
    senses: [
      'Hacer a una persona partícipe de lo que se tiene o se sabe.',
      'Descubrir, manifestar o hacer saber a alguien algo.',
      'Dicho de dos salas, habitaciones o lugares: tener paso o correspondencia entre sí.',
    ],
    notes: "Es la raíz de términos como 'comunicación', 'comunicado' y 'comunidad'.",
  },
}

export const ABBREVIATIONS_XTEC = [
  { abbr: 'adj.', meaning: 'adjetivo', example: '«efímero adj. Que dura un solo día.»' },
  { abbr: 'adj.-s.', meaning: 'adjetivo usado también como substantivo', example: '«joven adj.-s. Persona de poca edad.»' },
  { abbr: 'adv.', meaning: 'adverbio o adverbial', example: '«rápidamente adv. De manera rápida.»' },
  { abbr: 'conj.', meaning: 'conjunción', example: '«pero conj. Introduce una contraposición.»' },
  { abbr: 'f.', meaning: 'substantivo femenino', example: '«mesa f. Mueble de superficie plana.»' },
  { abbr: 'm.', meaning: 'substantivo masculino', example: '«libro m. Conjunto de hojas encuadernadas.»' },
  { abbr: 'pl.', meaning: 'plural', example: '«gafas f. pl. Anteojos.»' },
  { abbr: 'prep.', meaning: 'preposición', example: '«hacia prep. Indica dirección.»' },
  { abbr: 'pron.', meaning: 'pronombre', example: '«ella pron. Pronombre personal.»' },
  { abbr: 'sing.', meaning: 'singular', example: '«lápiz m. sing. Instrumento para escribir.»' },
  { abbr: 'tr.', meaning: 'verbo transitivo', example: '«pintar tr. Exige objeto directo.»' },
  { abbr: 'v.', meaning: 'verbo', example: '«correr v. Acción o proceso dinámico.»' },
  { abbr: 'pp.', meaning: 'participio pasivo', example: '«hecho pp. irregular de hacer.»' },
  { abbr: 'pos.', meaning: 'posesivo', example: '«mío adj. pos. De primera persona.»' },
  { abbr: 'loc.', meaning: 'locución', example: '«a rebosar loc. adv. Hasta arriba.»' },
  { abbr: 'irreg.', meaning: 'irregular', example: '«irreg. Se conjuga con alteraciones.»' },
  { abbr: 'gralte.', meaning: 'generalmente', example: '«gralte. Usado con más frecuencia.»' },
  { abbr: 'imperf.', meaning: 'imperfecto', example: '«pretérito imperf. de indicativo.»' },
  { abbr: 'inf.', meaning: 'infinitivo', example: '«inf. Forma no personal en -ar, -er, -ir.»' },
  { abbr: 'fig.', meaning: 'sentido figurado', example: '«lince m. fig. Persona muy sagaz.»' },
  { abbr: 'art.', meaning: 'artículo', example: '«el, la, los art. determinados.»' },
  { abbr: 'dim.', meaning: 'diminutivo', example: '«perrito dim. de perro.»' },
  { abbr: 'esp.', meaning: 'especialmente', example: '«esp. en el español de América.»' },
  { abbr: 'LIT.', meaning: 'Literatura', example: '«LIT. Ámbito artístico o poético.»' },
  { abbr: 'l.', meaning: 'latín, latino', example: "«l. ventus 'viento'.»" },
]

export const DICT_SCENARIOS = [
  {
    scenario: "«Un estudiante de 5.º necesita saber de qué lengua procede y cuál es el origen histórico de la palabra 'guitarra'.»",
    correct: 'Diccionario Etimológico',
    options: ['Diccionario Etimológico', 'Diccionario Bilingüe', 'Diccionario Técnico', 'Diccionario Normativo'],
  },
  {
    scenario: '«Una persona que viaja a Londres quiere pedir un vaso de agua y no recuerda cómo se dice en inglés.»',
    correct: 'Diccionario Bilingüe',
    options: ['Diccionario Bilingüe', 'Diccionario Enciclopédico', 'Diccionario de Sinónimos', 'Diccionario Técnico'],
  },
  {
    scenario: "«Un cirujano busca la definición exacta del instrumento 'bisturí' y sus especificaciones médicas.»",
    correct: 'Diccionario Técnico',
    options: ['Diccionario Técnico', 'Diccionario Normativo', 'Diccionario Bilingüe', 'Diccionario Etimológico'],
  },
  {
    scenario: "«Estás redactando un cuento y no quieres repetir tantas veces la palabra 'hermoso'.»",
    correct: 'Diccionario de Sinónimos',
    options: ['Diccionario de Sinónimos', 'Diccionario Bilingüe', 'Diccionario Enciclopédico', 'Diccionario Etimológico'],
  },
  {
    scenario: '«Quieres averiguar en qué año nació y qué descubrimientos astronómicos hizo Galileo Galilei.»',
    correct: 'Diccionario Enciclopédico',
    options: ['Diccionario Enciclopédico', 'Diccionario Normativo', 'Diccionario de Sinónimos', 'Diccionario Bilingüe'],
  },
  {
    scenario: "«Dudas sobre si el verbo 'prever' se escribe con una sola 'e' o dos, o cómo se conjuga correctamente.»",
    correct: 'Diccionario de Dudas',
    options: ['Diccionario de Dudas', 'Diccionario de Argot', 'Diccionario Etimológico', 'Diccionario Bilingüe'],
  },
  {
    scenario: "«Escuchas en una serie juvenil expresiones como 'molar', 'chachi' o 'guay' y quieres saber qué significan en la jerga coloquial.»",
    correct: 'Diccionario de Argot',
    options: ['Diccionario de Argot', 'Diccionario Enciclopédico', 'Diccionario Bilingüe', 'Diccionario Ideológico'],
  },
  {
    scenario: "«Estás escribiendo un texto sobre 'la valentía' y buscas palabras asociadas a esa idea: coraje, osadía, arrojo, bravo, audaz...»",
    correct: 'Diccionario Ideológico',
    options: ['Diccionario Ideológico', 'Diccionario Bilingüe', 'Diccionario de Dudas', 'Diccionario Técnico'],
  },
]

export const XTEC_REAL_ARTICLES = [
  {
    snippet: '«efímero, -ra (V. efémera) adj. Que dura un solo día. 2 Pasajero, de corta duración. 3 adj.-s. Efémera. SIN. 1 y 2 Huidizo, fugaz»',
    correct: 'Diccionario General',
    hint: 'Ofrece definición, acepciones numeradas, categoría gramatical (adj.) y sinónimos de uso común.',
    options: ['Diccionario General', 'Diccionario Bilingüe', 'Diccionario Etimológico', 'Diccionario de Argot'],
  },
  {
    snippet: '«vessar tr. Derramar, verter, salir, rebosar. | A ~, a rebosar.»',
    correct: 'Diccionario Bilingüe',
    hint: 'Establece la correspondencia y traducción directa entre dos lenguas (catalán y castellano).',
    options: ['Diccionario Bilingüe', 'Diccionario Específico', 'Diccionario de Dudas', 'Diccionario Enciclopédico'],
  },
  {
    snippet: '«fariseo Hipócrita, falso, farisaico, engañoso, simulador. | Sincero, auténtico.»',
    correct: 'Diccionario de Sinónimos y Antónimos',
    hint: 'Enumera palabras de significado equivalente y, tras la barra vertical (|), sus contrarios u opuestos.',
    options: ['Diccionario de Sinónimos y Antónimos', 'Diccionario General', 'Diccionario Enciclopédico', 'Diccionario Ideológico'],
  },
  {
    snippet: '«incluir. Verbo irregular. Se conjuga como huir. Construcción: incluir EN el número; incluir ENTRE los buenos.»',
    correct: 'Diccionario de Dudas',
    hint: 'Aclara irregularidades de conjugación verbal y el uso exacto de las preposiciones en la construcción sintáctica.',
    options: ['Diccionario de Dudas', 'Diccionario Específico', 'Diccionario General', 'Diccionario de Argot'],
  },
  {
    snippet: '«flipado, -da pp. Pasmado, asombrado, impresionado. // Cautivado. // (dro.) Drogado.»',
    correct: 'Diccionario de Argot',
    hint: 'Registra voces jergales, juveniles y coloquiales que no pertenecen al registro culto formal.',
    options: ['Diccionario de Argot', 'Diccionario de Sinónimos y Antónimos', 'Diccionario Específico', 'Diccionario Ideológico'],
  },
  {
    snippet: '«Esfumado (ital. sfumato) *Pintura de *contornos vagos y *difuminados. Dícese en especial de la pintura de Leonardo da Vinci y sus imitadores.»',
    correct: 'Diccionario Específico o Especializado',
    hint: 'Trata un concepto técnico de una disciplina artística muy concreta (la pintura renacentista).',
    options: ['Diccionario Específico o Especializado', 'Diccionario Bilingüe', 'Diccionario de Sinónimos', 'Diccionario de Dudas'],
  },
  {
    snippet: '«TRAVESURA travesura, diablura, trastada, barrabasada, picardía, chiquillada... / travesear, enredar, revolver, picardear, jugar... / travieso, revoltoso, bullicioso, vivaracho, inquieto, diablillo...»',
    correct: 'Diccionario Ideológico',
    hint: 'Asocia sustantivos, verbos y adjetivos vinculados a un mismo concepto o campo de ideas afines.',
    options: ['Diccionario Ideológico', 'Diccionario de Argot', 'Diccionario Enciclopédico', 'Diccionario Bilingüe'],
  },
  {
    snippet: "«HUCHA 'arca grande que tienen los labradores para conservar objetos', tomado del fr. huche 'cofre para guardar harina', procedente de una forma HÜTICA del romance primitivo, de origen desconocido, quizás germánico. 1ª doc.: Covarr.»",
    correct: 'Diccionario Etimológico',
    hint: 'Detalla la historia, la lengua de procedencia (francés huche), formas del romance primitivo y su primera documentación histórica.',
    options: ['Diccionario Etimológico', 'Diccionario General', 'Diccionario Enciclopédico', 'Diccionario de Dudas'],
  },
]

export const MASTER_QUIZ = [
  {
    question: "En una carta o correo electrónico, ¿quién desempeña el papel de 'receptor'?",
    options: [
      'La persona a quien va dirigida la carta y que la lee.',
      'La persona que redacta y firma la carta.',
      'El cartero o el servidor de internet que la transporta.',
      'El papel o la pantalla del ordenador donde está escrita.',
    ],
    correct: 0,
    hint: 'El receptor es quien recibe y descifra la información.',
  },
  {
    question: '¿Cuál es el código en una conversación hablada entre dos personas en Madrid?',
    options: [
      'La lengua castellana o idioma español.',
      'El aire que transmite las ondas sonoras.',
      'La calle o habitación donde se encuentran.',
      'El mensaje que se dicen el uno al otro.',
    ],
    correct: 0,
    hint: 'El código es el sistema de signos y reglas compartido para entenderse.',
  },
  {
    question: "Si buscas en el diccionario la palabra 'comí', ¿qué ocurre y cómo debes buscarla?",
    options: [
      "Los verbos no aparecen conjugados; debes buscar su infinitivo: 'comer'.",
      'Aparece en la letra C con todas sus conjugaciones detalladas.',
      'Debes buscarla en el diccionario de sinónimos y antónimos.',
      'Se busca obligatoriamente en el diccionario bilingüe.',
    ],
    correct: 0,
    hint: 'En el diccionario los verbos se introducen siempre por el infinitivo.',
  },
  {
    question: "¿Qué es una 'acepción' en un artículo del diccionario?",
    options: [
      'Cada uno de los diferentes significados numerados que tiene una palabra.',
      'La lengua histórica de la que procede la palabra.',
      'La letra inicial con la que se ordena alfabéticamente.',
      'El tipo de papel con el que se imprime la obra.',
    ],
    correct: 0,
    hint: 'Las acepciones se distinguen con números 1, 2, 3... según el contexto.',
  },
  {
    question: "¿Qué tipo de diccionario consultarías para saber cómo se dice 'fresa' en inglés?",
    options: [
      'Un diccionario bilingüe (Español - Inglés).',
      'Un diccionario etimológico del latín.',
      'Un diccionario técnico de botánica.',
      'El diccionario normativo de la RAE.',
    ],
    correct: 0,
    hint: 'Los diccionarios bilingües traducen palabras de un idioma a otro.',
  },
  {
    question: '¿Cuál es el orden alfabético correcto de estas cuatro palabras: Coche, Chapulín, Correr, Búfalo?',
    options: [
      'Búfalo, Chapulín, Coche, Correr',
      'Chapulín, Búfalo, Coche, Correr',
      'Búfalo, Coche, Correr, Chapulín',
      'Correr, Coche, Chapulín, Búfalo',
    ],
    correct: 0,
    hint: 'B va primero. Luego Ch (C-h), Co-c (Coche) y Co-r (Correr).',
  },
  {
    question: '¿Qué información fundamental nos proporciona la etimología de una palabra?',
    options: [
      'Su origen y la lengua de la que procede históricamente.',
      'El número de veces que se puede pronunciar en un minuto.',
      'Si debe escribirse con mayúscula o minúscula.',
      'El listado de palabras que riman con ella.',
    ],
    correct: 0,
    hint: 'Etimología viene del griego y estudia la raíz histórica de los términos.',
  },
  {
    question: 'En el cómic de Raquel con el teléfono de lata, ¿qué elemento es el hilo de lana tenso?',
    options: [
      'El canal físico por donde viaja la vibración.',
      'El código de comunicación.',
      'El emisor que origina la conversación.',
      'El contexto de la viñeta.',
    ],
    correct: 0,
    hint: 'El canal es el medio físico de transmisión.',
  },
  {
    question: '¿Por qué en español es obligatorio usar signos de interrogación dobles (¿ ?)?',
    options: [
      "Porque '¿' avisa dónde empieza la pregunta y '?' marca su final.",
      'Porque el signo de cierre solo se usa en inglés.',
      "Porque después de '?' es obligatorio poner un punto final.",
      'Porque indican que la frase debe leerse en susurros.',
    ],
    correct: 0,
    hint: 'En español se abre obligatoriamente con ¿ y se cierra con ?.',
  },
  {
    question: "¿Cómo se debe buscar en el diccionario el sustantivo 'lápices'?",
    options: [
      "Buscando su forma en singular: 'lápiz'.",
      "Buscando directamente en la L con la terminación '-ces'.",
      'Buscando en la sección de adjetivos en plural.',
      'No se puede buscar porque tiene tilde.',
    ],
    correct: 0,
    hint: 'Los nombres y adjetivos se buscan siempre en singular.',
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
