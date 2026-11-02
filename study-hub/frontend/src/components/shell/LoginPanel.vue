<template>
  <div v-if="open" class="login-backdrop" @click.self="emit('close')">
    <div class="vue-panel login-card">
      <h3>Iniciar sesión (modo online)</h3>
      <p class="panel-desc">Las notas oficiales se guardan en el servidor. El modo local no usa esta cuenta.</p>
      <form class="login-form" @submit.prevent="submit">
        <label>
          Email
          <input v-model="email" class="input-hub" type="email" required />
        </label>
        <label>
          Contraseña
          <input v-model="password" class="input-hub" type="password" required minlength="8" />
        </label>
        <p v-if="auth.error" class="feedback-bad">{{ auth.error }}</p>
        <div class="exercise-actions">
          <button class="btn-check-answer" type="submit" :disabled="auth.loading">
            {{ auth.loading ? 'Entrando…' : 'Entrar' }}
          </button>
          <button class="btn-secondary-quiet" type="button" @click="emit('close')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['close', 'success'])

const auth = useAuthStore()
const email = ref('alumno@studyhub.local')
const password = ref('Alumno123!')

async function submit() {
  await auth.login(email.value, password.value)
  emit('success')
  emit('close')
}
</script>
