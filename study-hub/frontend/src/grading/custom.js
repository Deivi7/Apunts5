import { result } from './utils.js'

/** Custom activities supply score via answers._grade or answers.score */
export const customGrader = {
  grade(exercise, answers) {
    const maxScore = exercise.maxScore || 10
    if (answers?._grade) {
      return result({
        score: answers._grade.score ?? 0,
        maxScore: answers._grade.maxScore ?? maxScore,
        feedback: answers._grade.feedback || '',
        details: answers._grade.details,
      })
    }
    const score = Number(answers?.score ?? 0)
    return result({
      score,
      maxScore,
      feedback: answers?.feedback || 'Actividad personalizada',
    })
  },
}
