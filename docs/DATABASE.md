# Base de datos — Study Hub v1

## Motores soportados

| Motor | Estado v1 |
| :--- | :--- |
| MySQL | Soportado (adaptador `mysql2`) |
| MariaDB | Soportado (mismo adaptador) |
| memory | Desarrollo sin servidor SQL |
| PostgreSQL | No en v1 |
| SQL Server | No en v1 |

No se afirma portabilidad automática. Las migraciones de `backend/migrations/` están escritas para MySQL/MariaDB.

## Diferencias / adaptadores

- UUID como `CHAR(36)` (portable)
- Documentos de ejercicio/actividad como `LONGTEXT` JSON validado en backend (Zod), no tipo JSON nativo obligatorio
- Timestamps `DATETIME(3)` en UTC textual
- `INSERT IGNORE` / `ON DUPLICATE KEY UPDATE` son específicos MySQL/MariaDB (capa repositorio)

## Entidades principales

Usuarios: `users`, `user_profiles`, `roles`, `permissions`, `user_roles`, `sessions`  
Organización: `educational_stages`, `courses`, `subjects`, `topics`, `course_subjects`, `topic_subjects`  
Contenido versionado: `activities`, `activity_versions`, `exercises`, `exercise_versions`, `documents`, `resources`  
Evaluación: `activity_attempts`, `exercise_attempts`, `attempt_answers`, `activity_results`  
Gamificación online: `achievements`, `user_achievements`, `xp_transactions`

## Arranque

```bash
# Desarrollo sin MySQL
DB_DRIVER=memory npm run dev -w backend

# MySQL / MariaDB
cp backend/.env.example backend/.env
# editar DB_* o DATABASE_URL y DB_DRIVER=mysql
npm run migrate -w backend
npm run seed -w backend
npm run dev -w backend
```
