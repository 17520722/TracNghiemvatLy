import { API_ENDPOINT, API_URL } from "../constants/config"
import { _createQuestion, _getAllQuestion, _getQuestion, _getQuestions, _updateQuestion } from "./question.graph"

export const getQuestion = async(questionId) => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_getQuestion(questionId))
     })
}

export const getQuestions = async(questionIds) => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_getQuestions(questionIds))
     })
}

export const getAllQuestion = async() => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_getAllQuestion())
     })
}

export const createQuestion = async(input) => {
     return await fetch(API_URL.concat("/saveQuestion"), {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(input)
     })
}

export const updateQuestion = async(questionId, input) => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_updateQuestion(questionId, input))
     })
}
