import { result } from './utils.js'

export const multipleChoiceGrader = {
  grade(exercise, answers) {
    const maxScore = exercise.maxScore || exercise.content?.questions?.length || 1
    const questions = exercise.content?.questions || []
    let score = 0
    const details = []
    questions.forEach((q, idx) => {
      const id = q.id ?? idx
      const given = answers?.[q.id] ?? answers?.[idx]
      const ok = given === q.correct
      if (ok) score += maxScore / questions.length
      details.push({ id, ok, correct: q.correct, given })
    })
    const hits = details.filter((d) => d.ok).length
    return result({
      score,
      maxScore,
      feedback: score >= maxScore
        ? `¡Perfecto! ${hits}/${questions.length}`
        : `${hits}/${questions.length} correctas. Revisa los colores: verde = bien, rojo = mal.`,
      details,
    })
  },
}
