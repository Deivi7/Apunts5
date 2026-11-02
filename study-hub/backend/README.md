# Backend Study Hub

Node.js + Hono + Zod · SQL v1: **MySQL / MariaDB** (y `memory` para desarrollo).

## Arranque rápido (sin MySQL)

```bash
cd study-hub
npm run dev -w backend
```

Por defecto `DB_DRIVER=memory`.

## MySQL / MariaDB

```bash
cp backend/.env.example backend/.env
# DB_DRIVER=mysql
# DATABASE_URL=mysql://user:pass@127.0.0.1:3306/study_hub
npm run migrate -w backend
npm run seed -w backend
npm run dev -w backend
```

## Scripts

- `npm run dev -w backend` — API + seed en arranque
- `npm run migrate -w backend` — aplica `migrations/*.sql`
- `npm run seed -w backend` — roles, usuarios y catálogo desde `content-packages`

## Documentación

- [`docs/API.md`](../docs/API.md)
- [`docs/DATABASE.md`](../docs/DATABASE.md)
