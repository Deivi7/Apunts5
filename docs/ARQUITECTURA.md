# Arquitectura — Álvaro Study Hub (study-hub/)

## Estrategia

- Carpeta `study-hub/` convive con el hub HTML legacy en la raíz.
- Frontend: Vue 3 + Vite + Vue Router + Pinia + PrimeVue + Tailwind + Lucide.
- Validación: Zod en `shared/`.
- Backend: Hono (stub health en v0); SQL v1 = MySQL + MariaDB.

## Modos

| Modo | Auth | Corrección | Persistencia académica |
| :--- | :--- | :--- | :--- |
| Local | No | Frontend | No (solo memoria) |
| Online | Sí (futuro) | Servidor oficial | MySQL/MariaDB |

## Capas frontend

- `layouts/` — AppShell, TopicLayout
- `components/shell/` — header, hero, sidebar, resource hub, doc shelf
- `exercise-renderers/` + `grading/` — contrato común
- `modules/` — feature folders por tema + customs
- `stores/` — connection, sessionMode, uiPrefs, localSession, catalog

## Migración de módulos

Cada tema Vue incluye:

1. Teoría didáctica (regla 9)
2. Ejercicios con renderizadores genéricos o **customs con la misma mecánica** que el legacy
3. Resource Hub / documentos
4. Side-by-side QA frente al HTML clásico (`Apuntes.html`) — no hay `LegacyFrame` en runtime; el HTML legacy se conserva en la raíz para comparación
5. Checklist obligatoria: [`docs/MIGRATION_QA.md`](MIGRATION_QA.md) + `npm run content:audit`

`migrate:content` solo empaqueta HTML/assets. La lógica de juego se porta a mano en `frontend/src/modules/customs/`.

## Fase 5 — Offline / PWA

- `vite-plugin-pwa` + `public/offline.html`
- Dexie (`catalogSnapshots`, `resourceMeta`, `uiPrefsMirror`)
- Guard `installLocalPersistenceGuard` en modo local
- Banner `ConnectionBanner` para degradación online → local
- Tests: `npm run test -w frontend`

## Decisiones

Ver entradas nuevas en `DECISIONES.md` (2026-11-01).
