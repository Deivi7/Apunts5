import { describe, expect, it } from 'vitest'
import {
  isAllowedLocalStorageKey,
  isForbiddenAcademicKey,
  wouldBlockLocalWrite,
} from './persistenceGuard.js'
import { ALLOWED_STORES, FORBIDDEN_STORE_PATTERNS, assertStoreAllowed } from './db.js'

describe('modo local — no persistir resultados académicos', () => {
  it('permite solo prefs UI conocidas', () => {
    expect(isAllowedLocalStorageKey('studyhub_ui_dark')).toBe(true)
    expect(isAllowedLocalStorageKey('studyhub_ui_muted')).toBe(true)
    expect(isAllowedLocalStorageKey('alvaro_xp_catala')).toBe(false)
  })

  it('detecta claves académicas prohibidas', () => {
    expect(isForbiddenAcademicKey('alvaro_xp_catala')).toBe(true)
    expect(isForbiddenAcademicKey('castellano_xp')).toBe(true)
    expect(isForbiddenAcademicKey('mates_solved_problems')).toBe(true)
    expect(isForbiddenAcademicKey('alvaro_progress_mates_operaciones')).toBe(true)
    expect(isForbiddenAcademicKey('lab_mastered')).toBe(true)
    expect(isForbiddenAcademicKey('studyhub_ui_dark')).toBe(false)
  })

  it('bloquea escrituras académicas en modo local', () => {
    expect(wouldBlockLocalWrite('castellano_xp', true)).toBe(true)
    expect(wouldBlockLocalWrite('alvaro_streak_catala', true)).toBe(true)
    expect(wouldBlockLocalWrite('studyhub_ui_muted', true)).toBe(false)
    expect(wouldBlockLocalWrite('castellano_xp', false)).toBe(false)
  })

  it('IndexedDB solo admite stores de whitelist', () => {
    expect(ALLOWED_STORES).toContain('catalogSnapshots')
    expect(() => assertStoreAllowed('catalogSnapshots')).not.toThrow()
    expect(() => assertStoreAllowed('xp_transactions')).toThrow()
    expect(() => assertStoreAllowed('activity_attempts')).toThrow()
    expect(FORBIDDEN_STORE_PATTERNS.some((re) => re.test('user_grades'))).toBe(true)
  })
})
