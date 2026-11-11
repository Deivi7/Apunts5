<template>
  <div class="iv-soundboard">
    <div class="iv-sb-controls">
      <input
        v-model="search"
        type="text"
        class="iv-write-input"
        placeholder="🔍 Busca un verbo en inglés o español (ej. buy, bought, comprar...)"
      />
      <div class="iv-levels-strip" style="margin-bottom: 0;">
        <button
          type="button"
          class="iv-level-chip"
          :class="{ active: activeFam === 'all' }"
          @click="activeFam = 'all'"
        >
          📚 Todos (57)
        </button>
        <button
          v-for="fam in VERB_FAMILIES"
          :key="fam.id"
          type="button"
          class="iv-level-chip"
          :class="{ active: activeFam === fam.id }"
          :style="activeFam === fam.id ? { background: fam.color, borderColor: fam.color, color: '#fff' } : {}"
          @click="activeFam = fam.id"
        >
          {{ fam.icon }} {{ fam.shortTitle }}
        </button>
      </div>
    </div>

    <div
      v-for="fam in filteredFamilies"
      :key="fam.id"
      class="iv-sb-family-group"
    >
      <div class="iv-sb-fam-head" :style="{ borderLeftColor: fam.color }">
        <div>
          <h4>{{ fam.icon }} {{ fam.title }}</h4>
          <p>{{ fam.rule }}</p>
        </div>
        <button
          type="button"
          class="iv-speak-fam-btn"
          :style="{ background: fam.color }"
          @click="speakEntireFamily(fam)"
        >
          🔊 Escuchar toda la familia
        </button>
      </div>

      <div class="iv-sb-cards-grid">
        <button
          v-for="v in fam.verbs"
          :key="v.present"
          type="button"
          class="iv-sb-card"
          :class="{ speaking: activeSpeakingVerb === v.present }"
          @click="speakVerbPair(v)"
        >
          <div class="iv-sb-pair">
            <span class="iv-sb-pres">{{ v.present }}</span>
            <span class="iv-sb-arrow">→</span>
            <span class="iv-sb-past" :style="{ color: fam.color }">{{ v.past }}</span>
          </div>
          <div class="iv-sb-meta">
            <span>{{ v.es }}</span>
            <span class="iv-sb-audio-icon">🔊</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VERB_FAMILIES } from '../amco/irregularVerbsData.js'

const search = ref('')
const activeFam = ref('all')
const activeSpeakingVerb = ref('')

const filteredFamilies = computed(() => {
  const q = search.value.trim().toLowerCase()
  return VERB_FAMILIES.map((fam) => {
    if (activeFam.value !== 'all' && activeFam.value !== fam.id) return null
    const verbs = fam.verbs.filter(
      (v) =>
        !q ||
        v.present.toLowerCase().includes(q) ||
        v.past.toLowerCase().includes(q) ||
        v.es.toLowerCase().includes(q),
    )
    if (!verbs.length) return null
    return { ...fam, verbs }
  }).filter(Boolean)
})

function speakVerbPair(v) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    activeSpeakingVerb.value = v.present
    const utter = new SpeechSynthesisUtterance(`${v.present} ... ${v.pastTts || v.past}`)
    utter.lang = 'en-US'
    utter.rate = 0.88
    utter.onend = () => {
      activeSpeakingVerb.value = ''
    }
    window.speechSynthesis.speak(utter)
  } catch {
    activeSpeakingVerb.value = ''
  }
}

function speakEntireFamily(fam) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const sequence = fam.verbs
      .map((v) => `${v.present}, ${v.pastTts || v.past}`)
      .join('. ')
    const utter = new SpeechSynthesisUtterance(sequence)
    utter.lang = 'en-US'
    utter.rate = 0.88
    window.speechSynthesis.speak(utter)
  } catch {
    // ignore
  }
}
</script>

