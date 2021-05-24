import { API_URL, API_ENDPOINT } from "../constants/config"
import { _getTest, _getTests, _saveTest, _updateTest } from "./test.graph"

export const getTest = async(testId) => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_getTest(testId))
     })
}

export const getTests = async(testIds) => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_getTests(testIds))
     })
}

export const saveTest = async(testInput) => {
     return await fetch(API_URL.concat("/saveTest"), {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(testInput)
     })
}

export const updateTest = async(testId, testInput) => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_updateTest(testId, testInput))
     })
}
