# Auditoría de paridad vista por vista (legacy vs Vue)

Inventario de **toda** la web Vue migrada frente a `Apuntes.html`.  
Estados: **MIGRAT** · **PARCIAL** · **PENDENT** · **MECÀNICA CANVIADA** · **N/A**.

Regenerar métricas base:

```bash
cd study-hub
node scripts/build-parity-inventory.mjs   # → content-packages/topics/parity-inventory.json
npm run content:audit
```

Checklist operativa: [`MIGRATION_QA.md`](MIGRATION_QA.md).

---

## Resumen ejecutivo *(actualizado tras remediación 2026-11-01)*

| Tema | Veredicto global | Estado remediación |
|---|---|---|
| `projecte/coordenadas` | Customs dedicados (radar form, 23 pts, etc.) | **Cerrada** |
| `mates/operaciones` | Generadores mult/div/PEMDAS/ficha + 32 problemas | **Remediado** |
| `mates/posat_a_prova_1` | Examen + Pro + entrenador EMAT | **Remediado** (mapa SVG pendiente) |
| `catala/posat_a_prova_1` | Examen 10 + Pro 10 + entrenador | **Remediado** |
| `castellano/tema2` | VerbLab + SpaceMission + MasterQuiz | **Remediado** |
| `catala/tema2` | Accent/Wordwall/Adj/Polisèmia + quiz | **Remediado** |
| `projecte/pasdeltemps` | 18 edats H5P + taller romà 23 | **Remediado** |
| `mates/romanos` | Detective aleatorio añadido | **Remediado** |
| `curie/wordslist` | CategorySorterTimed + quiz shuffle | **Remediado** |
| `catala/sant_baldiri` | ContextSynonymLab | **Remediado** |
| `castellano/comunicacion` / `signo_puntuacion` | Alta; paneles pruneados | OK |
| `tutoria/calendario` | Nativo Vue | N/A |

**Patrón corregido:** customs con **mismas reglas** que el legacy (no shells + mecánica distinta).

**Docs Drive:** 0 PDFs sin `driveUrl` tras sync.

---

## 1. `projecte/coordenadas` — Coordenades & Pokémon

Matriz de aceptación (cerrada):

| # | Criterio | Equivalente | Estado |
|---|---|---|---|
| 1 | Teoría TTS rosa + líneas | `WindRoseSpeak` | MIGRAT |
| 2 | Teoría V/F 5 + explicación | `TheoryTrueFalse` | MIGRAT |
| 3 | Radar form ±6° + locKey | `RadarCaptureLab` | MIGRAT |
| 4 | Radar hitbox solo selecciona | `RadarCaptureLab` | MIGRAT |
| 5 | Generador 3×2 modos | `CoordGridGenerator` / `MapPointsHub` | MIGRAT |
| 6 | Fitxa A–E | `CoordGridGenerator` | MIGRAT |
| 7 | Continents explore/paint/quiz | `ContinentsOceansLab` | MIGRAT |
| 8 | Esfera estática | bloque esfera | MIGRAT |
| 9 | Constelación 23 | `ConstellationCanvas` | MIGRAT |
| 10 | Test 20 oficial | `OFFICIAL_QUIZ` | MIGRAT |
| 11 | Fitxes Local+Drive | `manifest.documents` | MIGRAT |

**Veredicto:** referencia de paridad para el resto de temas.

---

## 2. `castellano/comunicacion`

| Vista | Bloques clave | Equivalente Vue | Estado |
|---|---|---|---|
| Circuito | Teoría + resource hub | `theoryHtml` + ResourceHub | MIGRAT |
| Circuito | Exploración interactiva | `CircuitExplorer` | MIGRAT |
| Circuito | Nodos onclick en panel | — (muertos) | PENDENT |
| Datealpié | Cuento + ficha | panel + MC | MECÀNICA CANVIADA |
| Situaciones | 5 casos | `SituationsLab` | MIGRAT |
| Diccionario | RAE + 25 abreviaturas | `RaeSimulator` + `AbbreviationLab` | MIGRAT |
| Tipos | Clasificar tipos | `DictTypesLab` | MIGRAT |
| Alfabético | 3 retos | `AlphaOrderLab` | MIGRAT |
| Cómic | 3 viñetas | `ComicWorkshop` | MIGRAT |
| Quiz | 10 aleatorias | `MasterQuiz` | MIGRAT |
| Recursos | Chuleta + Drive | panel | MIGRAT |

**Veredicto:** paridad alta. Deuda: HTML embebido con `onclick` muerto.  
**Conteo aprox.:** 18 MIGRAT · 1 PENDENT · 1 MECÀNICA · 1 PARCIAL.

---

## 3. `castellano/signo_puntuacion`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Apuntes | Teoría signos | `theoryHtml` | MIGRAT |
| Flashcards | 15 + TTS | `FlashcardsSpeak` | MIGRAT |
| Memory | Parejas signo↔regla | `memory` | MIGRAT |
| Workshop | 14 frases + teclado signos | `PunctuationWorkshop` | MIGRAT |
| Orden alfab. en taller | 3 niveles | `AlphaOrderLab` | MIGRAT |
| Sorter | Contrarreloj | `PunctuationSorter` | MIGRAT |
| Quiz | 10 barajadas | `MasterQuiz` fijo | MECÀNICA CANVIADA |
| Cheatsheet / Docs | Estático + 7 PDF Drive | paneles + DocShelf | MIGRAT |
| Paneles legacy duplicados | UI sin JS | shells/HTML muerto | PENDENT |

**Veredicto:** customs de puntuación sólidos; quiz pierde aleatoriedad.  
**Docs Drive:** OK.

---

## 4. `castellano/tema2`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Apuntes | Teoría EGA + hub | `theoryHtml` | MIGRAT |
| Lectura | El perro azul + checkLectura | MC genérico | MECÀNICA CANVIADA |
| Vocabulario | Tecnicismos / parónimas | fill_blank parcial | PARCIAL |
| Verbo | Generador DELE + conjugaciones | MC/fill fijos | PENDENT (generadores) |
| Acentuación | Drag + LearningApps | `DragClassify` + fill | PARCIAL |
| Taller espacial | `validateSpaceReport` | fill genérico | PENDENT |
| Quiz | Banco dinámico 10 | MC fijo 10 | MECÀNICA CANVIADA |
| Documentos | 8 PDF | DocShelf + Drive sync | MIGRAT |

**Veredicto:** teoría y drag OK; **faltan generadores** de verbo/taller/quiz.  
**Prioridad:** Alta.

---

## 5. `catala/sant_baldiri`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Apunts | Teoría + vídeos | panel + resources | MIGRAT |
| Lectura | Comprensió botons | MC | MECÀNICA CANVIADA |
| Sinònims | Parelles 2 rondes + context | matching / fill | MECÀNICA CANVIADA / PENDENT |
| Dígrafs | Exercicis + Wordwall | MC/TF + resources | MECÀNICA CANVIADA |
| El nom | Classificació | MC + matching | MECÀNICA CANVIADA |
| Expressió | Taller redacció | fill corto | PARCIAL |
| Quiz | Master 10 | MC 10 | MECÀNICA CANVIADA |
| Fitxes | 11 docs Drive | DocShelf | MIGRAT |

**Veredicto:** contenido y PDFs OK; juegos pasan a renderers genéricos.  
**Prioridad:** Media.

---

## 6. `catala/tema2`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Apunts | Teoría + Genially | panel + resources | MIGRAT |
| Lectura | Trobada anguniosa | MC + fill | MECÀNICA CANVIADA |
| Polisèmia | Fitxes Ex1–3 interactives | MC/match; fitxes PDF only | PENDENT |
| Accentuació | Wordwall 15+21 + generador | `DragClassify` 9 ítems | PARCIAL / PENDENT |
| Adjectiu | Generadors femení/plural | fill/MC | MECÀNICA CANVIADA |
| Mail | `validateAndSendEmail` | `EmailComposer` | MIGRAT |
| Quiz | Dinàmic | MC fix | MECÀNICA CANVIADA |
| Documents | 12+ PDF | DocShelf + Drive sync | MIGRAT |

**Veredicto:** mail fuerte; **accentuació/Wordwall/fitxes** son el gap.  
**Prioridad:** Alta.

---

## 7. `catala/posat_a_prova_1`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Teoria | Panel ~14k | panel | MIGRAT |
| Examen | checkEx1…10 completo | 4 blocs Vue | PARCIAL |
| Examen panel | UI legacy | onclick muerto | PENDENT |
| Pro | checkPro1…10 | subset Vue | PARCIAL |
| Generador | Entrenador infinit | MC + ordering | MECÀNICA CANVIADA |

**Veredicto:** misma patología que mates posat_a_prova — examen oficial no clonado.  
**Prioridad:** Crítica.  
**Customs:** ninguno (`customs=[]`).

---

## 8. `mates/operaciones`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Apuntes | Jerarquía / algoritmos | theory + panel | MIGRAT |
| Sprint | ~60 ops / 2 min | `MentalSprint` | MIGRAT |
| Multiplicación | Generador paso a paso | `MultiplicationBoard` caso fijo | PARCIAL |
| División | Generador visual | fill estático | MECÀNICA CANVIADA |
| Worksheet | Full aleatorio | 2 fill fijos | PARCIAL |
| Paréntesis | PEMDAS aleatorio | MC 4 fijos | MECÀNICA CANVIADA |
| Problemas | Banco ~32 | 2 problemas | PARCIAL |
| Cheatsheet | Trucos | panel + MC | MIGRAT |

**Veredicto:** sprint OK; **generadores y banco de problemas** muy por debajo.  
**Prioridad:** Crítica.

---

## 9. `mates/romanos`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Teoría | Extensa | panel | MIGRAT |
| Conversor | Bidireccional | `RomanConverter` | MIGRAT |
| Práctica | Taller mixto | fill_blank | MECÀNICA CANVIADA |
| Detective | Aleatorio / canvas | TF fijo | MECÀNICA CANVIADA |
| Siglos + reloj | Calculadora + esfera | `CenturyCalculator` + `RomanClockLab` | MIGRAT |
| Coliseo | Timed | `TimedChoiceLab` | MIGRAT |
| Print | Ficha A4 | `PrintableRomanSheet` | MIGRAT |

**Veredicto:** mejor paridad de customs tras Coordenades. Detective aleatorio = mejora pendiente.  
**Prioridad:** Baja.

---

## 10. `mates/posat_a_prova_1`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Teoria | EMAT | panel | MIGRAT |
| Examen | Secciones check* completas | 4 blocs Vue | PARCIAL |
| Panel examen | Duplicado | onclick muerto | PENDENT |
| Pro | Retos | fill/MC corto | PARCIAL |
| Generador | Infinito | `MentalSprint` + MC | MECÀNICA CANVIADA |

**Veredicto:** teoría OK; examen oficial incompleto.  
**Prioridad:** Crítica.

---

## 11. `curie/wordslist`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Flashcards | 35 + TTS + filtros | `FlashcardsSpeak` | MIGRAT |
| Memory | 12 parejas | `memory` | MIGRAT |
| Quiz | Dinámico barajado | MC 12 fijas | MECÀNICA CANVIADA |
| Spelling | Ortografía EN | fill_blank 10 | MIGRAT |
| Sorter | Contrarreloj categorías | MC estático | MECÀNICA CANVIADA |
| Cheatsheet | Tabla 35 | panel + TF/ordering | MECÀNICA CANVIADA |
| Theory section | — | No hay sección theory en manifest | PENDENT |

**Veredicto:** vocabulario core OK; sorter/quiz pierden dinamismo.  
**Drive:** `words List Lab.pdf` cableado a carpeta Curie.

---

## 12. `projecte/pasdeltemps`

| Vista | Legacy | Vue | Estado |
|---|---|---|---|
| Teoria | ~53k + Genially | panel + resources | MIGRAT |
| Romans | Taller 3 acts exhaustivo | `RomanConverter` + fill | PARCIAL |
| Segles | Reixeta + checkAll | `CenturyCalculator` + grid | MIGRAT |
| Edats H5P | Drag 18 + blanks | `DragClassify` 10 + TF/ordering | PARCIAL / MECÀNICA |
| Península | Quiz + crono | MC + ordering | MIGRAT |
| Documents | 5 PDF | DocShelf + Drive sync | MIGRAT |

**Veredicto:** teoría/península fuertes; H5P drag y taller romà cortos.  
**Prioridad:** Media.

---

## 13. `tutoria/calendario`

| Bloque | Legacy | Vue | Estado |
|---|---|---|---|
| Apuntes.html | No existe | — | N/A |
| Calendario Google | — | `CalendarView` embed | MIGRAT |

**Veredicto:** tema nativo Vue.

---

## Roadmap residual (opcional)

Ya remediado el bloque crítico/alta/media del inventario. Quedan mejoras menores:

1. Mapa SVG interactivo EMAT (`mates/posat_a_prova_1`) y nota global unificada tipo legacy.
2. Sección theory en `curie/wordslist` (regla 9) si se quiere aparte del cheatsheet.
3. Smoke side-by-side manual pestaña a pestaña contra cada `Apuntes.html`.

Orden anti-regresión: **datos legacy → custom con mismas reglas → smoke → prune → `content:audit`**.

---

## Scripts de soporte

| Script | Uso |
|---|---|
| `scripts/build-parity-inventory.mjs` | Snapshot secciones / customs / onclick / docs |
| `scripts/sync-drive-from-panels.mjs` | Rellena `driveUrl` desde HTML de paneles |
| `npm run content:audit` | Gates de cobertura + customs registrados |
