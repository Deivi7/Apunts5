import { result } from './utils.js'

export const trueFalseGrader = {
  grade(exercise, answers) {
    const items = exercise.content?.items || []
    const maxScore = exercise.maxScore || items.length || 1
    let score = 0
    const details = []
    items.forEach((item, idx) => {
      const id = item.id ?? idx
      const given = answers?.[item.id] ?? answers?.[idx]
      const answered = given === true || given === false
      const ok = answered && Boolean(given) === Boolean(item.correct)
      if (ok) score += maxScore / items.length
      details.push({ id, ok, correct: Boolean(item.correct), given })
    })
    const hits = details.filter((d) => d.ok).length
    return result({
      score,
      maxScore,
      feedback: score >= maxScore
        ? `¡Perfecto! ${hits}/${items.length}`
        : `${hits}/${items.length} correctas. Las respuestas cambian de color.`,
      details,
    })
  },
}
