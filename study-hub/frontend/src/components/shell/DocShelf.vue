<template>
  <div class="vue-panel">
    <h3>Documentos</h3>
    <p class="panel-desc">Estantería dual Local / Drive</p>
    <div class="doc-shelf-list">
      <div v-for="doc in documents" :key="doc.title" class="doc-shelf-row">
        <div>
          <div style="font-weight: 800; font-size: 0.9rem;">{{ doc.title }}</div>
          <div v-if="doc.desc" style="font-size: 0.75rem; color: var(--text-muted);">{{ doc.desc }}</div>
        </div>
        <div class="doc-shelf-actions">
          <a v-if="doc.localUrl" :href="doc.localUrl" class="btn-doc-local" target="_blank" rel="noopener">📁 Local</a>
          <a v-if="doc.driveUrl" :href="doc.driveUrl" class="btn-doc-drive" target="_blank" rel="noopener">☁️ Drive</a>
        </div>
      </div>
      <p v-if="!documents.length" style="color: var(--text-muted); font-size: 0.85rem; margin: 0;">
        Sin documentos listados en esta sección. Revisa los enlaces de Drive de la asignatura.
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  documents: { type: Array, default: () => [] },
})
</script>
