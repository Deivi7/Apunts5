# AUDITORÍA DEL PROYECTO — Álvaro Study Hub

**Fase 1 — Solo análisis. Sin reescritura de módulos.**  
**Fecha:** 1 de noviembre de 2026  
**Estado:** Pendiente de aprobación de arquitectura antes de Fase 2  
**Alcance:** Repositorio completo en `c:\Proyectos\Apuntes Alvaro`

---

## 0. Resumen ejecutivo

Álvaro Study Hub es hoy una **plataforma estática multi-página** (HTML + CSS + JavaScript embebido), pensada para 5º de Primaria, que funciona **sin servidor** (`file:///` o cualquier hosting estático). Tiene:

| Métrica | Valor |
| :--- | :--- |
| Asignaturas oficiales | **14** (todas con enlace Drive) |
| Módulos interactivos HTML | **12** (más `mates/romanos` existente pero **no registrado** en el portal) |
| Líneas aprox. de `Apuntes.html` | ~**30.400** en total |
| Tamaño módulos HTML | 85–257 KB por archivo |
| CSS compartido | `assets/css/common.css` (~22 KB) |
| JS compartido | **No existe** (todo duplicado por módulo) |
| Backend / API / PWA | **No existen** |
| Persistencia | `localStorage` (XP, rachas, progreso, tema, mute) |
| Medios locales | ~40 PDF, 8 MP4, ~88 imágenes, 1 JSON SVG |

**Veredicto:** el contenido pedagógico y las mecánicas especializadas son el activo principal. La arquitectura actual **no escala** a multiusuario / multi-etapa / offline-first oficial, pero **sí se puede evolucionar** sin tirar el trabajo: conviene levantar la nueva plataforma en una carpeta hermana (`study-hub/`) y migrar módulo a módulo, dejando el legacy intacto hasta validar cada uno.

---

## 1. Arquitectura actual

### 1.1. Modelo

```text
[Portal index.html]
        │
        ├── Subject cards (array SUBJECTS en JS inline)
        ├── Google Calendar (iframe)
        ├── Pomodoro / mute / dark mode
        └── Enlaces relativos → [asignatura]/[tema]/Apuntes.html
                                      │
                                      ├── Apuntes.css (específico)
                                      ├── ../../assets/css/common.css
                                      ├── JS embebido (estado, XP, corrección, tabs)
                                      ├── documents/ (PDF, MP4…)
                                      └── img/ / extracted/ (según módulo)
```

- **Sin build step**, sin bundler, sin framework.
- **Sin carpeta `assets/js`**: cada `Apuntes.html` reinventa `addXP`, `playSound`, `toggleDarkMode`, `switchTab`, etc.
- **Sin package.json**, sin tests, sin CI.
- Documentación viva: `AGENTS.md` + `DECISIONES.md` (normas pedagógicas y de UI). `README.md` es casi vacío (`# Apunts5`).

### 1.2. Capas detectadas

| Capa | Implementación actual |
| :--- | :--- |
| Presentación | HTML monolítico + CSS global + CSS por tema |
| Navegación | Sidebar sticky + `switchTab()`; topic switchers cruzados |
| Dominio educativo | Hardcodeado en cada HTML (teoría, ejercicios, soluciones) |
| Gamificación | XP/racha en memoria + `localStorage` |
| Corrección | Funciones `check*` / `grade*` por ejercicio en el cliente |
| Recursos | Dual shelf Local/Drive + Resource Hub (Genially, Wordwall…) |
| Auth / multiusuario | Inexistente (uso personal de Álvaro) |

### 1.3. Dependencia de rutas

- Rutas **relativas** (`../../assets/css/common.css`, `./documents/...`).
- Compatible con `file:///` **hoy**.
- Google Fonts y Google Calendar **requieren red**.
- Enlaces Drive / Genially / Wordwall / LearningApps / Quizizz **requieren red**.
- La futura PWA **no puede prometer offline completo vía `file:///`**; hará falta HTTP local o hosting.

---

## 2. Inventario de asignaturas y temas

### 2.1. Asignaturas (14)

| # | ID | Nombre | Carpeta | Temas interactivos en portal | Drive |
| :---: | :--- | :--- | :--- | :---: | :---: |
| 1 | `amco` | Amco | `amco/` (vacía) | 0 | Sí |
| 2 | `tutoria` | Tutoria | `tutoria/` (vacía) | 1* | Sí |
| 3 | `bae` | B.A.E | `bae/` (vacía) | 0 | Sí |
| 4 | `castellano` | Castellà | `castellano/` | 3 | Sí |
| 5 | `catala` | Català | `catala/` | 3 | Sí |
| 6 | `chess` | Chess | `chess/` (vacía) | 0 | Sí |
| 7 | `ef` | E.F. | `ef/` (vacía) | 0 | Sí |
| 8 | `film` | Film | `film/` (vacía) | 0 | Sí |
| 9 | `curie` | M. Curie | `curie/` | 1 | Sí |
| 10 | `mates` | Mates | `mates/` | 2 (+1 huérfano) | Sí |
| 11 | `musica` | Música | `musica/` (vacía) | 0 | Sí |
| 12 | `projecte` | Projecte | `projecte/` | 2 | Sí |
| 13 | `religio` | Religió | `religio/` (vacía) | 0 | Sí |
| 14 | `robotica` | Robótica | `robotica/` (vacía) | 0 | Sí |

\* Tutoria apunta a `#section-calendar` en el portal (no es un `Apuntes.html`).

### 2.2. Módulos interactivos detallados

| Módulo | Idioma | Pestañas / secciones | Estado portal |
| :--- | :--- | :--- | :--- |
| `castellano/comunicacion` | ES | 9: circuito, cuento, casos, diccionario, tipos, orden alfabético, cómic, quiz, chuleta | Registrado |
| `castellano/signo_puntuacion` | ES | Puntuación, mayúsculas, orden alfabético, flashcards, quiz | Registrado |
| `castellano/tema2` | ES | 8: teoría, lectura, vocabulario, verbo, acentuación (65 retos), misión espacial, quiz, docs | Registrado |
| `catala/sant_baldiri` | CA | 8: teoría, lectura, sinónimos, dígrafos, nombres, expresión, quiz, fitxes | Registrado |
| `catala/posat_a_prova_1` | CA | 4: teoría, examen real, nivell Pro, entrenador infinito | Registrado |
| `catala/tema2` | CA | 8: teoría, lectura, polisemia, acentuación, adjetivo, mail, quiz, docs | Registrado |
| `mates/operaciones` | ES | 8: teoría, sprint, multiplicación, división, fichas, paréntesis, problemas, trucos | Registrado |
| `mates/posat_a_prova_1` | CA | 4: teoría, examen EMAT, Pro, entrenador infinito | Registrado |
| `mates/romanos` | ES | 7: teoría, conversor, práctica, detective, siglos/reloj, Coliseo sprint, ficha A4 | **NO registrado en `index.html`** |
| `projecte/coordenadas` | CA | 6: teoría, radar Pokémon, generador, Pikachu, test 20, PDFs | Registrado |
| `projecte/pasdeltemps` | CA | 6: teoría, romanos, siglos, edades H5P, península, docs | Registrado |
| `curie/wordslist` | EN | 6: flashcards+audio, memoria, quiz lab, ortografía, clasificador, chuleta | Registrado |

### 2.3. Contenidos solo Drive (sin módulo web)

Amco, B.A.E, Chess, E.F., Film, Música, Religió, Robótica: carpetas locales vacías; acceso exclusivo vía Google Drive.

---

## 3. Inventario de funcionalidades

### 3.1. Portal (`index.html` + `index.css`)

- Grid de 14 asignaturas generado desde array `SUBJECTS`.
- Acceso adaptativo: 0 temas → Drive; 1 tema → botón directo; N temas → quick links + modal.
- Contadores dinámicos de asignaturas/temas.
- Lectura de progreso parcial vía `localStorage` (solo algunos temas).
- Pomodoro 25:00.
- Google Calendar embebido (mes/agenda/semana).
- Mute y modo oscuro (`hub_muted`, `hub_dark`).

### 3.2. Shell de módulo (patrón casi común)

- Header / navbar con vuelta al portal, selector de tema hermano, chuleta modal, sonido, XP/racha, dark mode.
- Hero banner con badge, título y stats.
- Sidebar sticky numerada (primera = teoría/apuntes).
- Resource Hub + estantería Local/Drive.
- Teoría didáctica obligatoria (regla 9 de `AGENTS.md`).

### 3.3. Sistemas transversales (duplicados, no centralizados)

| Sistema | Cómo está hoy | Claves / notas |
| :--- | :--- | :--- |
| **Navegación por pestañas** | `switchTab(id[, btn])` | Variantes ligeras entre módulos |
| **Gamificación XP** | `addXP()` + contadores | Claves distintas por módulo/asignatura |
| **Racha / streak** | Contadores locales | No unificada entre materias |
| **Corrección automática** | Decenas de `check*` / `grade*` | Soluciones en el cliente |
| **Progreso** | `localStorage` JSON | Incompleto e inconsistente |
| **Modo claro/oscuro** | `body.dark-mode` + CSS vars | Claves: `alvaro_dark_mode`, `hub_dark`, `lab_dark`, `study_dark_mode`, `alvaro_theme`, `castellano_*`… |
| **Sonido** | Web Audio API sintética + mute | Claves mute distintas |
| **Modales / chuleta** | HTML + CSS en common + lógica local | Patrón visual compartido |
| **Temporizadores** | Pomodoro (portal); sprints 2 min (mates/romanos) | Independientes |
| **Estadísticas** | XP, aciertos, récords, “mastered” | Solo cliente |
| **Recursos externos** | Drive, Genially, Wordwall, LearningApps, Quizizz, Calendar, Fonts | Requieren red |
| **Audio / TTS** | `speechSynthesis` en Curie (EN) | Depende del navegador |
| **Mapas / canvas / SVG** | Coordenadas (clics, proyección Robinson, SVG continentes) | Muy especializado |
| **Impresión A4** | Fichas sin solución / con solución | mates, romanos |

### 3.4. Claves `localStorage` detectadas (inventario)

**Preferencias UI (conservables en futuro modo local):**  
`hub_muted`, `hub_dark`, `alvaro_dark_mode`, `alvaro_theme`, `alvaro_sound_enabled`, `study_audio_muted`, `study_dark_mode`, `lab_muted`, `lab_dark`, `castellano_muted`, `castellano_dark`, `castellano_com_muted`, `castellano_com_dark`

**Resultados / progreso (conflicto con la regla futura de “modo local sin guardar resultados”):**  
`alvaro_progress_*`, `alvaro_xp_catala`, `alvaro_streak_catala`, `alvaro_romanos_*`, `alvaro_math_*`, `mates_stars`, `mates_sprint_record`, `mates_solved_problems`, `castellano_xp`, `castellano_mastered`, `castellano_com_xp`, `lab_xp`, `lab_mastered`, `alvaro_draft_sant_baldiri`

---

## 4. Inventario de tipos de ejercicios existentes

Clasificación por familia (lo que **ya hay**, no lo teórico futuro):

### 4.1. Evaluación / test
- Quiz maestro de opción múltiple (casi todos los módulos).
- Verdadero/falso y elección única en exámenes Català/Mates.
- Entrenadores tipo Quizizz / LearningApps **reimplementados** en local (no iframe).

### 4.2. Texto / lengua
- Completar huecos / inputs de texto.
- Comprensión lectora con preguntas.
- Sinónimos / antónimos (parejas y contexto).
- Clasificación: agudas/llanas/esdrújulas, dígrafos, clases de nombres, adjetivos.
- Orden alfabético (drag/tap).
- Dictado implícito / ortografía (Curie spelling).
- Expresión escrita (mail catalán, misión espacial castellano) con checklist / validación parcial.
- Taller de cómic + validador de puntuación.
- Polisemia / parónimas / tecnicismos.

### 4.3. Matemáticas
- Sprint de cálculo mental con cronómetro.
- Multiplicación y división verticales (pizarra escolar).
- Paréntesis paso a paso por niveles.
- Banco de problemas razonados.
- Generador de fichas imprimibles.
- Conversor romano ↔ decimal + detective de errores.
- Siglos / reloj romano SVG.
- Examen EMAT: área, perímetro, divisiones, tabla censal, mapa de rutas.

### 4.4. Asociación / clasificación / orden
- Parejas de memoria (Curie, sinónimos).
- Clasificador veloz.
- Drag & drop H5P-like (pas del temps).
- Cronologías / líneas de tiempo.
- Agrupar en columnas (Wordwall-style acentuación).

### 4.5. Interactivos espaciales / mapas
- Radar Team Rocket con calibración Robinson.
- Generador dinámico de coordenadas.
- Silueta Pikachu por clics en rejilla.
- Laboratorio continentes/océanos (pintar + caza).
- Mapas SVG (`continents_svg.json`).

### 4.6. Juegos / retos con tiempo
- Coliseo romano 2 min + combo.
- Sprint mates 60 ops / 2 min.
- Entrenador infinito (Català / Mates).
- Rachas y combos.

### 4.7. Multimedia
- Flashcards con pronunciación (`speechSynthesis`).
- Vídeos locales (MP4) y embeds Drive preview.
- Genially enlazado (externo).

### 4.8. Especializados (NO deben convertirse en test genérico)
- Pizarra de multiplicación/división.
- Conversor/descompositor romano.
- Radar geográfico Pokémon.
- Constelación legendaria (clics).
- Mapa de pintar continentes.
- Reloj romano SVG.
- Generadores de fichas A4.
- Exámenes oficiales digitalizados ejercicio a ejercicio.

---

## 5. Dependencias y recursos externos

| Tipo | Dependencia | Offline |
| :--- | :--- | :---: |
| Tipografía | Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono, Inter) | No (fallback system) |
| Calendario | Google Calendar iframe + CID del grupo | No |
| Documentos nube | Google Drive (todas las asignaturas + dual shelf) | No (sí Local si hay PDF) |
| Presentaciones | Genially (varios temas) | No |
| Actividades web | Wordwall, LearningApps, Quizizz, Quia, JClic, Liveworksheets | No |
| Audio motor | Web Audio API / Speech Synthesis | Sí (navegador) |
| Librerías npm | Ninguna | N/A |
| Backend | Ninguno | N/A |

**Medios locales a preservar:** PDFs de clase, MP4, PNG/JPG de mapas Pokémon, SVG JSON de continentes, PDF vocabulario lab Curie.

---

## 6. Funcionalidades que deben conservarse

1. Las **14 asignaturas** y todos los enlaces Drive actuales.
2. Los **12+ módulos interactivos** con su comportamiento real (no sustituir por quizzes genéricos).
3. Teoría didáctica 5º (estructura de 5 bloques de la regla 9).
4. Fidelidad lingüística (CA / ES / EN según materia).
5. Resource Hub + estantería Local/Drive.
6. Navbar unificada, hero, sidebar, dark mode, sonidos, XP visual.
7. Generadores imprimibles y pizarras matemáticas.
8. Mapas / radar / siluetas de Projecte.
9. Exámenes oficiales digitalizados (Català y Mates “Posa’t a prova”).
10. Topic switchers entre temas hermanos.
11. Compatibilidad de estudio **sin backend** (modo local libre).
12. Decisiones documentadas en `AGENTS.md` / `DECISIONES.md` (evolucionarlas, no borrarlas).

---

## 7. Problemas detectados

### 7.1. Estructurales
- **Monolitos HTML** (hasta ~3300 líneas / 257 KB): difíciles de testear y migrar.
- **Duplicación masiva** de JS de infraestructura (XP, audio, tabs, dark mode).
- **Sin componentes reutilizables**: cada módulo es una copia evolutiva.
- **`mates/romanos` huérfano**: existe y es completo, no aparece en `SUBJECTS` del portal.
- Contador del hero desactualizado conceptualmente (“8 temas” vs realidad dinámica).

### 7.2. Persistencia inconsistente
- Claves `localStorage` heterogéneas; el portal solo lee un subconjunto.
- XP de Català compartido entre módulos; otras materias aisladas.
- Borradores de expresión escrita persistidos (`alvaro_draft_sant_baldiri`).
- **Conflicto directo** con el requisito futuro: en modo local **no** se deben guardar resultados.

### 7.3. Offline / despliegue
- Dependencia de CDNs y embeds online.
- Sin Service Worker / manifest / PWA.
- Sin servidor local documentado (aunque `file:///` funciona hoy).
- GitHub Pages + SPA futura exigirá `base`, router history/hash y scope del SW.

### 7.4. Seguridad / multiusuario (hoy no aplica, mañana sí)
- Soluciones y claves de corrección **expuestas en el cliente** (aceptable para estudio local; inaceptable como nota oficial online).
- Sin auth, roles ni auditoría.

### 7.5. Pedagógicos / producto
- Orientado solo a 5º Primaria / un alumno.
- 8 asignaturas sin contenido web local.
- Estética “infantil gamificada” fija (emojis, pills); válida para primaria, insuficiente como perfil único multi-etapa.

### 7.6. Calidad
- Sin tests automatizados.
- CSS embebido residual mínimo en algunos HTML (`style=` inline) pese a la norma de desacoplar.
- README no documenta arranque ni arquitectura.

---

## 8. Propuesta de migración

### 8.1. Estrategia recomendada: carpeta nueva + legacy intacto

De acuerdo con tu sugerencia: **no reescribir encima**. Crear la plataforma nueva dentro del mismo repo:

```text
Apuntes Alvaro/
├── (LEGACY — no tocar hasta migrar módulo a módulo)
│   ├── index.html
│   ├── assets/
│   ├── castellano/ … catala/ … mates/ … etc.
│   ├── AGENTS.md
│   └── DECISIONES.md
│
├── docs/                         ← documentación de la nueva plataforma
│   ├── AUDITORIA_PROYECTO.md     ← este documento
│   ├── ARQUITECTURA.md           (Fase 2+)
│   ├── DATABASE.md
│   ├── API.md
│   └── OFFLINE.md
│
└── study-hub/                    ← NUEVO monorepo de la plataforma
    ├── frontend/                 (Vue 3 + Vite + Pinia + Router + PrimeVue + Tailwind)
    ├── backend/                  (Hono + Zod + repos/adapters)
    ├── shared/                   (schemas, contracts, constants)
    └── content-packages/         (paquetes estáticos publicables)
```

**Ventajas:**
- El alumno sigue usando el hub actual mientras se construye el nuevo.
- Cada módulo migrado se valida en paralelo con el original.
- Cuando `study-hub` esté listo, se promociona a raíz o se cambia el hosting.

### 8.2. Principio de componentes (obligatorio)

Todo debe ir por componentes / composables, evitando monolitos Vue equivalentes a los HTML actuales:

| Capa | Ejemplos |
| :--- | :--- |
| Layouts | `AppShell`, `TopicLayout`, `AdminLayout` |
| UI shell | `SiteHeader`, `HeroBanner`, `TopicSidebar`, `ResourceHub`, `DocShelf` |
| Stores Pinia | `connection`, `auth`, `sessionMode`, `uiPrefs`, `catalog` |
| Composables | `useXpSession`, `useTimer`, `useSound`, `useDarkMode`, `useHints` |
| Exercise host | `ExercisePlayer` + registro de renderizadores |
| Graders | `grading/registry` + un grader por tipo |
| Módulos legacy migrados | `modules/mates-operaciones/...` como feature folders, no un único `.vue` de 3000 líneas |

Los ejercicios **especializados** se migran como **renderizadores custom** (`CustomActivity` / feature module), no se aplastan a MultipleChoice.

### 8.3. Cómo preservar ejercicios personalizados

1. **Inventario → contrato:** cada actividad legacy se clasifica como:
   - `generic` (cubre un renderizador estándar), o
   - `custom` (feature module propio).
2. **Extracción de datos:** separar contenido (JSON/Markdown) de lógica UI.
3. **Registro:**
   ```text
   exercise-renderers/MultipleChoice.vue
   modules/projecte-coordenadas/RadarTeamRocket.vue   ← custom
   modules/mates-operaciones/MultiplicationBoard.vue ← custom
   ```
4. **Contrato común de eventos:** `answer-change`, `submit`, `request-hint`, `complete` con payload tipado (Zod en `shared/`).
5. **Doble corrector:**
   - Local: grader en frontend (paquete estático incluye claves de autocorrección).
   - Online: grader en backend; el cliente **no** manda la nota oficial, solo respuestas + `clientRequestId` (idempotencia).
6. **Legacy side-by-side:** hasta pasar QA, la ruta Vue puede incrustar o enlazar al HTML original como fallback temporal (iframe o enlace “versión clásica”), sin borrar archivos.

### 8.4. Los dos modos (especificación exacta)

```text
                    ┌─────────────────────────────┐
                    │   connectionStore.health()  │
                    │   GET /api/health           │
                    └─────────────┬───────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              ▼                   ▼                   ▼
         checking              online              offline
              │                   │                   │
              │            ¿Usuario elige            │
              │             modo local?              │
              │              │        │              │
              │         sí ◄─┘        └─► no         │
              │          │                 │         │
              ▼          ▼                 ▼         ▼
         (esperar)   LOCAL MODE      ONLINE MODE   LOCAL MODE
```

#### Modo LOCAL
- Sin login.
- Catálogo desde **paquete estático** (+ caché PWA de recursos).
- Corrección en navegador.
- XP/feedback **solo en memoria de sesión** (`sessionMode = 'local'`).
- **Prohibido** persistir intentos/notas/respuestas/progreso académico en `localStorage`, IndexedDB, cookies o sync diferido.
- Sí permitido: preferencias UI (tema, volumen) en un store de prefs separado.
- Al recargar: se pierde el resultado de la sesión.

#### Modo ONLINE
- Requiere autenticación.
- Intentos y notas oficiales solo vía API.
- El servidor recalcula score; ignora `score` enviado por el cliente.
- Soluciones sensibles no se envían al cliente en actividades evaluativas oficiales (o se envían solo tras submit, según política por actividad).
- Gamificación oficial → tablas `xp_transactions` / `user_achievements`.

#### Caída del backend a mitad de sesión online
1. No destruir contenidos ya cargados.
2. Marcar intentos pendientes como **no guardados**.
3. Aviso UI: “Modo online no disponible”.
4. Ofrecer continuar en **sesión local independiente**.
5. Esa sesión local **no se sincroniza** después.

### 8.5. Stack (confirmado para aprobación)

**Frontend:** Vue 3, Composition API, JS ESM (TS solo si surge necesidad real), Vite, Vue Router, Pinia, PrimeVue, Tailwind, Lucide.  
**Offline:** PWA, Service Worker, IndexedDB + Dexie **solo para catálogo/recursos/prefs**, nunca para resultados locales.  
**Backend:** Node.js, Hono, Zod, servicios + repositorios + adapters SQL.  
**DB:** PostgreSQL primero; diseño con adapters para MySQL/MariaDB/SQL Server; SQLite opcional.  
**Regla:** Vue nunca habla con SQL; solo REST propia.

### 8.6. Modelo de datos inicial (borrador)

Entidades mínimas (detalle pleno en `DATABASE.md` Fase 6):

**Identidad:** `users`, `user_profiles`, `roles`, `permissions`, `user_roles`, `sessions`

**Organización:** `educational_stages`, `courses`, `subjects`, `topics`, `course_subjects`, `topic_subjects` (N:N para reutilizar contenidos)

**Contenido versionado:** `activities`, `activity_versions`, `exercises`, `exercise_versions`, `documents`, `resources`  
- Payload de ejercicio: `content_json` / `config_json` / `grading_json` como **TEXT** validado con Zod (portabilidad SQL).

**Evaluación:** `activity_attempts`, `exercise_attempts`, `attempt_answers`, `activity_results`  
- Nunca sobrescribir intentos; guardar `exercise_version_id`.
- Notas: distinguir pregunta / ejercicio / actividad / evaluación con ponderaciones.

**Gamificación online:** `achievements`, `user_achievements`, `xp_transactions`

**Metadatos de contenido:** idioma, dificultad, edad_recomendada (orientativa), tiempo_estimado, objetivos, tags.

Portabilidad: UUID, timestamps UTC ISO, FKs e índices; adapters por motor; **no afirmar** compatibilidad no probada.

### 8.7. API inicial (borrador)

Como en el prompt maestro (`/api/health`, auth, catálogo, attempts, progress). Contratos en `shared/contracts` + doc `API.md`. Escrituras con **idempotency-key** / `clientRequestId`.

---

## 9. Riesgos de incompatibilidad

| Riesgo | Impacto | Mitigación |
| :--- | :--- | :--- |
| Convertir customs a test genérico | Pérdida pedagógica alta | Feature modules + registro custom |
| `localStorage` actual vs regla “local sin resultados” | Confusión / regresión | Nuevo modo local en memoria; prefs separadas; documentar breaking change de XP local |
| Rutas `file:///` vs PWA/Vite | Offline incompleto | Servidor local Vite; documentar que `file:///` legacy sigue en paralelo |
| Google Fonts / Calendar offline | UI degradada | Self-host fuentes; calendar solo online |
| Soluciones en cliente (online) | Trampas / notas falsas | Grading server-side; paquetes locales con claves solo para modo local |
| Monolitos difíciles de migrar | Retrasos | Migrar por vertical slices; mantener HTML legacy |
| Subpath GitHub Pages | Router/SW rotos | `base` Vite + `createWebHistory(base)` + SW scope |
| SQL “portable” asumido | Bugs en prod | PostgreSQL primero; adapters explícitos; tests por motor soportado |
| PrimeVue + Tailwind + CSS legacy | Choque visual | Design tokens; perfiles visuales por etapa; migrar estilos gradualmente |
| Calendario / Drive personales | Privacidad multiusuario | Config por instalación; no hardcodear IDs en shared packages públicos |
| Módulo `romanos` no enlazado | Contenido perdido en portal | Registrar en migración / portal legacy ya |
| Tamaño de paquetes estáticos (mapas, MP4) | PWA pesada | Caché selectiva; lazy; no precachear todo el vídeo |

---

## 10. Plan de implementación por fases (detallado)

### Fase 1 — Auditoría ✅ (este documento)
- [x] Inspección del repo
- [x] Inventarios
- [x] Riesgos
- [x] Arquitectura propuesta
- [ ] **Aprobación humana** ← punto de parada

### Fase 2 — Fundación Vue (`study-hub/frontend`)
1. Scaffold Vite + Vue 3 + Router + Pinia + PrimeVue + Tailwind + Lucide.
2. Layouts y componentes shell (Header, Hero, Sidebar stubs).
3. `connectionStore` + `sessionModeStore` (local por defecto).
4. Migrar **portada** (catálogo de 14 asignaturas leyendo un JSON estático generado desde el inventario actual).
5. Enlaces al legacy HTML mientras no exista el módulo Vue.
6. Arranque documentado (`npm run dev`).
7. Criterio de salida: portada usable en local sin backend.

### Fase 3 — Sistema de contenidos
1. Modelos TS/JS + Zod: Stage, Course, Subject, Topic, Activity, Exercise.
2. Paquete estático v1 (`content-packages/primary-5e/...`).
3. Migrar **2–3 módulos representativos**:
   - Genérico: `curie/wordslist` (flashcards/quiz/matching).
   - Custom mates: fragmento de `mates/operaciones` o `romanos`.
   - Custom mapa: stub de `projecte/coordenadas` o teoría + test.
4. Resource Hub / DocShelf como componentes.

### Fase 4 — Sistema de ejercicios
1. `ExercisePlayer` + registry lazy (`defineAsyncComponent`).
2. Renderizadores iniciales: MultipleChoice, TrueFalse, FillBlank, Matching, Memory, Ordering + 2 customs.
3. Graders con interfaz común + tests unitarios.
4. Hints, timers, feedback.

### Fase 5 — Modo local + PWA
1. Manifest + SW + precache app shell.
2. Dexie para catálogo/recursos/prefs (**whitelist** de stores).
3. Guardrails: tests que fallen si un grader local escribe intentos.
4. Health check + UX de degradación online→local.
5. Servidor local sencillo documentado.

### Fase 6 — Backend + DB
1. Hono API + Zod validators.
2. PostgreSQL + migraciones.
3. Auth (Argon2id), sessions, RBAC.
4. Repositories + adapter Postgres (stubs documentados para otros motores).
5. `/api/health` y catálogo read-only.

### Fase 7 — Intentos y notas
1. Attempts transaccionales + idempotencia.
2. Versionado de ejercicios.
3. Historial / stats / XP oficial.
4. Tests de aislamiento entre usuarios.

### Fase 8 — Administración
1. CRUD usuarios, etapas, cursos, asignaturas, temas.
2. Alta de ejercicios por tipo de renderizador (form + JSON, sin editor visual universal).
3. Consulta de resultados.

### Fase 9 — Migración completa de las 14 asignaturas
1. Checklist por módulo (teoría, recursos, ejercicios, estilos, idioma, Drive).
2. Registro de `mates/romanos`.
3. Regresión lado a lado con legacy.
4. Solo entonces retirar o archivar HTML legacy.

### Fase 10 — Docs y despliegue
1. `ARQUITECTURA.md`, `DATABASE.md`, `API.md`, `OFFLINE.md`, README real.
2. Actualizar `AGENTS.md` / `DECISIONES.md` con el nuevo stack.
3. GitHub Pages (frontend estático + modo local) + backend en otro proveedor.
4. Backup / export.

---

## 11. Decisiones a confirmar antes de Fase 2

Tras esta auditoría, **se recomienda** (sujeto a tu OK):

1. **Ubicación:** crear `study-hub/` dentro del repo; legacy intacto.
2. **JS antes que TS** en frontend/backend, con Zod como contrato.
3. **Componentización estricta** (layouts + shell + renderizadores + feature modules).
4. **Modo local por defecto** en la nueva app hasta que exista backend usable.
5. **Romper** la persistencia de XP/progreso vía `localStorage` en el nuevo modo local (el legacy puede seguir igual hasta migrar).
6. **PostgreSQL** como único motor “soportado” en v1; otros motors = adapters + “experimental” hasta tener tests.
7. **Self-host de fuentes** en la nueva app para reducir dependencia de Google Fonts offline.
8. **No migrar Calendar embebido** al paquete offline; queda feature online/opcional.

Si alguna de estas decisiones no te convence, indícalo antes de arrancar la Fase 2.

---

## 12. Criterios de aceptación de la Fase 1

- [x] Repo examinado (estructura, módulos, CSS, JS, storage, externos).
- [x] Documentación existente leída (`AGENTS.md`, `DECISIONES.md`).
- [x] Inventarios completados.
- [x] Riesgos y plan por fases documentados.
- [x] Dos modos y preservación de customs explicados.
- [x] Modelo de datos y API iniciales esbozados.
- [ ] Aprobación explícita del usuario para pasar a Fase 2.

---

## 13. Próximo paso

**No se ha modificado ningún módulo educativo.**  

Cuando apruebes (o ajustes) esta arquitectura, la Fase 2 consistirá en crear `study-hub/frontend` con el scaffold Vue y la portada componenteada, enlazando al contenido legacy sin reescribirlo todavía.
