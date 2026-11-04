import { createModule } from '../createModule.js'
import {
  EX1_WORDS,
  EX2_ROWS,
  EX3_ITEMS,
  EX4_COLLECTIVES,
  EX5_READING,
  EX6_HUNT,
  EX7_SYN_ANT,
  EX10_CLASSIFY,
  PRO1_WORDS,
  PRO2_SPLITS,
  PRO3_DIHAT,
  PRO4_COLLECTIVES,
  PRO5_SUBTLE,
  PAP_TRAINER_QUIZ,
} from './posat_a_prova_1Data.js'

export default createModule({
  exercisesBySection: {
    'tab-examen': [
      {
        id: 'cat-pap-ex1-tonica',
        type: 'custom',
        title: 'Exercici 1 — Síl·laba tònica (10 paraules)',
        instructions: 'Clica la síl·laba tònica de cada paraula (com a l\'examen del 15-10).',
        maxScore: 10,
        config: { xp: 24, component: 'SyllableTonicaLab', hideCheck: true },
        content: { component: 'SyllableTonicaLab', words: EX1_WORDS },
      },
      {
        id: 'cat-pap-ex2-genere',
        type: 'custom',
        title: 'Exercici 2 — Gènere i nombre',
        maxScore: 10,
        config: { xp: 20, component: 'GenderNumberLab', hideCheck: true },
        content: { component: 'GenderNumberLab', rows: EX2_ROWS },
      },
      {
        id: 'cat-pap-ex3-split',
        type: 'custom',
        title: 'Exercici 3 — Separació sil·làbica i tònica',
        instructions: 'Dígrafs, monosíl·labs i tònica (punt clau de l\'examen).',
        maxScore: 10,
        config: { xp: 28, component: 'SyllableSplitLab', hideCheck: true },
        content: { component: 'SyllableSplitLab', items: EX3_ITEMS, withTonic: true },
      },
      {
        id: 'cat-pap-ex4-collectius',
        type: 'fill_blank',
        title: 'Exercici 4 — Noms individuals i col·lectius',
        maxScore: 5,
        config: { xp: 16 },
        content: {
          columns: 2,
          compact: true,
          hideHint: true,
          blanks: EX4_COLLECTIVES.map((c) => ({
            id: c.id,
            prompt: c.prompt,
            answer: c.accept[0],
            accept: c.accept,
          })),
        },
      },
      {
        id: 'cat-pap-ex5-lectura',
        type: 'multiple_choice',
        title: 'Exercici 5 — Comprensió lectora (dofins)',
        instructions: 'Text oficial a la pestanya de teoria / panell d\'examen.',
        maxScore: 5,
        config: { xp: 18 },
        content: { questions: EX5_READING },
      },
      {
        id: 'cat-pap-ex6-cerca',
        type: 'custom',
        title: 'Exercici 6 — Cerca al text dels dofins',
        maxScore: 3,
        config: { xp: 16, component: 'WordChipHuntLab', hideCheck: true },
        content: { component: 'WordChipHuntLab', categories: EX6_HUNT },
      },
      {
        id: 'cat-pap-ex7-sin-ant',
        type: 'fill_blank',
        title: 'Exercici 7 — Sinònims i antònims',
        maxScore: 8,
        config: { xp: 18 },
        content: {
          columns: 2,
          compact: true,
          hideHint: true,
          blanks: EX7_SYN_ANT.map((row) => ({
            id: row.id,
            prompt: row.prompt,
            answer: row.accept[0],
            accept: row.accept,
          })),
        },
      },
      {
        id: 'cat-pap-ex8-ant-test',
        type: 'multiple_choice',
        title: 'Exercici 8 — Test d\'antònims',
        maxScore: 2,
        config: { xp: 12 },
        content: {
          questions: [
            {
              id: '8a',
              prompt: 'Totes les parelles són antònimes:',
              options: [
                'Rural / urbà; xerraire / callat',
                'Clar / lluminós; fred / gelat',
                'Alt / baix; fatigat / cansat',
              ],
              correct: 'Rural / urbà; xerraire / callat',
            },
            {
              id: '8b',
              prompt: 'Els antònims signifiquen…',
              options: ['El mateix', 'El contrari', 'Semblant'],
              correct: 'El contrari',
            },
          ],
        },
      },
      {
        id: 'cat-pap-ex9-noms',
        type: 'multiple_choice',
        title: 'Exercici 9 — Classes de noms',
        maxScore: 2,
        config: { xp: 12 },
        content: {
          questions: [
            {
              id: '9a',
              prompt: 'El nom col·lectiu és…',
              options: [
                'Un sol element en singular',
                'Nom propi de ciutat',
                'Singular per a un grup de la mateixa espècie',
              ],
              correct: 'Singular per a un grup de la mateixa espècie',
            },
            {
              id: '9b',
              prompt: 'Sentiments i idees (no es poden tocar) són noms…',
              options: ['Abstractes', 'Concrets', 'Individuals'],
              correct: 'Abstractes',
            },
          ],
        },
      },
      {
        id: 'cat-pap-ex10-class',
        type: 'custom',
        title: 'Exercici 10 — Concrets vs abstractes (14 paraules)',
        instructions: 'Arrossega o clica per classificar (inclou enveja, vergonya…).',
        maxScore: 14,
        config: { xp: 22, component: 'DragClassify', hideCheck: true },
        content: {
          component: 'DragClassify',
          zones: [
            { id: 'concrets', title: '🧱 Concrets', color: '#2563eb' },
            { id: 'abstractes', title: '💭 Abstractes', color: '#7c3aed' },
          ],
          items: EX10_CLASSIFY.map((w) => ({ id: w.id, label: w.label, zone: w.zone })),
        },
      },
    ],
    'tab-pro': [
      {
        id: 'cat-pap-pro1-tonica',
        type: 'custom',
        title: 'Pro 1 — Tònica complexa',
        maxScore: 5,
        config: { xp: 18, component: 'SyllableTonicaLab', hideCheck: true },
        content: { component: 'SyllableTonicaLab', words: PRO1_WORDS },
      },
      {
        id: 'cat-pap-pro2-digraf',
        type: 'custom',
        title: 'Pro 2 — Separació amb múltiples dígrafs',
        maxScore: 5,
        config: { xp: 20, component: 'SyllableSplitLab', hideCheck: true },
        content: {
          component: 'SyllableSplitLab',
          withTonic: false,
          items: PRO2_SPLITS.map((p) => ({ word: p.word, correctSplit: p.split })),
        },
      },
      {
        id: 'cat-pap-pro3-diftong',
        type: 'custom',
        title: 'Pro 3 — Diftong o hiat?',
        maxScore: 4,
        config: { xp: 16, component: 'PillChoiceLab', hideCheck: true },
        content: {
          component: 'PillChoiceLab',
          columns: ['Paraula', 'Tria'],
          options: [
            { value: 'diftong', label: 'Diftong' },
            { value: 'hiat', label: 'Hiat' },
          ],
          rows: PRO3_DIHAT.map((r) => ({ id: r.id, label: r.label, correct: r.correct })),
        },
      },
      {
        id: 'cat-pap-pro4-collectius',
        type: 'fill_blank',
        title: 'Pro 4 — Col·lectius avançats',
        maxScore: 5,
        config: { xp: 18 },
        content: {
          columns: 2,
          compact: true,
          hideHint: true,
          blanks: PRO4_COLLECTIVES.map((c) => ({
            id: c.id,
            prompt: c.prompt,
            answer: c.accept[0],
            accept: c.accept,
          })),
        },
      },
      {
        id: 'cat-pap-pro5-subtil',
        type: 'custom',
        title: 'Pro 5 — Concret vs abstracte subtil',
        maxScore: 4,
        config: { xp: 16, component: 'PillChoiceLab', hideCheck: true },
        content: {
          component: 'PillChoiceLab',
          columns: ['Paraula', 'Classificació'],
          options: [
            { value: 'C', label: 'Concret' },
            { value: 'A', label: 'Abstracte' },
          ],
          rows: PRO5_SUBTLE.map((r) => ({ id: r.id, label: r.label, correct: r.correct })),
        },
      },
      {
        id: 'cat-pap-pro6-catala',
        type: 'multiple_choice',
        title: 'Pro 6 — Català genuí (botiga, llar)',
        maxScore: 2,
        config: { xp: 14 },
        content: {
          questions: [
            {
              id: 'p6a',
              prompt: 'Vaig a la tienda a comprar pomes:',
              options: ['Compre', 'Botiga', 'Parada'],
              correct: 'Botiga',
            },
            {
              id: 'p6b',
              prompt: 'Torno al caliu de la meva casa/hogar:',
              options: ['Llar', 'Hogar', 'Pís'],
              correct: 'Llar',
            },
          ],
        },
      },
      {
        id: 'cat-pap-pro7-ant',
        type: 'fill_blank',
        title: 'Pro 7 — Antònims enriquits',
        maxScore: 3,
        config: { xp: 14 },
        content: {
          blanks: [
            { id: 'lleuger', prompt: 'Antònim de lleuger', answer: 'pesat' },
            { id: 'modest', prompt: 'Antònim de modest', answer: 'arrogant' },
            { id: 'covard', prompt: 'Antònim de covard', answer: 'valent', accept: ['valent', 'atrevit'] },
          ],
        },
      },
      {
        id: 'cat-pap-pro8-formes',
        type: 'fill_blank',
        title: 'Pro 8 — Plurals i femení irregular',
        maxScore: 3,
        config: { xp: 14 },
        content: {
          blanks: [
            { id: 'bosc', prompt: 'Plural de «bosc»', answer: 'boscos', accept: ['boscos', 'boscs'] },
            { id: 'brac', prompt: 'Plural de «braç»', answer: 'braços', accept: ['braços', 'bracos'] },
            { id: 'cavall', prompt: 'Femení de «cavall»', answer: 'euga', accept: ['euga', 'egua', 'cavalla'] },
          ],
        },
      },
      {
        id: 'cat-pap-pro9-linx',
        type: 'multiple_choice',
        title: 'Pro 9 — Comprensió (linx ibèric)',
        maxScore: 1,
        config: { xp: 10 },
        content: {
          questions: [
            {
              id: 'p9',
              prompt: 'Per a què serveixen els pinzells de pèl a les orelles del linx?',
              options: [
                'Per espantar depredadors',
                'Com a antenes que milloren l\'audició per caçar conills',
                'Per netejar-se els ulls',
              ],
              correct: 'Com a antenes que milloren l\'audició per caçar conills',
            },
          ],
        },
      },
      {
        id: 'cat-pap-pro10-error',
        type: 'multiple_choice',
        title: 'Pro 10 — Caçador d\'errors de separació',
        maxScore: 1,
        config: { xp: 10 },
        content: {
          questions: [
            {
              id: 'p10',
              prompt: 'Quina separació està MAL feta?',
              options: ['car - re - te - ra', 'ba - ny - e - ra', 'col - le - gi'],
              correct: 'ba - ny - e - ra',
            },
          ],
        },
      },
    ],
    'tab-generator': [
      {
        id: 'cat-pap-gen-arena',
        type: 'custom',
        title: 'Entrenador infinit — tònica, dígrafs, concrets',
        maxScore: 8,
        config: { xp: 20, component: 'PapInfiniteTrainer', hideCheck: true },
        content: { component: 'PapInfiniteTrainer' },
      },
      {
        id: 'cat-pap-gen-quiz',
        type: 'custom',
        title: 'Quiz ràpid (banc complet, barajat)',
        maxScore: 15,
        config: { xp: 15, component: 'MasterQuiz', hideCheck: true },
        content: { component: 'MasterQuiz', questions: PAP_TRAINER_QUIZ },
      },
      {
        id: 'cat-pap-gen-order',
        type: 'ordering',
        title: 'Passos del Truc del Crit',
        maxScore: 4,
        config: { xp: 10 },
        content: {
          items: [
            'Imagina que crides la paraula des de lluny',
            'Allarga la síl·laba que surt amb més força',
            'Aquesta és la síl·laba tònica',
            'Aplica la regla d\'accentuació segons aguda/plana/esdrúixola',
          ],
          order: [
            'Imagina que crides la paraula des de lluny',
            'Allarga la síl·laba que surt amb més força',
            'Aquesta és la síl·laba tònica',
            'Aplica la regla d\'accentuació segons aguda/plana/esdrúixola',
          ],
        },
      },
    ],
  },
})
