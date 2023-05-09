const fs = require('fs')
const path = require('path')
const questions = require('./apps/strapi/src/utils/seed/question-raw.json')

questions.sort((a, b) => a.id - b.id).forEach(question => {
  question.answers.forEach((answer) => {
    delete answer.id

    if (answer.destination) {
      answer.destination = { id: answer.destination.id }
    }

    answer.subanswers.forEach((subanswer) => {
      delete subanswer.id

      subanswer.destination = { id: subanswer.destination.id }

    })
  })
})

fs.writeFileSync(path.join(process.cwd(), 'apps/strapi/src/utils/seed/question.json'), JSON.stringify(questions, null, 2))
