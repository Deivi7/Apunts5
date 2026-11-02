import { loadAllPanels } from './loadPanelHtml.js'

const manifestLoaders = import.meta.glob('../../../content-packages/topics/*/*/manifest.json', {
  eager: false,
  import: 'default',
})

function manifestKey(vueModule) {
  return `../../../content-packages/topics/${vueModule}/manifest.json`
}

export async function loadContentPackage(vueModule) {
  if (!vueModule) return null
  const key = manifestKey(vueModule)
  const loader = manifestLoaders[key]
  if (!loader) return null
  try {
    const manifest = (await loader()) || null
    if (!manifest) return null
    const panels = await loadAllPanels(vueModule)
    return { ...manifest, panels }
  } catch {
    return null
  }
}

const EXERCISE_ALIASES = {
  theory: ['apuntes', 'apunts', 'teoria', 'tab-teoria', 'theory', 'comunicacion'],
  'practica-teoria': ['practica-teoria', 'repas-teoria', 'practica'],
  quiz: ['quiz', 'tab-examen', 'examen', 'test', 'detective', 'tab-detective'],
  alphabet: ['alfabetico', 'workshop'],
  classify: ['sorter', 'classify'],
  exam: ['tab-examen', 'examen'],
  pro: ['tab-pro', 'pro'],
  trainer: ['tab-generator', 'generator', 'trainer'],
  converter: ['tab-conversor', 'conversor', 'converter'],
  centuries: ['tab-siglos', 'siglos', 'centuries'],
  flashcards: ['flashcards'],
  memory: ['memory'],
  spelling: ['spelling'],
  sprint: ['sprint'],
  multiplication: ['multiplication'],
  division: ['division'],
  parentheses: ['parentheses'],
  problems: ['problems'],
  worksheet: ['worksheet'],
  radar: ['radar'],
  'mapa-punts': ['mapa-punts'],
  llegendaris: ['llegendaris'],
  practica: ['tab-practica', 'practica'],
  coliseo: ['tab-coliseo', 'coliseo'],
}

function normalizeSectionRole(s) {
  const id = String(s.id || '')
  const title = String(s.title || '')
  const blob = `${id} ${title} ${s.desc || ''}`.toLowerCase()

  if (
    /^(docs|fitxes|documentos|tab-documents|tab-docs|tab-fitxes|tab-documentos)$/i.test(id)
    || /\b(documentos|fitxes|archivos pdf|pdfs oficiales)\b/i.test(blob)
  ) {
    return 'docs'
  }

  if (
    /^(apuntes|apunts|teoria|theory|comunicacion|tab-teoria|tab-apuntes|tab-apunts)$/i.test(id)
    || /\b(1\.\s*)?(apuntes|apunts|teor[ií]a|circuito)\b/i.test(title)
  ) {
    return 'theory'
  }

  return s.role === 'theory' || s.role === 'docs' ? s.role : 'interactive'
}

function remapExercises(exercisesBySection = {}, sections = []) {
  const sectionIds = new Set(sections.map((s) => s.id))
  const out = { ...exercisesBySection }

  for (const [vueKey, list] of Object.entries(exercisesBySection)) {
    const targets = EXERCISE_ALIASES[vueKey] || [vueKey]
    for (const target of targets) {
      if (sectionIds.has(target) && !out[target]) out[target] = list
    }
    if (sectionIds.has(vueKey)) out[vueKey] = list
  }

  return out
}

function attachPanelHtml(sections, panels = {}) {
  return sections.map((s) => {
    const candidates = [
      `panel-${s.id}`,
      `view-${s.id}`,
      s.id,
      s.id.startsWith('tab-') ? s.id : `tab-${s.id}`,
    ]
    let html = ''
    for (const c of candidates) {
      if (panels[c]) {
        html = panels[c]
        break
      }
    }
    return { ...s, panelHtml: html }
  })
}

/**
 * Fusiona la definición Vue con el paquete de contenido.
 * Prioridad: paneles completos de apuntes/cuentos + ejercicios Vue.
 */
export function mergeModuleWithPackage(moduleDef, pkg) {
  if (!pkg) return moduleDef

  let sections = (pkg.sections || []).map((s) => ({
    id: s.id,
    title: s.title,
    desc: s.desc || '',
    role: normalizeSectionRole(s),
    icon: s.icon || null,
    badge: s.badge || null,
  }))

  if (!sections.length) {
    sections = [...(moduleDef.sections || [])]
  }

  sections = sections.filter(
    (s) => !/^(full|classic|html)$/i.test(s.id)
      && !/html original|parity|classic activity/i.test(s.title || ''),
  )

  const hasTheorySection = sections.some((s) => s.role === 'theory')
  if (!hasTheorySection && (moduleDef.theoryHtml || pkg.theoryHtml)) {
    sections = [
      {
        id: 'theory',
        title: '1. Apuntes & Teoría',
        desc: 'Teoría didáctica',
        role: 'theory',
        icon: '📖',
        vueOnly: true,
      },
      ...sections,
    ]
  }

  sections = attachPanelHtml(sections, pkg.panels || {})

  // Si una sección theory no tiene panelHtml pero sí theoryHtml de paquete, ok.
  // Si theoryHtml está vacío, usar el panel de la sección theory.
  const theorySection = sections.find((s) => s.role === 'theory')
  const theoryHtml = pkg.theoryHtml
    || theorySection?.panelHtml
    || moduleDef.theoryHtml
    || ''

  const resources = [
    ...(pkg.resources || []),
    ...(moduleDef.resources || []).filter(
      (r) => !(pkg.resources || []).some((p) => p.url === r.url),
    ),
  ]

  const documents = (pkg.documents || []).length
    ? pkg.documents
    : moduleDef.documents || []

  const exercisesBySection = remapExercises(moduleDef.exercisesBySection || {}, sections)

  return {
    ...moduleDef,
    sections,
    theoryHtml,
    resources,
    documents,
    contentBase: pkg.contentBase || null,
    exercisesBySection,
    panels: pkg.panels || {},
  }
}
