<template>
  <div class="pol-fitxa">
    <p class="match-hint" style="margin-top: 0;">
      Fitxa «Treballem la Polisèmia»: pràctica en context + 3 exercicis oficials de classe.
    </p>

    <!-- Pràctica en context (4 frases) -->
    <section class="pol-block">
      <h3 class="pol-block-title">✍️ Pràctica: significat en context</h3>
      <div v-for="row in contextRows" :key="row.id" class="pol-card">
        <p class="ex-prompt" style="margin: 0;" v-html="row.html" />
        <div class="pol-row">
          <select v-model="contextAnswers[row.id]" class="input-hub">
            <option value="">— Tria el significat —</option>
            <option v-for="opt in row.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
          <button type="button" class="ex-btn" @click="checkContext(row.id)">Comprova</button>
        </div>
        <p v-if="contextFb[row.id]" class="feedback-msg" :class="contextOk[row.id] ? 'feedback-ok' : 'feedback-bad'">
          {{ contextFb[row.id] }}
        </p>
      </div>
    </section>

    <!-- Exercici 1 -->
    <section class="pol-block">
      <h3 class="pol-block-title">1️⃣ Completa amb <em>cul, peu, cua</em></h3>
      <div v-for="row in ex1Rows" :key="row.id" class="pol-card compact">
        <p class="ex-prompt" style="margin: 0;">
          {{ row.label }}
          <select v-model="ex1[row.id]" class="pol-inline-select">
            <option value="">— tria —</option>
            <option value="cul">cul</option>
            <option value="peu">peu</option>
            <option value="cua">cua</option>
          </select>
          {{ row.suffix }}
        </p>
      </div>
      <button type="button" class="ex-btn ex-btn-primary" @click="checkEx1">Comprovar exercici 1</button>
      <p v-if="ex1Fb" class="feedback-msg" :class="ex1Ok ? 'feedback-ok' : 'feedback-bad'">{{ ex1Fb }}</p>
    </section>

    <!-- Exercici 2 -->
    <section class="pol-block">
      <h3 class="pol-block-title">2️⃣ Dues accepcions de cada paraula</h3>
      <div class="pol-grid">
        <div v-for="word in ex2Words" :key="word.key" class="pol-card">
          <strong style="color: var(--primary);">{{ word.emoji }} {{ word.title }}</strong>
          <label class="pol-select-label">
            1ª accepció
            <select v-model="ex2[`${word.key}-1`]" class="input-hub">
              <option value="">— Tria —</option>
              <option v-for="opt in word.opts1" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
          <label class="pol-select-label">
            2ª accepció
            <select v-model="ex2[`${word.key}-2`]" class="input-hub">
              <option value="">— Tria —</option>
              <option v-for="opt in word.opts2" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
        </div>
      </div>
      <button type="button" class="ex-btn ex-btn-primary" @click="checkEx2">Comprovar exercici 2</button>
      <p v-if="ex2Fb" class="feedback-msg" :class="ex2Ok ? 'feedback-ok' : 'feedback-bad'">{{ ex2Fb }}</p>
    </section>

    <!-- Exercici 3 -->
    <section class="pol-block">
      <h3 class="pol-block-title">3️⃣ Context de la paraula destacada (12 frases)</h3>
      <div class="pol-grid">
        <div v-for="row in ex3Rows" :key="row.id" class="pol-card compact">
          <p class="ex-prompt" style="margin: 0;" v-html="row.html" />
          <select v-model="ex3[row.id]" class="input-hub" style="margin-top: 0.4rem;">
            <option value="">— Tria context —</option>
            <option v-for="opt in row.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>
      <button type="button" class="ex-btn ex-btn-primary" @click="checkEx3">Comprovar exercici 3</button>
      <p v-if="ex3Fb" class="feedback-msg" :class="ex3Ok ? 'feedback-ok' : 'feedback-bad'">{{ ex3Fb }}</p>
    </section>

    <p v-if="allDone" class="feedback-msg feedback-ok">🎉 Has completat tots els blocs de la fitxa de polisèmia!</p>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const contextRows = [
  {
    id: 'pol1',
    correct: 'moble',
    html: '1. «Vam asseure\'ns en un <strong>banc</strong> a menjar l\'entrepà…»',
    options: [
      { value: 'financer', label: 'Entitat de diners i estalvis' },
      { value: 'peixos', label: 'Conjunt nombrós de peixos' },
      { value: 'moble', label: 'Moble llarg dissenyat per asseure\'s' },
    ],
  },
  {
    id: 'pol2',
    correct: 'eina',
    html: '2. «El mecànic va agafar una <strong>clau</strong> per ajustar la roda…»',
    options: [
      { value: 'pany', label: 'Objecte per obrir la porta de casa' },
      { value: 'eina', label: 'Eina de ferro per descargolar femelles' },
      { value: 'musica', label: 'Signe musical d\'un pentagrama' },
    ],
  },
  {
    id: 'pol3',
    correct: 'restaurant',
    html: '3. «El cambrer ens va portar la <strong>carta</strong> per triar les postres.»',
    options: [
      { value: 'restaurant', label: 'Llista de menjars d\'un restaurant' },
      { value: 'correu', label: 'Escrit enviat per correu dins d\'un sobre' },
      { value: 'joc', label: 'Cartolina il·lustrada de la baralla' },
    ],
  },
  {
    id: 'pol4',
    correct: 'fila',
    html: '4. «Hi havia tanta gent que la <strong>cua</strong> arribava al carrer.»',
    options: [
      { value: 'fila', label: 'Fila de persones que esperen el seu torn' },
      { value: 'animal', label: 'Extremitat posterior d\'un animal' },
      { value: 'pentinat', label: 'Pentinat de cabells lligats' },
    ],
  },
]

const ex1Expected = { a: 'cua', b: 'peu', c: 'cul', d: 'cua', e: 'peu', f: 'cul' }
const ex1Rows = [
  { id: 'a', label: 'a) Va fer', suffix: 'per treure les entrades de la pel·lícula.' },
  { id: 'b', label: 'b) En Roger s\'ha trencat el', suffix: 'jugant a futbol.' },
  { id: 'c', label: 'c) El', suffix: 'del tassó és ple de sucre.' },
  { id: 'd', label: 'd) Aquest problema durà', suffix: '.' },
  { id: 'e', label: 'e) Va signar a', suffix: 'de pàgina.' },
  { id: 'f', label: 'f) Va llenegar i va caure de', suffix: '.' },
]

const ex2Expected = {
  'carta-1': 'correu',
  'carta-2': 'restaurant',
  'trau-1': 'boto',
  'trau-2': 'ferida',
  'illa-1': 'aigua',
  'illa-2': 'cases',
  'serra-1': 'eina',
  'serra-2': 'muntanyes',
  'cangur-1': 'animal',
  'cangur-2': 'babysitter',
}

const ex2Words = [
  {
    key: 'carta',
    emoji: '🃏',
    title: 'Carta',
    opts1: [
      { value: 'correu', label: 'Escrit adreçat enviat en un sobre per correu' },
      { value: 'arbre', label: 'Fulla verda d\'un arbre' },
    ],
    opts2: [
      { value: 'restaurant', label: 'Llista de plats d\'un restaurant (o peça de baralla)' },
      { value: 'moble', label: 'Moble per seure al parc' },
    ],
  },
  {
    key: 'trau',
    emoji: '🧵',
    title: 'Trau',
    opts1: [
      { value: 'boto', label: 'Obertura a una peça de roba per passar-hi un botó' },
      { value: 'eina', label: 'Eina de ferro per descargolar' },
    ],
    opts2: [
      { value: 'ferida', label: 'Tall profund o ferida oberta a la pell' },
      { value: 'animal', label: 'Ocell amb plomes' },
    ],
  },
  {
    key: 'illa',
    emoji: '🏝️',
    title: 'Illa',
    opts1: [
      { value: 'aigua', label: 'Porció de terra envoltada d\'aigua' },
      { value: 'diners', label: 'Banc per guardar diners' },
    ],
    opts2: [
      { value: 'cases', label: 'Conjunt d\'edificis envoltats de carrers' },
      { value: 'gos', label: 'Animal mamífer de companyia' },
    ],
  },
  {
    key: 'serra',
    emoji: '⛰️',
    title: 'Serra',
    opts1: [
      { value: 'eina', label: 'Eina dentada per serrar fusta o metall' },
      { value: 'port', label: 'Lloc on atraquen vaixells' },
    ],
    opts2: [
      { value: 'muntanyes', label: 'Serralada o renglera de muntanyes' },
      { value: 'mar', label: 'Platja d\'arena fina' },
    ],
  },
  {
    key: 'cangur',
    emoji: '🦘',
    title: 'Cangur',
    opts1: [
      { value: 'animal', label: 'Animal marsupial d\'Austràlia que salta' },
      { value: 'planta', label: 'Arbre amb fruits dolços' },
    ],
    opts2: [
      { value: 'babysitter', label: 'Persona que té cura d\'infants (mainadera)' },
      { value: 'cotxe', label: 'Vehicle de quatre rodes' },
    ],
  },
]

const ex3Expected = {
  1: 'animal',
  2: 'moble',
  3: 'muntanya',
  4: 'eina',
  5: 'animal',
  6: 'edifici',
  7: 'persona',
  8: 'serra',
  9: 'astre',
  10: 'famosa',
  11: 'animal',
  12: 'escriptura',
}

const ex3Rows = [
  { id: 1, html: '1. «El veterinari li va embenar la <strong>pota</strong> al gosset.»', options: [{ value: 'animal', label: 'Animal' }, { value: 'moble', label: 'Moble' }] },
  { id: 2, html: '2. «Ajusta bé la <strong>pota</strong> de la cadira…»', options: [{ value: 'animal', label: 'Animal' }, { value: 'moble', label: 'Moble' }] },
  { id: 3, html: '3. «Van arribar al <strong>pic</strong> de la muntanya.»', options: [{ value: 'muntanya', label: 'Muntanya' }, { value: 'eina', label: 'Eina' }] },
  { id: 4, html: '4. «Feia forats amb un <strong>pic</strong> d\'acer.»', options: [{ value: 'muntanya', label: 'Muntanya' }, { value: 'eina', label: 'Eina' }] },
  { id: 5, html: '5. «L\'oreneta va moure l\'<strong>ala</strong> ferida.»', options: [{ value: 'animal', label: 'Animal' }, { value: 'edifici', label: 'Edifici' }] },
  { id: 6, html: '6. «Van inaugurar una nova <strong>ala</strong> de la biblioteca.»', options: [{ value: 'animal', label: 'Animal' }, { value: 'edifici', label: 'Edifici' }] },
  { id: 7, html: '7. «En Joan té un <strong>dent</strong> que li fa mal.»', options: [{ value: 'persona', label: 'Persona' }, { value: 'serra', label: 'Serra / Eina' }] },
  { id: 8, html: '8. «Aquesta serra té una <strong>dent</strong> trencada.»', options: [{ value: 'persona', label: 'Persona' }, { value: 'serra', label: 'Serra / Eina' }] },
  { id: 9, html: '9. «Vam veure una <strong>estrella</strong> fugaç.»', options: [{ value: 'astre', label: 'Astre' }, { value: 'famosa', label: 'Persona famosa' }] },
  { id: 10, html: '10. «Aquesta actriu és l\'<strong>estrella</strong> del cinema.»', options: [{ value: 'astre', label: 'Astre' }, { value: 'famosa', label: 'Persona famosa' }] },
  { id: 11, html: '11. «El colom té una <strong>ploma</strong> grisa a la cua.»', options: [{ value: 'animal', label: 'Animal' }, { value: 'escriptura', label: 'Escriptura' }] },
  { id: 12, html: '12. «L\'escriptor va sucar la <strong>ploma</strong> al tinter.»', options: [{ value: 'animal', label: 'Animal' }, { value: 'escriptura', label: 'Escriptura' }] },
]

const contextAnswers = reactive({ pol1: '', pol2: '', pol3: '', pol4: '' })
const contextFb = reactive({})
const contextOk = reactive({})
const contextDone = reactive({ pol1: false, pol2: false, pol3: false, pol4: false })

const ex1 = reactive({ a: '', b: '', c: '', d: '', e: '', f: '' })
const ex1Fb = ref('')
const ex1Ok = ref(false)
const ex1Done = ref(false)

const ex2 = reactive({})
const ex2Fb = ref('')
const ex2Ok = ref(false)
const ex2Done = ref(false)

const ex3 = reactive({})
const ex3Fb = ref('')
const ex3Ok = ref(false)
const ex3Done = ref(false)

const allDone = computed(
  () => ex1Done.value && ex2Done.value && ex3Done.value
    && contextDone.pol1 && contextDone.pol2 && contextDone.pol3 && contextDone.pol4,
)

function gradeBlock(correct, total, maxScore) {
  return Math.round((correct / total) * maxScore)
}

function maybeComplete() {
  if (!allDone.value) return
  const max = props.exercise?.maxScore || 28
  emit('complete', {
    _grade: {
      score: max,
      maxScore: max,
      feedback: 'Fitxa de polisèmia completada: context + 3 exercicis oficials.',
    },
  })
}

function checkContext(id) {
  const row = contextRows.find((r) => r.id === id)
  if (!contextAnswers[id]) {
    contextFb[id] = 'Selecciona una opció del desplegable.'
    contextOk[id] = false
    return
  }
  contextOk[id] = contextAnswers[id] === row.correct
  contextFb[id] = contextOk[id]
    ? '🎉 Correcte! Has identificat el context exacte del mot polisèmic.'
    : '❌ No és aquest significat. Torna a llegir la frase sencera.'
  if (contextOk[id]) contextDone[id] = true
  emit('update:modelValue', { context: { ...contextAnswers } })
  maybeComplete()
}

function checkEx1() {
  let correct = 0
  let missing = false
  Object.keys(ex1Expected).forEach((k) => {
    if (!ex1[k]) missing = true
    else if (ex1[k] === ex1Expected[k]) correct += 1
  })
  if (missing) {
    ex1Fb.value = 'Completa les 6 frases abans de comprovar.'
    ex1Ok.value = false
    return
  }
  ex1Ok.value = correct === 6
  ex1Fb.value = ex1Ok.value
    ? '🎉 Excel·lent! Totes les 6 frases correctes amb cul, peu i cua.'
    : `❌ Has encertat ${correct} de 6. Revisa «fer cua», «peu de pàgina», «caure de cul», «durar cua».`
  if (ex1Ok.value) {
    ex1Done.value = true
    const max = props.exercise?.maxScore || 28
    emit('update:modelValue', { ex1: { ...ex1 }, partialScore: gradeBlock(6, 28, max) })
    maybeComplete()
  }
}

function checkEx2() {
  let correct = 0
  let missing = false
  Object.keys(ex2Expected).forEach((k) => {
    if (!ex2[k]) missing = true
    else if (ex2[k] === ex2Expected[k]) correct += 1
  })
  if (missing) {
    ex2Fb.value = 'Selecciona les dues accepcions de totes les paraules.'
    ex2Ok.value = false
    return
  }
  ex2Ok.value = correct === 10
  ex2Fb.value = ex2Ok.value
    ? '🎉 Impressionant! Has identificat les dues accepcions de cada paraula.'
    : `❌ Has encertat ${correct} de 10 accepcions.`
  if (ex2Ok.value) {
    ex2Done.value = true
    maybeComplete()
  }
}

function checkEx3() {
  let correct = 0
  let missing = false
  for (let i = 1; i <= 12; i += 1) {
    if (!ex3[i]) missing = true
    else if (ex3[i] === ex3Expected[i]) correct += 1
  }
  if (missing) {
    ex3Fb.value = 'Tria el context de les 12 oracions abans de comprovar.'
    ex3Ok.value = false
    return
  }
  ex3Ok.value = correct === 12
  ex3Fb.value = ex3Ok.value
    ? '🎉 Brillant! Context correcte a les 12 frases.'
    : `❌ Has encertat ${correct} de 12 contextos.`
  if (ex3Ok.value) {
    ex3Done.value = true
    maybeComplete()
  }
}
</script>

<style scoped>
.pol-fitxa { display: grid; gap: 1.25rem; }
.pol-block { border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; background: var(--bg-card); }
.pol-block-title { margin: 0 0 0.75rem; font-size: 1rem; color: var(--primary); }
.pol-card { border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 0.65rem; background: var(--bg-hover); }
.pol-card.compact { margin-bottom: 0.5rem; }
.pol-row { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin-top: 0.5rem; }
.pol-row .input-hub { flex: 1; min-width: 200px; }
.pol-inline-select { display: inline-block; width: auto; margin: 0 0.3rem; padding: 0.2rem 0.5rem; font-family: inherit; }
.pol-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem; }
.pol-select-label { display: grid; gap: 0.25rem; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 700; }
</style>
