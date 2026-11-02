import { createModule, theoryBlock } from '../createModule.js'
import { LAB_CARDS } from './vocabCards.js'

const MEMORY_PAIRS = [
  { left: 'Beaker', right: 'Glass container with a pouring beak', leftIcon: '🧪', leftSpeak: 'Beaker' },
  { left: 'Funnel', right: 'Helps pour without spilling', leftIcon: '🧴', leftSpeak: 'Funnel' },
  { left: 'Flask', right: 'Narrow-neck bottle for swirling liquids', leftIcon: '⚗️', leftSpeak: 'Flask' },
  { left: 'Microscope', right: 'Views very small objects', leftIcon: '🔬', leftSpeak: 'Microscope' },
  { left: 'To measure', right: 'Find exact volume or size', leftIcon: '📏', leftSpeak: 'to measure' },
  { left: 'To dissolve', right: 'Mix solid into a liquid solution', leftIcon: '💧', leftSpeak: 'to dissolve' },
  { left: 'Biology', right: 'Study of living organisms', leftIcon: '🧬', leftSpeak: 'Biology' },
  { left: 'Chemistry', right: 'Study of matter and reactions', leftIcon: '⚗️', leftSpeak: 'Chemistry' },
  { left: 'Virologist', right: 'Studies viruses', leftIcon: '🦠', leftSpeak: 'Virologist' },
  { left: 'Botanist', right: 'Studies plants', leftIcon: '🌿', leftSpeak: 'Botanist' },
  { left: 'Bunsen burner', right: 'Produces a flame for heating', leftIcon: '🔥', leftSpeak: 'Bunsen burner' },
  { left: 'Graduated cylinder', right: 'Measures liquid volume precisely', leftIcon: '📊', leftSpeak: 'Graduated cylinder' },
]

export default createModule({
  theoryHtml: theoryBlock({
    what: 'Laboratory English helps you name tools, actions, science areas and jobs used in Madame Curie Science class.',
    rules: [
      'Learn the English term and its meaning.',
      'Listen to the pronunciation and repeat aloud.',
      'Group words by family: verbs, containers, measuring tools, safety gear, -y sciences, -ist jobs.',
    ],
    examples: [
      '<strong>Good:</strong> beaker = glass container for liquids',
      '<strong>Bad:</strong> calling a beaker a “cup” in a lab report',
    ],
    trick: 'If it ends in -y it is often a science area (Biology). If it ends in -ist it is often a person (Biologist).',
    summary: 'Flashcards → memory → quiz → spelling → sorter. Practise until the 35 lab words feel natural.',
  }),
  resources: [
    {
      title: 'Drive M. Curie',
      url: 'https://drive.google.com/open?id=1GE41l8nfuuGgqw9ATHSqm83e8cvQfQgA&usp=drive_copy',
      subtitle: 'Official Science folder',
    },
  ],
  documents: [
    {
      title: 'words List Lab.pdf',
      localUrl: '/content/curie/wordslist/words%20List%20Lab.pdf',
      driveUrl: 'https://drive.google.com/open?id=1GE41l8nfuuGgqw9ATHSqm83e8cvQfQgA&usp=drive_copy',
    },
  ],
  exercisesBySection: {
    flashcards: [
      {
        id: 'curie-flash-all',
        type: 'custom',
        title: 'Lab flashcards (35 terms + audio)',
        instructions: 'Tap any card to flip it and press 🔊 for native English pronunciation.',
        maxScore: 35,
        config: { xp: 5, component: 'FlashcardsSpeak', lang: 'en-US' },
        content: {
          component: 'FlashcardsSpeak',
          searchPlaceholder: 'Search word (e.g. Beaker, Melt…)',
          flipHint: 'Tap to see translation',
          tipLabel: 'Lab tip',
          filters: [
            { id: 'all', label: '✨ All (35)' },
            { id: 'verbs', label: '⚡ Verbs (9)' },
            { id: 'tools', label: '🔬 Tools (9)' },
            { id: 'areas', label: '📚 Science areas (10)' },
            { id: 'jobs', label: '🧑‍🔬 Jobs (-ist) (7)' },
          ],
          cards: LAB_CARDS,
        },
      },
    ],
    memory: [
      {
        id: 'curie-memory-lab',
        type: 'memory',
        title: 'Memory pairs: tools & meanings',
        instructions: 'Flip two fixed-size cards. Match the English lab term with its meaning. Tap 🔊 to hear pronunciation.',
        maxScore: 12,
        config: { xp: 18, lang: 'en-US' },
        content: { pairs: MEMORY_PAIRS, lang: 'en-US' },
      },
    ],
    quiz: [
      {
        id: 'curie-quiz-lab',
        type: 'multiple_choice',
        title: 'Lab quiz (12 key questions)',
        maxScore: 12,
        config: { xp: 24, shuffle: true },
        content: {
          questions: [
            {
              id: 'q1',
              prompt: 'Which tool has a small beak to pour liquids without spilling?',
              options: ['Graduated cylinder', 'Beaker', 'Funnel', 'Watch glass'],
              correct: 'Beaker',
            },
            {
              id: 'q2',
              prompt: 'Which tool is designed for grinding solids into powder?',
              options: ['Mortar and pestle', 'Bunsen burner', 'Pipette', 'Flask'],
              correct: 'Mortar and pestle',
            },
            {
              id: 'q3',
              prompt: 'In class notes, which verb means the same as «to dissolve»?',
              options: ['To cut', 'To measure', 'To break up', 'To control'],
              correct: 'To break up',
            },
            {
              id: 'q4',
              prompt: 'VIROLOGY → ?',
              options: ['Virologer', 'Virologist', 'Virologian', 'Virology worker'],
              correct: 'Virologist',
            },
            {
              id: 'q5',
              prompt: 'ASTROPHYSICS → ?',
              options: ['Astrophysicist', 'Astrophysic', 'Astronomer', 'Astrophysician'],
              correct: 'Astrophysicist',
            },
            {
              id: 'q6',
              prompt: 'Which funnel-shaped tool helps pour into narrow bottles?',
              options: ['Pipette', 'Funnel', 'Flask', 'Watch glass'],
              correct: 'Funnel',
            },
            {
              id: 'q7',
              prompt: 'Which science studies vaccines, antibodies and defenses?',
              options: ['Immunology', 'Biochemistry', 'Mineralogy', 'Geophysics'],
              correct: 'Immunology',
            },
            {
              id: 'q8',
              prompt: 'Which tool has graduated lines for exact liquid volume?',
              options: ['Watch glass', 'Bunsen burner', 'Graduated cylinder', 'Mortar'],
              correct: 'Graduated cylinder',
            },
            {
              id: 'q9',
              prompt: 'Which verb means changing solid to liquid with heat?',
              options: ['To observe', 'To move', 'To melt', 'To mix'],
              correct: 'To melt',
            },
            {
              id: 'q10',
              prompt: 'Another name for pipette in the lab notes:',
              options: ['(dropper)', '(measurer)', '(heater)', '(cutter)'],
              correct: '(dropper)',
            },
            {
              id: 'q11',
              prompt: 'Scientist who studies plants (Botany → ?):',
              options: ['Plantologist', 'Botanist', 'Biologist', 'Geologist'],
              correct: 'Botanist',
            },
            {
              id: 'q12',
              prompt: 'Which job title ends in -er instead of -ist?',
              options: ['Biologist', 'Chemist', 'Astronomer', 'Geneticist'],
              correct: 'Astronomer',
            },
          ],
        },
      },
    ],
    spelling: [
      {
        id: 'curie-spell-lab',
        type: 'fill_blank',
        title: 'Spelling challenge (10 terms)',
        maxScore: 10,
        config: { xp: 20, hint: 'Check double letters and -ist endings' },
        content: {
          blanks: [
            { id: 's1', prompt: 'VIROLOGY → profession (v_________)', answer: 'virologist' },
            { id: 's2', prompt: 'ASTROPHYSICS → profession (a_____________)', answer: 'astrophysicist' },
            { id: 's3', prompt: 'CLIMATOLOGY → profession (c_____________)', answer: 'climatologist' },
            { id: 's4', prompt: 'Verb: dissolve / break up (d_______)', answer: 'dissolve', accept: ['dissolve', 'break up'] },
            { id: 's5', prompt: 'Tool for grinding (m_______ and pestle)', answer: 'mortar', accept: ['mortar', 'mortar and pestle'] },
            { id: 's6', prompt: 'Glass with a beak (b_____)', answer: 'beaker' },
            { id: 's7', prompt: 'Volume measurer (g_______ cylinder)', answer: 'graduated', accept: ['graduated', 'graduated cylinder'] },
            { id: 's8', prompt: 'Gas heater (b_____ burner)', answer: 'bunsen', accept: ['bunsen', 'bunsen burner'] },
            { id: 's9', prompt: 'Verb: measure (m______)', answer: 'measure', accept: ['measure', 'to measure'] },
            { id: 's10', prompt: 'Science of plants (b_____)', answer: 'botany' },
          ],
        },
      },
    ],
    sorter: [
      {
        id: 'curie-sorter-timed',
        type: 'custom',
        title: 'Speed classifier (90s)',
        instructions: 'Classify lab words by category under time pressure: verb, tool, science area (-y) or job (-ist).',
        maxScore: 35,
        config: { xp: 20, component: 'CategorySorterTimed', hideCheck: true, seconds: 90 },
        content: {
          component: 'CategorySorterTimed',
          seconds: 90,
        },
      },
    ],
    cheatsheet: [
      {
        id: 'curie-cheat-tf',
        type: 'true_false',
        title: 'Cheat sheet check: lab rules',
        maxScore: 5,
        config: { xp: 10 },
        content: {
          items: [
            { id: 'h1', prompt: 'Science areas often end in -y (chemistry, biology).', correct: true },
            { id: 'h2', prompt: 'Most science jobs end in -ist (biologist, chemist).', correct: true },
            { id: 'h3', prompt: 'Astronomy → Astronomer (exception: -er, not -ist).', correct: true },
            { id: 'h4', prompt: 'A beaker is mainly for cutting plant samples.', correct: false },
            { id: 'h5', prompt: 'To break up means the same as to dissolve in your notes.', correct: true },
          ],
        },
      },
      {
        id: 'curie-cheat-order',
        type: 'ordering',
        title: 'Word families: area → job',
        maxScore: 4,
        config: { xp: 8 },
        content: {
          items: ['Botany', 'Botanist', 'Immunology', 'Immunologist'],
          order: ['Botany', 'Botanist', 'Immunology', 'Immunologist'],
        },
      },
    ],
  },
})
