export const _getTest = (testId) => {
     return {
          query: "{\r\n  test(id: \"" + testId + "\") {\r\n    _id\r\n    setOfUnderstand {\r\n      _id\r\n      content\r\n      setOfAnswer {\r\n        content\r\n        isCorrect\r\n      }\r\n      level\r\n      topic {\r\n        _id\r\n        topicId\r\n        content\r\n      }\r\n      \r\n    }\r\n    setOfRemember {\r\n      _id\r\n      content\r\n      setOfAnswer {\r\n        content\r\n        isCorrect\r\n      }\r\n      level\r\n      topic {\r\n        _id\r\n        topicId\r\n        content\r\n      }\r\n      \r\n    }\r\n    setOfApply {\r\n      _id\r\n      content\r\n      setOfAnswer {\r\n        content\r\n        isCorrect\r\n      }\r\n      level\r\n      topic {\r\n        _id\r\n        topicId\r\n        content\r\n      }\r\n      \r\n    }\r\n    setOfAnalyzing {\r\n      _id\r\n      content\r\n      setOfAnswer {\r\n        content\r\n        isCorrect\r\n      }\r\n      level\r\n      topic {\r\n        _id\r\n        topicId\r\n        content\r\n      }\r\n      \r\n    }\r\n    answerSet {\r\n      questionId\r\n      trueAnswer\r\n    }\r\n    levelOfDifficult\r\n    correctAnsNumber\r\n    incorrectAnsNumber\r\n  }\r\n}",
          variables: {}
     }
}

export const _getTests = (testIds) => {
     return {
          query: "{\r\n  tests(ids: " + JSON.stringify(testIds) + ") {\r\n    _id\r\n    setOfUnderstand {\r\n      _id\r\n      content\r\n      setOfAnswer {\r\n        content\r\n        isCorrect\r\n      }\r\n      level\r\n      topic {\r\n        _id\r\n        topicId\r\n        content\r\n      }\r\n      \r\n    }\r\n    setOfRemember {\r\n      _id\r\n      content\r\n      setOfAnswer {\r\n        content\r\n        isCorrect\r\n      }\r\n      level\r\n      topic {\r\n        _id\r\n        topicId\r\n        content\r\n      }\r\n      \r\n    }\r\n    setOfApply {\r\n      _id\r\n      content\r\n      setOfAnswer {\r\n        content\r\n        isCorrect\r\n      }\r\n      level\r\n      topic {\r\n        _id\r\n        topicId\r\n        content\r\n      }\r\n      \r\n    }\r\n    setOfAnalyzing {\r\n      _id\r\n      content\r\n      setOfAnswer {\r\n        content\r\n        isCorrect\r\n      }\r\n      level\r\n      topic {\r\n        _id\r\n        topicId\r\n        content\r\n      }\r\n      \r\n    }\r\n    answerSet {\r\n      questionId\r\n      trueAnswer\r\n    }\r\n    levelOfDifficult\r\n    correctAnsNumber\r\n    incorrectAnsNumber\r\n  }\r\n}",
          variables: {}
     }
}

export const _saveTest = (testInput) => {
     return {
          query: "mutation {\r\n  createTest(input: {setOfRemember: " + JSON.stringify(testInput.setOfRemember) + ", setOfUnderstand: " + JSON.stringify(testInput.setOfUnderstand) + ", setOfApply: " + JSON.stringify(testInput.setOfApply) + ", setOfAnalyzing: " + JSON.stringify(testInput.setOfAnalyzing) + ", levelOfDifficult: " + testInput.levelOfDifficult + ", correctAnsNumber: " + testInput.correctAnsNumber + ", incorrectAnsNumber: " + testInput.incorrectAnsNumber + ", answerSet: " + JSON.stringify(testInput.answerSet) + ",}) {\r\n    code\r\n    content\r\n  }\r\n}",
          variables: {}
     }
}

export const _updateTest = (testId, testInput) => {
     return {
          query: "",
          variables: {}
     }
}
