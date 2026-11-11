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
  'mates/posat_a_prova_1': () => import('./mates/posat_a_prova_1.js'),
  'mates/decimals_unitats': () => import('./mates/decimals_unitats.js'),
  'mates/funcions_enters': () => import('./mates/funcions_enters.js'),
  'mates/perimetres_arees': () => import('./mates/perimetres_arees.js'),
  'projecte/coordenadas': () => import('./projecte/coordenadas.js'),
  'projecte/pasdeltemps': () => import('./projecte/pasdeltemps.js'),
  'projecte/romanos': () => import('./projecte/romanos.js'),
  'projecte/edat_antiga': () => import('./projecte/edat_antiga.js'),
  'amco/irregular_verbs': () => import('./amco/irregular_verbs.js'),
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
