import { createModule } from '../createModule.js'
import { AGES_ZONES, H5P_AGES_ITEMS } from './pasdeltempsData.js'

export default createModule({
  sections: [],
  theoryHtml: '',
  resources: [
    {
      title: 'Drive Projecte',
      url: 'https://drive.google.com/open?id=1Dyk1gri0h3W3Sc1YCaa2NnIcw-bffugs&usp=drive_copy',
    },
    {
      title: 'Genially: El pas del temps',
      url: 'https://view.genially.com/5c73dcab5d0e4e575e19003c',
    },
    {
      title: 'Google Sites 5è',
      url: 'https://sites.google.com/site/elpasdeltemps5e/',
    },
  ],
  documents: [],
  exercisesBySection: {
    'tab-romans': [
      {
        id: 'pdt-rom',
        type: 'custom',
        title: 'Conversor & descompositor màgic',
        maxScore: 10,
        config: { xp: 10, component: 'RomanConverter' },
        content: { component: 'RomanConverter' },
      },
      {
        id: 'pdt-rom-workshop',
        type: 'custom',
        title: 'Taller oficial (23 reptes)',
        instructions: 'Activitats I–III de la fitxa de classe: romans ↔ xifres i opció múltiple.',
        maxScore: 23,
        config: { xp: 30, component: 'RomanWorkshopLab', hideCheck: true },
        content: { component: 'RomanWorkshopLab' },
      },
    ],
    'tab-segles': [
      {
        id: 'pdt-seg',
        type: 'custom',
        title: 'Any → segle (calculadora)',
        maxScore: 5,
        config: { xp: 5, component: 'CenturyCalculator' },
        content: { component: 'CenturyCalculator', year: 1789 },
      },
      {
        id: 'pdt-seg-grid',
        type: 'fill_blank',
        title: 'Reixeta oficial: quin segle és?',
        instructions: 'Accepta formes com «XV», «s. XV» o «segle XV».',
        maxScore: 9,
        config: { xp: 18 },
        content: {
          blanks: [
            { id: 's102', prompt: 'Any 102 →', answer: 'II', accept: ['II', 's. II', 'segle II', 'Segle II'] },
            { id: 's10', prompt: 'Any 10 →', answer: 'I', accept: ['I', 's. I', 'segle I', 'Segle I'] },
            { id: 's1950', prompt: 'Any 1950 →', answer: 'XX', accept: ['XX', 's. XX', 'segle XX', 'Segle XX'] },
            { id: 's2005', prompt: 'Any 2005 →', answer: 'XXI', accept: ['XXI', 's. XXI', 'segle XXI', 'Segle XXI'] },
            { id: 's50ac', prompt: 'Any 50 aC →', answer: 'I aC', accept: ['I aC', 's. I aC', 'segle I aC', 'IaC', 'Segle I aC'] },
            { id: 's170ac', prompt: 'Any 170 aC →', answer: 'II aC', accept: ['II aC', 's. II aC', 'segle II aC', 'IIaC', 'Segle II aC'] },
            { id: 'mozart', prompt: 'Mozart (1788) →', answer: 'XVIII', accept: ['XVIII', 's. XVIII', 'segle XVIII', 'Segle XVIII'] },
            { id: 'harry', prompt: 'Harry Potter (2001) →', answer: 'XXI', accept: ['XXI', 's. XXI', 'segle XXI', 'Segle XXI'] },
            { id: 'august', prompt: 'August (27 aC) →', answer: 'I aC', accept: ['I aC', 's. I aC', 'segle I aC', 'IaC', 'Segle I aC'] },
          ],
        },
      },
      {
        id: 'pdt-seg-quiz',
        type: 'multiple_choice',
        title: 'Segles i cronologia',
        maxScore: 4,
        config: { xp: 12 },
        content: {
          questions: [
            { id: 'sq1', prompt: '1492 pertany al segle…', options: ['XIV', 'XV', 'XVI'], correct: 'XV' },
            { id: 'sq2', prompt: 'Un segle són…', options: ['10 anys', '100 anys', '1000 anys'], correct: '100 anys' },
            { id: 'sq3', prompt: 'L’any 500 aC és…', options: ['Més recent que 200 aC', 'Més antic que 200 aC', 'El mateix segle que 200 aC'], correct: 'Més antic que 200 aC' },
            { id: 'sq4', prompt: 'L’any 2000 és el segle…', options: ['XIX', 'XX', 'XXI'], correct: 'XX' },
          ],
        },
      },
    ],
    'tab-edats-h5p': [
      {
        id: 'pdt-edats-dnd',
        type: 'custom',
        title: 'Repte H5P: classifica 18 elements',
        instructions: 'Arrossega cada targeta a l’edat històrica correcta (joc oficial H5P).',
        maxScore: 18,
        config: { xp: 25, component: 'AgesDragLab', hideCheck: true },
        content: {
          component: 'AgesDragLab',
          shuffleOnLoad: true,
          hint: 'Arrossega cada targeta a la seva etapa (o toca la targeta i després la zona). En mòbil: toca targeta + zona.',
          successFeedback: 'Perfecte! Les 18 targetes estan ben classificades.',
          failFeedback: 'Encara hi ha errors. Revisa les etapes i torna-ho a provar.',
          zones: AGES_ZONES,
          items: H5P_AGES_ITEMS,
        },
      },
      {
        id: 'pdt-ord',
        type: 'ordering',
        title: 'Ordena les 5 etapes',
        maxScore: 5,
        config: { xp: 15 },
        content: {
          items: ['Edat Antiga', 'Edat Mitjana', 'Edat Moderna', 'Edat Contemporània', 'Prehistòria'],
          order: ['Prehistòria', 'Edat Antiga', 'Edat Mitjana', 'Edat Moderna', 'Edat Contemporània'],
        },
      },
      {
        id: 'pdt-edats-tf',
        type: 'true_false',
        title: 'Les 5 edats (cert o fals)',
        maxScore: 5,
        config: { xp: 10 },
        content: {
          items: [
            { id: 'e1', prompt: 'La Prehistòria acaba amb la invenció de l’escriptura.', correct: true },
            { id: 'e2', prompt: 'L’Edat Mitjana acaba el 1492 amb Colom.', correct: true },
            { id: 'e3', prompt: 'L’Edat Moderna comença el 1789.', correct: false },
            { id: 'e4', prompt: 'L’Edat Antiga inclou l’Imperi Romà.', correct: true },
            { id: 'e5', prompt: 'L’Edat Contemporània comença amb la Revolució Francesa.', correct: true },
          ],
        },
      },
    ],
    'tab-peninsula': [
      {
        id: 'pdt-pen-quiz',
        type: 'multiple_choice',
        title: 'Activitat I: Gran quiz de la Península (8)',
        maxScore: 8,
        config: { xp: 24 },
        content: {
          questions: [
            {
              id: 'pe1',
              prompt: 'Atapuerca: a quina etapa va viure l’Homo antecessor fa 1.200.000 anys?',
              options: ['Al Paleolític', 'Al Neolític', 'A l’Edat dels Metalls'],
              correct: 'Al Paleolític',
            },
            {
              id: 'pe2',
              prompt: 'Quina fita del 9.000 aC fa sedentaris els humans?',
              options: ['L’agricultura i la ramaderia', 'La impremta', 'L’escriptura'],
              correct: 'L’agricultura i la ramaderia',
            },
            {
              id: 'pe3',
              prompt: 'Quin invent del 3.500 aC tanca la Prehistòria?',
              options: ['La invenció de l’escriptura', 'La invenció de la roda', 'El descobriment del foc'],
              correct: 'La invenció de l’escriptura',
            },
            {
              id: 'pe4',
              prompt: 'Quins pobles van arribar a comerciar abans que els romans?',
              options: [
                'Fenicis (700 aC), Grecs (600 aC) i Cartaginesos (400 aC)',
                'Els musulmans i els visigots',
                'Els Àustria i els Borbó',
              ],
              correct: 'Fenicis (700 aC), Grecs (600 aC) i Cartaginesos (400 aC)',
            },
            {
              id: 'pe5',
              prompt: 'En quin any desembarquen els romans a Empúries?',
              options: ['L’any 218 aC', 'L’any 19 aC', 'L’any 476 dC'],
              correct: 'L’any 218 aC',
            },
            {
              id: 'pe6',
              prompt: 'Quin any marca la invasió musulmana?',
              options: ['L’any 711 dC', 'L’any 1492 dC', 'L’any 1789 dC'],
              correct: 'L’any 711 dC',
            },
            {
              id: 'pe7',
              prompt: 'Quines dinasties regnen a l’Edat Moderna a Espanya?',
              options: [
                'Dinastia dels Àustria (1516) i dels Borbó (1701)',
                'Celtes i Ibers',
                'Fenicis i Grecs',
              ],
              correct: 'Dinastia dels Àustria (1516) i dels Borbó (1701)',
            },
            {
              id: 'pe8',
              prompt: 'Quin conflicte hi ha a la Península entre 1808 i 1814?',
              options: [
                'La Guerra de la Independència (Guerra del Francès)',
                'La Guerra Civil espanyola',
                'La Constitució democràtica',
              ],
              correct: 'La Guerra de la Independència (Guerra del Francès)',
            },
          ],
        },
      },
      {
        id: 'pdt-pen-chrono',
        type: 'ordering',
        title: 'Activitat II: Crono-repte (6 fets)',
        instructions: 'Ordena del més antic al més recent.',
        maxScore: 6,
        config: { xp: 18 },
        content: {
          items: [
            '🦴 Atapuerca: Homo antecessor (fa 1.200.000 anys)',
            '🏺 Fenicis arriben a la Península (700 aC)',
            '🏛️ Romans desembarquen a Empòrion (218 aC)',
            '🕌 Invasió musulmana / Al-Àndalus (711 dC)',
            '👑 Comença la Dinastia dels Àustria (1516)',
            '📜 Constitució democràtica (1978)',
          ],
          order: [
            '🦴 Atapuerca: Homo antecessor (fa 1.200.000 anys)',
            '🏺 Fenicis arriben a la Península (700 aC)',
            '🏛️ Romans desembarquen a Empòrion (218 aC)',
            '🕌 Invasió musulmana / Al-Àndalus (711 dC)',
            '👑 Comença la Dinastia dels Àustria (1516)',
            '📜 Constitució democràtica (1978)',
          ],
        },
      },
    ],
    'tab-documents': [
      {
        id: 'pdt-docs-recap',
        type: 'multiple_choice',
        title: 'Repàs abans d’obrir els PDF',
        maxScore: 3,
        config: { xp: 6 },
        content: {
          questions: [
            {
              id: 'doc1',
              prompt: 'Un lustre són…',
              options: ['5 anys', '10 anys', '100 anys'],
              correct: '5 anys',
            },
            {
              id: 'doc2',
              prompt: 'Abans de Crist (aC) es compta…',
              options: ['Cap endavant', 'Cap enrere', 'Com els segles romans'],
              correct: 'Cap enrere',
            },
            {
              id: 'doc3',
              prompt: 'La regla del +1 serveix per…',
              options: ['Sumar lustres', 'Calcular el segle', 'Ordenar etapes'],
              correct: 'Calcular el segle',
            },
          ],
        },
      },
    ],
  },
})
