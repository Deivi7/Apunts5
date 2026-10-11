# 📋 Registro de Decisiones y Guía del Proyecto (Álvaro Study Hub)

Este documento recopila todos los acuerdos, decisiones de diseño, normas pedagógicas y directrices técnicas tomadas para el desarrollo de la plataforma de estudio de Álvaro. **Cualquier desarrollo futuro o nuevo módulo debe cumplir estrictamente con lo aquí establecido.**

---

## 🎯 1. Directrices Pedagógicas y de Contenido

### 1.1. Adaptación de Ejercicios por Materia
- **No forzar una plantilla única:** No todos los módulos HTML deben tener los mismos tipos de ejercicios (flashcards, parejas, quiz, etc.).
- **Diseño a medida según la asignatura:** Cada materia debe implementar los ejercicios más adecuados a su contenido:
  - **Matemáticas (`mates/`):** Generador de cálculo mental, retos con cronómetro, resolución de problemas paso a paso, ejercicios de geometría interactiva.
  - **Ajedrez (`chess/`):** Problemas de táctica (mate en 1 o 2), visualización de jugadas, repasos de aperturas y finales.
  - **Llengua Catalana (`catala/`):** Ortografía, pronombres débiles, acentuación diacrítica, textos para rellenar huecos.
  - **Lengua Castellana (`castellano/`):** Puntuación de frases, talleres ortográficos, diccionario online, orden alfabético.
  - **Cine / Audiovisual (`film/`):** Identificación visual de planos cinematográficos, partes de un guion, efectos de sonido.
  - **Música (`musica/`):** Ritmo interactivo, figuras musicales, identificación de familias de instrumentos.
  - **Robótica (`robotica/`):** Lógica condicional, algoritmos visuales, bloques de programación.

### 1.2. Idioma de las Materias
- **Fidelidad lingüística a los apuntes:** Los contenidos, enunciados, explicaciones y ejercicios deben estar redactados en el **mismo idioma que los apuntes y material de clase**:
  - Si los apuntes de una materia están en catalán (*Català*, *Projecte*...), la interfaz de estudio y los ejercicios se redactan en catalán.
  - Si están en inglés (*M. Curie / Science*...), los términos y preguntas clave van en inglés.
### 1.3. Apartat Obligatori de Teoria Didàctica per a Nens de 5è de Primària (10-11 Anys)
- **Comprensió abans que pràctica:** En tots els temes de qualsevol matèria és OBLIGATORI un apartat o pestanya prominent de **Teoria del Tema**, redactada específicament amb un llenguatge proper, didàctic i amè per a nens de 5è.
- **Estructura pedagògica essencial:**
  - *Què és i per a què serveix?* Explicat amb metàfores del dia a dia, jocs i exemples concrets.
  - *Passos i regles clau:* Esquemes numerats clars sense paraulotes tècniques innecessàries.
  - *Exemples "Bé vs Malament":* Contrastant l'exemple correcte amb l'error típic que sol costar punts a l'examen.
  - *Trucs del Mestre ("Trucs mnemotècnics"):* Pautes divertides per no oblidar la norma (el truc del crit, cançons o regles visuals).
  - *Resum en 1 minut:* Quadre ràpid per consultar abans de començar els exercicis pràctics o el test.

---

## 🖥️ 2. Diseño y Experiencia de Usuario (UI/UX)

### 2.1. Portal Principal (`index.html`)
- **Estética limpia y simplificada:** Mantener una jerarquía visual clara, evitando la saturación de texto o cajas redundantes.
- **Acceso rápido y directo:**
  - Si la materia ya cuenta con un módulo interactivo terminado, se muestra de forma prioritaria el botón `🎮 Entrar a Apuntes →`.
  - Para el resto de materias, acceso directo y visible a la carpeta de **Google Drive**.
- **Herramientas de apoyo sutiles:** Temporizador Pomodoro discreto en la barra superior, modo oscuro/claro y checklist diario.

### 2.2. Interactividad 100% en la Web
- Los ejercicios prácticos (como reordenar palabras, puntuar frases o responder preguntas) deben poder **resolverse y comprobarse directamente en la página web**.
- Proveer siempre **validación instantánea**, explicaciones claras de por qué una respuesta es correcta o errónea, y pistas basadas en la norma oficial.
- Incluir soporte para inserción rápida de símbolos y signos especiales cuando sea necesario.

---

## 📁 3. Organización de Archivos y Carpetas

### 3.1. Estructura Local de Carpetas
Cada asignatura cuenta con su carpeta propia en la raíz:
- `castellano/` (Lengua Castellana)
- `curie/` (Madame Curie / Science)
- `mates/` (Matemáticas)
- `catala/` (Llengua Catalana)
- `chess/` (Ajedrez)
- `film/` (Audiovisual)
- `musica/` (Música)
- `projecte/` (Proyectos)
- `robotica/` (Robótica)
- `ef/` (Educación Física)
- `religio/` (Religión)
- `tutoria/` (Tutoría)

### 3.2. Integridad de Módulos Existentes
- **Regla de oro:** No modificar módulos ya terminados y consolidados (como `curie/wordslist/Apuntes.html`) a menos que el usuario lo solicite expresamente.

### 3.3. Arquitectura Multi-Tema por Asignatura
- **Varios temas por materia:** Dentro de cada asignatura se irán añadiendo progresivamente nuevas unidades y apuntes.
- **Ruta estándar de cada tema:** `[asignatura]/[nombre_tema]/Apuntes.html`.
- **Registro en `index.html`:** En el script de `index.html`, cada asignatura contiene un array `topics: [...]`. Al añadir un nuevo tema, se agrega un objeto descriptivo con su título, descripción y enlace relativo.
- **Visualización adaptable:**
  - Si tiene 1 tema: acceso directo con el nombre del tema.
  - Si tiene varios temas: accesos rápidos a los temas principales y botón para desplegar la lista completa en el modal.
  - Si tiene 0 temas: botón a Google Drive y guía para crear el primer tema.

---

## 📝 4. Historial de Decisiones Tomadas

| Fecha | Decisión | Motivo / Contexto |
| :--- | :--- | :--- |
| **04/10/2026** | Creación de la plataforma central `index.html` con las 12 asignaturas y enlaces a Google Drive. | Centralizar todo el estudio escolar de Álvaro en un portal único. |
| **04/10/2026** | Creación del módulo interactivo `castellano/signo_puntuacion/Apuntes.html`. | Digitalizar y gamificar las 7 fichas de clase de puntuación, diccionario y abecedario. |
| **04/10/2026** | Ejercicios específicos por materia en lugar de plantilla fija. | Cada materia requiere dinámicas didácticas adaptadas a su naturaleza. |
| **04/10/2026** | Idioma idéntico al de los apuntes originales. | Garantizar que el estudio coincida con los exámenes y criterios del colegio. |
| **04/10/2026** | Simplificación visual del portal principal `index.html`. | Eliminar ruido visual para que sea más agradable, ágil y fácil de usar. |
| **04/10/2026** | Minijuego interactivo en web para el Reto de Orden Alfabético. | Facilitar que Álvaro pueda practicar el orden RAE arrastrando/tocando palabras. |
| **04/10/2026** | Soporte y arquitectura multi-tema en todas las asignaturas. | Permitir escalar a decenas de temas y unidades independientes dentro de cada materia. |
| **04/10/2026** | Creación del módulo interactivo `projecte/coordenadas/Apuntes.html` en catalán. | Gamificación interactiva de las 4 fitxes de coordenades geogràfiques amb radar Pokémon del Team Rocket i silueta llegendària. |
| **04/10/2026** | Creación del módulo interactivo `mates/operaciones/Apuntes.html`. | Reto de cálculo mental (2 min / 60 op configurable), multiplicaciones y divisiones de varias cifras con pizarra escolar, operaciones con paréntesis paso a paso por niveles y banco de 32 problemas con desarrollo completo. |
| **04/10/2026** | Aleatorización de opciones y preguntas en el Quiz de `castellano/signo_puntuacion/Apuntes.html`. | Evitar que la respuesta correcta caiga siempre en la opción B mediante barajado Fisher-Yates dinámico en cada intento. |
| **04/10/2026** | Corrección de desplazamientos en multiplicaciones de varias cifras en `mates/operaciones/Apuntes.html`. | Aplicar número dinámico de puntos/huecos (`'•'.repeat(i)`) según el valor posicional (1 para decenas, 2 para centenas, 3 para millares...). |
| **04/10/2026** | Generador de Fichas de Práctica (Sin Resultado) en `mates/operaciones/Apuntes.html`. | Permite generar fichas de multiplicaciones y divisiones verticales sin resultado visible para practicar en papel o en pantalla, con espacio de cálculo en blanco, botón para auto-corregir o desplegar soluciones completas, y enlace directo para resolver cualquier ejercicio paso a paso en la pizarra interactiva. Incluye optimización para imprimir en A4. |
| **05/10/2026** | Mejoras en `projecte/coordenadas/Apuntes.html`: corrección de mapa Team Rocket, generador dinámico, mapa interactivo por clics y ampliación de test. | Solución del mapa negro convirtiendo el PDF a sRGB de alta definición con ejes y grados nítidos; selector de 4 mapas con generador aleatorio de coordenadas (múltiplos de 20°, 10° y modo caça del tresor); interactividad por clics directos sobre el mapa astronómico para dibujar la silueta de Pikachu con ayuda de brújula; y ampliación del test final a 20 preguntas en catalán. |
| **05/10/2026** | Rediseño de Radar Team Rocket a ancho completo (100%) y calibración exacta de coordenadas Robinson en tiempo real. | El mapa de Team Rocket pasa a ocupar el 100% de la tarjeta visual para máxima legibilidad de grados y ejes; se reorganiza el formulario de captura y la lista en una cuadrícula inferior; y se reprograma el cálculo de coordenadas del cursor calibrando la proyección Robinson (Ecuador a y=549, polos a y=189/922, Greenwich a x=795 y curva de convergencia de meridianos). |
| **05/10/2026** | Simplificación a múltiplos de 10° en Missió 3 y toggle de coordenadas en el Generador Dinámico (`projecte/coordenadas/Apuntes.html`). | En Missió 3 (Pikachu), se configuran las líneas de la cuadrícula cada 10°, los números de los ejes únicamente en múltiplos de 20°, y todos los 23 puntos de la silueta en múltiplos exactos de 10° con tolerancia de clic adaptativa. En el Generador Aleatorio, se añade un selector (checkbox) para activar u ocultar las coordenadas en tiempo real del cursor, manteniéndolas ocultas por defecto para fomentar la lectura autónoma de la cuadrícula. |
| **05/10/2026** | Sustitución de iconos sobre el mapa por flecha indicadora dinámica en Radar Team Rocket (`projecte/coordenadas/Apuntes.html`). | Se retiran todos los iconos/emojis superpuestos que tapaban los dibujos de la ficha original. En su lugar se añade una flecha indicadora animada (SVG con pulso radar y etiqueta flotante) que se traslada suavemente y apunta en directo hacia el Pokémon seleccionado (o clicado en el mapa). Al ser capturado, la flecha y su diana cambian a verde esmeralda. |
| **05/10/2026** | Calibración de soluciones oficiales en Radar Team Rocket (`projecte/coordenadas/Apuntes.html`). | Se corrigen las soluciones de los 10 Pokémon conforme a las marcas rojas del mapa oficial: Mewtwo (75°N, 105°O), Weezing (45°N, 105°E), Tentacruel (30°N, 90°O), Meowth (45°N, 0°), Golem (30°N, 45°E), Victreebel (0°, 15°E), Arbok (30°S, 75°O), Lickitung (23,5°S Tròpic de Capricorn, 150°E), Gyarados (75°S, 135°O) y Rhyhorn (66,5°S Cercle Polar Antàrtic, 60°E). Se permite entrada decimal (`step="any"` y `parseFloat`) para aceptar tanto grados exactos (23.5 / 66.5) como enteros aproximados (23, 66). |
| **05/10/2026** | Ocultación por defecto de coordenadas en tiempo real en Radar Team Rocket (`projecte/coordenadas/Apuntes.html`). | Se oculta el cuadro flotante de coordenadas del cursor en el mapa del radar para obligar a que el alumno deduzca los grados leyendo los ejes e intersecciones por sí mismo. Se añade la casilla opcional `🧭 Mostrar coordenades en temps real` (desmarcada por defecto) para habilitarlo solo si se desea. |
| **05/10/2026** | Laboratori interactiu a tot color per a Oceans & Continents (`projecte/coordenadas/Apuntes.html`). | Es substitueix la imatge estàtica en blanc i negre per un mapa mundial vectorial en alta definició, amb paleta de colors oficial de la fitxa escolar (Amèrica groc, Europa violeta, Àsia verd, Àfrica taronja, Oceania rosa, Antàrtida marró), eixos graduats i línies clau (Equador, Greenwich, Tròpics i Cercles Polars). S'implementen 3 modes interactius: 1) Explorador Lliure amb fitxes formatives dinàmiques, 2) Taller de Pintar amb paleta de colors interactiva, comprovació automàtica i llenç en blanc, i 3) Caça d'Oceans & Continents amb reptes aleatoris, rànquing i so. Inclou botó per alternar amb la fotocòpia original escanejada. |
| **05/10/2026** | Eliminació de coordenades en temps real a Missió 3: Coordenades Llegendàries (`projecte/coordenadas/Apuntes.html`). | S'elimina el rètol flotant HUD i el selector de coordenades en temps real al moure el ratolí sobre el llenç de Pikachu, forçant a Álvaro a deduir els punts consultant directament les marques dels eixos (múltiples de 20°) i la quadrícula (múltiples de 10°). |
| **05/10/2026** | Aleatorización total en el Clasificador Veloz de Casos (`castellano/signo_puntuacion/Apuntes.html`). | Se barajan aleatoriamente las opciones (con algoritmo Fisher-Yates) y las preguntas en cada partida para que la respuesta correcta no aparezca siempre en la primera posición. Se amplía el repertorio de casos con signos de interrogación, exclamación, comillas y punto y seguido. |
| **05/10/2026** | Creación del módulo interactivo `castellano/comunicacion/Apuntes.html` (Tema 1: Lenguaje, Comunicación & El Diccionario). | Integración completa de los 3 PDFs de clase (`El lenguaje y la comunicación.pdf`, `ordenar alfab.pdf`, `¡Practiquemos lo aprendido! Diccionario online (1).pdf`) y la presentación interactiva de Genially (`673b29cc495b2a814eb603f6`). Contiene: circuito interactivo con los 6 elementos de la comunicación y reto de situaciones reales; simulador del diccionario RAE online con análisis didáctico de palabras clave (ventana, comer, comí, lápices, cóctel); rueda de los 5 tipos de diccionarios (normativo, sinónimos, bilingüe, etimológico, técnico, enciclopédico); laboratorio de orden alfabético con los 3 retos del PDF (grupos de 4 palabras, las 10 palabras y las 24 palabras completas); taller de creación de viñetas de cómic con bocadillos y validador de puntuación (punto, coma, ¿?, ¡!); quiz maestro de 10 preguntas gamificado; y ficha imprimible con enlaces oficiales de Google Drive. Registro del nuevo tema en `index.html`. |
| **11/10/2026** | Extracción y modularización completa de estilos CSS en todas las vistas de la plataforma. | Migración de miles de líneas de estilos embebidos a una arquitectura híbrida limpia: creación del núcleo global `assets/css/common.css` (variables, modo oscuro, navbar, banner hero, sidebar adhesivo, modales y pie) y hojas específicas independientes (`index.css` y `Apuntes.css` en cada submódulo). Todas las vistas (`index.html`, `curie`, `castellano/comunicacion`, `castellano/signo_puntuacion`, `mates/operaciones`, `projecte/coordenadas`) quedan sin bloques `<style>`, reduciendo drásticamente el peso de las plantillas y asegurando portabilidad bajo `file:///`. |
| **11/10/2026** | Actualización de enlaces oficiales de Google Drive de las 14 asignaturas e incorporación de Amco y B.A.E (`index.html`). | Registro de los nuevos enlaces de Google Drive compartidos por el alumno para Amco, Tutoria, B.A.E, Castellà, Català, Chess, E.F., Film, M.curie, Mates, Musica, Projecte, Religió y Robótica. Se crean las carpetas locales correspondientes y se actualizan los contadores automáticos del portal (14 asignaturas). |
| **11/10/2026** | Creación del módulo interactivo `catala/sant_baldiri/Apuntes.html` (Tema 1: L'escola de Sant Baldiri). | Análisis exhaustivo de la presentación oficial de Genially (`688137a94d87ce5b85568742`). Desarrollo completo en catalán (norma 2): comprensió lectora «L'escola de Sant Baldiri», taller de sinònims i antònims amb minijoc de parelles, estudi de la síl·laba i dígrafs separables vs inseparables amb classificador interactiu, laboratori de classes de noms (comú/propi, concret/abstracte, individual/col·lectiu, comptable/no comptable), taller d'expressió escrita i test mestre de 10 preguntes amb XP i so. Creació del Resource Hub amb 10 documents oficials de classe i 6 recursos web interactius (Quia, JClic, Wordwall, Liveworksheets). Separació estricta d'estils a `Apuntes.css` i registre del tema a `index.html`. Avís proactiu dels 10 fitxers escolars pendents de descarregar i pujar al Drive personal d'Álvaro (norma 7). |
| **11/10/2026** | Integración de 11 enlaces oficiales de Drive, reproductores de vídeo y «El Truc del Crit» (`catala/sant_baldiri/Apuntes.html`). | Incorporación de los 11 enlaces definitivos del Drive personal de Álvaro (3 vídeos y 8 PDFs). Inserción de reproductores de vídeo con previsualización responsive (`preview`) y desgloses didácticos: 1) Sinònims i antònims; 2) Separació de síl·labes i dígrafs (OK CATALÀ); 3) La síl·laba tònica (OK CATALÀ). Creación de la sección y minijuego interactivo «El Truc del Crit» para identificar la síl·laba tònica en vivo con audio y XP. Actualización de enlaces en Resource Hub y en la estantería de fitxes de la pestanya 8. |
| **11/10/2026** | Integración oficial de Google Calendar en el portal principal (`index.html`). | Incorporación del calendario escolar y de exámenes de 5º de Primaria de Álvaro (`cid=ddce77fc8680830306f17bc4b803ab253b91c1d66fbaf6307f747868d1e3127d@group.calendar.google.com`). Se añade la sección interactiva `.calendar-section` con iframe embebido responsive de Google Calendar, selector de vistas (Mes, Agenda, Semana), botón de suscripción directa a Google Calendar, píldora de acceso rápido en el header superior y vinculación con la asignatura de Tutoría. |







