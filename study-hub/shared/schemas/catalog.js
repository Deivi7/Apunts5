import { z } from 'zod'

export const TopicSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  desc: z.string(),
  badge: z.string().optional(),
  language: z.enum(['es', 'ca', 'en']).default('es'),
  legacyPath: z.string().optional(),
  vueModule: z.string().optional(),
  migrated: z.boolean().default(false),
})

export const SubjectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  fullName: z.string().min(1),
  icon: z.string(),
  category: z.string(),
  driveUrl: z.string().url(),
  localFolder: z.string(),
  description: z.string(),
  topics: z.array(TopicSchema),
})

export const CatalogSchema = z.object({
  version: z.string(),
  subjects: z.array(SubjectSchema),
})

export function parseCatalog(data) {
  return CatalogSchema.parse(data)
}
