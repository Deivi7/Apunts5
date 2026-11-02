export function createCatalogRepository(db) {
  if (db.driver === 'memory') {
    return {
      async listStages() {
        return (await db.findBy('educational_stages', () => true)).sort(
          (a, b) => a.sort_order - b.sort_order,
        )
      },
      async listCourses(stageId) {
        const rows = await db.findBy('courses', (c) => !stageId || c.stage_id === stageId)
        return rows.sort((a, b) => a.sort_order - b.sort_order)
      },
      async listSubjects() {
        return db.findBy('subjects', () => true)
      },
      async getSubjectByCode(code) {
        return db.findOne('subjects', (s) => s.code === code)
      },
      async listTopics(subjectId) {
        return db.findBy('topics', (t) => !subjectId || t.subject_id === subjectId)
      },
      async getTopic(subjectCode, topicCode) {
        const subject = await db.findOne('subjects', (s) => s.code === subjectCode)
        if (!subject) return null
        const topic = await db.findOne(
          'topics',
          (t) => t.subject_id === subject.id && t.code === topicCode,
        )
        if (!topic) return null
        return { subject, topic }
      },
      async listActivities(topicId) {
        return db.findBy('activities', (a) => a.topic_id === topicId)
      },
      async getActivity(id) {
        return db.findOne('activities', (a) => a.id === id)
      },
      async upsertSubject(row) {
        const existing = await db.findOne('subjects', (s) => s.code === row.code)
        if (existing) {
          const merged = { ...existing, ...row, id: existing.id }
          await db.update('subjects', (s) => s.id === existing.id, merged)
          return merged
        }
        return db.insert('subjects', row)
      },
      async upsertTopic(row) {
        const existing = await db.findOne(
          'topics',
          (t) => t.subject_id === row.subject_id && t.code === row.code,
        )
        if (existing) {
          const merged = { ...existing, ...row, id: existing.id }
          await db.update('topics', (t) => t.id === existing.id, merged)
          return merged
        }
        return db.insert('topics', row)
      },
      async upsertStage(row) {
        const existing = await db.findOne('educational_stages', (s) => s.code === row.code)
        if (existing) {
          const merged = { ...existing, ...row, id: existing.id }
          await db.update('educational_stages', (s) => s.id === existing.id, merged)
          return merged
        }
        return db.insert('educational_stages', row)
      },
      async upsertCourse(row) {
        const existing = await db.findOne(
          'courses',
          (c) => c.stage_id === row.stage_id && c.code === row.code,
        )
        if (existing) {
          const merged = { ...existing, ...row, id: existing.id }
          await db.update('courses', (c) => c.id === existing.id, merged)
          return merged
        }
        return db.insert('courses', row)
      },
    }
  }

  return {
    async listStages() {
      return db.query('SELECT * FROM educational_stages ORDER BY sort_order ASC')
    },
    async listCourses(stageId) {
      if (stageId) {
        return db.query(
          'SELECT * FROM courses WHERE stage_id = :stageId ORDER BY sort_order ASC',
          { stageId },
        )
      }
      return db.query('SELECT * FROM courses ORDER BY sort_order ASC')
    },
    async listSubjects() {
      return db.query('SELECT * FROM subjects ORDER BY name ASC')
    },
    async getSubjectByCode(code) {
      const rows = await db.query('SELECT * FROM subjects WHERE code = :code LIMIT 1', { code })
      return rows[0] || null
    },
    async listTopics(subjectId) {
      if (subjectId) {
        return db.query('SELECT * FROM topics WHERE subject_id = :subjectId ORDER BY title ASC', {
          subjectId,
        })
      }
      return db.query('SELECT * FROM topics ORDER BY title ASC')
    },
    async getTopic(subjectCode, topicCode) {
      const rows = await db.query(
        `SELECT t.*, s.id AS subject_pk, s.code AS subject_code, s.name AS subject_name,
                s.full_name AS subject_full_name, s.icon AS subject_icon, s.drive_url AS subject_drive_url
         FROM topics t
         INNER JOIN subjects s ON s.id = t.subject_id
         WHERE s.code = :subjectCode AND t.code = :topicCode
         LIMIT 1`,
        { subjectCode, topicCode },
      )
      const row = rows[0]
      if (!row) return null
      return {
        subject: {
          id: row.subject_pk,
          code: row.subject_code,
          name: row.subject_name,
          full_name: row.subject_full_name,
          icon: row.subject_icon,
          drive_url: row.subject_drive_url,
        },
        topic: row,
      }
    },
    async listActivities(topicId) {
      return db.query('SELECT * FROM activities WHERE topic_id = :topicId ORDER BY title ASC', {
        topicId,
      })
    },
    async getActivity(id) {
      const rows = await db.query('SELECT * FROM activities WHERE id = :id LIMIT 1', { id })
      return rows[0] || null
    },
    async upsertSubject(row) {
      await db.execute(
        `INSERT INTO subjects (id, code, name, full_name, icon, category, language, drive_url, description, created_at)
         VALUES (:id, :code, :name, :full_name, :icon, :category, :language, :drive_url, :description, :created_at)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           full_name = VALUES(full_name),
           icon = VALUES(icon),
           category = VALUES(category),
           drive_url = VALUES(drive_url),
           description = VALUES(description)`,
        row,
      )
      return row
    },
    async upsertTopic(row) {
      await db.execute(
        `INSERT INTO topics (
           id, subject_id, code, title, short_title, description, language,
           difficulty, estimated_minutes, recommended_age_min, recommended_age_max,
           vue_module, legacy_path, created_at
         ) VALUES (
           :id, :subject_id, :code, :title, :short_title, :description, :language,
           :difficulty, :estimated_minutes, :recommended_age_min, :recommended_age_max,
           :vue_module, :legacy_path, :created_at
         )
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           short_title = VALUES(short_title),
           description = VALUES(description),
           vue_module = VALUES(vue_module),
           legacy_path = VALUES(legacy_path)`,
        row,
      )
      return row
    },
    async upsertStage(row) {
      await db.execute(
        `INSERT INTO educational_stages (id, code, name, sort_order, created_at)
         VALUES (:id, :code, :name, :sort_order, :created_at)
         ON DUPLICATE KEY UPDATE name = VALUES(name), sort_order = VALUES(sort_order)`,
        row,
      )
      return row
    },
    async upsertCourse(row) {
      await db.execute(
        `INSERT INTO courses (id, stage_id, code, name, sort_order, created_at)
         VALUES (:id, :stage_id, :code, :name, :sort_order, :created_at)
         ON DUPLICATE KEY UPDATE name = VALUES(name), sort_order = VALUES(sort_order)`,
        row,
      )
      return row
    },
  }
}
