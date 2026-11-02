import { createModule } from '../createModule.js'
import { OFFICIAL_QUIZ } from './coordenadasData.js'

export default createModule({
  sections: [],
  theoryHtml: '',
  resources: [
    {
      title: 'Drive Projecte',
      url: 'https://drive.google.com/open?id=1Dyk1gri0h3W3Sc1YCaa2NnIcw-bffugs&usp=drive_copy',
    },
  ],
  documents: [],
  exercisesBySection: {
    'practica-teoria': [
      {
        id: 'proj-coord-windrose',
        type: 'custom',
        title: 'Rosa dels vents & línies clau (TTS)',
        instructions: 'Escolta els punts cardinals i les línies de referència.',
        maxScore: 1,
        config: { xp: 5, component: 'WindRoseSpeak', hideCheck: true },
        content: { component: 'WindRoseSpeak' },
      },
      {
        id: 'proj-coord-theory-tf',
        type: 'custom',
        title: 'Veritat o Fals (fitxa de teoria)',
        instructions: '5 preguntes de la fitxa de classe amb explicació immediata.',
        maxScore: 5,
        config: { xp: 10, component: 'TheoryTrueFalse', hideCheck: true },
        content: { component: 'TheoryTrueFalse' },
      },
    ],
    radar: [
      {
        id: 'proj-coord-radar',
        type: 'custom',
        title: 'Radar Pokémon — Team Rocket (10 missions)',
        instructions:
          'Selecciona el Pokémon (llista o mapa). Escriu latitud (±6°), longitud (±6°) i ubicació. Després Verifica i captura.',
        maxScore: 10,
        config: { xp: 50, component: 'RadarCaptureLab', hideCheck: true },
        content: { component: 'RadarCaptureLab' },
      },
    ],
    'mapa-punts': [
      {
        id: 'proj-coord-mapa-hub',
        type: 'custom',
        title: 'Mapa & Generador Dinàmic',
        instructions:
          'Generador aleatori (coords / caça), fitxa A–E, continents/oceans i esfera de referència.',
        maxScore: 10,
        config: { xp: 20, component: 'MapPointsHub', hideCheck: true },
        content: { component: 'MapPointsHub' },
      },
    ],
    llegendaris: [
      {
        id: 'proj-coord-constellation',
        type: 'custom',
        title: 'Constel·lació Pikachu (23 punts)',
        instructions:
          'Fes clic a cada coordenada (snap 10° o ±6,5/7,5). Completa els 23 punts per revelar la silueta.',
        maxScore: 23,
        config: { xp: 100, component: 'ConstellationCanvas', hideCheck: true },
        content: { component: 'ConstellationCanvas' },
      },
    ],
    test: [
      {
        id: 'proj-coord-quiz',
        type: 'multiple_choice',
        title: 'Test final d’autoavaluació (20 preguntes)',
        maxScore: 20,
        config: { xp: 40 },
        content: {
          questions: OFFICIAL_QUIZ.map((q) => ({
            id: q.id,
            prompt: q.prompt,
            options: q.options,
            correct: q.correct,
          })),
        },
      },
    ],
  },
})
