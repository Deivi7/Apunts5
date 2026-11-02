# Offline y modo local (Fase 5)

## Principio

El backend **no es imprescindible** para estudiar. La app Vue arranca en **modo local**.

## Qué se puede hacer sin backend / sin red (tras instalar PWA o haber visitado la app)

- Ver catálogo estático y su copia en IndexedDB
- Abrir temas migrados cacheados (shell + assets)
- Realizar ejercicios con corrección en el navegador
- Usar customs (sprint, pizarra, romanos, mapa, flashcards…)
- Preferencias UI (tema / mute)

## Qué NO se guarda en modo local

- XP, rachas, respuestas, intentos, notas, progreso académico
- No hay sincronización diferida de intentos locales

Al recargar la página, la sesión académica se pierde.

## Qué sí puede persistir

| Mecanismo | Datos |
| :--- | :--- |
| `localStorage` | Solo `studyhub_ui_dark`, `studyhub_ui_muted` |
| IndexedDB (Dexie) | `catalogSnapshots`, `resourceMeta`, `uiPrefsMirror` |

Cualquier store/clave con `xp`, `attempt`, `grade`, `progress`, etc. está **prohibida** (guard runtime + tests).

## PWA

- Manifest + Service Worker (`vite-plugin-pwa`)
- Precache del app shell
- `public/offline.html` como página de recuperación
- API (`/api/*`) y legacy (`/legacy/*`) no se tratan como offline completo (NetworkOnly / denylist)

Instalable como aplicación desde el navegador tras `npm run build` + HTTPS o `vite preview`.

En desarrollo, el SW puede activarse con `devOptions.enabled`.

## Caída del backend en sesión online

1. Se informa que el modo online no está disponible
2. Los contenidos ya cargados no se destruyen
3. Se ofrece continuar en **modo local independiente**
4. Esa sesión local **no** sincroniza resultados después

## `file:///`

La PWA requiere HTTP/HTTPS. No se promete offline completo abriendo `file:///`.

## Tests

```bash
cd study-hub
npm run test -w frontend
```

Comprueban bloqueo de claves académicas y whitelist de IndexedDB.
