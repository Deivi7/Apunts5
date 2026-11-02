export function normalizeText(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
}

export function result({ score, maxScore, feedback, details }) {
  const max = maxScore || 1
  const safe = Math.max(0, Math.min(score, max))
  return {
    score: safe,
    maxScore: max,
    percentage: Math.round((safe / max) * 100),
    isCorrect: safe >= max,
    feedback: feedback || '',
    details,
  }
}
