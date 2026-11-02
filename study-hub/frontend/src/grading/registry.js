import { multipleChoiceGrader } from './multipleChoice.js'
import { trueFalseGrader } from './trueFalse.js'
import { fillBlankGrader } from './fillBlank.js'
import { matchingGrader } from './matching.js'
import { orderingGrader } from './ordering.js'
import { memoryGrader } from './memory.js'
import { customGrader } from './custom.js'

const graders = {
  multiple_choice: multipleChoiceGrader,
  true_false: trueFalseGrader,
  fill_blank: fillBlankGrader,
  matching: matchingGrader,
  ordering: orderingGrader,
  memory: memoryGrader,
  custom: customGrader,
}

export function getGrader(type) {
  return graders[type] || customGrader
}

export function gradeExercise(exercise, answers) {
  const grader = getGrader(exercise.type)
  return grader.grade(exercise, answers)
}
