<template>
  <div>
    <TopicHeader
      :subject="subject"
      :topic="topic"
      :sections="sections"
      :active-section="activeSection"
      @select-section="emit('select-section', $event)"
    />
    <ConnectionBanner />
    <HeroBanner
      :badge="topic.badge || subject.name"
      :title="topic.title"
      :subtitle="topic.desc"
      :stats="heroStats"
    />
    <div class="app-layout">
      <TopicSidebar
        :sections="sections"
        :active-section="activeSection"
        @select="emit('select-section', $event)"
      />
      <main class="app-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TopicHeader from '@/components/shell/TopicHeader.vue'
import HeroBanner from '@/components/shell/HeroBanner.vue'
import TopicSidebar from '@/components/shell/TopicSidebar.vue'
import ConnectionBanner from '@/components/shell/ConnectionBanner.vue'
import { useLocalSessionStore } from '@/stores/localSession'

const props = defineProps({
  subject: { type: Object, required: true },
  topic: { type: Object, required: true },
  sections: { type: Array, required: true },
  activeSection: { type: String, required: true },
})

const emit = defineEmits(['select-section'])
const localSession = useLocalSessionStore()

const heroStats = computed(() => [
  { label: 'XP sesión', value: `${localSession.xp}` },
  { label: 'Racha', value: `${localSession.streak}` },
  { label: 'Idioma', value: (props.topic.language || 'es').toUpperCase() },
])
</script>
