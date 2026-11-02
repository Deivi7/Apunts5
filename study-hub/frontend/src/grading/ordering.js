import { normalizeText, result } from './utils.js'

export const orderingGrader = {
  grade(exercise, answers) {
    const expected = (exercise.content?.order || []).map(normalizeText)
    const given = (answers?.order || []).map(normalizeText)
    const maxScore = exercise.maxScore || expected.length || 1
    let score = 0
    expected.forEach((item, idx) => {
      if (given[idx] === item) score += maxScore / expected.length
    })
    return result({
      score,
      maxScore,
      feedback: score >= maxScore ? 'Orden correcto' : 'El orden aún no es el esperado',
    })
  },
}
