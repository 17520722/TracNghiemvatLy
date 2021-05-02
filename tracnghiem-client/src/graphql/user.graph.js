export const _getUser = (userId) => {
     return {
          query: "{\r\n  user (id: \"" + userId + "\") {\r\n      _id\r\n    username\r\n    info\r\n    listOfTest\r\n    listOfEvaluatedDoc\r\n  }\r\n}",
          variables: {}
        }
}