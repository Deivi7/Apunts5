<template>
  <div class="email-client-mockup" style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden; background: var(--bg-card);">
    <div style="padding: 0.65rem 1rem; background: var(--bg-main); border-bottom: 1px solid var(--border-color); font-weight: 800;">
      ✉️ Simulador de correu electrònic
    </div>
    <div style="padding: 1rem; display: grid; gap: 0.75rem;">
      <label style="display: grid; gap: 0.25rem;">
        <span style="font-size: 0.8rem; font-weight: 800;">Destinatari (Per a)</span>
        <input v-model="to" type="email" class="input-hub" placeholder="tutor.escola@educacio.cat">
      </label>
      <label style="display: grid; gap: 0.25rem;">
        <span style="font-size: 0.8rem; font-weight: 800;">Assumpte</span>
        <input v-model="subject" type="text" class="input-hub" placeholder="Resum en 3-5 paraules">
      </label>
      <div style="display: flex; flex-wrap: wrap; gap: 0.45rem;">
        <button type="button" class="ex-btn" @click="insert('salutacio')">👋 Salutació</button>
        <button type="button" class="ex-btn" @click="insert('comiat')">🤝 Comiat</button>
        <button type="button" class="ex-btn" @click="insert('signatura')">✍️ Signatura</button>
      </div>
      <textarea
        v-model="body"
        class="input-hub"
        rows="8"
        placeholder="Escriu el cos del correu: salutació, explicació, comiat i signatura…"
        style="resize: vertical;"
      />
      <button type="button" class="ex-btn ex-btn-primary" @click="send">🚀 Enviar correu</button>
      <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const to = ref('')
const subject = ref('')
const body = ref('')
const feedback = ref('')
const ok = ref(false)

function sync() {
  emit('update:modelValue', { to: to.value, subject: subject.value, body: body.value })
}

function insert(type) {
  if (type === 'salutacio') body.value = `Bon dia senyor Carles,\n\n${body.value}`
  else if (type === 'comiat') body.value += '\n\nMoltes gràcies per la seva atenció i fins aviat,'
  else if (type === 'signatura') body.value += '\nÁlvaro Herrera\nAlumne de 5è de Primària'
  sync()
}

function send() {
  const t = to.value.trim()
  const s = subject.value.trim()
  const b = body.value.trim()
  sync()

  if (!t || !t.includes('@')) {
    ok.value = false
    feedback.value = '⚠️ Falta l\'adreça del destinatari o no té format de correu (ex: nom@escola.cat).'
    return
  }
  if (!s || s.length < 5) {
    ok.value = false
    feedback.value = '⚠️ L\'assumpte és massa curt. Escriu un títol clar del motiu.'
    return
  }
  if (s.length > 60) {
    ok.value = false
    feedback.value = '⚠️ L\'assumpte és massa llarg! No escriguis tot el missatge aquí.'
    return
  }
  if (b.toUpperCase() === b && b.length > 20) {
    ok.value = false
    feedback.value = '⚠️ Has escrit tot el correu en MAJÚSCULES (equival a cridar).'
    return
  }
  if (/\s(pq|q|tb|xk)\s/i.test(` ${b} `)) {
    ok.value = false
    feedback.value = '⚠️ No retallis paraules com «pq», «q» o «tb». Fes servir frases completes.'
    return
  }
  if (b.length < 40) {
    ok.value = false
    feedback.value = '⚠️ El correu és massa breu. Inclou salutació, explicació, comiat i signatura.'
    return
  }

  ok.value = true
  feedback.value = '🚀 Correu enviat amb èxit! Compleix les 5 regles d\'or de classe.'
  const max = props.exercise?.maxScore || 25
  emit('complete', {
    to: t,
    subject: s,
    body: b,
    _grade: { score: max, maxScore: max, feedback: 'Correu electrònic vàlid' },
  })
}
</script>
