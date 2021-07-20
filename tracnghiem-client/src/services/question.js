const API_URL = "http://localhost:5000/question"

export const saveQuestionRecord = async(input = []) => {
     return await fetch(API_URL.concat("/saveQuestionRecord"), {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listQuestion: input })
     })
};

export const resetScore = async() => {
     return await fetch(API_URL.concat("/resetScore"), {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          }
     })
}

export const getAllQuestion = async() => {
     return await fetch(API_URL.concat("/getAllQuestions"), {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          }
     })
}
