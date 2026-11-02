<template>
  <div class="resource-hub-container">
    <div class="resource-hub-header">
      <h3 class="resource-hub-title">🔗 Resource Hub</h3>
    </div>
    <div class="resource-grid">
      <a
        v-for="item in items"
        :key="item.url + item.title"
        :href="item.url"
        target="_blank"
        rel="noopener"
        class="resource-card"
      >
        <div class="resource-card-title">{{ item.title }}</div>
        <div class="resource-card-desc">{{ item.subtitle || 'Abrir recurso' }}</div>
      </a>
    </div>
    <p v-if="!items.length" style="color: var(--text-muted); font-size: 0.85rem; margin: 0;">
      Sin recursos adicionales listados.
    </p>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
})
</script>
