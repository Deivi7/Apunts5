import { loadContentPackage, mergeModuleWithPackage } from '@/content/loadContentPackage.js'

const loaders = {
  'curie/wordslist': () => import('./curie/wordslist.js'),
  'castellano/signo_puntuacion': () => import('./castellano/signo_puntuacion.js'),
  'castellano/comunicacion': () => import('./castellano/comunicacion.js'),
  'castellano/tema2': () => import('./castellano/tema2.js'),
  'catala/sant_baldiri': () => import('./catala/sant_baldiri.js'),
  'catala/posat_a_prova_1': () => import('./catala/posat_a_prova_1.js'),
  'catala/tema2': () => import('./catala/tema2.js'),
  'mates/operaciones': () => import('./mates/operaciones.js'),
  'mates/romanos': () => import('./mates/romanos.js'),
  'mates/posat_a_prova_1': () => import('./mates/posat_a_prova_1.js'),
  'mates/decimals_unitats': () => import('./mates/decimals_unitats.js'),
  'projecte/coordenadas': () => import('./projecte/coordenadas.js'),
  'projecte/pasdeltemps': () => import('./projecte/pasdeltemps.js'),
  'tutoria/calendario': () => import('./tutoria/calendario.js'),
}

export async function loadModuleDefinition(vueModule) {
  const loader = loaders[vueModule]
  if (!loader) return null
  const mod = await loader()
  const def = mod.default || mod
  const pkg = await loadContentPackage(vueModule)
  return mergeModuleWithPackage(def, pkg)
}
