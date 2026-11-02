import { topicStyleLoaders } from '@/styles/topics/index.js'

const loaded = new Set()

/**
 * Carga una sola vez el Apuntes.css del tema (vueModule = subject/topic).
 * @param {string | undefined | null} vueModuleKey
 */
export async function ensureTopicStyles(vueModuleKey) {
  if (!vueModuleKey || loaded.has(vueModuleKey)) return
  const loader = topicStyleLoaders[vueModuleKey]
  if (!loader) return
  await loader()
  loaded.add(vueModuleKey)
}
