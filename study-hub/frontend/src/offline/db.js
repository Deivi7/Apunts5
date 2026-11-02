import Dexie from 'dexie'

/**
 * IndexedDB whitelist:
 * - catalogSnapshots: published content packages
 * - resourceMeta: cached resource metadata
 * - uiPrefsMirror: optional mirror of UI prefs (not academic)
 *
 * FORBIDDEN stores: attempts, grades, xp, answers, progress
 */
export const ALLOWED_STORES = Object.freeze([
  'catalogSnapshots',
  'resourceMeta',
  'uiPrefsMirror',
])

export const FORBIDDEN_STORE_PATTERNS = Object.freeze([
  /attempt/i,
  /grade/i,
  /score/i,
  /xp/i,
  /answer/i,
  /progress/i,
  /result/i,
  /streak/i,
])

export const studyHubDb = new Dexie('study_hub_offline')

studyHubDb.version(1).stores({
  catalogSnapshots: 'id, version, savedAt',
  resourceMeta: 'id, updatedAt',
  uiPrefsMirror: 'key',
})

export function assertStoreAllowed(storeName) {
  if (FORBIDDEN_STORE_PATTERNS.some((re) => re.test(storeName))) {
    throw new Error(`Store prohibido para datos académicos offline: ${storeName}`)
  }
  if (!ALLOWED_STORES.includes(storeName)) {
    throw new Error(`Store no autorizado en IndexedDB: ${storeName}`)
  }
}
