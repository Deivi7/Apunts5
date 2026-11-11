import { createModule } from '../createModule.js'
import {
  FAMILY_PAIRS_1,
  FAMILY_PAIRS_2,
  PRESENT_TO_PAST_BLANKS,
  PAST_TO_PRESENT_BLANKS,
  IRREGULAR_VERBS_QUIZ,
} from './irregularVerbsData.js'

function fillContent(blanks, columns = 2, extra = {}) {
  return { columns, compact: true, hideHint: true, blanks, ...extra }
}

export default createModule({
  sections: [],
  theoryHtml: '',
  resources: [
    {
      title: 'Carpeta Google Drive Amco English',
      url: 'https://drive.google.com/open?id=11MTXbwRSRHr8vQThod9kVhjcwmopSonJ&usp=drive_copy',
    },
  ],
  documents: [],
  exercisesBySection: {
    apuntes: [
      {
        id: 'iv-soundboard-lab',
        type: 'custom',
        title: 'Tabla Fonética Interactiva con Voz (Haz clic en cualquier verbo para escucharlo)',
        instructions: 'Pulsa sobre cualquier verbo para escuchar cómo suena en Presente y en Pasado en inglés, o filtra por familia fonética.',
        maxScore: 10,
        config: { xp: 10, component: 'IrregularVerbsSoundboardLab', hideCheck: true },
        content: { component: 'IrregularVerbsSoundboardLab' },
      },
    ],
    arena: [
      {
        id: 'iv-arena-lab',
        type: 'custom',
        title: 'Irregular Verbs Arena: 1. Dilo en voz alta · 2. Opciones rápidas · 3. Escribir',
        instructions: 'Elige una familia fonética (o mézclalos todos), selecciona el modo de juego y entrena de Presente → Pasado o de Pasado → Presente. ¡Los verbos que falles volverán a salir más veces hasta que los domines!',
        maxScore: 20,
        config: { xp: 25, component: 'IrregularVerbsArenaLab', hideCheck: true },
        content: { component: 'IrregularVerbsArenaLab' },
      },
    ],
    coach: [
      {
        id: 'iv-oral-coach-lab',
        type: 'custom',
        title: 'Speaking Coach Bidireccional: El Profe te pregunta y te corrige en voz alta (Present ↔ Past)',
        instructions: 'Pulsa en "Que el profe me pregunte en voz alta", escucha el verbo y responde con tu voz tanto de Presente a Pasado como de Pasado a Presente.',
        maxScore: 20,
        config: { xp: 25, component: 'IrregularVerbsOralCoachLab', hideCheck: true },
        content: { component: 'IrregularVerbsOralCoachLab' },
      },
    ],
    practica: [
      {
        id: 'iv-pairs-1',
        type: 'match_pairs',
        title: 'Empareja Presente y Pasado (Familias 2, 3 y 4)',
        instructions: 'Une cada verbo en presente con su pasado irregular correspondiente:',
        maxScore: FAMILY_PAIRS_1.length,
        config: { xp: 12 },
        content: { pairs: FAMILY_PAIRS_1 },
      },
      {
        id: 'iv-pairs-2',
        type: 'match_pairs',
        title: 'Empareja Presente y Pasado (Familias 5, 6 y 7)',
        instructions: 'Une cada verbo en presente con su pasado irregular correspondiente:',
        maxScore: FAMILY_PAIRS_2.length,
        config: { xp: 12 },
        content: { pairs: FAMILY_PAIRS_2 },
      },
      {
        id: 'iv-p2past-blanks',
        type: 'fill_blank',
        title: 'Reto Escrito: De Presente a Pasado (Present → Past)',
        instructions: 'Escribe la forma de pasado simple (Past Simple) de cada verbo:',
        maxScore: PRESENT_TO_PAST_BLANKS.length,
        config: { xp: 16 },
        content: fillContent(PRESENT_TO_PAST_BLANKS, 2),
      },
      {
        id: 'iv-past2p-blanks',
        type: 'fill_blank',
        title: 'Reto Inverso: De Pasado a Presente (Past → Present)',
        instructions: 'Observa el verbo en pasado y escribe su forma en presente (infinitivo):',
        maxScore: PAST_TO_PRESENT_BLANKS.length,
        config: { xp: 15 },
        content: fillContent(PAST_TO_PRESENT_BLANKS, 2),
      },
    ],
    repaso: [
      {
        id: 'iv-master-quiz',
        type: 'custom',
        title: 'Quiz Final de Verbos Irregulares (Present ↔ Past)',
        instructions: 'Demuestra tu dominio de los 57 verbos irregulares en este test de 10 preguntas.',
        maxScore: 10,
        config: { xp: 20, component: 'MasterQuiz', hideCheck: true },
        content: { component: 'MasterQuiz', questions: IRREGULAR_VERBS_QUIZ },
      },
      {
        id: 'iv-worksheet',
        type: 'custom',
        title: 'Ficha Imprimible por Familias Fonéticas',
        instructions: 'Practica en papel ocultando la columna de Presente o la de Pasado.',
        maxScore: 10,
        config: { xp: 10, component: 'IrregularVerbsWorksheet', hideCheck: true },
        content: { component: 'IrregularVerbsWorksheet' },
      },
    ],
  },
})

