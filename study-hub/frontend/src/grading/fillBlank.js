import { normalizeText, result } from './utils.js'

/** Compara respostes escolars: text exacte o valor decimal (coma/punt, zeros finals). */
function parseSchoolNumber(raw) {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/\u00a0/g, '')
  if (!s) return NaN
  if (s.includes(',') && s.includes('.')) s = s.replace(/\./g, '').replace(',', '.')
  else s = s.replace(',', '.')
  return Number(s)
}

function blankMatches(givenRaw, acceptedList) {
  const given = normalizeText(givenRaw)
  if (!given) return false
  const acceptedNorm = acceptedList.map(normalizeText)
  if (acceptedNorm.includes(given)) return true
  const givenNum = parseSchoolNumber(givenRaw)
  if (Number.isNaN(givenNum)) return false
  return acceptedList.some((a) => {
    const n = parseSchoolNumber(a)
    return !Number.isNaN(n) && Math.abs(n - givenNum) < 1e-9
  })
}

export const fillBlankGrader = {
  grade(exercise, answers) {
    const blanks = exercise.content?.blanks || []
    const maxScore = exercise.maxScore || blanks.length || 1
    let score = 0
    let empty = 0
    let wrong = 0
    const blankDetails = {}

    blanks.forEach((blank, idx) => {
      const id = blank.id ?? idx
      const raw = answers?.[blank.id] ?? answers?.[idx]
      const given = normalizeText(raw)
      const accepted = blank.accept || [blank.answer]
      const isEmpty = !given
      const ok = !isEmpty && blankMatches(raw, accepted)
      if (ok) score += maxScore / blanks.length
      else if (isEmpty) empty += 1
      else wrong += 1

      blankDetails[id] = {
        ok,
        empty: isEmpty,
        label: ok ? '✓ Correcto' : isEmpty ? '✗ Vacío' : '✗ Incorrecto',
      }
    })

    const parts = []
    if (score >= maxScore) parts.push('¡Todos los huecos correctos!')
    else {
      parts.push(`${Math.round(score)}/${maxScore}`)
      if (empty) parts.push(`${empty} vacío${empty === 1 ? '' : 's'}`)
      if (wrong) parts.push(`${wrong} incorrecto${wrong === 1 ? '' : 's'}`)
    }

    return result({
      score,
      maxScore,
      feedback: parts.join(' · '),
      details: { blanks: blankDetails, empty, wrong },
    })
  },
}
