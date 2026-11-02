import { studyHubDb, assertStoreAllowed } from './db.js'

const CATALOG_ID = 'primary-catalog'

export async function cacheCatalogSnapshot(catalog) {
  assertStoreAllowed('catalogSnapshots')
  await studyHubDb.catalogSnapshots.put({
    id: CATALOG_ID,
    version: catalog.version,
    subjects: catalog.subjects,
    savedAt: new Date().toISOString(),
  })
}

export async function readCachedCatalog() {
  assertStoreAllowed('catalogSnapshots')
  return studyHubDb.catalogSnapshots.get(CATALOG_ID)
}

export async function cacheUiPref(key, value) {
  assertStoreAllowed('uiPrefsMirror')
  await studyHubDb.uiPrefsMirror.put({ key, value, savedAt: new Date().toISOString() })
}

export async function cacheResourceMeta(entry) {
  assertStoreAllowed('resourceMeta')
  await studyHubDb.resourceMeta.put({
    ...entry,
    updatedAt: new Date().toISOString(),
  })
}
