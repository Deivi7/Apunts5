<template>
  <div>
    <SiteHeader />
    <ConnectionBanner />
    <slot />
    <footer class="site-footer">
      <p>
        <strong>Álvaro Study Hub</strong> • Plataforma Vue · Modo {{ sessionMode.mode }}
        <span v-if="catalog.source"> · Catálogo: {{ catalog.source }}</span>
      </p>
    </footer>
  </div>
</template>

<script setup>
import SiteHeader from '@/components/shell/SiteHeader.vue'
import ConnectionBanner from '@/components/shell/ConnectionBanner.vue'
import { useSessionModeStore } from '@/stores/sessionMode'
import { useCatalogStore } from '@/stores/catalog'

const sessionMode = useSessionModeStore()
const catalog = useCatalogStore()
</script>
