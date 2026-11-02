<template>
  <div class="subjects-grid">
    <SubjectCard v-for="subject in subjects" :key="subject.id" :subject="subject" />
  </div>
</template>

<script setup>
import SubjectCard from './SubjectCard.vue'
defineProps({
  subjects: { type: Array, required: true },
})
</script>
