export async function registerPwa() {
  if (!('serviceWorker' in navigator)) return { enabled: false, reason: 'unsupported' }

  try {
    const { registerSW } = await import('virtual:pwa-register')
    const updateSW = registerSW({
      immediate: true,
      onRegisteredSW(swUrl) {
        console.info('[study-hub] SW registrado', swUrl)
      },
      onOfflineReady() {
        console.info('[study-hub] App lista para uso offline (shell + catálogo)')
      },
    })
    return { enabled: true, updateSW }
  } catch (err) {
    console.warn('[study-hub] PWA no disponible en este entorno', err)
    return { enabled: false, reason: String(err) }
  }
}
