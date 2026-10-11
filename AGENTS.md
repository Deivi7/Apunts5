# Reglas y Directrices de Proyecto (Álvaro Study Hub)

Este archivo define las instrucciones permanentes del proyecto. Cada vez que interactúes con este repositorio, debes cumplir estrictamente con las decisiones acordadas con el usuario (documentadas también en `DECISIONES.md`):

## 1. Tipos de Ejercicios Adaptados a la Materia
- **No forzar una plantilla única:** No todos los módulos HTML deben tener los mismos tipos de ejercicios.
- Implementa los tipos de ejercicios más adecuados para cada materia:
  - **Matemáticas:** Cálculo mental, problemas razonados paso a paso, retos con tiempo.
  - **Ajedrez:** Problemas tácticos, visualización de movimientos, jugadas clave.
  - **Català / Castellà:** Ortografía, puntuación, dictados, ejercicios para rellenar huecos, orden alfabético.
  - **Cine / Audiovisual:** Identificación de planos, secuencias, elementos de guion y sonido.
  - **Música:** Familias instrumentales, figuras y ritmo interactivo.
  - **Robótica:** Algoritmos, diagramas de bloques y lógica.

## 2. Idioma de los Apuntes
- Las materias y sus ejercicios deben estar redactados en el **mismo idioma que los apuntes y material de clase**:
  - Si los apuntes están en catalán, la interfaz y ejercicios van en catalán.
  - Si están en inglés (ej. Science / Madame Curie), van en inglés.
  - Si están en castellano, van en castellano.

## 3. Interactividad Web
- Todos los ejercicios deben ser completamente funcionales y comprobables **en la web** (con botones, validaciones en tiempo real, pistas y feedback formativo).
- Proveer ayudas visuales (botones para insertar caracteres especiales o signos de puntuación cuando sea necesario).

## 4. Preservación de Módulos Existentes
- No modificar módulos ya concluidos a menos que el usuario lo solicite expresamente (ejemplo: `curie/wordslist/Apuntes.html`).

## 5. Portal Principal (`index.html`)
- Mantener un diseño limpio, moderno y visualmente simplificado, sin sobrecarga de texto ni elementos redundantes.
- Enlace directo a Google Drive para todas las materias y accesos destacados `🎮 [Nombre Tema] →` en las que ya tienen módulos activos.

## 6. Arquitectura y Estructura Modular de Temas
- **Estructura de Carpetas y Ficheros:**
  - Cada asignatura tiene su propia carpeta: `[asignatura]/[nombre_tema]/`.
  - Archivo HTML de vista: `[asignatura]/[nombre_tema]/Apuntes.html`.
  - Hoja de estilos del tema: `[asignatura]/[nombre_tema]/Apuntes.css`.
  - Estilos globales compartidos: `assets/css/common.css` (enlazado siempre como `<link rel="stylesheet" href="../../assets/css/common.css">`).
  - El portal central `index.html` utiliza `assets/css/common.css` e `index.css`.
- **Prohibición de CSS Embebido Masivo:**
  - No escribir bloques `<style>` extensos en los archivos `.html`. Todo el diseño debe estar desacoplado en `Apuntes.css` (específico del módulo) y `assets/css/common.css` (núcleo global compartido).
- **Componentes Obligatorios en Cada Módulo de Apuntes:**
  - **Header Superior y Navbar Unificado:** Patrón oficial `.site-header` y `.top-navbar` con botón de retorno al portal, selector de tema, chuleta modal rápida, sonido, racha de XP y modo claro/oscuro.
  - **Hero Banner:** Degradado temático, badge de identificación del tema, título grande y contadores de progreso.
  - **Sidebar Adhesiva:** Menú lateral sticky con numeración secuencial de pestañas (la primera opción `1. Apuntes` siempre es la teoría y recursos), indicador de progreso y badges interactivos.
  - **Resource Hub de Enlaces:** En la pestaña principal de teoría (`1. Apuntes`) debe incluirse el componente `.resource-hub-container` con accesos rápidos organizados a los PDFs oficiales de Google Drive y a las actividades web interactivas (Genially, webs didácticas, etc.).
  - **Estantería de Documentos:** En la pestaña de archivos/documentos PDF de clase, ofrecer botones duales: `Local` (archivo en carpeta) y `Drive` (enlace oficial en la nube).
- **Registro en el Portal Central:**
  - Al crear un nuevo tema, registrarlo en el array `topics: [...]` de esa asignatura en `index.html`.
  - `index.html` adapta automáticamente los botones: si hay 1 tema muestra acceso directo, si hay varios muestra accesos rápidos con desplegable, y si hay 0 muestra la opción de añadir tema.

## 7. Detección Proactiva y Notificación de Enlaces Faltantes en Google Drive
- **Aviso Obligatorio al Usuario:**
  - Siempre que al analizar nuevos materiales de clase (presentaciones de Genially, PDFs de texto, vídeos, fotocopias de deberes o enlaces web externos) se detecte un recurso o documento oficial que **NO** disponga todavía de su enlace a Google Drive correspondiente (o solo esté alojado externamente), **el agente DEBE avisar expresamente al usuario para solicitar el link de Drive correspondiente**.
  - Formato del aviso: Detallar claramente el nombre del documento o recurso detectado, su procedencia y solicitar al usuario: *"He detectado el archivo [Nombre].pdf en [origen]. Por favor, facilítame su enlace de Google Drive para integrarlo de forma permanente en la plataforma."*
  - No dejar enlaces provisionales rotos ni omitir recursos clave sin antes consultar al usuario.

## 8. Asignaturas Oficiales de la Plataforma
- La plataforma contempla actualmente 14 materias escolares con carpetas y enlaces propios:
  1. **Amco** (`amco/`) - Inglés Amco
  2. **Tutoria** (`tutoria/`) - Tutoría y organización escolar
  3. **B.A.E** (`bae/`) - B.A.E
  4. **Castellà** (`castellano/`) - Lengua Castellana
  5. **Català** (`catala/`) - Llengua Catalana
  6. **Chess** (`chess/`) - Ajedrez
  7. **E.F.** (`ef/`) - Educación Física
  8. **Film** (`film/`) - Cultura Audiovisual
  9. **M. Curie** (`curie/`) - Science
  10. **Mates** (`mates/`) - Matemáticas
  11. **Música** (`musica/`) - Educación Musical
  12. **Projecte** (`projecte/`) - Projecte de Medi
  13. **Religió** (`religio/`) - Religión y Valores
  14. **Robótica** (`robotica/`) - Robótica y Tecnología


