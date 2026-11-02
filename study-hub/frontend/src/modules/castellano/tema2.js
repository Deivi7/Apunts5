import { createModule, theoryBlock } from '../createModule.js'
import { LEARNING_APPS_ACCENT, TEMA2_MASTER_QUIZ } from './tema2Data.js'

const accentDragItems = LEARNING_APPS_ACCENT.map((w, i) => ({
  id: `la${i}`,
  label: w.label,
  zone: w.zone,
}))

export default createModule({
  theoryHtml: theoryBlock({
    what: 'El verbo expresa acciones, estados o procesos. La acentuación marca la sílaba tónica según reglas claras (agudas, llanas, esdrújulas).',
    rules: [
      'Formas no personales: infinitivo (-ar/-er/-ir), gerundio (-ando/-iendo), participio (-ado/-ido).',
      'Agudas: tónica al final → tilde si terminan en n, s o vocal.',
      'Llanas: tónica en la penúltima → tilde si NO terminan en n, s o vocal.',
      'Esdrújulas: siempre llevan tilde.',
      'Tecnicismos: palabras propias de una profesión o ciencia.',
    ],
    examples: [
      '<strong>Bien:</strong> camión (aguda en n), árbol (llana), rápido (esdrújula)',
      '<strong>Mal:</strong> poner tilde en «casa» (llana en vocal sin tilde)',
      '<strong>Bien:</strong> «He comido» (haber + participio)',
      '<strong>Mal:</strong> «Estoy comido» para acción en curso (debe ser gerundio)',
    ],
    trick: 'Grita la palabra: la sílaba que «grita» es la tónica. Recuerda E-G-A: Esdrújula, Grave (llana), Aguda.',
    summary: 'Verbo (3 formas) + reglas de tilde + tecnicismos → lectura → taller → quiz.',
  }),
  resources: [
    { title: 'Genially Tema 2', url: 'https://view.genially.com/6757189d207e6b6da70c81bb' },
    { title: 'LearningApps Acentuación', url: 'https://learningapps.org/21440388' },
  ],
  documents: [],
  exercisesBySection: {
    lectura: [
      {
        id: 'cas-t2-lect-1',
        type: 'multiple_choice',
        title: 'Comprensión: «El perro azul»',
        instructions: 'Lee el relato del panel superior y responde.',
        maxScore: 5,
        config: { xp: 15 },
        content: {
          questions: [
            {
              id: 'l1',
              prompt: '¿Dónde está el dibujo del perro azul?',
              options: [
                'Clavado con una chincheta junto al ordenador',
                'En un marco dorado del salón',
                'Dentro de un libro cerrado',
              ],
              correct: 'Clavado con una chincheta junto al ordenador',
            },
            {
              id: 'l2',
              prompt: '¿Quién pintó el perro azul?',
              options: [
                'La escritora cuando era pequeña',
                'El niño de la casa de al lado',
                'El periodista de la entrevista',
              ],
              correct: 'El niño de la casa de al lado',
            },
            {
              id: 'l3',
              prompt: '¿Qué colores tiene el perro del dibujo?',
              options: [
                'Azul, lengua roja y ojos violeta',
                'Negro con orejas blancas',
                'Marrón y cola dorada',
              ],
              correct: 'Azul, lengua roja y ojos violeta',
            },
            {
              id: 'l4',
              prompt: '¿Por qué la niña pidió un perro y no un coche?',
              options: [
                'Para que la acompañara (sabía que no volvería)',
                'Porque no le gustaban los coches',
                'Porque el periodista se lo pidió',
              ],
              correct: 'Para que la acompañara (sabía que no volvería)',
            },
            {
              id: 'l5',
              prompt: 'Según el relato, el perro azul…',
              options: [
                'Mueve el rabo si está contenta y lame la mano si está triste',
                'Ladra cada noche en el estudio',
                'Se lo queda el periodista',
              ],
              correct: 'Mueve el rabo si está contenta y lame la mano si está triste',
            },
          ],
        },
      },
    ],
    vocabulario: [
      {
        id: 'cas-t2-voc-1',
        type: 'fill_blank',
        title: 'Tecnicismos, parónimas y neologismos',
        instructions: 'Completa con la palabra precisa (cuidado con parónimas).',
        maxScore: 8,
        config: { xp: 16 },
        content: {
          blanks: [
            { id: 'v1', prompt: 'Hueso largo de la pierna (t____)', answer: 'tibia', accept: ['tibia'] },
            { id: 'v2', prompt: 'Máquina que procesa datos (o_______)', answer: 'ordenador', accept: ['ordenador', 'computadora'] },
            { id: 'v3', prompt: 'Cariño, afecto (a______)', answer: 'afecto', accept: ['afecto'] },
            { id: 'v4', prompt: 'Consecuencia, resultado (e______)', answer: 'efecto', accept: ['efecto'] },
            { id: 'v5', prompt: 'La pimienta es un tipo de… (especia / especie)', answer: 'especia', accept: ['especia'] },
            { id: 'v6', prompt: 'La esponja sirve para… el agua (absorber / absolver)', answer: 'absorber', accept: ['absorber'] },
            { id: 'v7', prompt: 'El juez decidió… al acusado (absorber / absolver)', answer: 'absolver', accept: ['absolver'] },
            { id: 'v8', prompt: 'Neologismo de redes: publicar una foto de uno mismo (s____)', answer: 'selfi', accept: ['selfi', 'selfie'] },
          ],
        },
      },
      {
        id: 'cas-t2-voc-2',
        type: 'fill_blank',
        title: 'Ámbitos de los tecnicismos',
        maxScore: 4,
        config: { xp: 12 },
        content: {
          blanks: [
            { id: 'vt1', prompt: 'Estetoscopio, diagnóstico, radiografía → ámbito de la…', answer: 'medicina', accept: ['medicina', 'sanidad', 'salud'] },
            { id: 'vt2', prompt: 'Procesador, software, algoritmo → ámbito de la…', answer: 'informática', accept: ['informática', 'informatica', 'tecnología', 'tecnologia', 'computación', 'computacion'] },
            { id: 'vt3', prompt: 'Partitura, pentagrama, metrónomo → ámbito de la…', answer: 'música', accept: ['música', 'musica', 'músicos', 'musicos'] },
            { id: 'vt4', prompt: 'Penalti, fuera de juego, córner → ámbito del…', answer: 'deporte', accept: ['deporte', 'fútbol', 'futbol'] },
          ],
        },
      },
      {
        id: 'cas-t2-voc-3',
        type: 'multiple_choice',
        title: '¿Tecnicismo, parónima o neologismo?',
        maxScore: 3,
        config: { xp: 9 },
        content: {
          questions: [
            { id: 'vm1', prompt: '«Estetoscopio» es…', options: ['Tecnicismo médico', 'Neologismo de redes', 'Parónima'], correct: 'Tecnicismo médico' },
            { id: 'vm2', prompt: '«Chatear» es sobre todo un…', options: ['Tecnicismo medieval', 'Neologismo reciente', 'Verbo irregular'], correct: 'Neologismo reciente' },
            { id: 'vm3', prompt: '«Especie» y «especia» son…', options: ['Parónimas', 'Sinónimos', 'Igual significado'], correct: 'Parónimas' },
          ],
        },
      },
    ],
    verbo: [
      {
        id: 'cas-t2-verb-1',
        type: 'multiple_choice',
        title: 'Formas no personales',
        maxScore: 5,
        config: { xp: 12 },
        content: {
          questions: [
            { id: 'v1', prompt: '«correr» es…', options: ['Gerundio', 'Infinitivo', 'Participio'], correct: 'Infinitivo' },
            { id: 'v2', prompt: '«corriendo» es…', options: ['Gerundio', 'Infinitivo', 'Participio'], correct: 'Gerundio' },
            { id: 'v3', prompt: '«corrido» es…', options: ['Gerundio', 'Infinitivo', 'Participio'], correct: 'Participio' },
            { id: 'v4', prompt: 'Tras «estar» suele ir…', options: ['Participio', 'Gerundio', 'Infinitivo'], correct: 'Gerundio' },
            { id: 'v5', prompt: 'Tras «haber» suele ir…', options: ['Participio', 'Gerundio', 'Infinitivo'], correct: 'Participio' },
          ],
        },
      },
      {
        id: 'cas-t2-verb-lab',
        type: 'custom',
        title: 'Taller verbal: frases DELE, conjugaciones y oraciones',
        instructions: 'Elige la forma correcta, escribe el infinitivo y marca la conjugación, e identifica la forma resaltada. Al terminar, pulsa «Registrar puntuación».',
        maxScore: 26,
        config: { xp: 30, component: 'VerbLab', hideCheck: true },
        content: { component: 'VerbLab' },
      },
    ],
    acentuacion: [
      {
        id: 'cas-t2-acc-dnd',
        type: 'custom',
        title: 'Clasifica arrastrando: aguda, llana o esdrújula',
        instructions: 'Arrastra cada palabra a su columna (como en el taller original).',
        maxScore: 18,
        config: { xp: 22, component: 'DragClassify', hideCheck: true },
        content: {
          component: 'DragClassify',
          zones: [
            { id: 'agudas', title: 'Agudas', color: '#dc2626' },
            { id: 'llanas', title: 'Llanas / Graves', color: '#2563eb' },
            { id: 'esdrujulas', title: 'Esdrújulas', color: '#7c3aed' },
          ],
          items: accentDragItems,
        },
      },
      {
        id: 'cas-t2-acc-1',
        type: 'multiple_choice',
        title: 'Repaso rápido de acentuación',
        maxScore: 6,
        config: { xp: 15 },
        content: {
          questions: [
            { id: 'a1', prompt: '«camión» es…', options: ['Aguda', 'Llana', 'Esdrújula'], correct: 'Aguda' },
            { id: 'a2', prompt: '«árbol» es…', options: ['Aguda', 'Llana', 'Esdrújula'], correct: 'Llana' },
            { id: 'a3', prompt: '«rápido» es…', options: ['Aguda', 'Llana', 'Esdrújula'], correct: 'Esdrújula' },
            { id: 'a4', prompt: 'Las esdrújulas…', options: ['Nunca llevan tilde', 'Siempre llevan tilde', 'Solo si terminan en n'], correct: 'Siempre llevan tilde' },
            { id: 'a5', prompt: '«casa» (sin tilde) es…', options: ['Aguda', 'Llana', 'Esdrújula'], correct: 'Llana' },
            { id: 'a6', prompt: '«balón» lleva tilde porque es aguda y termina en…', options: ['Vocal', 'n', 'l'], correct: 'n' },
          ],
        },
      },
      {
        id: 'cas-t2-acc-2',
        type: 'fill_blank',
        title: 'Escribe con tilde si corresponde',
        maxScore: 4,
        config: { xp: 12 },
        content: {
          blanks: [
            { id: 'ac1', prompt: 'Palabra llana con tilde: arbol →', answer: 'árbol', accept: ['árbol', 'arbol'] },
            { id: 'ac2', prompt: 'Aguda con tilde: camion →', answer: 'camión', accept: ['camión', 'camion'] },
            { id: 'ac3', prompt: 'Esdrújula: musica →', answer: 'música', accept: ['música', 'musica'] },
            { id: 'ac4', prompt: 'Llana sin tilde (correcto): mesa →', answer: 'mesa', accept: ['mesa'] },
          ],
        },
      },
    ],
    taller: [
      {
        id: 'cas-t2-taller-space',
        type: 'custom',
        title: 'Misión espacial Alfa-9: informe científico',
        instructions: 'Redacta en la terminal un informe con longitud mínima y al menos 2 tecnicismos detectados en tiempo real.',
        maxScore: 25,
        config: { xp: 25, component: 'SpaceMissionLab', hideCheck: true },
        content: { component: 'SpaceMissionLab' },
      },
      {
        id: 'cas-t2-taller-2',
        type: 'ordering',
        title: 'Ordena los pasos del informe',
        maxScore: 4,
        config: { xp: 10 },
        content: {
          items: [
            'Redactar conclusiones',
            'Observar el fenómeno',
            'Comunicar resultados al equipo',
            'Anotar datos en la bitácora',
          ],
          order: [
            'Observar el fenómeno',
            'Anotar datos en la bitácora',
            'Redactar conclusiones',
            'Comunicar resultados al equipo',
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'cas-t2-quiz',
        type: 'custom',
        title: 'Autoevaluación master (10 preguntas)',
        instructions: 'Responde las 10 preguntas del banco mezclado. Necesitas al menos 8 aciertos para dominar el tema.',
        maxScore: 10,
        config: { xp: 20, component: 'MasterQuiz', hideCheck: true, questionCount: 10 },
        content: {
          component: 'MasterQuiz',
          questions: TEMA2_MASTER_QUIZ,
          questionCount: 10,
        },
      },
    ],
  },
})
