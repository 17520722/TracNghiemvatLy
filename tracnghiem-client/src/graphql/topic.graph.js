export const _getTopic = (topicId) => {
     return {
          query: "{\r\n   topic (id: \"" + topicId + "\"){\r\n    _id\r\n    topicId\r\n    content\r\n  }\r\n}",
          variables: {}
     }
}

export const _getTopics = () => {
     return {
          query: "{\r\n   topics {\r\n    _id\r\n    topicId\r\n    content\r\n  }\r\n}",
          variables: {}
     }
}

export const _createTopic = (input) => {
     return {
          query: "mutation {\r\n   createTopic(input: {topicId: \"" + input.topicId + "\", content: \"" + input.content + "\"}){\r\n    code\r\n    content\r\n  }\r\n}",
          variables: {}
     }
}

export const _updateTopic = (id, input) => {
     return {
          query: "mutation {\r\n   updateTopic(id: \"" + id + "\", input: {topicId: \"" + input.topicId + "\", content: \"" + input.content + "\"}){\r\n    code\r\n    content\r\n  }\r\n}",
          variables: {}
     }
}