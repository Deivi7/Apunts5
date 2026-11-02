import { defineAsyncComponent } from 'vue'

const loaders = {
  multiple_choice: () => import('./MultipleChoice.vue'),
  true_false: () => import('./TrueFalse.vue'),
  fill_blank: () => import('./FillBlank.vue'),
  matching: () => import('./Matching.vue'),
  memory: () => import('./MemoryGame.vue'),
  ordering: () => import('./Ordering.vue'),
  custom: () => import('./CustomActivity.vue'),
}

export function resolveRenderer(type) {
  const loader = loaders[type] || loaders.custom
  return defineAsyncComponent(loader)
}
