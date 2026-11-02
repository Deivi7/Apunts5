<template>
  <section class="module-hero">
    <div class="hero-inner">
      <div class="hero-title-group">
        <div class="hero-tag-badge">{{ badge }}</div>
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </div>
      <div class="hero-quick-stats">
        <div v-for="stat in stats" :key="stat.label" class="stat-card-mini">
          <div class="stat-val">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  badge: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  stats: { type: Array, default: () => [] },
})
</script>
