# API REST — Study Hub v1

Base: `http://127.0.0.1:8787`

Autenticación: `Authorization: Bearer <token>` tras login.

## Endpoints

### Salud
- `GET /api/health` — público. `{ status, dbDriver, dbOk }`

### Auth
- `POST /api/auth/login` — `{ email, password }` → `{ token, expiresAt, user }`
- `POST /api/auth/logout` — autenticado
- `GET /api/auth/me` — autenticado → `{ user }`

### Catálogo (autenticado)
- `GET /api/stages`
- `GET /api/courses?stageId=`
- `GET /api/subjects`
- `GET /api/topics?subjectId=`
- `GET /api/subjects/:subjectCode/topics/:topicCode`
- `GET /api/activities?topicId=`
- `GET /api/activities/:id`

## Usuarios seed (memory / seed)

| Email | Password | Rol |
| :--- | :--- | :--- |
| admin@studyhub.local | CambiaEsto123! | admin |
| alumno@studyhub.local | Alumno123! | student |

## Notas de seguridad

- Contraseñas con **Argon2id**
- Sesiones con token opaco; en BD solo hash SHA-256
- Rate limit básico en login
- El frontend en modo local **no** usa estos endpoints para notas
- Intentos/notas oficiales: Fase 7

## Idempotencia (preparado en esquema)

Tablas `activity_attempts` / `exercise_attempts` incluyen `client_request_id` único por usuario para Fase 7.
