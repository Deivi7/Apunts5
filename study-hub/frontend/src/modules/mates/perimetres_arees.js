import { createModule } from '../createModule.js'
import {
  PERIM_SQUARES,
  PERIM_RECTANGLES,
  PERIM_TRAPS_MC,
  AREA_SQUARES,
  AREA_RECTANGLES,
  AREA_VS_PERIM_TF,
  INVERSE_CHALLENGES,
  REAL_WORLD_PROBLEMS_MC,
  REAL_WORLD_BLANKS,
  PERIMETRES_AREES_QUIZ,
} from './perimetresAreesData.js'

function fillContent(blanks, columns = 2, extra = {}) {
  return { columns, compact: true, hideHint: true, blanks, ...extra }
}

export default createModule({
  sections: [],
  theoryHtml: '',
  resources: [
    {
      title: 'Drive Mates',
      url: 'https://drive.google.com/open?id=1pKvH1edDYiNEwQ8Ynq6a2wuzNIqK60tv&usp=drive_copy',
    },
  ],
  documents: [],
  exercisesBySection: {
    perimetre: [
      {
        id: 'pa-grid-lab',
        type: 'custom',
        title: 'Laboratori visual: Quadrícula de Perímetre i Àrea',
        instructions: 'Mou els controls per canviar la base i l\'altura del rectangle o quadrat, i activa el mode Repte per practicar!',
        maxScore: 12,
        config: { xp: 15, component: 'AreaPerimeterGridLab', hideCheck: true },
        content: { component: 'AreaPerimeterGridLab' },
      },
      {
        id: 'pa-perim-sq',
        type: 'fill_blank',
        title: 'Perímetre de quadrats (4 costats iguals)',
        instructions: 'Un quadrat té els 4 costats iguals. Suma els 4 costats (o multiplica el costat per 4) per trobar el perímetre:',
        maxScore: PERIM_SQUARES.length,
        config: { xp: 12 },
        content: fillContent(PERIM_SQUARES, 2),
      },
      {
        id: 'pa-perim-rect',
        type: 'fill_blank',
        title: 'Perímetre de rectangles (2 bases + 2 altures)',
        instructions: 'Un rectangle té 2 bases iguals i 2 altures iguals. Suma els 4 costats (base + base + altura + altura):',
        maxScore: PERIM_RECTANGLES.length,
        config: { xp: 18 },
        content: fillContent(PERIM_RECTANGLES, 2),
      },
      {
        id: 'pa-perim-traps',
        type: 'multiple_choice',
        title: 'Compte amb les trampes del perímetre!',
        maxScore: PERIM_TRAPS_MC.length,
        config: { xp: 10 },
        content: { questions: PERIM_TRAPS_MC },
      },
    ],
    area: [
      {
        id: 'pa-area-sq',
        type: 'fill_blank',
        title: 'Àrea de quadrats (costat × costat)',
        instructions: 'Per calcular quants quadradets caben dins d\'un quadrat, multiplica el costat per ell mateix (costat × costat):',
        maxScore: AREA_SQUARES.length,
        config: { xp: 12 },
        content: fillContent(AREA_SQUARES, 2),
      },
      {
        id: 'pa-area-rect',
        type: 'fill_blank',
        title: 'Àrea de rectangles (base × altura)',
        instructions: 'Per calcular l\'àrea d\'un rectangle, multiplica la base per l\'altura (base × altura):',
        maxScore: AREA_RECTANGLES.length,
        config: { xp: 18 },
        content: fillContent(AREA_RECTANGLES, 2),
      },
      {
        id: 'pa-area-tf',
        type: 'true_false',
        title: 'Diferència entre Perímetre i Àrea: Cert o Fals?',
        maxScore: AREA_VS_PERIM_TF.length,
        config: { xp: 10 },
        content: { items: AREA_VS_PERIM_TF },
      },
    ],
    invers: [
      {
        id: 'pa-inv-blanks',
        type: 'fill_blank',
        title: 'Detectiu de figures: Troba el costat que falta',
        instructions: 'Ara ja coneixes el perímetre o l\'àrea total! Fes l\'operació inversa per descobrir quant mesura el costat o l\'altura:',
        maxScore: INVERSE_CHALLENGES.length,
        config: { xp: 20 },
        content: fillContent(INVERSE_CHALLENGES, 2),
      },
    ],
    problemes: [
      {
        id: 'pa-real-mc',
        type: 'multiple_choice',
        title: 'Problemes de la vida real: Tanques, gespa, parquet i esport',
        instructions: 'Pensa primer si el problema et demana la vora exterior (Perímetre) o cobrir l\'interior (Àrea):',
        maxScore: REAL_WORLD_PROBLEMS_MC.length,
        config: { xp: 16 },
        content: { questions: REAL_WORLD_PROBLEMS_MC },
      },
      {
        id: 'pa-real-blanks',
        type: 'fill_blank',
        title: 'El problema del quadre: Marc de fusta vs Vidre interior',
        instructions: 'Calcula el llistó pel marc exterior (perímetre) i el vidre per cobrir-lo per dins (àrea):',
        maxScore: REAL_WORLD_BLANKS.length,
        config: { xp: 12 },
        content: fillContent(REAL_WORLD_BLANKS, 2),
      },
    ],
    repas: [
      {
        id: 'pa-master-quiz',
        type: 'custom',
        title: 'Quiz final de Perímetres i Àrees',
        maxScore: 10,
        config: { xp: 20, component: 'MasterQuiz', hideCheck: true },
        content: { component: 'MasterQuiz', questions: PERIMETRES_AREES_QUIZ },
      },
      {
        id: 'pa-worksheet',
        type: 'custom',
        title: 'Fitxa imprimible de Perímetres i Àrees',
        instructions: 'Genera una fitxa per practicar en paper quadrats, rectangles i problemes.',
        maxScore: 10,
        config: { xp: 10, component: 'PerimetresAreesWorksheet', hideCheck: true },
        content: { component: 'PerimetresAreesWorksheet' },
      },
    ],
  },
})

