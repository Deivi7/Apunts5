<template>
  <TimedChoiceLab :exercise="timedExercise" @update:model-value="$emit('update:modelValue', $event)" @complete="$emit('complete', $event)" />
</template>

<script setup>
import { computed } from 'vue'
import TimedChoiceLab from './TimedChoiceLab.vue'
import { buildCategoryQuestions } from '@/modules/curie/wordslistSorterData.js'

const props = defineProps({ exercise: Object })
defineEmits(['update:modelValue', 'complete'])

const timedExercise = computed(() => {
  const base = props.exercise || {}
  const bank = base.content?.questions?.length
    ? base.content.questions
    : buildCategoryQuestions(base.content?.cards)
  return {
    ...base,
    content: {
      ...base.content,
      component: 'TimedChoiceLab',
      seconds: base.config?.seconds || base.content?.seconds || 90,
      questions: bank,
    },
  }
})
</script>
