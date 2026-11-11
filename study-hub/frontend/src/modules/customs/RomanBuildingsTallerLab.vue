<template>
  <div class="ea-lab">
    <div class="ea-mode-bar">
      <button
        type="button"
        class="ea-mode-btn"
        :class="{ active: mode === 'buildings' }"
        @click="mode = 'buildings'"
      >
        🏟️ Inspector dels 8 Edificis Romans
      </button>
      <button
        type="button"
        class="ea-mode-btn"
        :class="{ active: mode === 'diari' }"
        @click="mode = 'diari'"
      >
        📰 Taller: Diari de Notícies ({{ newsCompleted }}/4)
      </button>
      <button
        type="button"
        class="ea-mode-btn"
        :class="{ active: mode === 'teatre' }"
        @click="mode = 'teatre'"
      >
        🎭 Taller: Obra de Teatre i Infografia
      </button>
    </div>

    <!-- MODE 1: INSPECTOR D'EDIFICIS I OBRES PÚBLIQUES ROMANES -->
    <div v-if="mode === 'buildings'" class="ea-explore-wrap">
      <p class="ea-intro">
        Al Genially et demanen triar <strong>6 edificis romans amb el seu nom, funció i imatge</strong>. Explora les 8 grans construccions de la ciutat romana i posa't a prova:
      </p>

      <div class="ea-buildings-grid">
        <article
          v-for="b in buildings"
          :key="b.id"
          class="ea-building-card"
          :class="{ active: selectedBuilding.id === b.id }"
          @click="selectedBuilding = b"
        >
          <div class="ea-b-icon">{{ b.icon }}</div>
          <div class="ea-b-info">
            <span class="ea-b-type">{{ b.category }}</span>
            <h4>{{ b.name }}</h4>
            <p>{{ b.shortFunc }}</p>
          </div>
        </article>
      </div>

      <div class="ea-civ-detail" style="margin-top: 1rem; border-left-color: #dc2626;">
        <div class="ea-civ-detail-head">
          <span class="ea-civ-big-icon">{{ selectedBuilding.icon }}</span>
          <div>
            <span class="ea-badge" style="background: #dc2626;">{{ selectedBuilding.category }}</span>
            <h4>{{ selectedBuilding.name }}</h4>
            <p class="ea-civ-quote"><strong>Funció principal:</strong> {{ selectedBuilding.function }}</p>
          </div>
        </div>
        <div class="ea-civ-grid">
          <div class="ea-civ-box">
            <strong>📐 Forma i arquitectura</strong>
            <p>{{ selectedBuilding.architecture }}</p>
          </div>
          <div class="ea-civ-box">
            <strong>📍 Exemple famós a Catalunya / Hispània</strong>
            <p>{{ selectedBuilding.example }}</p>
          </div>
          <div class="ea-civ-box">
            <strong>⚠️ Com no confondre'l a l'examen</strong>
            <p>{{ selectedBuilding.tip }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODE 2: TALLER DEL DIARI DE NOTÍCIES (DIAPOSITIVA 14 DEL GENIALLY) -->
    <div v-else-if="mode === 'diari'" class="ea-diari-wrap">
      <p class="ea-intro">
        <strong>Activitat Resum del Genially — Diari de Notícies:</strong> Cal redactar <strong>4 notícies diferents</strong> (Societat, Esports, Economia i Cultura) sense cap errada històrica. Tria el titular i el text rigorós per a cada secció de la portada!
      </p>

      <div class="ea-newspaper">
        <header class="ea-news-header">
          <span class="ea-news-meta">EDICIÓ ESPECIAL · EDAT ANTIGA</span>
          <h3>LA CRÒNICA D'HISPÀNIA I EL MEDITERRANI</h3>
          <span class="ea-news-meta">PREU: 1 DENARI DE PLATA · TÀRRACO I EMPÒRION</span>
        </header>

        <div class="ea-news-sections">
          <div
            v-for="sec in newsSections"
            :key="sec.id"
            class="ea-news-box"
            :class="{ done: sec.selectedIdx === sec.correctIdx }"
          >
            <div class="ea-news-sec-head">
              <span class="ea-news-tag">{{ sec.section }}</span>
              <span v-if="sec.selectedIdx === sec.correctIdx" class="ea-news-ok">✅ Publicada!</span>
            </div>

            <div class="ea-news-choices">
              <button
                v-for="(choice, idx) in sec.choices"
                :key="idx"
                type="button"
                class="ea-news-choice-btn"
                :class="{
                  correct: sec.selectedIdx === idx && idx === sec.correctIdx,
                  wrong: sec.selectedIdx === idx && idx !== sec.correctIdx,
                }"
                @click="pickNews(sec, idx)"
              >
                <strong>📰 {{ choice.headline }}</strong>
                <span>{{ choice.body }}</span>
              </button>
            </div>

            <p v-if="sec.selectedIdx !== null" class="ea-news-feedback" :class="sec.selectedIdx === sec.correctIdx ? 'ok' : 'ko'">
              {{ sec.selectedIdx === sec.correctIdx ? sec.okMsg : sec.koMsg }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODE 3: OBRA DE TEATRE I GUIÓ D'INFOGRAFIA (DIAPOSITIVES 8, 10, 12, 13) -->
    <div v-else class="ea-teatre-wrap">
      <div class="ea-conquest-card" style="margin-bottom: 1.25rem;">
        <h5>🎭 Activitat Resum: Obra de Teatre dels Pobles de l'Edat Antiga</h5>
        <p class="ea-intro">
          A l'obra de teatre del Genially surten diferents personatges parlant sobre com viuen. Endevina quin personatge diu cada rèplica del guió:
        </p>

        <div class="ea-script-lines">
          <div v-for="line in theatreLines" :key="line.id" class="ea-line-card">
            <blockquote class="ea-line-quote">«{{ line.speech }}»</blockquote>
            <div class="ea-line-btns">
              <button
                v-for="actor in line.options"
                :key="actor"
                type="button"
                class="ea-actor-btn"
                :class="{
                  correct: line.picked === actor && actor === line.correctActor,
                  wrong: line.picked === actor && actor !== line.correctActor,
                }"
                @click="pickActor(line, actor)"
              >
                {{ actor }}
              </button>
            </div>
            <p v-if="line.picked" class="ea-line-fb" :class="line.picked === line.correctActor ? 'ok' : 'ko'">
              {{ line.picked === line.correctActor ? `✅ Exacte! Parla ${line.correctActor}.` : '❌ Fixa\'t bé en on viu, quines eines usa o d\'on ve el personatge.' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Checklist oficial de la Infografia de la Romanització (Diapositiva 8) -->
      <div class="ea-checklist-box">
        <h5>📋 Checklist Oficial del Genially: Infografia "LA ROMANITZACIÓ" (Canva / Pòster)</h5>
        <p class="ea-intro">
          Si fas el pòster o infografia de la diapositiva 8, comprova que no et deixes cap dels <strong>5 apartats obligatoris</strong>:
        </p>
        <div class="ea-check-items">
          <label v-for="item in infographicChecklist" :key="item.id" class="ea-check-row">
            <input v-model="item.checked" type="checkbox" />
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.desc }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])
const mode = ref('buildings')

const buildings = [
  {
    id: 'aqueducte',
    name: '1. L\'Aqüeducte',
    category: 'Obra d\'enginyeria',
    icon: '🌉',
    shortFunc: 'Transportar l\'aigua a la ciutat',
    function: 'Servia per portar l\'aigua dolça des dels rius o fonts de les muntanyes fins a les fonts i termes de la ciutat.',
    architecture: 'Canal superior sostingut per una o diverses fileres d\'arcs de pedra amb una lleugera inclinació.',
    example: 'Aqüeducte de les Ferreres (Pont del Diable) a Tàrraco (Tarragona) i Aqüeducte de Segòvia.',
    tip: 'No el confonguis amb un pont per a carros: per dalt de l\'aqüeducte hi viatjava l\'aigua!',
  },
  {
    id: 'amfiteatre',
    name: '2. L\'Amfiteatre',
    category: 'Edifici d\'espectacles',
    icon: '⚔️',
    shortFunc: 'Lluites de gladiadors i feres',
    function: 'S\'hi celebraven els espectacles de lluita cos a cos entre gladiadors i combats amb animals salvatges.',
    architecture: 'Planta ovalada o el·líptica (com la unió de dos teatres), amb l\'arena al centre, fossats subterranis i graderies tot al voltant.',
    example: 'Amfiteatre de Tàrraco (vora el mar Mediterrani) i el Colosseu de Roma.',
    tip: 'Recorda: Amfiteatre = Gladiadors (planta ovalada).',
  },
  {
    id: 'teatre',
    name: '3. El Teatre',
    category: 'Edifici d\'espectacles',
    icon: '🎭',
    shortFunc: 'Representació de comèdies i tragèdies',
    function: 'Els actors (amb màscares) hi representaven obres teatrals, comèdies i tragèdies per als ciutadans.',
    architecture: 'Planta semicircular (mitja lluna) amb graderies (càvea), espai per al cor (orchestra) i un gran escenari decorat amb columnes.',
    example: 'Teatre romà de Tàrraco i Teatre romà de Mèrida (Emèrita Augusta).',
    tip: 'Té forma de semicercle (mitja lluna) i un gran mur escènic darrere dels actors.',
  },
  {
    id: 'circ',
    name: '4. El Circ',
    category: 'Edifici d\'espectacles',
    icon: '🐎',
    shortFunc: 'Curses de carros (quadrigues)',
    function: 'Era el recinte més gran de la ciutat i s\'hi celebraven les apassionants curses de carros tirats per dos (bigues) o quatre cavalls (quadrigues).',
    architecture: 'Pista molt llarga i estreta amb graderies als costats i un mur central anomenat spina al voltant del qual giraven els carros.',
    example: 'Circ romà de Tàrraco (sota el nucli antic de Tarragona) i Circ Màxim de Roma.',
    tip: 'No hi actuaven pallassos! Al circ romà només s\'hi feien curses de carros i cavalls.',
  },
  {
    id: 'termes',
    name: '5. Les Termes',
    category: 'Edifici públic d\'higiene i oci',
    icon: '♨️',
    shortFunc: 'Banys públics i gimnàstica',
    function: 'Lloc on els romans prenien banys d\'aigua freda, tèbia i calenta, feien gimnàstica, massatges i xerraven amb els amics.',
    architecture: 'Grans sales cobertes amb voltes i sistemes de calefacció subterrània (hipocaust) i palestra per fer esport.',
    example: 'Termes romanes de Baetulo (Badalona), Caldes de Montbui i Sant Boi.',
    tip: 'Eren tant un centre d\'higiene com el punt de trobada social diari dels romans.',
  },
  {
    id: 'forum',
    name: '6. El Fòrum i la Cúria',
    category: 'Centre polític, religiós i comercial',
    icon: '🏛️',
    shortFunc: 'Plaça central, mercat i govern',
    function: 'El fòrum era la gran plaça central de la ciutat; s\'hi feia el mercat i contenia els temples i la cúria (on es reunia el govern local).',
    architecture: 'Gran plaça rectangular porticada situada a l\'encreuament dels dos carrers principals (Cardo i Decumanus).',
    example: 'Fòrum de la Colònia i Fòrum Provincial de Tàrraco, i Fòrum d\'Empúries.',
    tip: 'Pensa en el fòrum com la "Plaça Major" o l\'Ajuntament + Mercat de la ciutat romana.',
  },
  {
    id: 'arc',
    name: '7. L\'Arc de Triomf',
    category: 'Monument commemoratiu',
    icon: '🎖️',
    shortFunc: 'Commemorar gestes i victòries militars',
    function: 'Monument aixecat a l\'entrada de les ciutats o sobre les calçades per recordar una gran victòria militar o honorar un emperador.',
    architecture: 'Estructura de pedra amb un o tres arcs de mig punt decorada amb inscripcions en llatí i relleus.',
    example: 'L\'Arc de Berà (a Roda de Berà, sobre l\'antiga Via Augusta).',
    tip: 'No tenia funció d\'habitatge: era un monument honorífic i commemoratiu.',
  },
  {
    id: 'calcada',
    name: '8. Les Calçades i la Muralla',
    category: 'Comunicació i defensa',
    icon: '🛣️',
    shortFunc: 'Unir les ciutats i protegir-les',
    function: 'Les calçades comunicaven totes les ciutats de l\'Imperi per al comerç i les legions; la muralla de pedra protegia la ciutat d\'atacs.',
    architecture: 'Camins fets amb diverses capes de pedres planes i lloses; muralles gruixudes amb torres de vigilància i portes.',
    example: 'La Via Augusta (que travessava Catalunya des dels Pirineus) i les muralles de Tàrraco, Barcino i Gerunda.',
    tip: 'D\'aquí ve la dita "Tots els camins porten a Roma": les calçades connectaven tot l\'Imperi.',
  },
]

const selectedBuilding = ref(buildings[0])

const newsSections = reactive([
  {
    id: 'cultura',
    section: '1. SECCIÓ DE CULTURA I COLONITZADORS',
    selectedIdx: null,
    correctIdx: 0,
    okMsg: '✅ Titular perfecte! Els grecs van desembarcar a la costa catalana (Empòrion i Rhode) portant la moneda i la ceràmica.',
    koMsg: '❌ Atenció! Aquesta notícia conté una errada històrica (els grecs no venien d\'Amèrica ni portaven pólvora).',
    choices: [
      {
        headline: 'ARRIBADA A LA COSTA CATALANA D\'UN GRUP DE GRECS',
        body: 'Els navegants procedents de Massàlia funden la colònia d\'Empòrion i intercanvien ceràmica fina i les primeres monedes amb els poblats ibers.',
      },
      {
        headline: 'ELS GRECS DESEMBARQUEN A GALÍCIA AMB VAIXELLS DE VAPOR',
        body: 'Porten patates d\'Amèrica i construeixen castres circulars a dalt de les muntanyes.',
      },
    ],
  },
  {
    id: 'economia',
    section: '2. SECCIÓ D\'ECONOMIA I METALLS',
    selectedIdx: null,
    correctIdx: 1,
    okMsg: '✅ Titular oficial del Genially! Els celtes eren grans mestres del bronze i del ferro i fabricaven armes molt valorades.',
    koMsg: '❌ Incorrecte: els celtes no utilitzaven bitllets de banc ni vivien del comerç marítim mediterrani.',
    choices: [
      {
        headline: 'ELS CELTES OBREN UN BANC AMB BITLLETS DE PAPER A CADIS',
        body: 'Tots els habitants dels castres paguen amb targeta i escriuen llibres en llatí.',
      },
      {
        headline: 'ELS CELTES PUGEN ELS PREUS DE LES SEVES ARMES DE FERRO',
        body: 'Els ferrers dels castres del nord i de la Messeta elaboren espases, punyals, cascs i braçalets d\'orfebreria de gran qualitat.',
      },
    ],
  },
  {
    id: 'societat',
    section: '3. SECCIÓ DE SOCIETAT I CIUTAT ROMANA',
    selectedIdx: null,
    correctIdx: 0,
    okMsg: '✅ Molt bé! Reflecteix exactament la diferència entre les domus dels rics i les insulae de la gent humil, i l\'arribada d\'aigua per l\'aqüeducte.',
    koMsg: '❌ Compte! A Roma els esclaus no eren els propietaris de les domus ni governaven a la cúria.',
    choices: [
      {
        headline: 'INAUGURAT EL NOU AQÜEDUCTE QUE PORTA AIGUA AL FÒRUM I LES TERMES DE TÀRRACO',
        body: 'Els patricis de les domus i els artesans que viuen a les insulae celebren l\'arribada d\'aigua fresca als banys públics.',
      },
      {
        headline: 'ELS ESCLAUS COMPREN TOTES LES DOMUS LUXOSES DE BARCINO',
        body: 'Els patricis rics passen a viure a les mines i els gladiadors presideixen la cúria.',
      },
    ],
  },
  {
    id: 'esports',
    section: '4. SECCIÓ D\'ESPORTS I ESPECTACLES ROMANS',
    selectedIdx: null,
    correctIdx: 1,
    okMsg: '✅ Excel·lent! Al circ s\'hi feien les curses de quadrigues i a l\'amfiteatre les lluites de gladiadors.',
    koMsg: '❌ Ai! Has barrejat el circ amb el teatre o l\'amfiteatre.',
    choices: [
      {
        headline: 'GRAN CURSA DE CARROS I CAVALLS DINS DEL PETIT TEATRE SEMICIRCULAR',
        body: 'Les quadrigues corren per dalt de l\'escenari mentre els gladiadors fan comèdies al circ.',
      },
      {
        headline: 'EMOCIONANT FINAL DE QUADRIGUES AL CIRC DE TÀRRACO I TARDA DE GLADIADORS A L\'AMFITEATRE',
        body: 'Milers d\'espectadors omplen les graderies allargades del circ per veure els carros de quatre cavalls.',
      },
    ],
  },
])

const newsCompleted = computed(
  () => newsSections.filter((s) => s.selectedIdx === s.correctIdx).length,
)

function pickNews(sec, idx) {
  const wasCorrect = sec.selectedIdx === sec.correctIdx
  sec.selectedIdx = idx
  if (!wasCorrect && idx === sec.correctIdx) {
    const max = props.exercise?.maxScore || 18
    if (newsCompleted.value >= 3) {
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: 'Diari de Notícies de l\'Edat Antiga completat!',
        },
      })
    }
  }
}

const theatreLines = reactive([
  {
    id: 'l1',
    speech: 'Visc en un poblat emmurallat dalt d\'un turó prop del Mediterrani. Casa meva és rectangular, fem ceràmica amb el torn terrissaire i escrivim en plaques amb el nostre propi alfabet!',
    options: ['🏺 Personatge Iber', '🛡️ Personatge Celta', '⛵ Mercader Fenici', '🦅 Legionari Romà'],
    correctActor: '🏺 Personatge Iber',
    picked: '',
  },
  {
    id: 'l2',
    speech: 'La meva família viu en un castre al nord-oest. Casa nostra és rodona amb sostre de palla, cuidem el bestiar i fonem el bronze i el ferro per fer armes i torques, però no fem servir monedes ni escriptura.',
    options: ['🏺 Personatge Iber', '🛡️ Personatge Celta', '🏛️ Comerciant Grec', '🦅 Legionari Romà'],
    correctActor: '🛡️ Personatge Celta',
    picked: '',
  },
  {
    id: 'l3',
    speech: 'He navegat des de Fenícia fins a fundar Gades (Cadis) al sud. Busquem plata, coure i estany, i hem ensenyat als pobles de la costa l\'alfabet fenici i la salaó del peix!',
    options: ['🛡️ Personatge Celta', '⛵ Mercader Fenici', '🐘 General Cartaginès', '🦅 Legionari Romà'],
    correctActor: '⛵ Mercader Fenici',
    picked: '',
  },
  {
    id: 'l4',
    speech: 'Vam desembarcar a Empòrion l\'any 218 aC durant les Guerres Púniques. Hem construït calçades, aqüeductes i fòrums a Tàrraco i Barcino, i hem estès el llatí i el dret romà per tota Hispània!',
    options: ['🏺 Personatge Iber', '🏛️ Comerciant Grec', '🐘 General Cartaginès', '🦅 Legionari Romà'],
    correctActor: '🦅 Legionari Romà',
    picked: '',
  },
])

function pickActor(line, actor) {
  const wasOk = line.picked === line.correctActor
  line.picked = actor
  if (!wasOk && actor === line.correctActor) {
    const max = props.exercise?.maxScore || 18
    emit('complete', {
      _grade: {
        score: max,
        maxScore: max,
        feedback: 'Guió de l\'Obra de Teatre completat!',
      },
    })
  }
}

const infographicChecklist = reactive([
  {
    id: 'c1',
    title: '1. Què és la Romanització?',
    desc: 'Escriu una definició curta amb les teves paraules (adaptació dels pobles conquerits a la llengua, lleis i costums romans).',
    checked: false,
  },
  {
    id: 'c2',
    title: '2. Línia del Temps de la Conquesta',
    desc: 'Inclou l\'inici (218 aC a Empúries), el final (19 aC amb August) i la durada total (més de 200 anys / 199 anys).',
    checked: false,
  },
  {
    id: 'c3',
    title: '3. Organització del Territori (Mapa d\'Hispània)',
    desc: 'Inclou les 5 províncies i els noms romans de les 4 capitals catalanes: Tàrraco, Barcino, Gerunda i Ilerda.',
    checked: false,
  },
  {
    id: 'c4',
    title: '4. Obres Públiques',
    desc: 'Selecciona fotos de construccions romanes (aqüeducte, amfiteatre, teatre, circ, termes, arc de triomf...) i explica\'n la funció.',
    checked: false,
  },
  {
    id: 'c5',
    title: '5. Societat i Cultura (Els 4 Pilars)',
    desc: 'Explica breument: Llengua (llatí; es manté el basc), Classes socials (lliures i esclaus), Economia (blat, vinya, olivera, garum, mineria) i Religió (politeistes → cristianisme el 380 dC).',
    checked: false,
  },
])
</script>
