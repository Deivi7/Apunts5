import { LAB_CARDS } from './vocabCards.js'

const CATEGORY_LABELS = {
  verbs: 'Verb',
  tools: 'Lab tool',
  areas: 'Science area',
  jobs: 'Science job',
}

const ALL_LABELS = ['Verb', 'Lab tool', 'Science area', 'Science job']

export function buildCategoryQuestions(cards = LAB_CARDS) {
  return cards.map((card) => {
    const correct = CATEGORY_LABELS[card.category] || 'Lab tool'
    return {
      prompt: `«${card.term}» belongs to:`,
      options: ALL_LABELS,
      correct,
    }
  })
}
