import { API_ENDPOINT } from '../constants/config'
import { _createTopic, _getTopic } from './topic.graph'

export const getOneTopic = async(topicId) => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_getTopic(topicId))
     })
} 

export const createTopic = async(topicInput) => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_createTopic(topicInput))
     })
}