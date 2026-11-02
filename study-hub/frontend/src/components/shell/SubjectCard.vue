<template>
  <article class="subject-card" :class="{ 'is-active-app': subject.topics.length > 0 }">
    <span v-if="subject.topics.length" class="badge-active-mark">
      🌟 {{ subject.topics.length }} {{ subject.topics.length === 1 ? 'Tema listo' : 'Temas listos' }}
    </span>

    <div>
      <div class="card-top-row">
        <div class="subject-icon">{{ subject.icon }}</div>
        <div>
          <h3 class="subject-title">{{ subject.name }}</h3>
          <div class="subject-category-tag">{{ subject.fullName }}</div>
        </div>
      </div>
      <p class="subject-desc" style="margin-top: 0.6rem;">{{ subject.description }}</p>
    </div>

    <div v-if="subject.topics.length === 1" class="card-actions">
      <RouterLink :to="topicRoute(subject.topics[0])" class="btn-launch-app">
        <span>🎮</span> {{ subject.topics[0].shortTitle }} →
      </RouterLink>
      <div class="card-sub-actions">
        <a :href="subject.driveUrl" target="_blank" rel="noopener" class="btn-sub-drive">
          <span>☁️</span> Drive ↗
        </a>
      </div>
    </div>

    <div v-else-if="subject.topics.length > 1" class="card-actions">
      <div class="card-topics-list">
        <RouterLink
          v-for="topic in subject.topics"
          :key="topic.id"
          :to="topicRoute(topic)"
          class="btn-topic-launch"
          :title="topic.title"
        >
          <span>🎮 {{ topic.shortTitle }}</span>
          <span>→</span>
        </RouterLink>
      </div>
      <div class="card-sub-actions" style="margin-top: 0.35rem;">
        <a :href="subject.driveUrl" target="_blank" rel="noopener" class="btn-sub-drive">
          <span>☁️</span> Drive ↗
        </a>
      </div>
    </div>

    <div v-else class="card-actions">
      <a
        :href="subject.driveUrl"
        target="_blank"
        rel="noopener"
        class="btn-launch-app"
        style="background: var(--bg-main); color: var(--text-main); border: 1px solid var(--border-color);"
      >
        <span>☁️</span> Google Drive ↗
      </a>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  subject: { type: Object, required: true },
})

function topicRoute(topic) {
  if (topic.id === 'calendario' && props.subject.id === 'tutoria') {
    return { name: 'calendar' }
  }
  return {
    name: 'topic',
    params: { subjectId: props.subject.id, topicId: topic.id },
  }
}
</script>
