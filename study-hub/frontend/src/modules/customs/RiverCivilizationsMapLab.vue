<template>
  <div class="ea-lab">
    <div class="ea-mode-bar">
      <button type="button" class="ea-mode-btn" :class="{ active: mode === 'explore' }" @click="mode = 'explore'">
        🗺️ Explorar Mapa Fluvial
      </button>
      <button type="button" class="ea-mode-btn" :class="{ active: mode === 'challenge' }" @click="mode = 'challenge'">
        🎯 Repte dels 4 Grans Rius ({{ score }}/{{ challenges.length }})
      </button>
    </div>

    <!-- MODE EXPLORACIÓ -->
    <div v-if="mode === 'explore'" class="ea-explore-wrap">
      <p class="ea-intro">
        Fes clic sobre cadascuna de les <strong>4 primeres civilitzacions fluvials</strong> per descobrir al voltant de
        quin riu van néixer i quins invents ens van deixar:
      </p>

      <div class="ea-civ-tabs">
        <button v-for="civ in civilizations" :key="civ.id" type="button" class="ea-civ-tab"
          :class="{ active: selectedCiv.id === civ.id }"
          :style="selectedCiv.id === civ.id ? { borderColor: civ.color, background: civ.bg } : {}"
          @click="selectedCiv = civ">
          <span class="ea-civ-emoji">{{ civ.icon }}</span>
          <div>
            <strong>{{ civ.name }}</strong>
            <small>{{ civ.river }}</small>
          </div>
        </button>
      </div>

      <div class="ea-civ-detail" :style="{ borderLeftColor: selectedCiv.color }">
        <div class="ea-civ-detail-head">
          <span class="ea-civ-big-icon">{{ selectedCiv.icon }}</span>
          <div>
            <span class="ea-badge" :style="{ background: selectedCiv.color }">{{ selectedCiv.region }}</span>
            <h4>{{ selectedCiv.name }} — {{ selectedCiv.river }}</h4>
            <p class="ea-civ-quote">{{ selectedCiv.geniallyPopup }}</p>
          </div>
        </div>

        <div class="ea-civ-grid">
          <div class="ea-civ-box">
            <strong>🌾 Conreus i aprofitament del riu</strong>
            <p>{{ selectedCiv.agriculture }}</p>
          </div>
          <div class="ea-civ-box">
            <strong>🏛️ Construccions i societat</strong>
            <p>{{ selectedCiv.society }}</p>
          </div>
          <div class="ea-civ-box">
            <strong>💡 Grans invents i llegat</strong>
            <p>{{ selectedCiv.inventions }}</p>
          </div>
        </div>
      </div>

      <div class="ea-why-water">
        <h5>💧 Per què l'aigua dolça dels rius era tan important? (Els 4 motius del Dossier)</h5>
        <div class="ea-why-grid">
          <div v-for="w in waterReasons" :key="w.title" class="ea-why-item">
            <span>{{ w.icon }}</span>
            <div>
              <strong>{{ w.title }}</strong>
              <p>{{ w.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODE REPTE -->
    <div v-else class="ea-challenge-wrap">
      <div class="ea-progress-row">
        <span>Pregunta {{ currentIdx + 1 }} de {{ challenges.length }}</span>
        <span class="ea-score-pill">⭐ Encerts: {{ score }} / {{ challenges.length }}</span>
      </div>

      <div class="ea-question-card">
        <span class="ea-q-badge">{{ currentQ.tag }}</span>
        <h4 class="ea-q-title">{{ currentQ.prompt }}</h4>

        <div class="ea-options-grid">
          <button v-for="(opt, idx) in currentQ.options" :key="idx" type="button" class="ea-opt-btn" :class="{
            correct: answered && idx === currentQ.answer,
            wrong: answered && selectedOpt === idx && idx !== currentQ.answer,
          }" :disabled="answered" @click="pickOption(idx)">
            {{ opt }}
          </button>
        </div>

        <div v-if="answered" class="ea-feedback" :class="isCorrect ? 'ok' : 'ko'">
          <p>
            <strong>{{ isCorrect ? '✅ Molt bé!' : '❌ Revisa la dada:' }}</strong>
            {{ currentQ.explanation }}
          </p>
          <button v-if="currentIdx < challenges.length - 1" type="button" class="ea-next-btn" @click="nextQuestion">
            Següent pregunta →
          </button>
          <button v-else type="button" class="ea-next-btn" @click="resetChallenge">
            🔄 Tornar a jugar el repte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])
const mode = ref('explore')

const civilizations = [
  {
    id: 'egipte',
    name: 'Egipte',
    river: 'Riu Nil',
    region: 'Nord-est d\'Àfrica',
    icon: '🏜️',
    color: '#d97706',
    bg: 'rgba(217, 119, 6, 0.1)',
    geniallyPopup: '«Egipte es desenvolupa al voltant del riu NIL.»',
    agriculture: 'Quan el riu Nil creixia cada any, deixava un llim (fang negre molt fèrtil) ideal per plantar blat, ordi i lli.',
    society: 'Governats pels faraons (considerats déus vivents). Van construir grans piràmides, temples i tombes.',
    inventions: 'Escriptura jeroglífica, fulls de papir, calendari solar i tècniques de momificació.',
  },
  {
    id: 'mesopotamia',
    name: 'Mesopotàmia',
    river: 'Rius Tigris i Eufrates',
    region: 'Pròxim Orient (Àsia)',
    icon: '📜',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.1)',
    geniallyPopup: '«Mesopotàmia es desenvolupa entre els rius TIGRIS i EUFRATES.»',
    agriculture: 'Van construir una gran xarxa de canals de reg i dics per aprofitar l\'aigua dels dos rius en terres àrides.',
    society: 'Ciutats-estat emmurallades amb grans temples esglaonats anomenats ziggurats.',
    inventions: 'Aquí es va inventar la primera escriptura de la història (escriptura cuneïforme sobre tauletes d\'argila) i els primers codis de lleis.',
  },
  {
    id: 'india',
    name: 'Civilització Índia',
    river: 'Riu Indus',
    region: 'Sud d\'Àsia (Vall de l\'Indus)',
    icon: '🧱',
    color: '#059669',
    bg: 'rgba(5, 150, 105, 0.1)',
    geniallyPopup: '«La civilització Índia es desenvolupa al voltant del riu INDUS.»',
    agriculture: 'Conreaven blat, ordi i van ser pioners en el cultiu i teixit del cotó.',
    society: 'Van construir les primeres ciutats planificades fetes de rajola cuita (com Harappa i Mohenjo-Daro).',
    inventions: 'Carrers en quadrícula, banys a les cases i les primeres xarxes de clavegueram subterrani.',
  },
  {
    id: 'xina',
    name: 'Civilització Xina',
    river: 'Riu Groc (Huang He)',
    region: 'Est d\'Àsia',
    icon: '🐉',
    color: '#dc2626',
    bg: 'rgba(220, 38, 38, 0.1)',
    geniallyPopup: '«La civilització Xina es desenvolupa al voltant del riu GROC.»',
    agriculture: 'Van aprofitar les terres fèrtils del riu Groc per cultivar grans camps d\'arròs i mill.',
    society: 'Governada per dinasties d\'emperadors; van començar a aixecar grans muralles defensives.',
    inventions: 'Van crear el teixit de la seda, la tinta, el paper i la porcellana.',
  },
]

const selectedCiv = ref(civilizations[0])

const waterReasons = [
  { icon: '💧', title: '1. Aigua per beure', desc: 'Persones i animals en necessiten cada dia per viure.' },
  { icon: '🌱', title: '2. Terres fèrtils', desc: 'Quan el riu creix, deixa un fang ric (llim) que fa créixer el blat.' },
  { icon: '🚿', title: '3. Canals de reg', desc: 'Van aprendre a guiar l\'aigua cap als camps més allunyats.' },
  { icon: '⛵', title: '4. Camí per viatjar', desc: 'Amb barques transportaven mercaderies de manera ràpida.' },
]

const challenges = [
  {
    tag: 'Mapa Fluvial',
    prompt: 'Al voltant de quin riu es va desenvolupar la civilització d\'Egipte, famosa pels faraons i les piràmides?',
    options: ['Riu Indus', 'Riu Nil', 'Riu Groc', 'Rius Tigris i Eufrates'],
    answer: 1,
    explanation: 'Egipte va néixer a les ribes del riu Nil, al nord-est d\'Àfrica.',
  },
  {
    tag: 'Mapa Fluvial',
    prompt: 'Quina civilització significa "terra entre dos rius" perquè es va desenvolupar entre el Tigris i l\'Eufrates?',
    options: ['Mesopotàmia', 'Índia', 'Xina', 'Egipte'],
    answer: 0,
    explanation: 'Mesopotàmia es troba entre els rius Tigris i Eufrates, on es va inventar la primera escriptura.',
  },
  {
    tag: 'Aportacions',
    prompt: 'A quina civilització fluvial es van construir ciutats planificades de rajola amb clavegueram al voltant del riu Indus?',
    options: ['Egipte', 'Xina', 'Civilització Índia', 'Mesopotàmia'],
    answer: 2,
    explanation: 'A la vall del riu Indus (Índia) van construir ciutats planificades de rajola amb clavegueram.',
  },
  {
    tag: 'Aportacions',
    prompt: 'Quina civilització es va desenvolupar al voltant del riu Groc, on cultivaven arròs i van crear la seda i la tinta?',
    options: ['Mesopotàmia', 'Civilització Xina', 'Egipte', 'Civilització Índia'],
    answer: 1,
    explanation: 'La civilització Xina va néixer al voltant del riu Groc i va destacar pel cultiu de l\'arròs, la seda i la tinta.',
  },
  {
    tag: 'Dossier',
    prompt: 'Segons el dossier, què passava a la terra quan el riu creixia i per què afavoria l\'agricultura?',
    options: [
      'L\'aigua salada assecava les males herbes.',
      'Deixava un fang ric que feia molt fèrtils les terres de cultiu.',
      'Congelava el sòl durant tot l\'any.',
      'Impedia que hi creixés cap planta a la vora.',
    ],
    answer: 1,
    explanation: 'Les crescudes deixaven un fang ric (llim) que fertilitzava els camps per conrear blat i altres cereals.',
  },
  {
    tag: 'Edat Antiga',
    prompt: 'Quin invent marca l\'inici de l\'Edat Antiga (cap al 3.000 / 3.500 aC) i va néixer a Mesopotàmia?',
    options: ['La roda de fusta', 'El descobriment del foc', 'La invenció de l\'escriptura', 'La impremta'],
    answer: 2,
    explanation: 'La invenció de l\'escriptura tanca la Prehistòria i dona inici a l\'Edat Antiga.',
  },
]

const currentIdx = ref(0)
const selectedOpt = ref(null)
const answered = ref(false)
const score = ref(0)

const currentQ = computed(() => challenges[currentIdx.value])
const isCorrect = computed(() => selectedOpt.value === currentQ.value.answer)

function pickOption(idx) {
  if (answered.value) return
  selectedOpt.value = idx
  answered.value = true
  if (idx === currentQ.value.answer) {
    score.value += 1
    const max = props.exercise?.maxScore || 12
    if (score.value >= 4) {
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: `${score.value} respostes correctes sobre les civilitzacions fluvials!`,
        },
      })
    }
  }
}

function nextQuestion() {
  if (currentIdx.value < challenges.length - 1) {
    currentIdx.value += 1
    selectedOpt.value = null
    answered.value = false
  }
}

function resetChallenge() {
  currentIdx.value = 0
  selectedOpt.value = null
  answered.value = false
  score.value = 0
}
</script>
