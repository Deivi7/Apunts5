/** Helpers per al tema decimals_unitats (català, 5è). */

/** Normalitza entrada escolar: coma→punt, sense espais/punts de miler. */
export function parseDecimalAnswer(raw) {
  if (raw === null || raw === undefined) return NaN
  let s = String(raw).trim().replace(/\s/g, '').replace(/\u00a0/g, '')
  if (!s) return NaN
  // Separador de milers europeu: 1.234,5 → 1234.5
  if (s.includes(',') && s.includes('.')) {
    s = s.replace(/\./g, '').replace(',', '.')
  } else {
    s = s.replace(',', '.')
  }
  return Number(s)
}

export function nearlyEqual(a, b, eps = 1e-9) {
  if (Number.isNaN(a) || Number.isNaN(b)) return false
  return Math.abs(a - b) < eps
}

export function answersMatch(user, expected) {
  return nearlyEqual(parseDecimalAnswer(user), parseDecimalAnswer(expected))
}

/** Format escolar amb coma decimal. */
export function formatCa(n, maxDec = 8) {
  if (!Number.isFinite(n)) return String(n)
  let s = String(Number(n.toFixed(maxDec)))
  if (s.includes('e') || s.includes('E')) {
    s = n.toFixed(maxDec).replace(/\.?0+$/, '')
  }
  return s.replace('.', ',')
}

/** Desplaça la coma: n * 10^k (k positiu = dreta / multiplicar). */
export function shiftDecimal(n, k) {
  if (!Number.isFinite(n) || !Number.isFinite(k)) return NaN
  // Evitar errors de float: treballar amb string de dígits
  const neg = n < 0
  const abs = Math.abs(n)
  let s = abs.toFixed(12).replace(/\.?0+$/, '')
  if (!s.includes('.')) s += '.'
  const [intPart, fracPart = ''] = s.split('.')
  const digits = intPart + fracPart
  let point = intPart.length + k
  let padded = digits
  if (point <= 0) {
    padded = '0'.repeat(1 - point) + digits
    point = 1
  }
  while (point > padded.length) padded += '0'
  const out = `${padded.slice(0, point)}.${padded.slice(point)}`
  const val = Number(out)
  return neg ? -val : val
}

export function multiplyByPower10(n, zeros) {
  return shiftDecimal(n, zeros)
}

export function divideByPower10(n, zeros) {
  return shiftDecimal(n, -zeros)
}

/** Arrodoniment estàndard (meitat amunt). place = 10, 100, 1000 o 1 (enter). */
export function roundToPlace(n, place) {
  if (!Number.isFinite(n) || !place) return NaN
  return Math.round(n / place) * place
}

export function roundToNearestInt(n) {
  return Math.round(n)
}

/** Escalera mètrica: factor = 10^(steps). steps > 0 = baixar (×10^steps). */
export const LENGTH_UNITS = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm']
export const MASS_UNITS = ['kg', 'hg', 'dag', 'g', 'dg', 'cg', 'mg']
export const CAPACITY_UNITS = ['kl', 'hl', 'dal', 'l', 'dl', 'cl', 'ml']

export function unitIndex(units, u) {
  return units.indexOf(String(u).toLowerCase())
}

export function convertMetric(value, fromU, toU, kind = 'length') {
  const table = kind === 'mass' ? MASS_UNITS : kind === 'capacity' ? CAPACITY_UNITS : LENGTH_UNITS
  const a = unitIndex(table, fromU)
  const b = unitIndex(table, toU)
  if (a < 0 || b < 0) return NaN
  const steps = b - a // positiu = baixar = ×10
  return shiftDecimal(value, steps)
}

export function stepsBetween(fromU, toU, kind = 'length') {
  const table = kind === 'mass' ? MASS_UNITS : kind === 'capacity' ? CAPACITY_UNITS : LENGTH_UNITS
  const a = unitIndex(table, fromU)
  const b = unitIndex(table, toU)
  if (a < 0 || b < 0) return NaN
  return b - a
}

/** Multiplica decimal × natural comptant decimals. */
export function multiplyDecimalNatural(dec, nat) {
  return Number((dec * nat).toFixed(10))
}

export function countDecimals(n) {
  const s = String(n).replace(',', '.')
  if (!s.includes('.')) return 0
  return s.split('.')[1].replace(/0+$/, '').length || (s.split('.')[1].length ? s.split('.')[1].length : 0)
}

/** Diagonals d'un polígon de n costats. */
export function polygonDiagonals(n) {
  return (n * (n - 3)) / 2
}

/** Producte amb dígits: naturalStr × decimalStr (decimalStr amb coma). */
export function productFromParts(naturalStr, decimalStr) {
  const nat = Number(String(naturalStr).replace(/\s/g, ''))
  const dec = parseDecimalAnswer(decimalStr)
  if (!Number.isFinite(nat) || Number.isNaN(dec)) return NaN
  return Number((nat * dec).toFixed(10))
}

/** Millor producte per a 4 dígits (cerca exhaustiva de particions). */
export function bestDigitProduct(digits) {
  const d = digits.map(String)
  if (d.length !== 4) return null
  let best = { value: -Infinity, natural: '', decimal: '' }

  function permute(arr, l, r, fn) {
    if (l === r) fn(arr.slice())
    else {
      for (let i = l; i <= r; i++) {
        ;[arr[l], arr[i]] = [arr[i], arr[l]]
        permute(arr, l + 1, r, fn)
        ;[arr[l], arr[i]] = [arr[i], arr[l]]
      }
    }
  }

  permute(d, 0, 3, (p) => {
    // natural 1–3 xifres, decimal la resta amb 1 decimal mínim
    for (let natLen = 1; natLen <= 3; natLen++) {
      const decLen = 4 - natLen
      if (decLen < 1) continue
      for (let decPlaces = 1; decPlaces <= decLen; decPlaces++) {
        const nat = p.slice(0, natLen).join('')
        const intDec = p.slice(natLen, natLen + (decLen - decPlaces)).join('') || '0'
        const frac = p.slice(natLen + (decLen - decPlaces)).join('')
        const decimal = `${intDec},${frac}`
        const val = productFromParts(nat, decimal)
        if (val > best.value) best = { value: val, natural: nat, decimal }
      }
    }
  })
  return best
}

export function generatePower10Item(mode = 'mul') {
  const zeros = 1 + Math.floor(Math.random() * 4)
  const power = 10 ** zeros
  const intPart = Math.floor(Math.random() * 900) + 1
  const fracDigits = 1 + Math.floor(Math.random() * 4)
  const frac = Math.floor(Math.random() * 10 ** fracDigits)
  const n = Number(`${intPart}.${String(frac).padStart(fracDigits, '0')}`)
  if (mode === 'div') {
    return { n, zeros, power, answer: divideByPower10(n, zeros), op: '÷' }
  }
  return { n, zeros, power, answer: multiplyByPower10(n, zeros), op: '×' }
}

export function generateRoundingItem() {
  const places = [10, 100, 1000]
  const place = places[Math.floor(Math.random() * places.length)]
  const n = Math.floor(Math.random() * 90000) + 100
  return { n, place, answer: roundToPlace(n, place) }
}

export function generateDecimalMultItem() {
  const nat = 2 + Math.floor(Math.random() * 20)
  const decPlaces = 1 + Math.floor(Math.random() * 2)
  const raw = Math.floor(Math.random() * 900) + 10
  const dec = raw / 10 ** decPlaces
  return { dec, nat, answer: multiplyDecimalNatural(dec, nat) }
}
