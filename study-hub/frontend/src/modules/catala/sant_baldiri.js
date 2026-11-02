import { createModule } from '../createModule.js'

export default createModule({
  resources: [
    {
      title: 'Genially Tema 1 (Català)',
      url: 'https://view.genially.com/688137a94d87ce5b85568742',
      subtitle: 'Presentació interactiva oficial del col·legi.',
    },
    {
      title: 'Wordwall: Classes de Noms',
      url: 'https://wordwall.net/es/resource/27878035/classes-de-noms',
    },
    {
      title: 'Wordwall: Els Dígrafs',
      url: 'https://wordwall.net/es/resource/23554794/els-d%C3%ADgrafs',
    },
  ],
  exercisesBySection: {
    lectura: [
      {
        id: 'cat-sb-lectura',
        type: 'multiple_choice',
        title: "Què hem entès? (L'escola de Sant Baldiri)",
        instructions: 'Llegeix el text del panell i respon les preguntes de comprensió.',
        maxScore: 4,
        config: { xp: 10 },
        content: {
          questions: [
            {
              id: 'l1',
              prompt: "Com és l'entorn que es veu des dels finestrals de l'escola?",
              options: [
                'Un port ple de vaixells pesquers',
                'Oliveres i muntanyes properes',
                'Una autopista transitada amb molt soroll',
              ],
              correct: 'Oliveres i muntanyes properes',
            },
            {
              id: 'l2',
              prompt: 'Quin arbre centenari dóna ombra al pati dels alumnes?',
              options: ['Un vell roure', 'Un pi pinyoner', 'Una palmera alta'],
              correct: 'Un vell roure',
            },
            {
              id: 'l3',
              prompt: 'Quin és el nom del mestre que dóna la benvinguda a la pissarra?',
              options: ['El mestre Carles', 'El mestre Marc', 'El mestre Jordi'],
              correct: 'El mestre Jordi',
            },
            {
              id: 'l4',
              prompt: "Quina actitud tenien els alumnes en entrar a l'aula de cinquè?",
              options: [
                'Curiositat i ganes de començar el nou curs',
                'Molta son i ganes de tornar al llit',
                'Por i tristesa de deixar les vacances',
              ],
              correct: 'Curiositat i ganes de començar el nou curs',
            },
          ],
        },
      },
    ],
    sinonims: [
      {
        id: 'cat-sb-syn-match',
        type: 'matching',
        title: 'Emparella sinònims (Ronda 1)',
        maxScore: 8,
        config: { xp: 16 },
        content: {
          pairs: [
            { left: 'alegre', right: 'content' },
            { left: 'parlar', right: 'enraonar' },
            { left: 'començar', right: 'iniciar' },
            { left: 'ràpid', right: 'veloç' },
            { left: 'escollir', right: 'triar' },
            { left: 'gran', right: 'enorme' },
            { left: 'bonic', right: 'bell' },
            { left: 'llunyà', right: 'remot' },
          ],
        },
      },
      {
        id: 'cat-sb-ant-prefix',
        type: 'fill_blank',
        title: 'Prefixos de negació (des-, in-, im-)',
        maxScore: 4,
        config: { xp: 12 },
        content: {
          blanks: [
            { id: 'p1', prompt: "Antònim de «visible» amb prefix (i____visible)", answer: 'invisible' },
            { id: 'p2', prompt: "Antònim de «possible» abans de p (i____possible)", answer: 'impossible' },
            { id: 'p3', prompt: "Antònim de «enganxar» (d____enganxar)", answer: 'desenganxar' },
            { id: 'p4', prompt: "Antònim de «feliç» (i____feliç)", answer: 'infeliç', accept: ['infeliç', 'infeliz'] },
          ],
        },
      },
      {
        id: 'cat-sb-ant-opos',
        type: 'matching',
        title: 'Antònims oposats',
        maxScore: 4,
        config: { xp: 10 },
        content: {
          pairs: [
            { left: 'obert', right: 'tancat' },
            { left: 'ràpid', right: 'lent' },
            { left: 'feliç', right: 'trist' },
            { left: 'alt', right: 'baix' },
          ],
        },
      },
      {
        id: 'cat-sb-syn-context',
        type: 'custom',
        title: 'Sinònims en context (frases)',
        instructions: 'Llegeix cada frase i tria el sinònim que substitueix la paraula destacada.',
        maxScore: 4,
        config: { xp: 20, component: 'ContextSynonymLab', hideCheck: true },
        content: {
          component: 'ContextSynonymLab',
          items: [
            {
              sentence: 'A classe de català vam començar la lectura del conte.',
              target: 'començar',
              options: ['aturar', 'iniciar', 'repassar'],
              correct: 1,
              reason: '«Començar» té com a sinònim exacte «iniciar».',
            },
            {
              sentence: 'L’Àlvaro estava molt content amb el seu treball escolar.',
              target: 'content',
              options: ['joiós', 'enfadat', 'mandrós'],
              correct: 0,
              reason: '«Content» té com a sinònim «joiós» o «alegre».',
            },
            {
              sentence: 'L’escola de Sant Baldiri és en un indret llunyà de la ciutat.',
              target: 'llunyà',
              options: ['apropat', 'remot', 'fosc'],
              correct: 1,
              reason: '«Llunyà» té com a sinònim formal «remot».',
            },
            {
              sentence: 'El mestre Jordi ens va demanar triar un llibre de lectura.',
              target: 'triar',
              options: ['escollir', 'tancar', 'dibuixar'],
              correct: 0,
              reason: '«Triar» té com a sinònim exacte «escollir».',
            },
          ],
        },
      },
    ],
    digrafs: [
      {
        id: 'cat-sb-dig-mc',
        type: 'multiple_choice',
        title: 'Dígrafs separables vs inseparables',
        maxScore: 5,
        config: { xp: 15 },
        content: {
          questions: [
            {
              id: 'd1',
              prompt: "A «canya», «ny» és…",
              options: ['Dígraf inseparable', 'Dues consonants separables', 'Una vocal'],
              correct: 'Dígraf inseparable',
            },
            {
              id: 'd2',
              prompt: "Com es divideix «col·legi» a final de línia?",
              options: ['co-l·le-gi', 'col-le-gi', 'col·l-e-gi'],
              correct: 'col-le-gi',
            },
            {
              id: 'd3',
              prompt: "Quina paraula conté un dígraf INSEPARABLE?",
              options: ['Cotxe', 'Paquet', 'Platja'],
              correct: 'Paquet',
            },
            {
              id: 'd4',
              prompt: "Quin d'aquests dígrafs és SEPARABLE?",
              options: ['ll', 'tx', 'gu'],
              correct: 'tx',
            },
            {
              id: 'd5',
              prompt: "Segons el Truc del Crit, la tònica de «felicitat» és…",
              options: ['fe', 'li', 'tat'],
              correct: 'tat',
            },
          ],
        },
      },
      {
        id: 'cat-sb-dig-tf',
        type: 'true_false',
        title: 'Vertader o fals: síl·laba i dígrafs',
        maxScore: 3,
        config: { xp: 9 },
        content: {
          items: [
            { id: 't1', prompt: 'RR, SS i L·L sempre es poden separar entre síl·labes.', correct: true },
            { id: 't2', prompt: 'NY es pot separar com mun-tan-ya a final de línia.', correct: false },
            { id: 't3', prompt: 'Tota síl·laba necessita com a mínim una vocal.', correct: true },
          ],
        },
      },
    ],
    elnom: [
      {
        id: 'cat-sb-noms-mc',
        type: 'multiple_choice',
        title: 'Classes de noms',
        maxScore: 4,
        config: { xp: 12 },
        content: {
          questions: [
            { id: 'n1', prompt: '«Barcelona» és un nom…', options: ['Comú', 'Propi', 'Abstracte'], correct: 'Propi' },
            { id: 'n2', prompt: '«alegria» és…', options: ['Concret', 'Abstracte', 'Propi'], correct: 'Abstracte' },
            { id: 'n3', prompt: '«ramat» és…', options: ['Individual', 'Col·lectiu', 'Propi'], correct: 'Col·lectiu' },
            { id: 'n4', prompt: '«aigua» sol ser…', options: ['Comptable', 'No comptable', 'Propi'], correct: 'No comptable' },
          ],
        },
      },
      {
        id: 'cat-sb-noms-match',
        type: 'matching',
        title: 'Individual → col·lectiu',
        maxScore: 4,
        config: { xp: 10 },
        content: {
          pairs: [
            { left: 'ovella', right: 'ramat' },
            { left: 'arbre', right: 'bosc' },
            { left: 'ocell', right: 'estol' },
            { left: 'abella', right: 'eixam' },
          ],
        },
      },
    ],
    expressio: [
      {
        id: 'cat-sb-expr',
        type: 'fill_blank',
        title: 'Expressió escrita: paraules clau',
        instructions: 'Completa amb una paraula adequada per a una redacció sobre el nou curs.',
        maxScore: 3,
        config: { xp: 9 },
        content: {
          blanks: [
            {
              id: 'e1',
              prompt: "Sinònim de «començar» per obrir la redacció (i_______)",
              answer: 'iniciar',
            },
            {
              id: 'e2',
              prompt: "Nom abstracte que expressa il·lusió pel curs (e_______)",
              answer: 'expectativa',
              accept: ['expectativa', 'expectatives', 'il·lusió', 'il·lusio'],
            },
            {
              id: 'e3',
              prompt: "Antònim de «trist» per descriure l'ambient positiu (a_______)",
              answer: 'alegre',
              accept: ['alegre', 'content'],
            },
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'cat-sb-quiz-master',
        type: 'multiple_choice',
        title: 'Autoavaluació mestre (10 preguntes)',
        maxScore: 10,
        config: { xp: 20 },
        content: {
          questions: [
            {
              id: 'q1',
              prompt: "A quina classe de dígrafs pertany 'rr' a «carro»?",
              options: ['Dígraf separable (car-ro)', 'Dígraf inseparable (ca-rro)', 'Grup consonàntic fix'],
              correct: 'Dígraf separable (car-ro)',
            },
            {
              id: 'q2',
              prompt: "Quin és el sinònim correcte de «alegre»?",
              options: ['Trist', 'Content', 'Mandrós'],
              correct: 'Content',
            },
            {
              id: 'q3',
              prompt: "Com es divideix «col·legi» a final de línia?",
              options: ['co-l·le-gi', 'col-le-gi', 'col·l-e-gi'],
              correct: 'col-le-gi',
            },
            {
              id: 'q4',
              prompt: "Quin d'aquests noms és ABSTRACTE?",
              options: ['Taula', 'Poma', 'Amistat'],
              correct: 'Amistat',
            },
            {
              id: 'q5',
              prompt: "El dígraf «ny» a «muntanya» és…",
              options: [
                'Inseparable (va sempre a la mateixa síl·laba)',
                'Separable (mun-tan-ya)',
                'Només separable a principi de frase',
              ],
              correct: 'Inseparable (va sempre a la mateixa síl·laba)',
            },
            {
              id: 'q6',
              prompt: 'Quina paraula conté un dígraf INSEPARABLE?',
              options: ['Cotxe', 'Paquet', 'Platja'],
              correct: 'Paquet',
            },
            {
              id: 'q7',
              prompt: "Quin és l'antònim de «feliç» format amb prefix de negació?",
              options: ['Desfeliç', 'Infeliç', 'Imfeliç'],
              correct: 'Infeliç',
            },
            {
              id: 'q8',
              prompt: "El mot «ramat» és un nom…",
              options: ['Individual', 'Col·lectiu', 'Propi'],
              correct: 'Col·lectiu',
            },
            {
              id: 'q9',
              prompt: "Segons el Truc del Crit, quina és la tònica de «felicitat»?",
              options: ['fe', 'li', 'tat'],
              correct: 'tat',
            },
            {
              id: 'q10',
              prompt: "Quin d'aquests dígrafs és SEPARABLE?",
              options: ['ll', 'tx', 'gu'],
              correct: 'tx',
            },
          ],
        },
      },
    ],
  },
})
