<template>
  <div class="studio-card" style="margin: 0; box-shadow: none; border: none; padding: 0;">
    <div class="comic-strip-editor">
      <div v-for="panel in panels" :key="panel.id" class="comic-panel-box">
        <div class="panel-header">
          <span>VIÑETA {{ panel.id }}</span>
          <span style="font-size: 0.8rem; background: var(--border-color); padding: 2px 8px; border-radius: 999px;">{{ panel.label }}</span>
        </div>
        <div class="panel-char-select">
          <span style="font-size: 0.8rem; font-weight: 700; align-self: center;">Personaje:</span>
          <button
            v-for="ch in characters"
            :key="ch"
            type="button"
            class="char-btn"
            :class="{ active: panel.char === ch }"
            @click="panel.char = ch"
          >
            {{ ch }}
          </button>
        </div>
        <textarea
          :ref="(el) => setRef(panel.id, el)"
          v-model="panel.text"
          class="panel-textarea"
          :placeholder="panel.placeholder"
        />
        <div class="quick-puncts">
          <span style="font-size: 0.75rem; font-weight: 700; align-self: center;">Insertar signo:</span>
          <button v-for="sign in signs" :key="sign" type="button" class="punct-btn" @click="insertSign(panel.id, sign)">
            {{ sign }}
          </button>
        </div>
      </div>
    </div>

    <div class="flash-actions" style="justify-content: center; margin-top: 1.25rem;">
      <button type="button" class="ex-btn ex-btn-primary" @click="verify">
        🔍 Analizar Signos y Comunicación del Cómic
      </button>
    </div>

    <div
      v-if="resultHtml"
      class="comic-check-result"
      :style="{ borderColor: allGood ? 'var(--accent-green)' : 'var(--accent-amber)' }"
      v-html="resultHtml"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const characters = ['👧 Raquel', '👦 Amigo']
const signs = ['¿', '?', '¡', '!', ',', '.']

const panels = reactive([
  {
    id: 1,
    label: 'Escena Inicial',
    char: '👧 Raquel',
    placeholder: 'Escribe el diálogo aquí usando ¿?, ¡!, coma y punto...',
    text: '¡Hola, amigo! ¿Has revisado los apuntes de lengua?',
  },
  {
    id: 2,
    label: 'Respuesta',
    char: '👦 Amigo',
    placeholder: 'Escribe el diálogo aquí...',
    text: 'Sí, los tengo aquí. He ordenado las palabras alfabéticamente, pero tengo una duda.',
  },
  {
    id: 3,
    label: 'Desenlace',
    char: '👧 Raquel',
    placeholder: 'Escribe el diálogo aquí...',
    text: '¡No te preocupes! Buscaremos la definición en el diccionario online.',
  },
])

const refs = {}
const resultHtml = ref('')
const allGood = ref(false)

function setRef(id, el) {
  if (el) refs[id] = el
}

function insertSign(panelId, sign) {
  const panel = panels.find((p) => p.id === panelId)
  const el = refs[panelId]
  if (!panel || !el) {
    panel.text += sign
    sync()
    return
  }
  const start = el.selectionStart ?? panel.text.length
  const end = el.selectionEnd ?? start
  panel.text = panel.text.slice(0, start) + sign + panel.text.slice(end)
  sync()
  requestAnimationFrame(() => {
    el.focus()
    const pos = start + sign.length
    el.selectionStart = el.selectionEnd = pos
  })
}

function sync() {
  emit('update:modelValue', {
    panels: panels.map((p) => ({ id: p.id, char: p.char, text: p.text })),
  })
}

function verify() {
  const fullText = panels.map((p) => p.text).join(' ')
  const hasPunto = fullText.includes('.')
  const hasComa = fullText.includes(',')
  const hasInterrogacion = fullText.includes('¿') && fullText.includes('?')
  const hasExclamacion = fullText.includes('¡') && fullText.includes('!')
  allGood.value = hasPunto && hasComa && hasInterrogacion && hasExclamacion
  sync()

  if (allGood.value) {
    resultHtml.value = `
      <div style="font-weight: 800; font-size: 1.15rem; color: #059669; margin-bottom: 0.5rem;">
        🎉 ¡Excelente trabajo de guion y puntuación!
      </div>
      <p style="font-size: 0.95rem; line-height: 1.4;">
        Has utilizado correctamente los 4 signos exigidos: <strong>Punto (.)</strong>, <strong>Coma (,)</strong>,
        <strong>Interrogación (¿?)</strong> y <strong>Exclamación (¡!)</strong>.
      </p>
      <div style="margin-top: 0.75rem; font-size: 0.88rem; color: var(--text-muted);">
        📡 Circuito: los personajes alternan como emisores y receptores con el código del castellano.
      </div>`
    const max = props.exercise?.maxScore || 40
    emit('complete', {
      panels: panels.map((p) => ({ id: p.id, char: p.char, text: p.text })),
      _grade: { score: max, maxScore: max, feedback: 'Taller de cómic superado: 4 signos correctos' },
    })
  } else {
    resultHtml.value = `
      <div style="font-weight: 800; font-size: 1.15rem; color: var(--accent-amber); margin-bottom: 0.5rem;">
        ⚠️ Revisión de Signos de Puntuación
      </div>
      <ul style="margin-left: 1.5rem; font-size: 0.9rem; line-height: 1.5;">
        <li style="color: ${hasPunto ? '#059669' : '#e11d48'};">Punto (.): ${hasPunto ? '✅ Correcto' : '❌ Falta al menos un punto'}</li>
        <li style="color: ${hasComa ? '#059669' : '#e11d48'};">Coma (,): ${hasComa ? '✅ Correcto' : '❌ Falta al menos una coma'}</li>
        <li style="color: ${hasInterrogacion ? '#059669' : '#e11d48'};">Interrogación (¿ ?): ${hasInterrogacion ? '✅ Correcto' : '❌ Falta ¿ ?'}</li>
        <li style="color: ${hasExclamacion ? '#059669' : '#e11d48'};">Exclamación (¡ !): ${hasExclamacion ? '✅ Correcto' : '❌ Falta ¡ !'}</li>
      </ul>`
  }
}
</script>

<style scoped>
.comic-check-result {
  margin-top: 1.25rem;
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  background: var(--bg-main);
  border: 2px solid var(--border-color);
}
</style>
