import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from '../config.js'
import { newId, nowSql } from '../utils/ids.js'
import { hashPassword } from '../auth/password.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function seedDatabase({ db, users, catalog, auth }) {
  const adminRole = await auth.ensureRole(db, {
    id: newId(),
    code: 'admin',
    name: 'Administrador',
  })
  const teacherRole = await auth.ensureRole(db, {
    id: newId(),
    code: 'teacher',
    name: 'Profesor',
  })
  const studentRole = await auth.ensureRole(db, {
    id: newId(),
    code: 'student',
    name: 'Alumno',
  })

  const perms = [
    { code: 'catalog.read', description: 'Leer catálogo' },
    { code: 'attempts.write', description: 'Registrar intentos' },
    { code: 'attempts.read.own', description: 'Leer propios intentos' },
    { code: 'admin.users', description: 'Gestionar usuarios' },
    { code: 'admin.content', description: 'Gestionar contenidos' },
  ]

  const permRows = []
  for (const p of perms) {
    permRows.push(
      await auth.ensurePermission(db, {
        id: newId(),
        code: p.code,
        description: p.description,
      }),
    )
  }

  for (const perm of permRows) {
    await auth.linkRolePermission(db, adminRole.id, perm.id)
    if (perm.code.startsWith('catalog') || perm.code.startsWith('attempts')) {
      await auth.linkRolePermission(db, studentRole.id, perm.id)
      await auth.linkRolePermission(db, teacherRole.id, perm.id)
    }
    if (perm.code === 'admin.content') {
      await auth.linkRolePermission(db, teacherRole.id, perm.id)
    }
  }

  async function ensureUser(email, password, displayName, roleId) {
    let user = await users.findByEmail(email)
    if (!user) {
      const ts = nowSql()
      user = await users.create({
        id: newId(),
        email,
        password_hash: await hashPassword(password),
        display_name: displayName,
        is_active: 1,
        created_at: ts,
        updated_at: ts,
      })
    }
    await users.assignRole(user.id, roleId)
    return user
  }

  await ensureUser(config.seed.adminEmail, config.seed.adminPassword, 'Admin Study Hub', adminRole.id)
  await ensureUser(
    config.seed.studentEmail,
    config.seed.studentPassword,
    'Álvaro',
    studentRole.id,
  )

  const stage = await catalog.upsertStage({
    id: newId(),
    code: 'primary',
    name: 'Educación Primaria',
    sort_order: 20,
    created_at: nowSql(),
  })
  await catalog.upsertCourse({
    id: newId(),
    stage_id: stage.id,
    code: '5ep',
    name: '5º de Primaria',
    sort_order: 5,
    created_at: nowSql(),
  })

  const catalogPath = path.resolve(
    __dirname,
    '../../../content-packages/catalog/subjects.json',
  )
  const raw = JSON.parse(await fs.readFile(catalogPath, 'utf8'))
  for (const subject of raw.subjects || []) {
    const subjectRow = await catalog.upsertSubject({
      id: newId(),
      code: subject.id,
      name: subject.name,
      full_name: subject.fullName,
      icon: subject.icon,
      category: subject.category,
      language: 'es',
      drive_url: subject.driveUrl,
      description: subject.description,
      created_at: nowSql(),
    })
    for (const topic of subject.topics || []) {
      await catalog.upsertTopic({
        id: newId(),
        subject_id: subjectRow.id,
        code: topic.id,
        title: topic.title,
        short_title: topic.shortTitle,
        description: topic.desc,
        language: topic.language || 'es',
        difficulty: null,
        estimated_minutes: null,
        recommended_age_min: 10,
        recommended_age_max: 11,
        vue_module: topic.vueModule || null,
        legacy_path: topic.legacyPath || null,
        created_at: nowSql(),
      })
    }
  }

  return {
    adminEmail: config.seed.adminEmail,
    studentEmail: config.seed.studentEmail,
  }
}
