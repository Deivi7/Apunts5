<template>
  <div>
    <component
      v-if="customComponent"
      :is="customComponent"
      :exercise="exercise"
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      @submit="emit('submit', $event)"
      @complete="emit('complete', $event)"
    />
    <div v-else class="ex-block">
      <p class="ex-prompt" style="margin: 0;">Falta el componente Vue: <strong>{{ exercise.content?.component || 'sin nombre' }}</strong></p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveCustomComponent } from '@/modules/customRegistry'

const props = defineProps({
  exercise: { type: Object, required: true },
  modelValue: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['update:modelValue', 'submit', 'complete'])

const customComponent = computed(() => {
  const name = props.exercise.content?.component || props.exercise.config?.component
  return name ? resolveCustomComponent(name) : null
})
</script>
