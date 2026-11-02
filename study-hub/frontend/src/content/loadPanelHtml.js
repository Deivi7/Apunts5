const panelLoaders = import.meta.glob(
  '../../../content-packages/topics/*/*/panels/*.html',
  { query: '?raw', import: 'default' },
)

function panelKey(vueModule, fileName) {
  return `../../../content-packages/topics/${vueModule}/panels/${fileName}`
}

/** Carga HTML de panel extraído (contenido, no chrome legacy). */
export async function loadPanelHtml(vueModule, panelFile) {
  if (!vueModule || !panelFile) return ''
  const loader = panelLoaders[panelKey(vueModule, panelFile)]
  if (!loader) return null
  try {
    return (await loader()) || ''
  } catch {
    return ''
  }
}

export async function loadAllPanels(vueModule) {
  const prefix = `../../../content-packages/topics/${vueModule}/panels/`
  const out = {}
  await Promise.all(
    Object.entries(panelLoaders)
      .filter(([k]) => k.startsWith(prefix))
      .map(async ([k, loader]) => {
        const file = k.slice(prefix.length)
        const id = file.replace(/\.html$/i, '')
        out[id] = await loader()
      }),
  )
  return out
}

/** Resuelve el fichero de panel para un id de sección del sidebar. */
export function resolvePanelFile(sectionId, panelIds = []) {
  if (!sectionId) return null
  const candidates = [
    `panel-${sectionId}`,
    `view-${sectionId}`,
    sectionId,
    sectionId.startsWith('tab-') ? sectionId : `tab-${sectionId}`,
  ]
  for (const c of candidates) {
    if (panelIds.includes(c)) return `${c}.html`
    // panelIds may be without knowing — try anyway via load
  }
  return `${candidates[0]}.html`
}
