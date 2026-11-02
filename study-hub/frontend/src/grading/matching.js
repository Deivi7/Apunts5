import { result } from './utils.js'

export const matchingGrader = {
  grade(exercise, answers) {
    const pairs = exercise.content?.pairs || []
    const maxScore = exercise.maxScore || pairs.length || 1
    let score = 0
    pairs.forEach((pair) => {
      if (answers?.[pair.left] === pair.right) score += maxScore / pairs.length
    })
    return result({
      score,
      maxScore,
      feedback: score >= maxScore ? 'Parejas correctas' : 'Algunas parejas no coinciden',
    })
  },
}
