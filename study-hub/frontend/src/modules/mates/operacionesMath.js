/** Generadores alineados con mates/operaciones/Apuntes.html (legacy) */

export const MULT_LEVELS = {
  '2x2': () => ({
    a: Math.floor(Math.random() * 70) + 25,
    b: Math.floor(Math.random() * 60) + 23,
  }),
  '3x2': () => ({
    a: Math.floor(Math.random() * 600) + 180,
    b: Math.floor(Math.random() * 65) + 24,
  }),
  '4x2': () => ({
    a: Math.floor(Math.random() * 6000) + 1400,
    b: Math.floor(Math.random() * 65) + 24,
  }),
  '3x3': () => ({
    a: Math.floor(Math.random() * 600) + 180,
    b: Math.floor(Math.random() * 300) + 125,
  }),
}

export function generateMultiplication(level = '3x2') {
  const fn = MULT_LEVELS[level] || MULT_LEVELS['3x2']
  return fn()
}

export const DIV_LEVELS = {
  '3div1': () => ({
    dividend: Math.floor(Math.random() * 700) + 120,
    divisor: Math.floor(Math.random() * 8) + 2,
  }),
  '3div2': () => ({
    dividend: Math.floor(Math.random() * 800) + 150,
    divisor: Math.floor(Math.random() * 35) + 12,
  }),
  '4div2': () => ({
    dividend: Math.floor(Math.random() * 7000) + 1200,
    divisor: Math.floor(Math.random() * 45) + 14,
  }),
  '5div2': () => ({
    dividend: Math.floor(Math.random() * 60000) + 12000,
    divisor: Math.floor(Math.random() * 60) + 20,
  }),
}

export function generateDivision(level = '3div2') {
  const fn = DIV_LEVELS[level] || DIV_LEVELS['3div2']
  return fn()
}

export function generateRandomAdd(level) {
  let a
  let b
  if (level === 'easy') {
    a = Math.floor(Math.random() * 40) + 10
    b = Math.floor(Math.random() * 40) + 10
  } else if (level === 'medium') {
    a = Math.floor(Math.random() * 450) + 50
    b = Math.floor(Math.random() * 450) + 50
  } else {
    a = Math.floor(Math.random() * 4500) + 500
    b = Math.floor(Math.random() * 4500) + 500
  }
  return { type: 'add', a, b, ans: a + b, symbol: '+' }
}

export function generateRandomSub(level) {
  let a
  let b
  if (level === 'easy') {
    a = Math.floor(Math.random() * 50) + 20
    b = Math.floor(Math.random() * (a - 5)) + 5
  } else if (level === 'medium') {
    a = Math.floor(Math.random() * 700) + 80
    b = Math.floor(Math.random() * (a - 20)) + 15
  } else {
    a = Math.floor(Math.random() * 7000) + 800
    b = Math.floor(Math.random() * (a - 100)) + 50
  }
  return { type: 'sub', a, b, ans: a - b, symbol: '−' }
}

export function generateRandomMult(level) {
  let a
  let b
  if (level === 'easy') {
    a = Math.floor(Math.random() * 50) + 15
    b = Math.floor(Math.random() * 8) + 2
    if (Math.random() > 0.5) {
      a = Math.floor(Math.random() * 40) + 15
      b = Math.floor(Math.random() * 30) + 12
    }
  } else if (level === 'medium') {
    a = Math.floor(Math.random() * 600) + 150
    b = Math.floor(Math.random() * 65) + 23
  } else {
    if (Math.random() > 0.5) {
      a = Math.floor(Math.random() * 6000) + 1200
      b = Math.floor(Math.random() * 70) + 24
    } else {
      a = Math.floor(Math.random() * 700) + 200
      b = Math.floor(Math.random() * 300) + 125
    }
  }
  return { type: 'mult', a, b, ans: a * b, symbol: '×' }
}

export function generateRandomDiv(level) {
  let d
  let v
  if (level === 'easy') {
    v = Math.floor(Math.random() * 7) + 2
    d = Math.floor(Math.random() * 700) + 120
  } else if (level === 'medium') {
    v = Math.floor(Math.random() * 45) + 14
    d = Math.floor(Math.random() * 3000) + 500
  } else {
    v = Math.floor(Math.random() * 65) + 25
    d = Math.floor(Math.random() * 40000) + 8000
  }
  const quotient = Math.floor(d / v)
  const remainder = d % v
  return {
    type: 'div',
    a: d,
    b: v,
    quotient,
    remainder,
    ans: quotient,
    isExact: remainder === 0,
    symbol: '÷',
  }
}

const WS_GENERATORS = {
  add: generateRandomAdd,
  sub: generateRandomSub,
  mult: generateRandomMult,
  div: generateRandomDiv,
}

const WS_MIXED_POOLS = {
  all: ['add', 'sub', 'mult', 'div'],
  'add-sub': ['add', 'sub'],
  'mult-div': ['mult', 'div'],
}

export function generateWorksheetItems({ type = 'all', level = 'medium', count = 6 }) {
  const items = []
  const pool = WS_MIXED_POOLS[type] || null
  for (let i = 0; i < count; i += 1) {
    let opType = type
    if (pool) opType = pool[i % pool.length]
    const gen = WS_GENERATORS[opType] || generateRandomAdd
    items.push({ ...gen(level), id: i + 1 })
  }
  return items
}

export function parseNumericAnswer(raw) {
  if (raw === null || raw === undefined) return NaN
  const s = String(raw).trim().replace(/\s/g, '').replace(',', '.')
  if (!s) return NaN
  return Number(s)
}

/** Cascada escolar de división (misma lógica que mates/operaciones/Apuntes.html). */
export function computeDivisionCascade(dividend, divisor) {
  const dStr = String(dividend)
  const L = dStr.length
  const quotient = Math.floor(dividend / divisor)
  const remainder = dividend % divisor
  const isExact = remainder === 0

  const steps = []
  let curIdx = 0
  let curPart = 0

  while (curIdx < L && (curPart < divisor || curPart === 0)) {
    curPart = curPart * 10 + Number(dStr[curIdx])
    curIdx += 1
  }

  let endCol = curIdx
  let pendingBroughtDown = []

  while (true) {
    const qDigit = Math.floor(curPart / divisor)
    const product = qDigit * divisor
    const productStr = String(product)
    const rem = curPart - product
    const remStr = String(rem)

    const nextBroughtDown = []
    let nextPart = rem
    while (curIdx < L) {
      const nextDigit = dStr[curIdx]
      const nextCol = curIdx + 1
      curIdx += 1
      nextPart = nextPart * 10 + Number(nextDigit)

      const isZero = nextPart < divisor
      nextBroughtDown.push({
        digit: nextDigit,
        col: nextCol,
        causedZero: isZero && curIdx < L,
      })

      if (isZero && curIdx < L) continue
      break
    }

    steps.push({
      curPart,
      endCol,
      qDigit,
      product,
      productStr,
      productEndCol: endCol,
      productStartCol: endCol - productStr.length + 1,
      remainder: rem,
      remainderStr: remStr,
      remainderEndCol: endCol,
      remainderStartCol: endCol - remStr.length + 1,
      myBroughtDown: pendingBroughtDown,
      nextBroughtDown,
    })

    if (curIdx >= L && (nextBroughtDown.length === 0 || nextPart < divisor)) {
      if (nextBroughtDown.length > 0 && nextPart < divisor) {
        const lastCol = nextBroughtDown[nextBroughtDown.length - 1].col
        const remFinalStr = String(nextPart)
        steps.push({
          curPart: nextPart,
          endCol: lastCol,
          qDigit: 0,
          product: 0,
          productStr: '0',
          productEndCol: lastCol,
          productStartCol: lastCol,
          remainder: nextPart,
          remainderStr: remFinalStr,
          remainderEndCol: lastCol,
          remainderStartCol: lastCol - remFinalStr.length + 1,
          myBroughtDown: nextBroughtDown,
          nextBroughtDown: [],
          isTrailingZero: true,
        })
      }
      break
    }

    if (nextBroughtDown.length > 0) {
      curPart = nextPart
      endCol = nextBroughtDown[nextBroughtDown.length - 1].col
      pendingBroughtDown = nextBroughtDown
    } else {
      break
    }
  }

  return {
    dividend,
    divisor,
    quotient,
    remainder,
    isExact,
    dStr,
    L,
    totalCols: L + 2,
    steps,
  }
}

export function multiplicationPartials(a, b) {
  const digits = String(Math.abs(Number(b) || 0)).split('').reverse().map(Number)
  return digits.map((digit, i) => ({
    digit,
    product: Number(a) * digit,
    dots: i > 0 ? '•'.repeat(i) : '',
    shift: i,
    placeNames: ['las Unidades', 'las Decenas', 'las Centenas', 'las Unidades de Millar', 'las Decenas de Millar'][i]
      || `la posición 10^${i}`,
  }))
}

export function answersMatch(expected, user) {
  const e = parseNumericAnswer(expected)
  const u = parseNumericAnswer(user)
  if (Number.isNaN(e) || Number.isNaN(u)) return false
  return Math.abs(e - u) < 0.001
}
