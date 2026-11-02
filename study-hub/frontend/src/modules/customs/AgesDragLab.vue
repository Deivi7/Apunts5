<template>
  <DragClassify :exercise="labExercise" @update:model-value="$emit('update:modelValue', $event)" @complete="$emit('complete', $event)" />
</template>

<script setup>
import { computed } from 'vue'
import DragClassify from './DragClassify.vue'

const props = defineProps({ exercise: Object })
defineEmits(['update:modelValue', 'complete'])

const labExercise = computed(() => ({
  ...props.exercise,
  content: {
    shuffleOnLoad: true,
    hint: 'Arrossega cada targeta a la seva etapa (o toca la targeta i després la zona). En mòbil: toca targeta + zona.',
    successFeedback: 'Perfecte! Les 18 targetes estan ben classificades.',
    failFeedback: 'Encara hi ha errors. Revisa les etapes i torna-ho a provar.',
    ...props.exercise?.content,
  },
}))
</script>
