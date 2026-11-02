import { z } from 'zod'

export const ExerciseTypeSchema = z.enum([
  'multiple_choice',
  'true_false',
  'fill_blank',
  'matching',
  'memory',
  'ordering',
  'custom',
])

export const ExerciseSchema = z.object({
  id: z.string(),
  type: ExerciseTypeSchema,
  version: z.string().default('1'),
  title: z.string(),
  instructions: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  maxScore: z.number().positive().default(10),
  estimatedMinutes: z.number().optional(),
  config: z.record(z.any()).default({}),
  content: z.record(z.any()).default({}),
  grading: z.record(z.any()).optional(),
})

export const GradeResultSchema = z.object({
  score: z.number(),
  maxScore: z.number(),
  percentage: z.number(),
  isCorrect: z.boolean(),
  feedback: z.string().optional(),
  details: z.any().optional(),
})

export function parseExercise(data) {
  return ExerciseSchema.parse(data)
}
