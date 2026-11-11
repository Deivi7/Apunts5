<template>
  <div class="ea-lab">
    <div class="ea-mode-bar">
      <button
        type="button"
        class="ea-mode-btn"
        :class="{ active: mode === 'hispania' }"
        @click="mode = 'hispania'"
      >
        🗺️ Hispània, Conquesta i Ciutats Catalanes
      </button>
      <button
        type="button"
        class="ea-mode-btn"
        :class="{ active: mode === 'glossari' }"
        @click="mode = 'glossari'"
      >
        📖 Glossari Romà Oficial (24 paraules)
      </button>
      <button
        type="button"
        class="ea-mode-btn"
        :class="{ active: mode === 'challenge' }"
        @click="mode = 'challenge'"
      >
        🎯 Repte del Glossari i Ciutats ({{ quizScore }}/{{ glossaryQuiz.length }})
      </button>
    </div>

    <!-- MODE 1: CONQUESTA, PROVÍNCIES I CAPITALS CATALANES -->
    <div v-if="mode === 'hispania'" class="ea-explore-wrap">
      <!-- Línia del temps de les 3 fases de la conquesta -->
      <div class="ea-conquest-card">
        <h5>⚔️ Línia del Temps de la Conquesta Romana d'Hispània (218 aC – 19 aC)</h5>
        <p class="ea-intro" style="margin-bottom: 0.75rem;">
          Els romans van trigar <strong>més de 200 anys (199 anys)</strong> a conquerir tota la Península Ibèrica. Fes clic a cada fase per veure'n els detalls:
        </p>
        <div class="ea-phases-row">
          <button
            v-for="ph in conquestPhases"
            :key="ph.id"
            type="button"
            class="ea-phase-btn"
            :class="{ active: selectedPhase.id === ph.id }"
            @click="selectedPhase = ph"
          >
            <span class="ea-phase-dates">{{ ph.dates }}</span>
            <strong>{{ ph.title }}</strong>
          </button>
        </div>
        <div class="ea-phase-detail">
          <strong>{{ selectedPhase.title }} ({{ selectedPhase.dates }}):</strong>
          <p>{{ selectedPhase.desc }}</p>
        </div>
      </div>

      <!-- Ciutats catalanes a l'època romana -->
      <div class="ea-cities-section">
        <h5>🏛️ Com s'anomenaven les capitals i ciutats catalanes a l'època romana?</h5>
        <p class="ea-intro">
          Fes clic a cada targeta per girar-la i descobrir el nom romà i el seu llegat:
        </p>
        <div class="ea-cities-grid">
          <div
            v-for="city in catalanCities"
            :key="city.roman"
            class="ea-city-card"
            :class="{ flipped: flippedCities[city.roman] }"
            @click="flippedCities[city.roman] = !flippedCities[city.roman]"
          >
            <div class="ea-city-top">
              <span class="ea-city-badge">Nom Romà</span>
              <h4>{{ city.roman }}</h4>
            </div>
            <div class="ea-city-bottom">
              <span class="ea-city-modern">📍 Ciutat actual: <strong>{{ city.modern }}</strong></span>
              <p>{{ city.info }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Les 5 Províncies d'Hispània al segle III dC -->
      <div class="ea-provinces-box">
        <h5>🗺️ Les 5 Províncies d'Hispània (Segle III dC)</h5>
        <p class="ea-intro">
          Al principi Hispània es dividia en 2 províncies, després en 3 i al segle III dC en <strong>5 províncies</strong> governades per un governador:
        </p>
        <div class="ea-provinces-pills">
          <div v-for="pr in provinces" :key="pr.name" class="ea-prov-pill">
            <strong>{{ pr.name }}</strong>
            <span>{{ pr.capital }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- MODE 2: GLOSSARI ROMÀ OFICIAL (24 PARAULES DE Glossari-romans.pdf) -->
    <div v-else-if="mode === 'glossari'" class="ea-glossary-wrap">
      <div class="ea-glossary-controls">
        <input
          v-model="searchQuery"
          type="text"
          class="ea-input"
          placeholder="🔍 Cerca qualsevol de les 24 paraules de Glossari-romans.pdf (ex: Domus, Insulae, Cúria, Tàrraco...)"
        />
        <div class="ea-cat-pills">
          <button
            v-for="cat in glossaryCategories"
            :key="cat"
            type="button"
            class="ea-cat-pill"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="ea-glossary-grid">
        <article
          v-for="item in filteredGlossary"
          :key="item.term"
          class="ea-glossary-card"
        >
          <div class="ea-glossary-head">
            <span class="ea-glossary-icon">{{ item.icon }}</span>
            <div>
              <h4>{{ item.term }}</h4>
              <small class="ea-glossary-cat">{{ item.category }}</small>
            </div>
          </div>
          <p>{{ item.definition }}</p>
        </article>
      </div>
    </div>

    <!-- MODE 3: REPTE DEL GLOSSARI -->
    <div v-else class="ea-challenge-wrap">
      <div class="ea-progress-row">
        <span>Pregunta {{ quizIdx + 1 }} de {{ glossaryQuiz.length }}</span>
        <span class="ea-score-pill">⭐ Encerts: {{ quizScore }} / {{ glossaryQuiz.length }}</span>
      </div>

      <div class="ea-question-card">
        <span class="ea-q-badge">Glossari Romà Oficial</span>
        <h4 class="ea-q-title">{{ currentQuiz.prompt }}</h4>

        <div class="ea-options-grid">
          <button
            v-for="(opt, idx) in currentQuiz.options"
            :key="idx"
            type="button"
            class="ea-opt-btn"
            :class="{
              correct: quizAnswered && idx === currentQuiz.answer,
              wrong: quizAnswered && quizPicked === idx && idx !== currentQuiz.answer,
            }"
            :disabled="quizAnswered"
            @click="pickQuiz(idx)"
          >
            {{ opt }}
          </button>
        </div>

        <div v-if="quizAnswered" class="ea-feedback" :class="quizPicked === currentQuiz.answer ? 'ok' : 'ko'">
          <p>
            <strong>{{ quizPicked === currentQuiz.answer ? '✅ Correcte!' : '❌ Recorda la definició del glossari:' }}</strong>
            {{ currentQuiz.explanation }}
          </p>
          <button
            v-if="quizIdx < glossaryQuiz.length - 1"
            type="button"
            class="ea-next-btn"
            @click="nextQuiz"
          >
            Següent paraula →
          </button>
          <button
            v-else
            type="button"
            class="ea-next-btn"
            @click="resetQuiz"
          >
            🔄 Tornar a jugar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])
const mode = ref('hispania')

const conquestPhases = [
  {
    id: 'f1',
    dates: 'Fase 1 · 218 aC – s. II aC',
    title: 'Litoral Mediterrani i Vall de l\'Ebre',
    desc: 'L\'any 218 aC els romans desembarquen a Empòrion (Empúries) durant les Guerres Púniques. Derroten l\'exèrcit cartaginès d\'Anníbal i ocupen tot el litoral mediterrani i Catalunya.',
  },
  {
    id: 'f2',
    dates: 'Fase 2 · Segles II – I aC',
    title: 'La Messeta i l\'Interior',
    desc: 'Va ser una conquesta molt llarga perquè els pobles celtes, celtibers i lusitans de l\'interior i l\'oest van oferir una forta resistència.',
  },
  {
    id: 'f3',
    dates: 'Fase 3 · Fins a l\'any 19 aC',
    title: 'La Franja Cantàbrica (Fi de la conquesta)',
    desc: 'L\'emperador Octavi August dirigeix les campanyes del nord i l\'any 19 aC acaba totalment la conquesta d\'Hispània.',
  },
]

const selectedPhase = ref(conquestPhases[0])

const catalanCities = [
  {
    roman: 'Tàrraco',
    modern: 'Tarragona',
    info: 'Capital de la província Tarraconense; conserva muralles, amfiteatre vora el mar, circ, fòrum i l\'aqüeducte de les Ferreres.',
  },
  {
    roman: 'Barcino',
    modern: 'Barcelona',
    info: 'Colònia romana emmurallada fundada al voltant del mont Tàber; conserva restes de la muralla i columnes del temple d\'August.',
  },
  {
    roman: 'Gerunda',
    modern: 'Girona',
    info: 'Ciutat estratègica situada al pas de la Via Augusta prop dels Pirineus, protegida per fortes muralles de pedra.',
  },
  {
    roman: 'Ilerda',
    modern: 'Lleida',
    info: 'Important ciutat romana a l\'interior de Catalunya, situada vora el riu Segre sobre l\'antic poblat ilerget.',
  },
  {
    roman: 'Emporiae',
    modern: 'Empúries (L\'Escala)',
    info: 'Porta d\'entrada dels grecs (Empòrion) i lloc on van desembarcar els romans l\'any 218 aC.',
  },
  {
    roman: 'Baetulo',
    modern: 'Badalona',
    info: 'Ciutat romana costanera famosa per les seves termes, domus amb mosaics i el comerç de vi.',
  },
]

const flippedCities = reactive({})

const provinces = [
  { name: '1. Tarraconense', capital: 'Nord-est i vall de l\'Ebre (Capital: Tàrraco)' },
  { name: '2. Bètica', capital: 'Sud peninsular / Andalusia (Híspalis i Còrduba)' },
  { name: '3. Lusitània', capital: 'Oest peninsular / Portugal i Extremadura (Emèrita Augusta)' },
  { name: '4. Gal·lècia', capital: 'Nord-oest peninsular (Bràcara i Lucus Augusta)' },
  { name: '5. Cartaginense', capital: 'Centre i sud-est mediterrani (Cartago Nova)' },
]

// LES 24 PARAULES EXACTES DE Glossari-romans.pdf
const glossaryItems = [
  { term: 'Guerres Púniques', category: 'Història i Conquesta', icon: '⚔️', definition: 'Guerres que van enfrontar Roma i Cartago (dirigida per Anníbal) pel domini del mar Mediterrani i de la Península Ibèrica.' },
  { term: 'Romanització', category: 'Història i Conquesta', icon: '🏛️', definition: 'Procés d\'adaptació dels pobles conquerits (ibers i celtes) a la llengua (el llatí), les lleis, la religió i els costums dels romans.' },
  { term: 'Llatí', category: 'Cultura i Religió', icon: '🗣️', definition: 'Llengua dels romans que es va estendre per tot l\'Imperi i de la qual provenen el català, el castellà, el francès o l\'italià.' },
  { term: 'Mosaic', category: 'Cultura i Religió', icon: '🎨', definition: 'Obra artística feta amb petites peces de pedra, ceràmica o vidre de colors (tessel·les) per decorar els terres de les cases romanes.' },
  { term: 'Domus', category: 'Habitatge i Ciutat', icon: '🏡', definition: 'Casa unifamiliar àmplia i luxosa on vivien les famílies riques a les ciutats romanes, amb un pati interior (atri) i jardins.' },
  { term: 'Insulae', category: 'Habitatge i Ciutat', icon: '🏢', definition: 'Edificis de diversos pisos de lloguer, sovint petits i de fusta o maó, on habitava la gent més humil de les ciutats romanes.' },
  { term: 'Fòrum', category: 'Habitatge i Ciutat', icon: '🏛️', definition: 'Gran plaça pública situada al centre de la ciutat romana, a l\'encreuament dels carrers principals, envoltada de temples, botigues i edificis de govern.' },
  { term: 'Termes', category: 'Edificis i Obres', icon: '♨️', definition: 'Recinte públic de banys (amb aigua freda, tèbia i calenta) i gimnàs on els romans anaven a rentar-se, fer esport i relacionar-se.' },
  { term: 'Amfiteatre', category: 'Edificis i Obres', icon: '🛡️', definition: 'Edifici de planta ovalada o circular envoltat de graderies on se celebraven espectacles de lluites de gladiadors i combats amb feres.' },
  { term: 'Teatre', category: 'Edificis i Obres', icon: '🎭', definition: 'Edifici de planta semicircular amb escenari monumental on els actors representaven comèdies i tragèdies per al públic.' },
  { term: 'Circ', category: 'Edificis i Obres', icon: '🐎', definition: 'Edifici de planta molt allargada i estreta amb una mitjana al mig (spina) on es feien les emocionants curses de carros (quadrigues).' },
  { term: 'Arc de triomf', category: 'Edificis i Obres', icon: '🎖️', definition: 'Monument commemoratiu en forma d\'arc de pedra construït per celebrar i recordar grans victòries militars (com l\'Arc de Berà).' },
  { term: 'Aqüeducte', category: 'Edificis i Obres', icon: '🌉', definition: 'Obra d\'enginyeria formada per canals sobre arcs de pedra que servia per portar l\'aigua des dels rius i fonts fins a les ciutats.' },
  { term: 'Gladiador', category: 'Cultura i Religió', icon: '🗡️', definition: 'Lliutador (gairebé sempre un esclau o presoner) que combatia contra altres gladiadors o feres a l\'arena de l\'amfiteatre.' },
  { term: 'Gerunda', category: 'Ciutats i Territori', icon: '📍', definition: 'Nom que els romans van donar a l\'actual ciutat de Girona.' },
  { term: 'Ilerda', category: 'Ciutats i Territori', icon: '📍', definition: 'Nom que els romans van donar a l\'actual ciutat de Lleida.' },
  { term: 'Barcino', category: 'Ciutats i Territori', icon: '📍', definition: 'Nom que els romans van donar a l\'actual ciutat de Barcelona.' },
  { term: 'Tàrraco', category: 'Ciutats i Territori', icon: '📍', definition: 'Nom romà de l\'actual ciutat de Tarragona, que va ser la gran capital de la província Tarraconense.' },
  { term: 'Vil·la', category: 'Habitatge i Ciutat', icon: '🌾', definition: 'Gran casa de camp romana envoltada de terres de conreu (blat, vinya i olivera) on vivien els propietaris rics i treballaven pagesos i esclaus.' },
  { term: 'Colònies', category: 'Ciutats i Territori', icon: '⛵', definition: 'Ciutats o establiments fundats en un nou territori per fenicis, grecs, cartaginesos o romans per comerciar o instal·lar-hi ciutadans.' },
  { term: 'Hispània', category: 'Ciutats i Territori', icon: '🗺️', definition: 'Nom amb què els romans van batejar tota la Península Ibèrica quan la van incorporar com a territori de l\'Imperi Romà.' },
  { term: 'Politeistes', category: 'Cultura i Religió', icon: '⚡', definition: 'Persones o pobles que creuen en l\'existència de molts déus (com els romans amb Júpiter, Juno i Minerva abans del cristianisme).' },
  { term: 'Cúria', category: 'Habitatge i Ciutat', icon: '⚖️', definition: 'Edifici públic situat al fòrum de la ciutat romana on es reunia el senat municipal o govern local per prendre decisions i fer lleis.' },
  { term: 'Temple', category: 'Edificis i Obres', icon: '🏛️', definition: 'Edifici sagrat dedicat als déus romans on es guardava l\'estàtua del déu protector i s\'hi feien ofrenes.' },
]

const glossaryCategories = [
  'Totes (24)',
  'Història i Conquesta',
  'Ciutats i Territori',
  'Habitatge i Ciutat',
  'Edificis i Obres',
  'Cultura i Religió',
]

const searchQuery = ref('')
const selectedCategory = ref('Totes (24)')

const filteredGlossary = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return glossaryItems.filter((item) => {
    const matchCat = selectedCategory.value === 'Totes (24)' || item.category === selectedCategory.value
    const matchText =
      !q ||
      item.term.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q)
    return matchCat && matchText
  })
})

const glossaryQuiz = [
  {
    prompt: 'Com s\'anomenaven els edificis de diversos pisos on vivien les famílies més humils de les ciutats romanes?',
    options: ['Domus', 'Insulae', 'Vil·les', 'Cúria'],
    answer: 1,
    explanation: 'Les insulae eren els edificis de pisos de la gent humil, mentre que les domus eren les cases unifamiliars dels rics.',
  },
  {
    prompt: 'Quin era l\'edifici públic situat al fòrum on es reunia el govern municipal de la ciutat romana?',
    options: ['L\'amfiteatre', 'Les termes', 'La cúria', 'L\'aqüeducte'],
    answer: 2,
    explanation: 'La cúria era l\'edifici del fòrum on es reunien els magistrats i el senat municipal per governar la ciutat.',
  },
  {
    prompt: 'Com es deien les guerres en què els romans van derrotar els cartaginesos d\'Anníbal per controlar el Mediterrani?',
    options: ['Guerres Mèdiques', 'Guerres Púniques', 'Guerra del Francès', 'Guerres Gal·les'],
    answer: 1,
    explanation: 'Les Guerres Púniques van enfrontar Roma i Cartago; el 218 aC els romans van desembarcar a Empúries.',
  },
  {
    prompt: 'Quins eren els noms romans de les quatre capitals catalanes: Tarragona, Barcelona, Girona i Lleida?',
    options: [
      'Tàrraco, Barcino, Gerunda i Ilerda',
      'Híspalis, Emèrita, Gades i Malaca',
      'Tàrraco, Baetulo, Rhode i Saguntum',
      'Barcino, Lucus, Corduba i Toletum',
    ],
    answer: 0,
    explanation: 'Tàrraco (Tarragona), Barcino (Barcelona), Gerunda (Girona) i Ilerda (Lleida).',
  },
  {
    prompt: 'Com s\'anomena la decoració del terra feta amb petites peces de pedra o vidre de colors (tessel·les)?',
    options: ['Formigó', 'Mosaic', 'Garum', 'Arada'],
    answer: 1,
    explanation: 'Els mosaics decoraven els terres de les domus i vil·les romanes amb dibuixos fets de petites pedres.',
  },
  {
    prompt: 'Quina és l\'única llengua preromana de la Península que NO va ser substituïda pel llatí?',
    options: ['L\'ibèric', 'El fenici', 'El basc (èuscar)', 'El grec'],
    answer: 2,
    explanation: 'El llatí va substituir totes les llengües de la Península excepte el basc.',
  },
]

const quizIdx = ref(0)
const quizPicked = ref(null)
const quizAnswered = ref(false)
const quizScore = ref(0)

const currentQuiz = computed(() => glossaryQuiz[quizIdx.value])

function pickQuiz(idx) {
  if (quizAnswered.value) return
  quizPicked.value = idx
  quizAnswered.value = true
  if (idx === currentQuiz.value.answer) {
    quizScore.value += 1
    const max = props.exercise?.maxScore || 18
    if (quizScore.value >= 4) {
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: 'Repte del Glossari Romà superat!',
        },
      })
    }
  }
}

function nextQuiz() {
  if (quizIdx.value < glossaryQuiz.length - 1) {
    quizIdx.value += 1
    quizPicked.value = null
    quizAnswered.value = false
  }
}

function resetQuiz() {
  quizIdx.value = 0
  quizPicked.value = null
  quizAnswered.value = false
  quizScore.value = 0
}
</script>
