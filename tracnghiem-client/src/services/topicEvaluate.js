const API_URL = "http://localhost:5000/topicEvalute"

export const saveEvaluateTopicTest = async(input, token) => {
     return await fetch(API_URL.concat("/saveEvaluateTopicTest"), {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'authorization': token
          },
          body: JSON.stringify(input)
     })
}

export const saveEvaluatedTopic = async(listOfTopic, token) => {
     return await fetch(API_URL.concat("/saveTopicScore"), {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'authorization': token
          },
          body: JSON.stringify({listOfTopic: listOfTopic })
     })
}

export const getAllEvaluateUser = async(token) => {
     return await fetch(API_URL.concat("/getTopicScoreUser"), {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'authorization': token
          }
     })
}

export const getEvaluatedTopic = async(listOfTopic, token) => {
     return await fetch(API_URL.concat("/getTopicScore"), {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'authorization': token
          },
          body: JSON.stringify({ listOfTopic: listOfTopic })
     })
}
