# Migration QA — Checklist anti-errores

`npm run migrate:content` **extrae HTML estático**. No migra lógica de juego (`onclick`, formularios, canvas, validaciones). Antes de marcar un tema como cerrado hay que pasar esta checklist **vista por vista**.

## Reglas fijas

1. Listar cada interacción legacy (inputs, botones, validación, assets).
2. Marcar equivalente Vue (`custom` / renderer / N/A justificado).
3. Side-by-side: `Apuntes.html` vs `/subjects/...` en el hub Vue.
4. **Prohibido** dar por migrado un panel que solo tenga shell + custom con mecánica distinta.
5. Secciones `interactive` sin ejercicios → fallo en `npm run content:audit` (salvo allowlist).
6. Interacciones legacy huérfanas (`onclick=`, `check*`, `canvas`, inputs tipados) deben tener entrada en `exercisesBySection` / `customRegistry`.

## Automatización

```bash
cd study-hub
npm run content:audit
```

El auditor escribe `content-packages/topics/coverage-report.json` y sale con código ≠ 0 si hay gaps críticos.

## Plantilla vista-por-vista (copiar por tema)

| Vista / bloque legacy | Qué hace | Equivalente Vue | Estado |
|---|---|---|---|
| … | … | custom / renderer / N/A | MIGRAT / PARCIAL / PENDENT / MECÀNICA CANVIADA |

Estados admitidos: **MIGRAT** · **PARCIAL** · **PENDENT** · **MECÀNICA CANVIADA**.

Criterio de cierre: todas las filas de la matriz de aceptación del tema en **MIGRAT**.

**Auditoría completa de toda la web (todos los temas Vue):**  
[`AUDITORIA_PARITY_VISTAS.md`](AUDITORIA_PARITY_VISTAS.md) — inventario vista por vista legacy vs Vue + roadmap de remediación.

Inventario automático: `node scripts/build-parity-inventory.mjs` → `study-hub/content-packages/topics/parity-inventory.json`.

---

## Matriz de aceptación — Coordenades (`projecte/coordenadas`)

Antes de marcar Coordenades cerrado, cada fila debe estar **MIGRAT**:

| # | Criterio | Custom / módulo | Estado |
|---|---|---|---|
| 1 | Teoría TTS rosa + líneas clave | `WindRoseSpeak` | MIGRAT |
| 2 | Teoría V/F 5 con explicación | `TheoryTrueFalse` | MIGRAT |
| 3 | Radar formulario + validación ±6° + locKey | `RadarCaptureLab` + `coordenadasData.js` | MIGRAT |
| 4 | Radar sin spoiler pins / hitbox solo selecciona | `RadarCaptureLab` | MIGRAT |
| 5 | Generador aleatorio 3 dificultades × 2 modos | `CoordGridGenerator` (vía `MapPointsHub`) | MIGRAT |
| 6 | Fitxa A–E tipada | `CoordGridGenerator` | MIGRAT |
| 7 | Continents explore + paint + quiz | `ContinentsOceansLab` | MIGRAT |
| 8 | Esfera panel estático con imagen | `CoordGridGenerator` (bloque esfera) | MIGRAT |
| 9 | Constelación 23 puntos canvas | `ConstellationCanvas` | MIGRAT |
| 10 | Test banco oficial 20 preguntas | `OFFICIAL_QUIZ` en `coordenadas.js` | MIGRAT |
| 11 | Fitxes PDF abren Local correctamente | `manifest.documents` (encoding `%20`) | MIGRAT |

### Notas Drive (regla 7 AGENTS.md)

Enlaces Drive integrados en `manifest.documents` (botones duales Local/Drive en Fitxes):

- `1. Cerca els pokemons del Team Rocket.pdf` → `19FDieISSkqv5PgC2JKDXyaEMKSkydwgd`
- `4. Practiquem més.pdf` → `1tImr8eCDp6kQDe44NGkhGoS_6wpnlsoI`
- `A practicar.pdf` → `1Adr1GQqKtJQssRTo1oW7VlehG9U6-HWG`
- `Cooredenades llegendaris.pdf` → `1gzjyKZuZH0OpXrwS-TuHR8IuRsgG4b3S`

### Smoke side-by-side (Coordenades)

1. Teoría → TTS rosa/líneas + V/F con explicación.
2. Radar → seleccionar (no capturar al clic) → escribir form → capturar ±6°.
3. Mapa → generador easy/normal/hard + coords/click; A–E; continents 3 modos; esfera.
4. Llegendari → 23 puntos, líneas doradas, pista radar.
5. Test → 20 MC oficiales.
6. Fitxes → Local abre PDF.

---

## Fase 2 — Auditoría dirigida

Detalle completo por pestaña: [`AUDITORIA_PARITY_VISTAS.md`](AUDITORIA_PARITY_VISTAS.md).

### Acción fase 2

- Ejecutar `npm run content:audit` y tratar `noEx=` / `orphanInteractions` como deuda.
- Temas en `TOPIC_DEBT_ALLOWLIST` de `scripts/audit-content-coverage.mjs`: reportados pero no bloquean hasta cierre.
- Prioridad post-Coordenades: **mates/operaciones** (generadores + banco 32) → **posat_a_prova** (català + mates) → **castellano/tema2** / **català/tema2** generadores.
- No cerrar un tema hasta matriz propia en estado MIGRAT.

---

## Orden de trabajo anti-regresión (cualquier tema)

1. Extraer contrato de datos del legacy (arrays + reglas).
2. Implementar custom Vue con esas reglas (no flags genéricos con mecánica distinta).
3. Smoke side-by-side de la pestaña.
4. Prune del panel muerto → shell honesto.
5. `content:audit` verde.
