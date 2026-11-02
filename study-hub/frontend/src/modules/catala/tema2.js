import { createModule } from '../createModule.js'
import { ACCENT_WORDWALL_ZONES, TEMA2_MASTER_QUIZ } from './tema2Data.js'

export default createModule({
  resources: [
    {
      title: 'Genially Tema 2 Català',
      url: 'https://view.genially.com/688f04ef7c44033a35558dac',
    },
    {
      title: 'Wordwall: Accentuació',
      url: 'https://wordwall.net/es/resource/36179166/catal%C3%A0/accentuaci%C3%B3',
    },
  ],
  exercisesBySection: {
    lectura: [
      {
        id: 'cat-t2-lectura',
        type: 'multiple_choice',
        title: 'Una trobada anguniosa — comprensió',
        instructions: 'Consulta el text del panell abans de respondre.',
        maxScore: 5,
        config: { xp: 15 },
        content: {
          questions: [
            {
              id: 'r1',
              prompt: "On havien quedat en Biel i l'Ona?",
              options: [
                "A l'andana del metro",
                'Davant la façana del cinema Cinemix, al costat de la boca del metro',
                'Dins la cafeteria de la plaça',
              ],
              correct: 'Davant la façana del cinema Cinemix, al costat de la boca del metro',
            },
            {
              id: 'r2',
              prompt: 'Per què en Biel no va poder avisar l\'Ona amb el mòbil?',
              options: [
                'Se li havia acabat la bateria',
                'No tenia el número guardat',
                'El metro es va aturar en un túnel fosc sense cobertura',
              ],
              correct: 'El metro es va aturar en un túnel fosc sense cobertura',
            },
            {
              id: 'r3',
              prompt: 'Què significa que la trobada va ser «anguniosa»?',
              options: [
                'Divertida i plena de sorpreses',
                'Incòmoda, de tensió, angoixa i preocupació',
                'Feia molt de fred al cinema',
              ],
              correct: 'Incòmoda, de tensió, angoixa i preocupació',
            },
            {
              id: 'r4',
              prompt: "Com anava vestida l'Ona?",
              options: [
                'Amb orelleres vermelles i anorac',
                'Amb barret de llana blau marí i jaqueta de cuir',
                'Amb paraigua groc i botes verdes',
              ],
              correct: 'Amb orelleres vermelles i anorac',
            },
            {
              id: 'r5',
              prompt: 'Què va trencar la tensió i els va fer riure?',
              options: [
                'Un gelat gegant de regal',
                'Els cabells esboirats d\'en Biel i la bufanda cargolada pel vent',
                'La pel·lícula es va suspendre',
              ],
              correct: 'Els cabells esboirats d\'en Biel i la bufanda cargolada pel vent',
            },
          ],
        },
      },
      {
        id: 'cat-t2-lectura-feel',
        type: 'fill_blank',
        title: 'Sentiment d\'en Biel al metro',
        maxScore: 1,
        config: { xp: 5 },
        content: {
          blanks: [
            {
              id: 'rf1',
              prompt: 'Paraula que descriu el neguit d\'en Biel al túnel (a_______)',
              answer: 'angoixa',
              accept: ['angoixa', 'neguit', 'por', 'ansietat'],
            },
          ],
        },
      },
    ],
    polisemia: [
      {
        id: 'cat-t2-pol-mc',
        type: 'multiple_choice',
        title: 'Context polisèmic',
        maxScore: 4,
        config: { xp: 12 },
        content: {
          questions: [
            {
              id: 'p1',
              prompt: '«Vaig al banc a treure diners.» «Banc» significa…',
              options: ['Seient', 'Entitat financera', 'Muntanya'],
              correct: 'Entitat financera',
            },
            {
              id: 'p2',
              prompt: '«Em sento al banc del parc.» «Banc» significa…',
              options: ['Seient', 'Entitat financera', 'Joc'],
              correct: 'Seient',
            },
            {
              id: 'p3',
              prompt: 'Una paraula polisèmica té…',
              options: ['Un sol sentit', 'Diversos sentits', 'Només antònims'],
              correct: 'Diversos sentits',
            },
            {
              id: 'p4',
              prompt: '«cap» pot significar…',
              options: ['Només part del cos', 'Només peça de roba', 'Diversos sentits segons el context'],
              correct: 'Diversos sentits segons el context',
            },
          ],
        },
      },
      {
        id: 'cat-t2-pol-match',
        type: 'matching',
        title: 'Paraula polisèmica → significat en context',
        maxScore: 3,
        config: { xp: 9 },
        content: {
          pairs: [
            { left: 'clau (eina)', right: 'Obrir una porta' },
            { left: 'clau (música)', right: 'Do major o sol menor' },
            { left: 'cua (animal)', right: 'Part posterior del cos' },
          ],
        },
      },
      {
        id: 'cat-t2-pol-fitxa',
        type: 'custom',
        title: 'Fitxa oficial: Treballem la Polisèmia',
        instructions: 'Context en frases + exercicis 1, 2 i 3 de la fitxa de classe.',
        maxScore: 28,
        config: { xp: 30, component: 'PolisemiaFitxa', hideCheck: true },
        content: { component: 'PolisemiaFitxa' },
      },
    ],
    accentuacio: [
      {
        id: 'cat-t2-acc-wordwall',
        type: 'custom',
        title: 'Wordwall: classifica agudes, planes i esdrúixoles (2 nivells)',
        instructions: 'Nivell 1 (15 paraules) i nivell 2 (21 paraules), com al Wordwall de classe.',
        maxScore: 15,
        config: { xp: 24, component: 'WordwallAccentLab', hideCheck: true },
        content: {
          component: 'WordwallAccentLab',
          levels: [1, 2],
          zones: ACCENT_WORDWALL_ZONES,
        },
      },
      {
        id: 'cat-t2-acc-gen',
        type: 'custom',
        title: 'Pràctica d\'accentuació (Enxaneta 44 — aleatori)',
        instructions: 'Escriu cada paraula amb l\'accent correcte. Fes servir el teclat d\'accents.',
        maxScore: 8,
        config: { xp: 20, component: 'AccentGenerator', hideCheck: true },
        content: { component: 'AccentGenerator' },
      },
      {
        id: 'cat-t2-acc',
        type: 'multiple_choice',
        title: 'Repàs d’accentuació',
        maxScore: 5,
        config: { xp: 15 },
        content: {
          questions: [
            { id: 'a1', prompt: '«camió»', options: ['Aguda', 'Plana', 'Esdrúixola'], correct: 'Aguda' },
            { id: 'a2', prompt: '«tàpia»', options: ['Aguda', 'Plana', 'Esdrúixola'], correct: 'Plana' },
            { id: 'a3', prompt: '«música»', options: ['Aguda', 'Plana', 'Esdrúixola'], correct: 'Esdrúixola' },
            { id: 'a4', prompt: 'Les agudes s\'accentuen quan acaben en…', options: ['Consonant sola', 'Vocal, vocal+s, -en, -in', 'Mai s\'accentuen'], correct: 'Vocal, vocal+s, -en, -in' },
            { id: 'a5', prompt: 'La vocal «a» en català porta accent…', options: ['Tancat (´)', 'Obert (`)', 'Cap'], correct: 'Obert (`)' },
          ],
        },
      },
    ],
    adjectiu: [
      {
        id: 'cat-t2-adj-fem-gen',
        type: 'custom',
        title: 'Femení de l\'adjectiu (Enxaneta 17 — aleatori)',
        instructions: 'Escriu la forma femenina segons el model.',
        maxScore: 6,
        config: { xp: 18, component: 'AdjGenerator', hideCheck: true },
        content: { component: 'AdjGenerator', mode: 'fem' },
      },
      {
        id: 'cat-t2-adj-pl-gen',
        type: 'custom',
        title: 'Plural complet (Enxaneta 99 — aleatori)',
        instructions: 'Escriu el sintagma en plural amb concordança correcta.',
        maxScore: 5,
        config: { xp: 20, component: 'AdjGenerator', hideCheck: true },
        content: { component: 'AdjGenerator', mode: 'plural' },
      },
      {
        id: 'cat-t2-adj-fill',
        type: 'fill_blank',
        title: 'Concordança de l\'adjectiu',
        maxScore: 4,
        config: { xp: 12 },
        content: {
          blanks: [
            { id: 'j1', prompt: 'Femení de «blanc»', answer: 'blanca' },
            { id: 'j2', prompt: 'Plural de «gran»', answer: 'grans' },
            { id: 'j3', prompt: 'Femení plural de «bonic»', answer: 'boniques' },
            { id: 'j4', prompt: 'Femení de «tranquil» (amb ela geminada)', answer: 'tranquil·la', accept: ['tranquil·la', 'tranquilla'] },
          ],
        },
      },
      {
        id: 'cat-t2-adj-mc',
        type: 'multiple_choice',
        title: 'Adjectius invariables i concordança',
        maxScore: 2,
        config: { xp: 6 },
        content: {
          questions: [
            {
              id: 'adj1',
              prompt: 'Forma correcta:',
              options: ['una noia obedienta', 'una noia obedient', 'una noia obedients'],
              correct: 'una noia obedient',
            },
            {
              id: 'adj2',
              prompt: 'Plural correcte de «el meu amic anglès»:',
              options: ['Els meus amics anglesos', 'Els meus amics angles', 'Els amics anglès'],
              correct: 'Els meus amics anglesos',
            },
          ],
        },
      },
    ],
    mail: [
      {
        id: 'cat-t2-mail-lab',
        type: 'custom',
        title: 'Simulador de correu electrònic',
        instructions: 'Completa destinatari, assumpte i cos. Usa salutació, comiat i signatura. Després envia.',
        maxScore: 25,
        config: { xp: 25, component: 'EmailComposer', hideCheck: true },
        content: { component: 'EmailComposer' },
      },
      {
        id: 'cat-t2-mail-mc',
        type: 'multiple_choice',
        title: 'Protocol del correu electrònic',
        maxScore: 3,
        config: { xp: 9 },
        content: {
          questions: [
            {
              id: 'm1',
              prompt: 'El camp «Assumpte» serveix per…',
              options: ['Escriure el cos sencer', 'Resumir el tema en poques paraules', 'Posar la signatura'],
              correct: 'Resumir el tema en poques paraules',
            },
            {
              id: 'm2',
              prompt: 'Per què no convé escriure tot el mail en MAJÚSCULES?',
              options: [
                'Gasta més bateria',
                'A Internet equival a cridar',
                'El correu no arriba',
              ],
              correct: 'A Internet equival a cridar',
            },
            {
              id: 'm3',
              prompt: 'Abans d\'enviar un mail cal…',
              options: ['Tornar-lo a llegir', 'Esborrar el destinatari', 'Posar-ho tot en majúscules'],
              correct: 'Tornar-lo a llegir',
            },
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'cat-t2-quiz-master',
        type: 'custom',
        title: 'Autoavaluació master (10 preguntes, barrejades)',
        instructions: 'Respon les 10 preguntes. Les opcions es barregen a cada intent.',
        maxScore: 10,
        config: { xp: 20, component: 'MasterQuiz', hideCheck: true },
        content: { component: 'MasterQuiz', questions: TEMA2_MASTER_QUIZ },
      },
    ],
  },
})
