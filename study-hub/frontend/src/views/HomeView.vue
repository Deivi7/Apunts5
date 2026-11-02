<template>
  <AppShell>
    <section class="module-hero">
      <div class="hero-inner">
        <div class="hero-title-group">
          <div class="hero-tag-badge">
            {{ catalog.subjects.length }} ASIGNATURAS • {{ catalog.topicCount }} TEMAS INTERACTIVOS
          </div>
          <h1>¡Hola, Álvaro! 👋</h1>
          <p>
            Accede con un clic a tus carpetas de Google Drive y practica con los apuntes interactivos.
            Modo local: sin guardar notas. XP de sesión: {{ localSession.xp }}.
          </p>
        </div>
        <div class="hero-quick-stats">
          <div class="stat-card-mini">
            <div class="stat-val">{{ catalog.subjects.length }}</div>
            <div class="stat-label">Asignaturas</div>
          </div>
          <div class="stat-card-mini">
            <div class="stat-val">{{ catalog.topicCount }}</div>
            <div class="stat-label">Temas Listos</div>
          </div>
          <div class="stat-card-mini">
            <div class="stat-val">{{ connection.status === 'online' ? 'ON' : 'OFF' }}</div>
            <div class="stat-label">Backend</div>
          </div>
        </div>
      </div>
    </section>

    <main class="subjects-container">
      <p v-if="catalog.error" class="feedback-bad">Error de catálogo: {{ catalog.error }}</p>
      <SubjectGrid v-else :subjects="catalog.subjects" />
    </main>
  </AppShell>
</template>

<script setup>
import AppShell from '@/layouts/AppShell.vue'
import SubjectGrid from '@/components/shell/SubjectGrid.vue'
import { useCatalogStore } from '@/stores/catalog'
import { useLocalSessionStore } from '@/stores/localSession'
import { useConnectionStore } from '@/stores/connection'

const catalog = useCatalogStore()
const localSession = useLocalSessionStore()
const connection = useConnectionStore()
</script>
