import { result } from './utils.js'

export const memoryGrader = {
  grade(exercise, answers) {
    const pairs = exercise.content?.pairs?.length || 0
    const matched = Number(answers?.matchedCount || 0)
    const maxScore = exercise.maxScore || pairs || 1
    const score = pairs ? (matched / pairs) * maxScore : 0
    return result({
      score,
      maxScore,
      feedback: matched >= pairs ? 'Memoria completada' : 'Sigue buscando parejas',
    })
  },
}
