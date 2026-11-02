export const IMG_BASE = '/content/projecte/coordenadas/img'
export const SVG_PATHS_URL = '/content/projecte/coordenadas/continents_svg.json'

export const LOCATION_OPTIONS = [
  { value: 'ocean_artic', label: 'Amèrica del Nord / Oceà Glacial Àrtic (Groenlàndia)' },
  { value: 'europa', label: 'Europa (Meridià 0° de Greenwich)' },
  { value: 'asia', label: 'Àsia (Sibèria / Mongòlia / Orient Mitjà)' },
  { value: 'africa', label: 'Àfrica (Centre d\'Àfrica / Equador)' },
  { value: 'america_sud', label: 'Amèrica del Sud (Brasil / Selva / Xile)' },
  { value: 'oceania', label: 'Oceania (Austràlia)' },
  { value: 'ocean_pacific_nord', label: 'Oceà Pacífic Nord / Golf de Mèxic' },
  { value: 'ocean_pacific_sud', label: 'Oceà Pacífic Sud' },
  { value: 'ocean_indic', label: 'Oceà Índic Sud' },
  { value: 'ocean_antartic', label: 'Oceà Glacial Antàrtic (Antàrtida)' },
]

export const POKEMONS = [
  {
    id: 'mewtwo', name: 'Mewtwo', sprite: '👾',
    latDeg: 75, latDir: 'N', lonDeg: 105, lonDir: 'O',
    allowAltLons: [90, 105], topPct: 21.8, leftPct: 31.4,
    locKey: 'ocean_artic', locName: 'Amèrica del Nord / Oceà Glacial Àrtic',
    desc: 'Al nord de Canadà i Groenlàndia, a 75° Nord i 105° Oest.',
  },
  {
    id: 'meowth', name: 'Meowth', sprite: '😼',
    latDeg: 45, latDir: 'N', lonDeg: 0, lonDir: 'E',
    allowLonDirs: ['E', 'O'], topPct: 34.4, leftPct: 50.0,
    locKey: 'europa', locName: 'Europa (Meridià 0° de Greenwich)',
    desc: 'A Europa, just sobre el Meridià 0° de Greenwich i 45° Nord.',
  },
  {
    id: 'weezing', name: 'Weezing', sprite: '☁️',
    latDeg: 45, latDir: 'N', lonDeg: 105, lonDir: 'E',
    topPct: 34.5, leftPct: 73.7,
    locKey: 'asia', locName: 'Àsia (Sibèria / Mongòlia)',
    desc: 'A l\'interior d\'Àsia, a 45° Nord i 105° Est.',
  },
  {
    id: 'tentacruel', name: 'Tentacruel', sprite: '🦑',
    latDeg: 30, latDir: 'N', lonDeg: 90, lonDir: 'O',
    topPct: 40.4, leftPct: 28.2,
    locKey: 'ocean_pacific_nord', allowLocKeys: ['ocean_pacific_nord', 'ocean_artic'],
    locName: 'Golf de Mèxic / Amèrica del Nord',
    desc: 'Al Golf de Mèxic, a 30° Nord i 90° Oest.',
  },
  {
    id: 'golem', name: 'Golem', sprite: '🪨',
    latDeg: 30, latDir: 'N', lonDeg: 45, lonDir: 'E',
    topPct: 40.8, leftPct: 61.3,
    locKey: 'asia', locName: 'Àsia (Orient Mitjà)',
    desc: 'A l\'Orient Mitjà, a 30° Nord i 45° Est.',
  },
  {
    id: 'victreebel', name: 'Victreebel', sprite: '🪴',
    latDeg: 0, latDir: 'N', allowLatDirs: ['N', 'S'], lonDeg: 15, lonDir: 'E',
    topPct: 54.5, leftPct: 54.3,
    locKey: 'africa', locName: 'Àfrica (Centre / Equador)',
    desc: 'Al centre d\'Àfrica, Equador (0°) i 15° Est.',
  },
  {
    id: 'arbok', name: 'Arbok', sprite: '🐍',
    latDeg: 30, latDir: 'S', lonDeg: 75, lonDir: 'O',
    topPct: 66.6, leftPct: 31.8,
    locKey: 'america_sud', allowLocKeys: ['america_sud', 'ocean_pacific_sud'],
    locName: 'Amèrica del Sud (Xile / Pacífic Sud)',
    desc: 'A la costa oest d\'Amèrica del Sud, a 30° Sud i 75° Oest.',
  },
  {
    id: 'lickitung', name: 'Lickitung', sprite: '👅',
    latDeg: 23.5, latDir: 'S', lonDeg: 150, lonDir: 'E',
    topPct: 64.0, leftPct: 86.7,
    locKey: 'oceania', allowLocKeys: ['oceania', 'ocean_pacific_sud'],
    locName: 'Oceania (Austràlia)',
    desc: 'A l\'est d\'Austràlia, Tròpic de Capricorn (23,5° S) i 150° Est.',
  },
  {
    id: 'gyarados', name: 'Gyarados', sprite: '🐉',
    latDeg: 75, latDir: 'S', lonDeg: 135, lonDir: 'O',
    allowAltLons: [105, 135], topPct: 85.7, leftPct: 31.0,
    locKey: 'ocean_antartic', allowLocKeys: ['ocean_antartic', 'ocean_pacific_sud'],
    locName: 'Oceà Glacial Antàrtic (Antàrtida)',
    desc: 'Aigües gelades a 75° Sud i 135° Oest.',
  },
  {
    id: 'rhyhorn', name: 'Rhyhorn', sprite: '🦏',
    latDeg: 66.5, latDir: 'S', lonDeg: 60, lonDir: 'E',
    topPct: 82.3, leftPct: 60.6,
    locKey: 'ocean_indic', allowLocKeys: ['ocean_indic', 'ocean_antartic'],
    locName: 'Oceà Índic Sud / Antàrtida',
    desc: 'Sobre el Cercle Polar Antàrtic (66,5° Sud) i 60° Est.',
  },
]

export function validatePokemonCapture(poke, { latDeg, latDir, lonDeg, lonDir, loc }) {
  if (Number.isNaN(latDeg) || Number.isNaN(lonDeg) || !loc) {
    return { ok: false, hint: '⚠️ Omple tots els camps (Latitud, Longitud i Ubicació).' }
  }
  const latOk = Math.abs(latDeg - poke.latDeg) <= 6
    && (latDir === poke.latDir || poke.latDeg === 0 || (poke.allowLatDirs || []).includes(latDir))
  let lonOk = Math.abs(lonDeg - poke.lonDeg) <= 6
  if (poke.allowAltLons?.some((alt) => Math.abs(lonDeg - alt) <= 6)) lonOk = true
  if (poke.lonDeg !== 0) {
    lonOk = lonOk && (lonDir === poke.lonDir || (poke.allowLonDirs || []).includes(lonDir))
  }
  const locOk = loc === poke.locKey || (poke.allowLocKeys || []).includes(loc)
  if (latOk && lonOk && locOk) return { ok: true }
  let hint = '❌ Revisa: '
  if (!latOk) hint += `La latitud és a prop de ${poke.latDeg}° ${poke.latDir}. `
  if (!lonOk) hint += `La longitud és de ${poke.lonDeg}° ${poke.lonDir}. `
  if (!locOk) hint += `Està a ${poke.locName}.`
  return { ok: false, hint, latOk, lonOk, locOk }
}

export const PIKACHU_COORDS = [
  { id: 'A01', lat: 50, latDir: 'N', lon: 50, lonDir: 'O' },
  { id: 'A02', lat: 80, latDir: 'N', lon: 120, lonDir: 'O' },
  { id: 'A03', lat: 70, latDir: 'N', lon: 100, lonDir: 'O' },
  { id: 'A04', lat: 50, latDir: 'N', lon: 50, lonDir: 'O' },
  { id: 'A05', lat: 60, latDir: 'N', lon: 0, lonDir: 'E' },
  { id: 'A06', lat: 50, latDir: 'N', lon: 50, lonDir: 'E' },
  { id: 'A07', lat: 70, latDir: 'N', lon: 100, lonDir: 'E' },
  { id: 'A08', lat: 80, latDir: 'N', lon: 120, lonDir: 'E' },
  { id: 'A09', lat: 40, latDir: 'N', lon: 60, lonDir: 'E' },
  { id: 'A10', lat: 10, latDir: 'N', lon: 80, lonDir: 'E' },
  { id: 'A11', lat: 50, latDir: 'S', lon: 80, lonDir: 'E' },
  { id: 'A12', lat: 70, latDir: 'S', lon: 40, lonDir: 'E' },
  { id: 'A13', lat: 80, latDir: 'S', lon: 0, lonDir: 'E' },
  { id: 'A14', lat: 70, latDir: 'S', lon: 40, lonDir: 'O' },
  { id: 'A15', lat: 50, latDir: 'S', lon: 80, lonDir: 'O' },
  { id: 'A16', lat: 10, latDir: 'N', lon: 80, lonDir: 'O' },
  { id: 'A17', lat: 40, latDir: 'N', lon: 60, lonDir: 'O' },
  { id: 'B01', lat: 40, latDir: 'S', lon: 30, lonDir: 'O' },
  { id: 'B02', lat: 50, latDir: 'S', lon: 0, lonDir: 'E' },
  { id: 'B03', lat: 40, latDir: 'S', lon: 30, lonDir: 'E' },
  { id: 'B04', lat: 70, latDir: 'S', lon: 20, lonDir: 'E' },
  { id: 'B05', lat: 70, latDir: 'S', lon: 20, lonDir: 'O' },
  { id: 'B06', lat: 40, latDir: 'S', lon: 30, lonDir: 'O' },
]

export const POINTS_AE = [
  { id: 'a', label: 'A', expLat: '50S', expLon: '40O' },
  { id: 'b', label: 'B', expLat: '60N', expLon: '0' },
  { id: 'c', label: 'C', expLat: '0', expLon: '140E' },
  { id: 'd', label: 'D', expLat: '40N', expLon: '40O' },
  { id: 'e', label: 'E', expLat: '60S', expLon: '140E' },
]

export function checkPointCoordString(input, expected) {
  const v = String(input || '').trim().toUpperCase().replace(/[\s°]/g, '')
  return v === expected || (expected === '0' && v.startsWith('0'))
}

/** Calibración mapamundi_quadricula_buit.png */
export function gridLonLatToPct(latSigned, lonSigned) {
  return {
    x: 1.07 + ((lonSigned + 180) / 360) * 94.88,
    y: 5.02 + ((80 - latSigned) / 160) * 86.91,
  }
}
export function gridPctToLonLat(xPct, yPct) {
  return {
    lonSigned: Math.round(((xPct - 1.07) / 94.88) * 360 - 180),
    latSigned: Math.round(80 - ((yPct - 5.02) / 86.91) * 160),
  }
}

export const RANDOM_POINT_ICONS = [
  { icon: '🌟', color: '#f59e0b', name: 'Estrella Daurada' },
  { icon: '💎', color: '#3b82f6', name: 'Diamant Blau' },
  { icon: '🚀', color: '#ef4444', name: 'Coet Espacial' },
  { icon: '🏴‍☠️', color: '#8b5cf6', name: 'Cofre Pirata' },
  { icon: '⚡', color: '#eab308', name: 'Cristall Elèctric' },
]

export const CONTINENTS_DATA = {
  Americas: {
    id: 'Americas', name: 'Amèrica', color: '#eab308', colorName: 'Groc', icon: '🟡 🌎',
    hemisferis: 'Completament a l\'Hemisferi Occidental; s\'estén de Nord a Sud',
    linees: 'Equador, Tròpic de Càncer, Tròpic de Capricorn i Cercle Polar Àrtic',
    oceans: 'Àrtic (nord), Atlàntic (est) i Pacífic (oest)',
    curiositat: 'És el segon continent més gran. Dividit en Nord, Central i Sud.',
  },
  Europe: {
    id: 'Europe', name: 'Europa', color: '#a855f7', colorName: 'Violeta', icon: '🟣 🏛️',
    hemisferis: 'Hemisferi Boreal; travessada pel Meridià 0°',
    linees: 'Meridià de Greenwich i Cercle Polar Àrtic',
    oceans: 'Àrtic (nord), Atlàntic (oest) i Mediterrani (sud)',
    curiositat: 'El Meridià 0° passa per Catalunya i Castelló!',
  },
  Asia: {
    id: 'Asia', name: 'Àsia', color: '#22c55e', colorName: 'Verd', icon: '🟢 🏯',
    hemisferis: 'Hemisferi Boreal i Oriental',
    linees: 'Tròpic de Càncer, Cercle Polar Àrtic i Equador (Indonèsia)',
    oceans: 'Àrtic (nord), Pacífic (est) i Índic (sud)',
    curiositat: 'Continent més gran i poblat; conté l\'Himàlaia.',
  },
  Africa: {
    id: 'Africa', name: 'Àfrica', color: '#f97316', colorName: 'Taronja', icon: '🟠 🦁',
    hemisferis: 'Únic continent als 4 hemisferis',
    linees: 'Equador, Greenwich, Tròpic de Càncer i Capricorn',
    oceans: 'Atlàntic (oest), Índic (est) i Mediterrani (nord)',
    curiositat: 'Equador i Greenwich es creuen al Golf de Guinea.',
  },
  Oceania: {
    id: 'Oceania', name: 'Oceania', color: '#ec4899', colorName: 'Rosa', icon: '🌸 🦘',
    hemisferis: 'Austral i Oriental',
    linees: 'Tròpic de Capricorn (travessa Austràlia)',
    oceans: 'Pacífic (nord/est) i Índic (oest)',
    curiositat: 'Continent més petit del món.',
  },
  Antarctica: {
    id: 'Antarctica', name: 'Antàrtida', color: '#b45309', colorName: 'Marró', icon: '🟤 🐧',
    hemisferis: 'Completament Austral (Pol Sud)',
    linees: 'Cercle Polar Antàrtic i Pol Sud',
    oceans: 'Oceà Glacial Antàrtic',
    curiositat: 'Lloc més fred, ventós i sec de la Terra.',
  },
}

export const OCEANS_DATA = {
  pacific: { id: 'pacific', name: 'Oceà Pacífic', icon: '🌊 🐋', curiositat: 'L\'oceà més gran i profund.' },
  atlantic: { id: 'atlantic', name: 'Oceà Atlàntic', icon: '🌊 🚢', curiositat: 'Segon més gran; Colom el va creuar el 1492.' },
  indic: { id: 'indic', name: 'Oceà Índic', icon: '🌊 ⛵', curiositat: 'L\'oceà més càlid; condiciona els monsons.' },
  arctic: { id: 'arctic', name: 'Oceà Glacial Àrtic', icon: '❄️ 🐻‍❄️', curiositat: 'Cobert de banquisa flotant.' },
  antarctic: { id: 'antarctic', name: 'Oceà Glacial Antàrtic', icon: '🧊 🦭', curiositat: 'Dóna la volta a la Terra sense continents.' },
}

export const OCEAN_BADGES = [
  { id: 'pacific', x: 105, y: 230, text: '🌊 OCEÀ PACÍFIC' },
  { id: 'pacific', x: 895, y: 230, text: '🌊 OCEÀ PACÍFIC' },
  { id: 'atlantic', x: 390, y: 180, text: '🌊 OCEÀ ATLÀNTIC' },
  { id: 'atlantic', x: 440, y: 340, text: '🌊 OCEÀ ATLÀNTIC' },
  { id: 'indic', x: 730, y: 310, text: '🌊 OCEÀ ÍNDIC' },
  { id: 'arctic', x: 500, y: 42, text: '❄️ OCEÀ GLACIAL ÀRTIC' },
  { id: 'antarctic', x: 500, y: 415, text: '🧊 OCEÀ GLACIAL ANTÀRTIC' },
]

export const CONTINENT_LABELS = [
  { contId: 'Americas', x: 260, y: 155, text: 'AMÈRICA DEL NORD' },
  { contId: 'Americas', x: 380, y: 320, text: 'AMÈRICA DEL SUD' },
  { contId: 'Europe', x: 550, y: 110, text: 'EUROPA' },
  { contId: 'Asia', x: 740, y: 135, text: 'ÀSIA' },
  { contId: 'Africa', x: 545, y: 280, text: 'ÀFRICA' },
  { contId: 'Oceania', x: 865, y: 350, text: 'OCEANIA' },
  { contId: 'Antarctica', x: 500, y: 485, text: 'ANTÀRTIDA' },
]

export const CONTINENT_QUIZ = [
  { targetId: 'Africa', isOcean: false, text: 'Troba el continent d\'Àfrica, travessat per l\'Equador i Greenwich!', hint: 'Centre del mapamundi.', explanation: 'Àfrica és l\'únic continent als 4 hemisferis.' },
  { targetId: 'atlantic', isOcean: true, text: 'Fes clic a l\'Oceà Atlàntic!', hint: 'Forma d\'essa entre Amèrica i Europa/Àfrica.', explanation: 'Segon oceà més extens.' },
  { targetId: 'Asia', isOcean: false, text: 'Localitza Àsia, el continent més gran!', hint: 'Est d\'Europa, nord de l\'Índic.', explanation: 'Més de 44 milions de km².' },
  { targetId: 'pacific', isOcean: true, text: 'Fes clic a l\'Oceà Pacífic!', hint: 'Oest d\'Amèrica / est d\'Àsia.', explanation: 'Conté la Fossa de les Marianes.' },
  { targetId: 'Americas', isOcean: false, text: 'On està Amèrica (Hemisferi Occidental)?', hint: 'A l\'esquerra de Greenwich.', explanation: 'Del Cercle Polar Àrtic fins a prop de l\'Antàrtida.' },
  { targetId: 'indic', isOcean: true, text: 'Clica l\'Oceà Índic!', hint: 'Sota l\'Índia, entre Àfrica i Austràlia.', explanation: 'L\'oceà més càlid.' },
  { targetId: 'Europe', isOcean: false, text: 'Troba Europa!', hint: 'Nord del Mediterrani.', explanation: 'Greenwich passa per Catalunya.' },
  { targetId: 'antarctic', isOcean: true, text: 'On és l\'Oceà Glacial Antàrtic?', hint: 'Part inferior, envolta l\'Antàrtida.', explanation: 'Aigües molt fredes.' },
  { targetId: 'Oceania', isOcean: false, text: 'Localitza Oceania!', hint: 'Dreta inferior, Hemisferi Sud.', explanation: 'El continent més petit.' },
  { targetId: 'arctic', isOcean: true, text: 'Clica l\'Oceà Glacial Àrtic!', hint: 'Part superior del mapa.', explanation: 'Cobert de banquisa.' },
]

export const THEORY_TF = [
  { id: 'tf1', prompt: 'Els paral·lels sempre tenen la mateixa longitud?', correct: false, explanation: 'FALS. L\'Equador és el més llarg; com més a prop dels pols, més petits.' },
  { id: 'tf2', prompt: 'Tots els meridians tenen la mateixa longitud?', correct: true, explanation: 'VERITAT. Tots van de pol a pol.' },
  { id: 'tf3', prompt: 'El màxim de paral·lels cap al Nord/Sud és 90°?', correct: true, explanation: 'VERITAT. Des de l\'Equador fins als pols hi ha 90°.' },
  { id: 'tf4', prompt: 'El màxim de meridians Est/Oest és 180°?', correct: true, explanation: 'VERITAT. 180° Est + 180° Oest = 360°.' },
  { id: 'tf5', prompt: 'Si dos punts estan al mateix paral·lel, tenen la mateixa latitud?', correct: true, explanation: 'VERITAT. Mateixa línia horitzontal respecte a l\'Equador.' },
]

export const WIND_ROSE = [
  { id: 'N', label: '⬆️ N • Nord (0°)', speak: 'Nord, cap a dalt' },
  { id: 'S', label: '⬇️ S • Sud (180°)', speak: 'Sud, cap a baix' },
  { id: 'E', label: '➡️ E • Est (90°)', speak: 'Est, a la dreta' },
  { id: 'O', label: '⬅️ O • Oest (270°)', speak: 'Oest, a l\'esquerra' },
  { id: 'NE', label: '↗️ NE • Nord-est', speak: 'Nord-est, entre el nord i l\'est' },
  { id: 'NO', label: '↖️ NO • Nord-oest', speak: 'Nord-oest, entre el nord i l\'oest' },
  { id: 'SE', label: '↘️ SE • Sud-est', speak: 'Sud-est, entre el sud i l\'est' },
  { id: 'SO', label: '↙️ SO • Sud-oest', speak: 'Sud-oest, entre el sud i l\'oest' },
]

export const KEY_LINES = [
  { id: 'arctic', label: '❄️ Cercle Polar Àrtic', badge: '66,5° N', speak: 'Cercle Polar Àrtic, a 66 graus i mig Nord' },
  { id: 'cancer', label: '☀️ Tròpic de Càncer', badge: '23,5° N', speak: 'Tròpic de Càncer, a 23 graus i mig Nord' },
  { id: 'equador', label: '🌐 L\'Equador (0°)', badge: '0° N/S', speak: 'Equador, el paral·lel zero graus que divideix la Terra en Nord i Sud' },
  { id: 'capricorn', label: '☀️ Tròpic de Capricorn', badge: '23,5° S', speak: 'Tròpic de Capricorn, a 23 graus i mig Sud' },
  { id: 'antarctic', label: '❄️ Cercle Polar Antàrtic', badge: '66,5° S', speak: 'Cercle Polar Antàrtic, a 66 graus i mig Sud' },
  { id: 'greenwich', label: '📍 Meridià de Greenwich', badge: '0° E/O', speak: 'Meridià de Greenwich, el meridià zero graus que divideix la Terra en Est i Oest' },
]

export const OFFICIAL_QUIZ = [
  { id: 'q1', prompt: 'Com s\'anomena el paral·lel principal (0°) que divideix Nord i Sud?', options: ['Meridià de Greenwich', 'L\'Equador', 'Tròpic de Càncer', 'Cercle Polar Àrtic'], correct: 'L\'Equador' },
  { id: 'q2', prompt: 'Com s\'anomena el meridià de referència (0°)?', options: ['Meridià de París', 'Meridià de Greenwich', 'Equador', 'Tròpic de Capricorn'], correct: 'Meridià de Greenwich' },
  { id: 'q3', prompt: 'La Latitud mesura la distància angular respecte a...', options: ['El Pol Nord', 'El Meridià de Greenwich', 'L\'Equador (en graus Nord o Sud)', 'La línia de canvi de data'], correct: 'L\'Equador (en graus Nord o Sud)' },
  { id: 'q4', prompt: 'La Longitud mesura la distància angular respecte a...', options: ['L\'Equador', 'El Meridià de Greenwich (en graus Est o Oest)', 'El Pol Sud', 'La Rosa dels Vents'], correct: 'El Meridià de Greenwich (en graus Est o Oest)' },
  { id: 'q5', prompt: 'Màxim de graus de latitud (als pols)?', options: ['45°', '90°', '180°', '360°'], correct: '90°' },
  { id: 'q6', prompt: 'Màxim de graus de longitud Est/Oest?', options: ['90°', '180°', '270°', '360°'], correct: '180°' },
  { id: 'q7', prompt: 'Tots els meridians tenen la mateixa longitud?', options: ['Sí, és Veritat (tots uneixen Pol Nord i Sud)', 'No, és Fals (l\'Equador és més gran)', 'Només els de l\'Hemisferi Nord', 'Depèn de l\'estació'], correct: 'Sí, és Veritat (tots uneixen Pol Nord i Sud)' },
  { id: 'q8', prompt: 'Tots els paral·lels mesuren el mateix?', options: ['Sí, tots fan el mateix cercle', 'No, l\'Equador és el més gran i s\'empetiteixen fins als pols', 'Tots mesuren 180°', 'Només els tròpics són iguals'], correct: 'No, l\'Equador és el més gran i s\'empetiteixen fins als pols' },
  { id: 'q9', prompt: 'Ordre correcte d\'escriure coordenades?', options: ['Primer Longitud i després Latitud', 'Primer Latitud (N/S) i després Longitud (E/O)', 'Només el continent', 'El nombre més gran primer'], correct: 'Primer Latitud (N/S) i després Longitud (E/O)' },
  { id: 'q10', prompt: 'Paral·lel a 23,5° S?', options: ['Tròpic de Càncer', 'Cercle Polar Àrtic', 'Tròpic de Capricorn', 'Meridià de Greenwich'], correct: 'Tròpic de Capricorn' },
  { id: 'q11', prompt: 'Paral·lel a 23,5° N?', options: ['Tròpic de Càncer', 'Tròpic de Capricorn', 'Cercle Polar Antàrtic', 'L\'Equador'], correct: 'Tròpic de Càncer' },
  { id: 'q12', prompt: 'Latitud del Cercle Polar Àrtic?', options: ['23,5° N', '66,5° N', '90° N', '0°'], correct: '66,5° N' },
  { id: 'q13', prompt: 'Latitud exacta sobre l\'Equador?', options: ['90° N', '180°', '0°', '45° S'], correct: '0°' },
  { id: 'q14', prompt: 'Longitud exacta sobre Greenwich?', options: ['0°', '90° E', '180°', '23,5° O'], correct: '0°' },
  { id: 'q15', prompt: 'Graus totals de meridians a la Terra?', options: ['180°', '90°', '360° (180° Est + 180° Oest)', '100°'], correct: '360° (180° Est + 180° Oest)' },
  { id: 'q16', prompt: 'Punt cardinal oposat al Nord?', options: ['Est', 'Oest', 'Sud', 'Nord-oest'], correct: 'Sud' },
  { id: 'q17', prompt: 'Entre Nord i Est?', options: ['Nord-oest (NO)', 'Nord-est (NE)', 'Sud-est (SE)', 'Sud-oest (SO)'], correct: 'Nord-est (NE)' },
  { id: 'q18', prompt: 'Coordenades (25° S, 135° E): hemisferis?', options: ['Nord i Occidental', 'Sud i Oriental (Est)', 'Nord i Oriental', 'Als dos pols'], correct: 'Sud i Oriental (Est)' },
  { id: 'q19', prompt: 'Dues ciutats al mateix paral·lel comparteixen…', options: ['La mateixa latitud', 'La mateixa longitud', 'El mateix país', 'La mateixa hora solar'], correct: 'La mateixa latitud' },
  { id: 'q20', prompt: 'Dues ciutats al mateix meridià comparteixen…', options: ['La mateixa latitud', 'La mateixa longitud', 'La mateixa temperatura', 'El mateix clima'], correct: 'La mateixa longitud' },
]

export function signedLat(deg, dir) {
  return dir === 'S' ? -Number(deg) : Number(deg)
}
export function signedLon(deg, dir) {
  return dir === 'O' ? -Number(deg) : Number(deg)
}
