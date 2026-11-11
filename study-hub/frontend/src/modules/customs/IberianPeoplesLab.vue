<template>
  <div class="ea-lab">
    <div class="ea-mode-bar">
      <button
        type="button"
        class="ea-mode-btn"
        :class="{ active: mode === 'peoples' }"
        @click="mode = 'peoples'"
      >
        🛡️ Atles Preromà i Colons
      </button>
      <button
        type="button"
        class="ea-mode-btn"
        :class="{ active: mode === 'enigmes' }"
        @click="mode = 'enigmes'"
      >
        🕵️ Els 6 Enigmes Oficials ({{ enigmaScore }}/6)
      </button>
      <button
        type="button"
        class="ea-mode-btn"
        :class="{ active: mode === 'script' }"
        @click="mode = 'script'"
      >
        📜 Com escrivien els Ibers
      </button>
    </div>

    <!-- MODE 1: ATLES DE POBLES PREROMANS I COLONITZADORS -->
    <div v-if="mode === 'peoples'" class="ea-explore-wrap">
      <p class="ea-intro">
        Explora les fitxes dels <strong>pobles preromans (Ibers i Celtes)</strong> i dels <strong>pobles colonitzadors del Mediterrani (Fenicis, Grecs i Cartaginesos)</strong>:
      </p>

      <div class="ea-civ-tabs">
        <button
          v-for="p in peoples"
          :key="p.id"
          type="button"
          class="ea-civ-tab"
          :class="{ active: selectedPeople.id === p.id }"
          :style="selectedPeople.id === p.id ? { borderColor: p.color, background: p.bg } : {}"
          @click="selectedPeople = p"
        >
          <span class="ea-civ-emoji">{{ p.icon }}</span>
          <div>
            <strong>{{ p.name }}</strong>
            <small>{{ p.group }}</small>
          </div>
        </button>
      </div>

      <div class="ea-civ-detail" :style="{ borderLeftColor: selectedPeople.color }">
        <div class="ea-civ-detail-head">
          <span class="ea-civ-big-icon">{{ selectedPeople.icon }}</span>
          <div>
            <span class="ea-badge" :style="{ background: selectedPeople.color }">{{ selectedPeople.era }}</span>
            <h4>{{ selectedPeople.name }}</h4>
            <p class="ea-civ-quote">{{ selectedPeople.summary }}</p>
          </div>
        </div>

        <div class="ea-civ-grid">
          <div class="ea-civ-box">
            <strong>📍 Origen i llocs / ciutats</strong>
            <p>{{ selectedPeople.location }}</p>
          </div>
          <div class="ea-civ-box">
            <strong>⚒️ A què es dedicaven?</strong>
            <p>{{ selectedPeople.economy }}</p>
          </div>
          <div class="ea-civ-box">
            <strong>✨ Poblats, cultura i aportacions</strong>
            <p>{{ selectedPeople.contributions }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODE 2: ELS 6 ENIGMES OFICIALS DEL DOSSIER -->
    <div v-else-if="mode === 'enigmes'" class="ea-challenge-wrap">
      <div class="ea-progress-row">
        <span>Enigma {{ enigmaIdx + 1 }} de {{ enigmes.length }} (Fitxa oficial d'Enigmes)</span>
        <span class="ea-score-pill">🕵️ Enigmes resolts: {{ enigmaScore }} / {{ enigmes.length }}</span>
      </div>

      <div class="ea-enigma-nav">
        <button
          v-for="(en, idx) in enigmes"
          :key="en.id"
          type="button"
          class="ea-enigma-dot"
          :class="{ active: enigmaIdx === idx, solved: solvedEnigmes[en.id] }"
          @click="selectEnigma(idx)"
        >
          Enigma {{ idx + 1 }} {{ solvedEnigmes[en.id] ? '✓' : '' }}
        </button>
      </div>

      <div class="ea-question-card">
        <span class="ea-q-badge">{{ currentEnigma.title }}</span>
        <blockquote class="ea-enigma-clue">
          «{{ currentEnigma.clue }}»
        </blockquote>
        <p class="ea-q-sub">{{ currentEnigma.question }}</p>

        <div class="ea-options-grid">
          <button
            v-for="(opt, idx) in currentEnigma.options"
            :key="idx"
            type="button"
            class="ea-opt-btn"
            :class="{
              correct: enigmaAnswered && idx === currentEnigma.answer,
              wrong: enigmaAnswered && enigmaPicked === idx && idx !== currentEnigma.answer,
            }"
            :disabled="enigmaAnswered"
            @click="pickEnigma(idx)"
          >
            {{ opt }}
          </button>
        </div>

        <div v-if="enigmaAnswered" class="ea-feedback" :class="enigmaPicked === currentEnigma.answer ? 'ok' : 'ko'">
          <p>
            <strong>{{ enigmaPicked === currentEnigma.answer ? '✅ Enigma resolt!' : '❌ Torna a llegir les pistes de l\'enigma:' }}</strong>
            <strong>Raonament:</strong> {{ currentEnigma.reasoning }}
          </p>
          <button
            v-if="enigmaIdx < enigmes.length - 1"
            type="button"
            class="ea-next-btn"
            @click="selectEnigma(enigmaIdx + 1)"
          >
            Següent enigma →
          </button>
        </div>
      </div>
    </div>

    <!-- MODE 3: COM ESCRIVIEN ELS IBERS (SIGNARI IBÈRIC + PLAQUES DE BRONZE) -->
    <div v-else class="ea-script-wrap">
      <p class="ea-intro">
        A partir del segle V aC, gràcies al contacte amb fenicis i grecs, els <strong>ibers</strong> van crear la seva pròpia escriptura amb signes per a les <strong>5 vocals</strong>, les <strong>consonants (S, R, L, M, N)</strong> i les <strong>síl·labes (BA, BE..., KA/GA..., DA/TA...)</strong>.
      </p>

      <div class="ea-syllabary-grid">
        <div
          v-for="sym in iberianSignary"
          :key="sym.latin"
          class="ea-sym-card"
          @click="appendSymbol(sym)"
        >
          <span class="ea-sym-glyph">{{ sym.glyph }}</span>
          <span class="ea-sym-latin">{{ sym.latin }}</span>
        </div>
      </div>

      <!-- Escriptor interactiu en ibèric -->
      <div class="ea-translator-box">
        <h5>✍️ Escriu el teu nom o un missatge en escriptura ibèrica</h5>
        <div class="ea-translator-row">
          <input
            v-model="userText"
            type="text"
            class="ea-input"
            placeholder="Escriu una paraula (ex: ALVARO, IBER, TARRACO...)"
            maxlength="24"
          />
          <button type="button" class="ea-clear-btn" @click="userText = ''">Netejar</button>
        </div>
        <div class="ea-bronze-plaque">
          <div class="ea-plaque-glyphs">{{ translatedGlyphs || '𐊀 𐊍 𐊂 𐊀 𐊕 𐊏' }}</div>
          <div class="ea-plaque-sub">
            Inscripció sobre placa de bronze: <strong>{{ (userText || 'ALVARO').toUpperCase() }}</strong>
          </div>
        </div>
      </div>

      <!-- Desxifrador de plaques ibèriques -->
      <div class="ea-decode-section">
        <h5>🔍 Repte: Desxifra les plaques ibèriques utilitzant la taula</h5>
        <div class="ea-plaques-grid">
          <div v-for="pl in bronzePlaques" :key="pl.id" class="ea-plaque-card">
            <div class="ea-bronze-mini">
              <span class="ea-mini-glyphs">{{ pl.glyphs }}</span>
              <small class="ea-mini-hint">Síl·labes/lletres: {{ pl.breakdown }}</small>
            </div>
            <div class="ea-plaque-input-row">
              <input
                v-model="pl.userGuess"
                type="text"
                class="ea-input"
                placeholder="Quina paraula amaga?"
                @keyup.enter="checkPlaque(pl)"
              />
              <button type="button" class="ea-next-btn" @click="checkPlaque(pl)">Comprovar</button>
            </div>
            <p v-if="pl.status" class="ea-plaque-msg" :class="pl.status">
              {{ pl.status === 'ok' ? `✅ Correcte! La placa diu ${pl.word} (${pl.meaning}).` : '❌ Fixa\'t en cada signe del signari de dalt i uneix-ne les lletres.' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])
const mode = ref('peoples')

const peoples = [
  {
    id: 'ibers',
    name: 'Els Ibers',
    group: 'Poble preromà (Est i Sud)',
    era: 'Abans del 1r mil·lenni aC',
    icon: '🏺',
    color: '#d97706',
    bg: 'rgba(217, 119, 6, 0.1)',
    summary: 'Habitaven tota la costa mediterrània (des d\'Andalusia fins a Catalunya) en poblats emmurallats amb cases rectangulars.',
    location: 'Franja mediterrània i sud peninsular. Poblats en turons elevats amb muralles i graners comunals.',
    economy: 'Agricultura (blat, ordi, mill, lli, espart, vinya i olivera), ramaderia, salaó de peix i comerç amb fenicis i grecs.',
    contributions: 'Van adoptar l\'arada, el torn terrissaire (ceràmica decorada), el treball del ferro, la moneda i l\'escriptura ibèrica (s. V aC).',
  },
  {
    id: 'celtes',
    name: 'Els Celtes',
    group: 'Poble preromà (Nord, Oest i Centre)',
    era: 'A partir del segle IX aC',
    icon: '🛡️',
    color: '#059669',
    bg: 'rgba(5, 150, 105, 0.1)',
    summary: 'Procedents del centre d\'Europa, vivien al nord, l\'oest i la Messeta en poblats fortificats anomenats castres.',
    location: 'Centre, nord i oest de la Península (Galícia, Astúries, Messeta, Portugal).',
    economy: 'La seva activitat principal era la ramaderia, combinada amb el conreu del blat i teixits de llana. Molt poc comerç.',
    contributions: 'Cases de planta circular (pedra, tova i palla), mestres del bronze i del ferro (armes), orfebreria (braçalets i collarets), carros i molí circular. Sense escriptura ni moneda.',
  },
  {
    id: 'fenicis',
    name: 'Els Fenicis',
    group: '1r Poble colonitzador',
    era: 'Segles IX–VIII aC (~800–750 aC)',
    icon: '⛵',
    color: '#7c3aed',
    bg: 'rgba(124, 58, 237, 0.1)',
    summary: 'Grans comerciants marítims procedents de Fenícia (actual Líban, al Pròxim Orient) que buscaven metalls.',
    location: 'Van navegar cap a l\'oest i van fundar colònies al sud peninsular com Gades (Cadis) i Malaca (Màlaga).',
    economy: 'Comerç marítim de metalls (coure, plata, estany i or), artesania i salaó de peix.',
    contributions: 'Van introduir l\'alfabet fenici, el torn terrissaire, l\'olivera i l\'espart. Destaquen els sarcòfags antropoides de Cadis.',
  },
  {
    id: 'grecs',
    name: 'Els Grecs',
    group: '2n Poble colonitzador',
    era: 'Segle VI aC (~600 aC)',
    icon: '🏛️',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.1)',
    summary: 'Procedents de Grècia (a través de la seva colònia de Massàlia / Marsella), van establir colònies al litoral català.',
    location: 'Costa mediterrània nord-est: van fundar Empòrion (Empúries) i Rhode (Roses).',
    economy: 'Comerç marítim amb els ibers, ceràmica fina i conreu de la vinya i l\'olivera.',
    contributions: 'Van aportar l\'ús de la moneda per comerciar, l\'alfabet grec, l\'art clàssic i la ceràmica decorada.',
  },
  {
    id: 'cartaginesos',
    name: 'Els Cartaginesos',
    group: '3r Poble colonitzador',
    era: 'Segles V–III aC (~400 aC)',
    icon: '🐘',
    color: '#dc2626',
    bg: 'rgba(220, 38, 38, 0.1)',
    summary: 'Procedents de Cartago (al nord d\'Àfrica, actual Tunísia), tenien una gran força naval, comercial i militar.',
    location: 'Sud i est peninsular i les Balears: van fundar Qart Hadasht / Cartago Nova (Cartagena) i Ebusus (Eivissa).',
    economy: 'Explotació de mines de plata i metalls a gran escala, comerç marítim i expansió militar.',
    contributions: 'Fortificació de ciutats i metal·lúrgia; es van enfrontar a Roma en les Guerres Púniques amb el general Anníbal.',
  },
]

const selectedPeople = ref(peoples[0])

// ELS 6 ENIGMES OFICIALS DE Enigmes_primeres_civilitzacions.pdf
const enigmes = [
  {
    id: 'e1',
    title: '1. L\'enigma del metall buscat',
    clue: 'Vaig arribar a la Península perquè volia un tresor que no es menja ni es beu, però que fa brillar els ulls dels comerciants. Em movia per la costa i fundava colònies al sud com Gades per continuar el negoci.',
    question: 'Quin poble colonitzador sóc?',
    options: ['Els Celtes', 'Els Fenicis', 'Els Ibers', 'Els Visigots'],
    answer: 1,
    reasoning: 'Els fenicis van ser els primers colonitzadors a arribar per mar buscant metalls (or, plata, coure i estany) i van fundar colònies comercials a la costa sud com Gades (Cadis).',
  },
  {
    id: 'e2',
    title: '2. El poble que va aprendre dels altres',
    clue: 'No sabia escriure, no tenia moneda, però després de molts contactes amb colons del Mediterrani, vaig canviar radicalment: vaig començar a usar lletres, diners i noves eines com el torn terrissaire.',
    question: 'Quin poble de la Península es va transformar així?',
    options: ['Els Ibers', 'Els Celtes', 'Els Egipcis', 'Els Cartaginesos'],
    answer: 0,
    reasoning: 'Els ibers de la costa mediterrània, gràcies al comerç amb fenicis i grecs, van adoptar l\'escriptura ibèrica, la moneda, l\'arada i el torn terrissaire.',
  },
  {
    id: 'e3',
    title: '3. El poble dels castres',
    clue: 'Vivíem en poblats a dalt de turons, envoltats de muralles, però no vora la mar. Érem bons en metal·lúrgia i en la guerra, i el nostre nom comença amb la mateixa lletra que "camp".',
    question: 'Qui som?',
    options: ['Els Grecs', 'Els Fenicis', 'Els Celtes', 'Els Ibers'],
    answer: 2,
    reasoning: 'Els celtes vivien a l\'interior, nord i oest (lluny del Mediterrani), en poblats fortificats amb cases circulars anomenats castres, i eren grans guerrers i ferrers.',
  },
  {
    id: 'e4',
    title: '4. El viatge que acaba a E...',
    clue: 'Vaig creuar el Mediterrani i vaig fundar a la costa catalana una ciutat molt famosa que comença per E i que encara avui coneixem. Vaig portar nous costums, la moneda i objectes com ceràmica fina.',
    question: 'Quin poble vaig ser i quina ciutat vaig fundar?',
    options: [
      'Els Celtes (van fundar Toledo)',
      'Els Grecs (van fundar Empòrion / Empúries)',
      'Els Fenicis (van fundar Lugo)',
      'Els Cartaginesos (van fundar Lleida)',
    ],
    answer: 1,
    reasoning: 'Els grecs van creuar el Mediterrani des de Massàlia i van fundar Empòrion (Empúries) i Rhode (Roses), portant la moneda i la ceràmica fina.',
  },
  {
    id: 'e5',
    title: '5. El poble que volia dominar el Mediterrani occidental',
    clue: 'Era militarment molt fort i competia amb altres pobles pel control de rutes comercials. Vaig fundar Eivissa (Ebusus) i Qart Hadasht (Cartagena) i venia del nord d\'Àfrica.',
    question: 'Quin poble sóc?',
    options: ['Els Cartaginesos', 'Els Celtes', 'Els Ibers', 'Els Índics'],
    answer: 0,
    reasoning: 'Els cartaginesos provenien de Cartago (nord d\'Àfrica), van fundar Eivissa i Cartagena i tenien un gran exèrcit que va rivalitzar amb Roma.',
  },
  {
    id: 'e6',
    title: '6. El poble que vivia entre muralletes i graners',
    clue: 'Construïa cases rectangulars i tenia graners comunals dalt de turons prop del Mediterrani. Feia ceràmiques decorades i es defensava amb muralles, però mai navegava lluny.',
    question: 'Quin poble podria ser?',
    options: ['Els Fenicis', 'Els Celtes', 'Els Ibers', 'Els Xinesos'],
    answer: 2,
    reasoning: 'Els poblats ibers tenien cases de planta rectangular, muralles defensives, graners comunals per guardar el cereal i elaboraven ceràmica decorada.',
  },
]

const enigmaIdx = ref(0)
const enigmaPicked = ref(null)
const enigmaAnswered = ref(false)
const solvedEnigmes = reactive({})

const currentEnigma = computed(() => enigmes[enigmaIdx.value])
const enigmaScore = computed(() => Object.keys(solvedEnigmes).length)

function selectEnigma(idx) {
  enigmaIdx.value = idx
  enigmaPicked.value = null
  enigmaAnswered.value = false
}

function pickEnigma(idx) {
  if (enigmaAnswered.value) return
  enigmaPicked.value = idx
  enigmaAnswered.value = true
  if (idx === currentEnigma.value.answer) {
    if (!solvedEnigmes[currentEnigma.value.id]) {
      solvedEnigmes[currentEnigma.value.id] = true
      const max = props.exercise?.maxScore || 18
      if (Object.keys(solvedEnigmes).length >= 4) {
        emit('complete', {
          _grade: {
            score: max,
            maxScore: max,
            feedback: 'Enigmes de les primeres civilitzacions superats!',
          },
        })
      }
    }
  }
}

// SIGNARI IBÈRIC (basat en la pàg. 7 d'Enigmes_primeres_civilitzacions.pdf)
const iberianSignary = [
  { latin: 'A', glyph: '𐊀' },
  { latin: 'E', glyph: '𐊁' },
  { latin: 'I', glyph: '𐊆' },
  { latin: 'O', glyph: '𐊏' },
  { latin: 'U', glyph: '↑' },
  { latin: 'BA', glyph: '∣' },
  { latin: 'BE', glyph: '𐊂' },
  { latin: 'BI', glyph: '𐊃' },
  { latin: 'BO', glyph: '✳' },
  { latin: 'BU', glyph: '⊞' },
  { latin: 'KA/GA', glyph: '∧' },
  { latin: 'KE/GE', glyph: '𐊄' },
  { latin: 'KI/GI', glyph: '𐊅' },
  { latin: 'KO/GO', glyph: '⋈' },
  { latin: 'KU/GU', glyph: '⊙' },
  { latin: 'DA/TA', glyph: '✕' },
  { latin: 'DE/TE', glyph: '⊕' },
  { latin: 'DI/TI', glyph: 'Ψ' },
  { latin: 'DO/TO', glyph: 'Ш' },
  { latin: 'DU/TU', glyph: '△' },
  { latin: 'S', glyph: 'ξ' },
  { latin: 'R', glyph: '◁' },
  { latin: 'L', glyph: '⌈' },
  { latin: 'M', glyph: 'Υ' },
  { latin: 'N', glyph: '𐊑' },
]

const userText = ref('IBER')

function appendSymbol(sym) {
  const clean = sym.latin.split('/')[0]
  userText.value = (userText.value + clean).slice(0, 24)
}

const translatedGlyphs = computed(() => {
  const txt = (userText.value || '').toUpperCase().trim()
  if (!txt) return ''
  let out = []
  let i = 0
  const map = {
    BA: '∣', BE: '𐊂', BI: '𐊃', BO: '✳', BU: '⊞',
    PA: '∣', PE: '𐊂', PI: '𐊃', PO: '✳', PU: '⊞',
    KA: '∧', KE: '𐊄', KI: '𐊅', KO: '⋈', KU: '⊙',
    CA: '∧', CE: '𐊄', CI: '𐊅', CO: '⋈', CU: '⊙',
    GA: '∧', GE: '𐊄', GI: '𐊅', GO: '⋈', GU: '⊙',
    DA: '✕', DE: '⊕', DI: 'Ψ', DO: 'Ш', DU: '△',
    TA: '✕', TE: '⊕', TI: 'Ψ', TO: 'Ш', TU: '△',
    A: '𐊀', E: '𐊁', I: '𐊆', O: '𐊏', U: '↑',
    S: 'ξ', R: '◁', L: '⌈', M: 'Υ', N: '𐊑',
    B: '∣', C: '∧', D: '✕', F: '∣', G: '∧', J: '𐊆', K: '∧',
    P: '∣', Q: '∧', T: '✕', V: '∣', X: 'ξ', Y: '𐊆', Z: 'ξ',
  }
  while (i < txt.length) {
    if (txt[i] === ' ') {
      out.push(' · ')
      i += 1
      continue
    }
    const two = txt.slice(i, i + 2)
    if (map[two]) {
      out.push(map[two])
      i += 2
    } else {
      out.push(map[txt[i]] || txt[i])
      i += 1
    }
  }
  return out.join(' ')
})

const bronzePlaques = reactive([
  {
    id: 'p1',
    glyphs: '𐊆  𐊂  ◁',
    breakdown: 'I (𐊆) + BE (𐊂) + R (◁)',
    word: 'IBER',
    meaning: 'Poble preromà de la costa mediterrània',
    userGuess: '',
    status: '',
  },
  {
    id: 'p2',
    glyphs: '✕  ◁  ∧  ⋈',
    breakdown: 'TA (✕) + R (◁) + KA/CA (∧) + KO/CO (⋈)',
    word: 'TARKAKO',
    meaning: 'Inscripció ibèrica de Tàrraco',
    userGuess: '',
    status: '',
  },
  {
    id: 'p3',
    glyphs: '∣  ◁  𐊅  𐊑  𐊏',
    breakdown: 'BA (∣) + R (◁) + KI (𐊅) + N (𐊑) + O (𐊏)',
    word: 'BARKINO',
    meaning: 'Origen ibèric de Barcino (Barcelona)',
    userGuess: '',
    status: '',
  },
])

function checkPlaque(pl) {
  const clean = (pl.userGuess || '').toUpperCase().replace(/[^A-Z]/g, '')
  if (clean === pl.word || (pl.id === 'p3' && clean === 'BARCINO') || (pl.id === 'p2' && clean === 'TARRACO')) {
    if (pl.status !== 'ok') {
      const max = props.exercise?.maxScore || 18
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: 'Inscripció ibèrica desxifrada!',
        },
      })
    }
    pl.status = 'ok'
  } else {
    pl.status = 'ko'
  }
}
</script>
