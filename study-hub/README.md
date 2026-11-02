# Study Hub (plataforma Vue)

Nueva plataforma educativa en paralelo al hub HTML legacy de la raíz del repositorio.

## Arranque rápido (local)

```bash
cd study-hub
npm install
npm run dev
```

Abre `http://127.0.0.1:5173` (o el puerto que indique Vite).

- App Vue: `/`
- Portal HTML clásico: `/legacy/` (también desde el botón **Portal clásico** del navbar)

## GitHub Pages (Vue por defecto)

Repo: `Deivi7/Apunts5` → URL tipica `https://deivi7.github.io/Apunts5/`

1. En GitHub → **Settings → Pages → Build and deployment**: fuente **GitHub Actions**.
2. El workflow [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml) construye la Vue con `base=/Apunts5/`, embebe el hub antiguo en `/legacy/` y publica.
3. Tras el primer deploy: la raíz es la app nueva; el portal antiguo queda en `/Apunts5/legacy/`.

Build manual de Pages:

```bash
cd study-hub
# PowerShell
$env:VITE_BASE="/Apunts5/"; npm run build; npm run pages:prepare
```

Backend (Fase 6):

```bash
npm run dev:backend
# o: npm run dev -w backend
```

- Health: `http://127.0.0.1:8787/api/health`
- Login seed: `alumno@studyhub.local` / `Alumno123!`
- Por defecto `DB_DRIVER=memory` (sin MySQL). Ver `backend/.env.example`.

## Modos

- **Local (por defecto):** sin login; ejercicios autocorregidos; XP solo en memoria (se pierde al recargar).
- **Online:** disponible cuando el backend responde `/api/health` (auth/intentos en fases posteriores).

Preferencias UI (tema/sonido) sí se guardan en `localStorage`. Resultados académicos del modo local **no**.

## PWA / offline (Fase 5)

```bash
npm run build -w frontend
npm run preview -w frontend
```

- Service Worker + manifest
- Catálogo cacheado en IndexedDB (Dexie)
- Página `offline.html`
- Tests de guardrails: `npm run test -w frontend`

## Legacy

Los `Apuntes.html` originales se sirven en desarrollo bajo `/legacy/...` y cada tema Vue enlaza “Versión clásica”.

## SQL v1

MySQL (primario) y MariaDB (mismo adaptador). Ver `backend/README.md`.
