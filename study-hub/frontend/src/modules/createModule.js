/** @param {object} def */
export function createModule(def) {
  return {
    sections: def.sections || [],
    theoryHtml: def.theoryHtml || '',
    resources: def.resources || [],
    documents: def.documents || [],
    exercisesBySection: def.exercisesBySection || {},
    contentBase: def.contentBase || null,
    ...def,
  }
}

export function theoryBlock({ what, rules, examples, trick, summary }) {
  return `
    <h3>¿Qué es y para qué sirve?</h3>
    <p>${what}</p>
    <h3>Reglas y pasos clave</h3>
    <ul>${(rules || []).map((r) => `<li>${r}</li>`).join('')}</ul>
    <h3>Ejemplos (Bien vs Mal)</h3>
    <ul>${(examples || []).map((e) => `<li>${e}</li>`).join('')}</ul>
    <h3>El truco del profe</h3>
    <p>${trick || ''}</p>
    <h3>Resumen visual en 1 minuto</h3>
    <p>${summary || ''}</p>
  `
}
