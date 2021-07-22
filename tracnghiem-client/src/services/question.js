const API_URL = "https://vatlythpt.herokuapp.com/question"

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
