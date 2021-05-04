export const _getQuestion = (questionId) => {
     return {
          query: "{\r\n  question(id: \"" + questionId + "\") {\r\n    _id\r\n    setOfAnswer {\r\n      content\r\n      isCorrect\r\n    }\r\n    content\r\n    level\r\n    topic {\r\n      _id\r\n      topicId\r\n      content\r\n    }\r\n  }\r\n}",
          variables: {}
     }
}

export const _getQuestions = (questionIds) => {
     return {
          query: "{\r\n  questions(ids: " + questionIds + ") {\r\n    _id\r\n    setOfAnswer {\r\n      content\r\n      isCorrect\r\n    }\r\n    content\r\n    level\r\n    topic {\r\n      _id\r\n      topicId\r\n      content\r\n    }\r\n  }\r\n}",
          variables: {}
     }
}

export const _getAllQuestion = () => {
     return {
          query: "{\r\n  allQuestion {\r\n    _id\r\n    setOfAnswer {\r\n      content\r\n      isCorrect\r\n    }\r\n    content\r\n    level\r\n    topic {\r\n      _id\r\n      topicId\r\n      content\r\n    }\r\n  }\r\n}",
          variables: {}
     }
}

export const _createQuestion = (input) => {
     return {
          query: "mutation {\r\n  createQuestion(input: {content: \"" + input.content + "\", level: " + input.level + ", topic: \"" + input.topic + "\", setOfAnswer: " + input.setOfAnswer + "}) {\r\n    code\r\n    content\r\n  }\r\n}",
          variables: {}
     }
}

export const _updateQuestion = (questionId, input) => {
     return {
          query: "mutation {\r\n  updateQuestion(id: \"" + questionId + "\", input: {content: \"" + input.content + "\", level: " + input.level + ", topic: \"" + input.topic +"\", setOfAnswer: "+ input.setOfAnswer +"}) {\r\n    code\r\n    content\r\n  }\r\n}",
          variables: {}
     }
}
