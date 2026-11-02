export const WORKSHOP_SENTENCES = [
            // BLOQUE 1: PUNTOS Y COMAS
            {
                id: "ws_1",
                category: "puntos_comas",
                categoryLabel: "Puntos y Comas",
                raw: "Una noche cuando las calles estaban desiertas se oyó una explosión",
                hint: "Aísla la aclaración temporal «cuando las calles estaban desiertas» entre comas y pon punto final.",
                solution: "Una noche, cuando las calles estaban desiertas, se oyó una explosión."
            },
            {
                id: "ws_2",
                category: "puntos_comas",
                categoryLabel: "Puntos y Comas",
                raw: "El domingo en efecto llegó Rebeca La niña sólo tenía once años",
                hint: "El conector «en efecto» va entre comas. Tras «Rebeca» va punto y seguido (y mayúscula en La).",
                solution: "El domingo, en efecto, llegó Rebeca. La niña sólo tenía once años."
            },
            {
                id: "ws_3",
                category: "puntos_comas",
                categoryLabel: "Puntos y Comas",
                raw: "La casa se llenó de humo No podíamos respirar",
                hint: "Son dos oraciones completas independientes. Sepáralas con punto y seguido.",
                solution: "La casa se llenó de humo. No podíamos respirar."
            },
            {
                id: "ws_4",
                category: "puntos_comas",
                categoryLabel: "Puntos y Comas",
                raw: "Te aseguro María que no tienes razón Piénsatelo mejor",
                hint: "El vocativo «María» va entre comas (llamamos a la persona). Luego punto y seguido.",
                solution: "Te aseguro, María, que no tienes razón. Piénsatelo mejor."
            },
            {
                id: "ws_5",
                category: "puntos_comas",
                categoryLabel: "Puntos y Comas",
                raw: "Allí tomaban café contaban chistes jugaban al dominó y lo pasaban bien",
                hint: "Separa cada acción de la enumeración con comas (excepto la última que lleva «y»).",
                solution: "Allí tomaban café, contaban chistes, jugaban al dominó y lo pasaban bien."
            },

            // BLOQUE 2: COMAS Y PUNTOS Y COMAS
            {
                id: "ws_6",
                category: "punto_coma",
                categoryLabel: "Punto y Coma",
                raw: "Lloró gritó se tiró por el suelo nos fue imposible calmarla",
                hint: "Comas para la enumeración rápida («Lloró, gritó...») y punto y coma (;) antes de la conclusión.",
                solution: "Lloró, gritó, se tiró por el suelo; nos fue imposible calmarla."
            },
            {
                id: "ws_7",
                category: "punto_coma",
                categoryLabel: "Punto y Coma",
                raw: "Cada verano una tormenta suele inundar estos campos el resto del año están completamente secos",
                hint: "Punto y coma (;) para contrastar los dos períodos opuestos, y coma tras «el resto del año».",
                solution: "Cada verano una tormenta suele inundar estos campos; el resto del año, están completamente secos."
            },

            // BLOQUE 3: COMAS Y DOS PUNTOS
            {
                id: "ws_8",
                category: "dos_puntos",
                categoryLabel: "Dos Puntos",
                raw: "Cuando ladraba el perro mi abuela exclamaba Jesús ¿quién vendrá?",
                hint: "Coma tras la oración inicial, dos puntos antes de la exclamación «¡Jesús!» y pregunta «¿Quién vendrá?».",
                solution: "Cuando ladraba el perro, mi abuela exclamaba: «¡Jesús! ¿Quién vendrá?»."
            },
            {
                id: "ws_9",
                category: "dos_puntos",
                categoryLabel: "Dos Puntos",
                raw: "El entrenador ha decidido ya quiénes formarán la delantera Ruiz Abellán Olivares Tomás y Primo",
                hint: "Dos puntos (:) antes de enumerar a los delanteros anunciados, y comas entre cada apellido.",
                solution: "El entrenador ha decidido ya quiénes formarán la delantera: Ruiz, Abellán, Olivares, Tomás y Primo."
            },
            {
                id: "ws_10",
                category: "dos_puntos",
                categoryLabel: "Dos Puntos",
                raw: "Mi hermano es un egoísta y mi madre le repite siempre Piensa un poco en los demás Javier",
                hint: "Dos puntos antes de las palabras de la madre y coma antes del vocativo «Javier».",
                solution: "Mi hermano es un egoísta y mi madre le repite siempre: «Piensa un poco en los demás, Javier»."
            },
            {
                id: "ws_11",
                category: "dos_puntos",
                categoryLabel: "Dos Puntos",
                raw: "Has gastado más de lo debido hijo mío te he dado diez euros y sólo me devuelves uno",
                hint: "Vocativo «hijo mío» entre comas, y dos puntos (:) antes de la causa o explicación del dinero.",
                solution: "Has gastado más de lo debido, hijo mío: te he dado diez euros y sólo me devuelves uno."
            },

            // BLOQUE 4: PUNTOS SUSPENSIVOS, PARÉNTESIS Y COMILLAS
            {
                id: "ws_12",
                category: "expresion_citas",
                categoryLabel: "Suspensivos & Comillas",
                raw: "Responde siempre bajando los ojos Si yo hablara",
                hint: "Dos puntos antes de la cita, comillas y puntos suspensivos (...) para indicar frase inacabada.",
                solution: "Responde siempre bajando los ojos: «Si yo hablara...»."
            },
            {
                id: "ws_13",
                category: "expresion_citas",
                categoryLabel: "Suspensivos & Comillas",
                raw: "Yo apunté con bastante miedo por cierto y me dijo mi primo Dispara",
                hint: "Paréntesis para «(con bastante miedo, por cierto)», dos puntos tras «primo» y comillas para «Dispara».",
                solution: "Yo apunté (con bastante miedo, por cierto) y me dijo mi primo: «Dispara»."
            },
            {
                id: "ws_14",
                category: "expresion_citas",
                categoryLabel: "Suspensivos & Comillas",
                raw: "Le preguntaron dónde había estado y contestó Por ahí",
                hint: "Dos puntos tras «contestó» y comillas para la respuesta exacta.",
                solution: "Le preguntaron dónde había estado y contestó: «Por ahí»."
            }
        ]

export const SORTER_CASES = [
            {
                phrase: "«Estimada directora _____ Le escribo para solicitar una reunión.»",
                correct: "Dos puntos (:)",
                hint: "Va tras el saludo y encabezamiento en cartas o correos.",
                options: ["Dos puntos (:)", "Punto y coma (;)", "Puntos suspensivos (...)"]
            },
            {
                phrase: "«Compramos peras _____ manzanas _____ plátanos y fresas.»",
                correct: "Coma (,)",
                hint: "Separa los elementos en una enumeración simple.",
                options: ["Coma (,)", "Punto y coma (;)", "Dos puntos (:)"]
            },
            {
                phrase: "«No sé si contártelo _____ me da bastante vergüenza.»",
                correct: "Puntos suspensivos (...)",
                hint: "Indica vacilación, duda, suspense o miedo.",
                options: ["Puntos suspensivos (...)", "Punto y seguido (.)", "Comillas (\" \")"]
            },
            {
                phrase: "«Mi padre trabaja en Madrid _____ mi madre, en Toledo.»",
                correct: "Punto y coma (;)",
                hint: "Separa dos oraciones vinculadas que ya incluyen una coma que omite el verbo.",
                options: ["Punto y coma (;)", "Dos puntos (:)", "Puntos suspensivos (...)"]
            },
            {
                phrase: "«El profesor nos advirtió _____ \"El examen comenzará puntual\".»",
                correct: "Dos puntos (:)",
                hint: "Introduce las palabras exactas dichas por alguien.",
                options: ["Dos puntos (:)", "Coma (,)", "Guion (-)"]
            },
            {
                phrase: "«Miguel de Cervantes _____ 1547-1616 _____ escribió El Quijote.»",
                correct: "Paréntesis ( )",
                hint: "Encierra fechas de nacimiento y muerte para aportar datos aclaratorios.",
                options: ["Paréntesis ( )", "Comillas (\" \")", "Signos de exclamación (¡ !)"]
            },
            {
                phrase: "«Las 27 letras oficiales de nuestra lengua están recogidas en el _____»",
                correct: "Abecedario RAE",
                hint: "El conjunto de todas las letras que se usan para escribir.",
                options: ["Abecedario RAE", "Glosario", "Índice de materias"]
            },
            {
                phrase: "«_____A qué hora empieza la función de teatro_____»",
                correct: "Signos de interrogación (¿ ?)",
                hint: "En español son dobles y formulan una pregunta directa.",
                options: ["Signos de interrogación (¿ ?)", "Signos de exclamación (¡ !)", "Comillas (\" \")"]
            },
            {
                phrase: "«_____Qué alegría verte de nuevo por aquí_____»",
                correct: "Signos de exclamación (¡ !)",
                hint: "Expresan una emoción viva o alegría y son dobles.",
                options: ["Signos de exclamación (¡ !)", "Signos de interrogación (¿ ?)", "Puntos suspensivos (...)"]
            },
            {
                phrase: "«El lema del colegio dice _____Trabajo y superación_____»",
                correct: "Comillas (\" \")",
                hint: "Enmarcan citas textuales o lemas célebres.",
                options: ["Comillas (\" \")", "Paréntesis ( )", "Dos puntos (:)"]
            },
            {
                phrase: "«Terminamos el primer tema_____ Mañana iniciaremos el segundo.»",
                correct: "Punto y seguido (.)",
                hint: "Separa dos oraciones completas dentro de un mismo párrafo.",
                options: ["Punto y seguido (.)", "Coma (,)", "Punto y coma (;)"]
            },
            {
                phrase: "«Álvaro _____ recoge tus libros antes de merendar.»",
                correct: "Coma (,)",
                hint: "Aísla el vocativo (la palabra que nombra a quien nos dirigimos).",
                options: ["Coma (,)", "Punto y coma (;)", "Dos puntos (:)"]
            }
        ]

export const ALPHA_LEVELS = [
            {
                name: "Nivel 1: Palabras de la Ficha (8)",
                badge: "Nivel 1 de 3",
                words: ["Aceituna", "Aguacate", "Chapulín", "Coche", "Correr", "Descubrir", "Ecuación", "Gallo"],
                sorted: ["Aceituna", "Aguacate", "Chapulín", "Coche", "Correr", "Descubrir", "Ecuación", "Gallo"],
                hint: "Regla RAE: La 'Ch' se ordena dentro de la letra C (después de Ce- y antes de Ci-). Compara: Ac- antes que Ag-, y Ch- antes que Co-."
            },
            {
                name: "Nivel 2: Palabras con P- (Comparar 3ª y 4ª letra)",
                badge: "Nivel 2 de 3",
                words: ["Panadería", "Panadero", "Paquidermo", "Pared"],
                sorted: ["Panadería", "Panadero", "Paquidermo", "Pared"],
                hint: "Todas empiezan por Pa-. Compara la 3ª letra: Panad- (con 'n') va antes que Paqu- (con 'q') y Pared (con 'r'). Entre Panadería y Panadero, la 'í' va antes que la 'o'."
            },
            {
                name: "Nivel 3: El Gran Reto (10 Palabras)",
                badge: "Nivel 3 de 3",
                words: ["Bien", "Conquistar", "Cosechar", "Doble", "Existir", "Fruta", "Habitación", "Regalar", "Tipografía", "Volar"],
                sorted: ["Bien", "Conquistar", "Cosechar", "Doble", "Existir", "Fruta", "Habitación", "Regalar", "Tipografía", "Volar"],
                hint: "Ordena fijándote en la letra inicial: B, C, D, E, F, H, R, T, V. Para Conquistar vs Cosechar: 'Con-' va antes que 'Cos-'."
            }
        ]
