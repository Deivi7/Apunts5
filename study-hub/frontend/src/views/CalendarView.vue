<template>
  <AppShell>
    <section class="module-hero">
      <div class="hero-inner">
        <div class="hero-title-group">
          <div class="hero-tag-badge">Tutoría</div>
          <h1>📅 Calendario Escolar & Exámenes</h1>
          <p>Fechas de exámenes de 5º, entregas y festivos (requiere conexión a Google Calendar).</p>
        </div>
      </div>
    </section>

    <section class="calendar-section">
      <div class="calendar-card">
        <div class="calendar-header">
          <div class="calendar-title-group">
            <h2><span>📅</span> Calendario de Álvaro</h2>
            <p>Vista sincronizada con Google Calendar.</p>
          </div>
          <div class="calendar-actions-row">
            <a
              href="https://calendar.google.com/calendar/u/1?cid=ZGRjZTc3ZmM4NjgwODMwMzA2ZjE3YmM0YjgwM2FiMjUzYjkxYzFkNjZmYmFmNjMwN2Y3NDc4NjhkMWUzMTI3ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
              target="_blank"
              rel="noopener"
              class="btn-open-gcal"
            >
              <span>📅</span> Abrir en Google Calendar ↗
            </a>
          </div>
        </div>
        <div class="calendar-frame-container">
          <iframe
            v-if="moduleDef.calendarEmbed"
            :src="moduleDef.calendarEmbed"
            title="Google Calendar"
          />
        </div>
      </div>
    </section>
  </AppShell>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppShell from '@/layouts/AppShell.vue'
import { loadModuleDefinition } from '@/modules/registry'

const moduleDef = ref({ calendarEmbed: '' })

onMounted(async () => {
  moduleDef.value = (await loadModuleDefinition('tutoria/calendario')) || { calendarEmbed: '' }
})
</script>
