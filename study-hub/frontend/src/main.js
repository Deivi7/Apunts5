import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import router from './router'
import { useUiPrefsStore } from './stores/uiPrefs'
import { useConnectionStore } from './stores/connection'
import { useCatalogStore } from './stores/catalog'
import { useSessionModeStore } from './stores/sessionMode'
import { useAuthStore } from './stores/auth'
import { installLocalPersistenceGuard } from './offline/persistenceGuard'
import { registerPwa } from './offline/registerPwa'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'html.dark',
    },
  },
})

const uiPrefs = useUiPrefsStore(pinia)
uiPrefs.hydrate()

const auth = useAuthStore(pinia)
auth.hydrate()
if (auth.token) {
  auth.fetchMe().catch(() => {})
}

const sessionMode = useSessionModeStore(pinia)
installLocalPersistenceGuard({
  isLocalMode: () => sessionMode.isLocal,
})

const connection = useConnectionStore(pinia)
connection.startPolling()

const catalog = useCatalogStore(pinia)
catalog.load()

registerPwa()

app.mount('#app')
