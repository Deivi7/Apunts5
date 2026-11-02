<template>
  <div v-if="!ready" class="subjects-container" style="padding-top: 2rem; color: var(--text-muted);">
    Cargando módulo…
  </div>
  <div v-else-if="error" class="subjects-container" style="padding-top: 2rem;">
    <p class="feedback-bad">{{ error }}</p>
  </div>
  <TopicLayout
    v-else
    :subject="subject"
    :topic="topic"
    :sections="moduleDef.sections"
    :active-section="activeSection"
    @select-section="activeSection = $event"
  >
    <div v-if="showTheory" class="topic-vue-section">
      <PanelHtml v-if="theoryContent" :html="theoryContent" :content-base="moduleDef.contentBase" />
      <div style="height: 1rem;" />
      <ResourceHub :items="moduleDef.resources" />
      <!-- Preferencia: apuntes sin ejercicios. Si un módulo aún los tiene aquí (legacy), se muestran. -->
      <ExercisePlayer
        v-for="exercise in sectionExercises"
        :key="exercise.id"
        :exercise="exercise"
        style="margin-top: 1rem; display: block;"
      />
    </div>

    <div v-else-if="sectionRole === 'docs'" class="topic-vue-section">
      <PanelHtml v-if="activePanelHtml" :html="activePanelHtml" :content-base="moduleDef.contentBase" />
      <DocShelf :documents="moduleDef.documents" />
      <ResourceHub
        v-if="moduleDef.resources?.length"
        :items="moduleDef.resources"
        style="margin-top: 1rem;"
      />
    </div>

    <div v-else class="topic-vue-section">
      <!-- Siempre mostrar el contenido/apuntes del panel (cuento, teoría, fichas…) -->
      <PanelHtml v-if="activePanelHtml" :html="activePanelHtml" :content-base="moduleDef.contentBase" />

      <ExercisePlayer
        v-for="exercise in sectionExercises"
        :key="exercise.id"
        :exercise="exercise"
        style="margin-bottom: 1rem; margin-top: 1rem; display: block;"
      />

      <p
        v-if="!sectionExercises.length && !activePanelHtml"
        style="color: var(--text-muted); font-size: 0.9rem;"
      >
        Esta sección se está preparando. Vuelve pronto para practicar aquí.
      </p>
    </div>
  </TopicLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TopicLayout from '@/layouts/TopicLayout.vue'
import ResourceHub from '@/components/shell/ResourceHub.vue'
import DocShelf from '@/components/shell/DocShelf.vue'
import PanelHtml from '@/components/content/PanelHtml.vue'
import ExercisePlayer from '@/exercise-renderers/ExercisePlayer.vue'
import { useCatalogStore } from '@/stores/catalog'
import { loadModuleDefinition } from '@/modules/registry'
import { ensureTopicStyles } from '@/composables/useTopicStyles'

const route = useRoute()
const catalog = useCatalogStore()

const ready = ref(false)
const error = ref('')
const subject = ref(null)
const topic = ref(null)
const moduleDef = ref({
  sections: [],
  theoryHtml: '',
  resources: [],
  documents: [],
  exercisesBySection: {},
})
const activeSection = ref('theory')

const activeMeta = computed(() =>
  (moduleDef.value.sections || []).find((s) => s.id === activeSection.value),
)
const sectionRole = computed(() => activeMeta.value?.role || '')
const isVueOnlyTheory = computed(
  () => activeMeta.value?.vueOnly === true && activeSection.value === 'theory',
)
const showTheory = computed(
  () => sectionRole.value === 'theory' || isVueOnlyTheory.value,
)
const theoryContent = computed(
  () => moduleDef.value.theoryHtml || activeMeta.value?.panelHtml || '',
)
const activePanelHtml = computed(() => activeMeta.value?.panelHtml || '')
const sectionExercises = computed(() => {
  const by = moduleDef.value.exercisesBySection || {}
  const id = activeSection.value
  if (by[id]?.length) return by[id]
  // theory injectada
  if (id === 'theory' && by.comunicacion?.length) return by.comunicacion
  return []
})

async function load() {
  ready.value = false
  error.value = ''
  const found = catalog.getTopic(route.params.subjectId, route.params.topicId)
  if (!found) {
    error.value = 'Tema no encontrado en el catálogo'
    return
  }
  subject.value = found.subject
  topic.value = found.topic
  try {
    const [def] = await Promise.all([
      loadModuleDefinition(found.topic.vueModule),
      ensureTopicStyles(found.topic.vueModule),
    ])
    if (!def) throw new Error(`Sin definición Vue para ${found.topic.vueModule}`)
    moduleDef.value = def
    activeSection.value = def.sections?.[0]?.id || 'theory'
    ready.value = true
  } catch (err) {
    error.value = err?.message || String(err)
  }
}

watch(() => [route.params.subjectId, route.params.topicId], load, { immediate: true })
</script>
