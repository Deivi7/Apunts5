// Dades i exercicis del tema: Una mica més d'història — L'Edat Antiga (projecte/edat_antiga)
// Cap pista ni sub-enunciat no revela mai la resposta ni passos resolts.

// ============================================================================
// PESTANYA 2: CIVILITZACIONS FLUVIALS (fluvials)
// ============================================================================
export const FLUVIALS_PAIRS = [
  { left: 'Egipte (piràmides i faraons)', right: 'Riu Nil' },
  { left: 'Mesopotàmia (primera escriptura)', right: 'Rius Tigris i Eufrates' },
  { left: 'Civilització Índia (ciutats de rajola i clavegueram)', right: 'Riu Indus' },
  { left: 'Civilització Xina (arròs, seda i tinta)', right: 'Riu Groc' },
]

export const FLUVIALS_BLANKS = [
  {
    id: 'fl-b-1',
    badge: 'Egipte',
    sub: 'Escriu el nom del gran riu africà al voltant del qual va néixer Egipte',
    before: 'La civilització d\'Egipte es va desenvolupar al voltant del riu',
    after: '.',
    answers: ['Nil', 'nil'],
    placeholder: 'Nom del riu',
  },
  {
    id: 'fl-b-2',
    badge: 'Mesopotàmia',
    sub: 'Completa amb el segon riu que banya Mesopotàmia juntament amb el Tigris',
    before: 'Mesopotàmia es va desenvolupar entre els rius Tigris i',
    after: '.',
    answers: ['Eufrates', 'Èufrates', 'eufrates', 'èufrates'],
    placeholder: 'Nom del riu',
  },
  {
    id: 'fl-b-3',
    badge: 'Índia',
    sub: 'Escriu el nom del riu que dóna nom a la civilització Índia',
    before: 'La civilització Índia es va desenvolupar al voltant del riu',
    after: '.',
    answers: ['Indus', 'indus'],
    placeholder: 'Nom del riu',
  },
  {
    id: 'fl-b-4',
    badge: 'Xina',
    sub: 'Escriu el color que dóna nom al gran riu de la civilització Xina',
    before: 'La civilització Xina es va desenvolupar al voltant del riu',
    after: '.',
    answers: ['Groc', 'groc'],
    placeholder: 'Color del riu',
  },
]

export const FLUVIALS_TF = [
  {
    id: 'fl-tf-1',
    statement: 'S\'anomenen civilitzacions fluvials perquè es van desenvolupar a les valls dels grans rius d\'aigua dolça.',
    answer: true,
    explanation: 'Correcte! L\'aigua dolça garantia beguda, terres fèrtils, canals de reg i transport amb barques.',
  },
  {
    id: 'fl-tf-2',
    statement: 'L\'Edat Antiga comença amb el descobriment d\'Amèrica l\'any 1492.',
    answer: false,
    explanation: 'Fals! L\'Edat Antiga comença cap al 3.000 / 3.500 aC amb la invenció de l\'escriptura i acaba el 476 dC amb la caiguda de l\'Imperi Romà.',
  },
  {
    id: 'fl-tf-3',
    statement: 'A Mesopotàmia es va inventar la primera escriptura de la història humana.',
    answer: true,
    explanation: 'Cert! A Mesopotàmia (entre el Tigris i l\'Eufrates) va néixer la primera escriptura.',
  },
  {
    id: 'fl-tf-4',
    statement: 'Quan els grans rius creixien, deixaven un fang ric que feia molt fèrtils les terres de cultiu.',
    answer: true,
    explanation: 'Cert! Aquest fang o llim feia créixer el blat i els cereals amb molta força.',
  },
]

// ============================================================================
// PESTANYA 3: IBERS, CELTES I POBLES COLONITZADORS (pobles)
// ============================================================================
export const POBLES_SEQUENCE = [
  '1r: Els Fenicis arriben des del Pròxim Orient (Líban) i funden Gades (Cadis) al segle IX-VIII aC.',
  '2n: Els Grecs arriben des de Massàlia i funden Empòrion (Empúries) i Rhode (Roses) al segle VI aC.',
  '3r: Els Cartaginesos arriben des del nord d\'Àfrica i funden Qart Hadasht (Cartagena) i Eivissa.',
  '4t: Els Romans desembarquen a Empúries l\'any 218 aC durant les Guerres Púniques.',
]

export const POBLES_MC = [
  {
    id: 'pb-mc-1',
    question: 'Quina diferència hi havia entre les cases dels poblats ibers i les dels castres celtes?',
    options: [
      'Els ibers feien cases de planta rectangular i els celtes feien cases de planta circular.',
      'Els ibers vivien en coves subterrànies i els celtes en gratacels de pisos.',
      'Tots dos feien palaus de marbre sense muralles.',
      'Els celtes vivien en vaixells i els ibers en tendes de pell.',
    ],
    answer: 'Els ibers feien cases de planta rectangular i els celtes feien cases de planta circular.',
    explanation: 'Els poblats ibers tenien carrers i cases rectangulars, mentre que els castres celtes tenien cases circulars amb sostre de palla.',
  },
  {
    id: 'pb-mc-2',
    question: 'Quin era l\'objectiu principal pel qual fenicis, grecs i cartaginesos van navegar fins a la Península Ibèrica?',
    options: [
      'Buscaven metalls (coure, plata, estany, or) i nous mercats per comerciar.',
      'Fugien del fred glacial del pol nord.',
      'Venien a construir piràmides al desert.',
      'Volien aprendre a caçar mamuts.',
    ],
    answer: 'Buscaven metalls (coure, plata, estany, or) i nous mercats per comerciar.',
    explanation: 'La Península Ibèrica era molt rica en metalls com plata, coure, estany i or.',
  },
  {
    id: 'pb-mc-3',
    question: 'Quines dues colònies molt importants van fundar els grecs a la costa de Catalunya?',
    options: [
      'Gades (Cadis) i Malaca (Màlaga)',
      'Empòrion (Empúries) i Rhode (Roses)',
      'Cartago Nova (Cartagena) i Ebusus (Eivissa)',
      'Tàrraco (Tarragona) i Ilerda (Lleida)',
    ],
    answer: 'Empòrion (Empúries) i Rhode (Roses)',
    explanation: 'Els grecs van fundar Empòrion (Empúries) i Rhode (Roses) al litoral gironí.',
  },
  {
    id: 'pb-mc-4',
    question: 'Quin poble preromà vivia al centre, nord i oest de la Península, destacava en la ramaderia i els metalls, però NO tenia escriptura ni moneda?',
    options: ['Els Ibers', 'Els Celtes', 'Els Fenicis', 'Els Grecs'],
    answer: 'Els Celtes',
    explanation: 'Els celtes eren una societat rural i guerrera que no va desenvolupar l\'escriptura ni l\'ús de la moneda.',
  },
]

export const POBLES_PAIRS = [
  { left: 'Ibers', right: 'Costa mediterrània, cases rectangulars, escriptura ibèrica i moneda' },
  { left: 'Celtes', right: 'Nord, oest i Messeta, castres amb cases circulars i orfebreria' },
  { left: 'Fenicis', right: 'Procedents del Líban; funden Gades (Cadis) i aporten l\'alfabet fenici' },
  { left: 'Grecs', right: 'Funden Empòrion (Empúries) i Rhode (Roses); aporten la moneda' },
  { left: 'Cartaginesos', right: 'Procedents del nord d\'Àfrica; funden Cartago Nova i Eivissa' },
]

// ============================================================================
// PESTANYA 4: ROMANITZACIÓ I HISPÀNIA (romanitzacio)
// ============================================================================
export const ROMA_CITIES_BLANKS = [
  {
    id: 'rc-1',
    badge: 'Tarragona',
    sub: 'Escriu el nom romà de la ciutat de Tarragona',
    before: 'A l\'època romana, la ciutat de Tarragona s\'anomenava',
    after: '.',
    answers: ['Tàrraco', 'Tarraco', 'tàrraco', 'tarraco'],
    placeholder: 'Nom romà',
  },
  {
    id: 'rc-2',
    badge: 'Barcelona',
    sub: 'Escriu el nom romà de la ciutat de Barcelona',
    before: 'A l\'època romana, la ciutat de Barcelona s\'anomenava',
    after: '.',
    answers: ['Barcino', 'barcino'],
    placeholder: 'Nom romà',
  },
  {
    id: 'rc-3',
    badge: 'Girona',
    sub: 'Escriu el nom romà de la ciutat de Girona',
    before: 'A l\'època romana, la ciutat de Girona s\'anomenava',
    after: '.',
    answers: ['Gerunda', 'gerunda'],
    placeholder: 'Nom romà',
  },
  {
    id: 'rc-4',
    badge: 'Lleida',
    sub: 'Escriu el nom romà de la ciutat de Lleida',
    before: 'A l\'època romana, la ciutat de Lleida s\'anomenava',
    after: '.',
    answers: ['Ilerda', 'ilerda'],
    placeholder: 'Nom romà',
  },
  {
    id: 'rc-5',
    badge: 'Inici Conquesta',
    sub: 'Escriu l\'any (aC) en què els romans van desembarcar a Empúries',
    before: 'Els romans van desembarcar a Empúries l\'any',
    after: 'aC.',
    answers: ['218'],
    placeholder: 'Any',
  },
  {
    id: 'rc-6',
    badge: 'Final Conquesta',
    sub: 'Escriu l\'any (aC) en què l\'emperador August va acabar la conquesta',
    before: 'L\'emperador August va acabar la conquesta d\'Hispània l\'any',
    after: 'aC.',
    answers: ['19'],
    placeholder: 'Any',
  },
]

export const ROMANITZACIO_MC = [
  {
    id: 'rom-mc-1',
    question: 'Què és exactament la Romanització?',
    options: [
      'El procés pel qual els pobles conquerits van adoptar la llengua (el llatí), les lleis, la religió i els costums dels romans.',
      'El viatge que feien els emperadors de Roma cap a Egipte.',
      'La construcció de castells medievals durant el feudalisme.',
      'El comerç d\'espècies amb l\'Índia i la Xina.',
    ],
    answer: 'El procés pel qual els pobles conquerits van adoptar la llengua (el llatí), les lleis, la religió i els costums dels romans.',
    explanation: 'La romanització és l\'adaptació dels pobles ibers i celtes a la forma de vida, llengua i lleis romanes.',
  },
  {
    id: 'rom-mc-2',
    question: 'Com es dividia la societat a l\'Imperi Romà?',
    options: [
      'En persones lliures (rics i humils) i esclaus (que no tenien llibertat ni drets i eren propietat d\'una altra persona).',
      'En senyors feudals, cavallers i serfs de la gleva.',
      'En faraons, escribes i sacerdots.',
      'Tots els habitants tenien exactament els mateixos drets i riqueses.',
    ],
    answer: 'En persones lliures (rics i humils) i esclaus (que no tenien llibertat ni drets i eren propietat d\'una altra persona).',
    explanation: 'A Roma hi havia persones lliures (rics i humils) i esclaus (que treballaven al camp, a les mines, a les cases o com a gladiadors).',
  },
  {
    id: 'rom-mc-3',
    question: 'Quins eren els tres conreus més importants de l\'agricultura romana a Hispània i quina famosa salsa de peix s\'exportava?',
    options: [
      'Blat, vinya i olivera (i exportaven garum, salsa de peix).',
      'Patata, tomàquet i blat de moro.',
      'Arròs, canya de sucre i cacau.',
      'Cotó, cafè i te.',
    ],
    answer: 'Blat, vinya i olivera (i exportaven garum, salsa de peix).',
    explanation: 'La trilogia mediterrània (blat, vinya i olivera) i el garum (salsa de peix) eren productes estrella d\'Hispània.',
  },
  {
    id: 'rom-mc-4',
    question: 'Com va evolucionar la religió a l\'Imperi Romà?',
    options: [
      'Inicialment eren politeistes (adoraven Júpiter, Juno i Minerva), però l\'any 380 dC el cristianisme es va convertir en la religió oficial.',
      'Sempre van adorar un sol déu des de la fundació de Roma.',
      'Adoraven únicament els rius i les muntanyes sense construir cap temple.',
      'Van adoptar la religió dels faraons egipcis l\'any 380 dC.',
    ],
    answer: 'Inicialment eren politeistes (adoraven Júpiter, Juno i Minerva), però l\'any 380 dC el cristianisme es va convertir en la religió oficial.',
    explanation: 'Els romans eren politeistes (també tenien els lars a les cases), i l\'any 380 dC el cristianisme va esdevenir la religió oficial de l\'Imperi.',
  },
]

// ============================================================================
// PESTANYA 5: EDIFICIS ROMANS I QUIZ FINAL DE 10 PREGUNTES (edificis)
// ============================================================================
export const EDIFICIS_PAIRS = [
  { left: 'Aqüeducte', right: 'Portar l\'aigua dolça fins a la ciutat per canals sobre arcs' },
  { left: 'Amfiteatre', right: 'Celebrar jocs i lluites entre gladiadors i feres' },
  { left: 'Teatre', right: 'Representar obres teatrals, comèdies i tragèdies' },
  { left: 'Circ', right: 'Celebrar les curses de carros (quadrigues)' },
  { left: 'Termes', right: 'Prendre banys públics i fer gimnàstica' },
  { left: 'Fòrum', right: 'Plaça central de la ciutat envoltada de temples, botigues i la cúria' },
]

export const EDIFICIS_BLANKS = [
  {
    id: 'ed-b-1',
    badge: 'Habitatge ric',
    sub: 'Escriu el nom llatí de les cases unifamiliars luxoses on vivien els romans rics',
    before: 'A les ciutats romanes, les famílies riques vivien en cases luxoses anomenades',
    after: '.',
    answers: ['domus', 'Domus'],
    placeholder: 'Nom de la casa',
  },
  {
    id: 'ed-b-2',
    badge: 'Habitatge humil',
    sub: 'Escriu el nom llatí dels edificis de pisos on vivia la gent més humil',
    before: 'Les persones més humils de la ciutat romana habitaven en edificis de pisos anomenats',
    after: '.',
    answers: ['insulae', 'Insulae'],
    placeholder: 'Nom dels pisos',
  },
  {
    id: 'ed-b-3',
    badge: 'Casa de camp',
    sub: 'Escriu el nom de les grans cases de camp i explotacions agrícoles romanes',
    before: 'Al camp, els propietaris rics tenien grans cases agrícoles anomenades',
    after: '.',
    answers: ['vil·les', 'villes', 'vil·la', 'villa', 'Vil·les', 'Villes'],
    placeholder: 'Nom al camp',
  },
  {
    id: 'ed-b-4',
    badge: 'Xarxa viària',
    sub: 'Escriu el nom dels camins empedrats que unien totes les ciutats de l\'Imperi',
    before: 'Per comunicar les ciutats i facilitar el comerç, els romans van construir una xarxa de',
    after: '.',
    answers: ['calçades', 'Calçades'],
    placeholder: 'Camins de pedra',
  },
]

// QUIZZ FINAL DE 10 PREGUNTES (Activitat oficial de la Diapositiva 11 del Genially)
export const EDAT_ANTIGA_QUIZ = [
  {
    q: '1. Quins fets marquen l\'inici i el final de l\'Edat Antiga?',
    options: [
      'Des de la invenció de l\'escriptura (~3.000/3.500 aC) fins a la caiguda de l\'Imperi Romà (476 dC).',
      'Des de l\'aparició del foc fins a la invenció de la roda.',
      'Des de la caiguda de Roma (476 dC) fins al descobriment d\'Amèrica (1492).',
      'Des de la Revolució Francesa (1789) fins a l\'actualitat.',
    ],
    answer: 0,
  },
  {
    q: '2. Quina és la relació correcta entre les 4 primeres civilitzacions fluvials i els seus rius?',
    options: [
      'Egipte (Nil), Mesopotàmia (Tigris i Eufrates), Índia (Indus) i Xina (Riu Groc).',
      'Egipte (Indus), Mesopotàmia (Nil), Índia (Riu Groc) i Xina (Tigris).',
      'Egipte (Ebre), Mesopotàmia (Tajo), Índia (Nil) i Xina (Danubi).',
      'Egipte (Tigris), Mesopotàmia (Indus), Índia (Eufrates) i Xina (Nil).',
    ],
    answer: 0,
  },
  {
    q: '3. On vivien els ibers i com eren els seus poblats?',
    options: [
      'A la costa mediterrània (est i sud), en poblats emmurallats dalt de turons amb cases rectangulars.',
      'Al nord i a l\'oest (Galícia i Astúries), en castres amb cases circulars.',
      'Al nord d\'Àfrica, en tendes nòmades.',
      'A les illes Britàniques, en palaus de marbre.',
    ],
    answer: 0,
  },
  {
    q: '4. Quina d\'aquestes característiques correspon als celtes de la Península Ibèrica?',
    options: [
      'Vivien en castres amb cases circulars, es dedicaven a la ramaderia i als metalls, i no tenien escriptura ni moneda.',
      'Van inventar l\'alfabet fenici i van fundar Cadis.',
      'Vivien a la costa catalana i parlaven llatí abans dels romans.',
      'Construïen aqüeductes i amfiteatres de formigó.',
    ],
    answer: 0,
  },
  {
    q: '5. En quin ordre van arribar els tres pobles colonitzadors del Mediterrani i quines ciutats van fundar?',
    options: [
      '1r Fenicis (Gades/Cadis), 2n Grecs (Empòrion/Empúries i Rhode/Roses), 3r Cartaginesos (Cartago Nova i Eivissa).',
      '1r Cartaginesos, 2n Romans i 3r Fenicis.',
      '1r Grecs (Cadis), 2n Celtes (Empúries) i 3r Ibers (Cartagena).',
      '1r Romans, 2n Grecs i 3r Fenicis.',
    ],
    answer: 0,
  },
  {
    q: '6. Quan i on va començar la conquesta romana d\'Hispània i quan va acabar?',
    options: [
      'Va començar l\'any 218 aC amb el desembarcament a Empúries (Guerres Púniques) i va acabar l\'any 19 aC amb l\'emperador August.',
      'Va començar l\'any 711 dC a Gibraltar i va acabar el 1492 a Granada.',
      'Va començar l\'any 476 dC a Tàrraco i va durar només 5 anys.',
      'Va començar l\'any 19 aC i va acabar l\'any 380 dC.',
    ],
    answer: 0,
  },
  {
    q: '7. Com s\'anomenaven a l\'època romana les quatre capitals catalanes (Tarragona, Barcelona, Girona i Lleida)?',
    options: [
      'Tàrraco, Barcino, Gerunda i Ilerda.',
      'Híspalis, Emèrita, Corduba i Gades.',
      'Tàrraco, Emporiae, Rhode i Cartago Nova.',
      'Barcino, Lusitània, Bètica i Gal·lècia.',
    ],
    answer: 0,
  },
  {
    q: '8. Quins van ser els principals instruments de la Romanització a Hispània?',
    options: [
      'La fundació de ciutats, l\'ús del llatí com a llengua comuna, la xarxa de calçades, el dret romà i el govern de Roma.',
      'L\'abandó de totes les ciutats per anar a viure als boscos.',
      'La prohibició del comerç i de la moneda.',
      'L\'ús exclusiu de l\'escriptura jeroglífica egípcia.',
    ],
    answer: 0,
  },
  {
    q: '9. Quina diferència hi havia a la ciutat romana entre el teatre, l\'amfiteatre i el circ?',
    options: [
      'Al teatre s\'hi representaven comèdies; a l\'amfiteatre hi lluitaven els gladiadors; al circ s\'hi feien les curses de carros.',
      'Al circ hi lluitaven els gladiadors i a l\'amfiteatre s\'hi banyaven.',
      'El teatre servia per portar aigua i el circ era la plaça del mercat.',
      'Tots tres edificis tenien exactament la mateixa forma i funció.',
    ],
    answer: 0,
  },
  {
    q: '10. Quina diferència hi havia entre una domus, una insula i una vil·la romana?',
    options: [
      'La domus era la casa unifamiliar dels rics a la ciutat; la insula era un edifici de pisos per a la gent humil; la vil·la era una gran casa de camp agrícola.',
      'La insula era el temple dels déus i la domus era el bany públic.',
      'La vil·la era un edifici de pisos i la domus era un camí empedrat.',
      'Eren tres noms diferents per anomenar l\'aqüeducte.',
    ],
    answer: 0,
  },
]

