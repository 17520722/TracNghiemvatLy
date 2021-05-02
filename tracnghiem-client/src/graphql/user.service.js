import { API_ENDPOINT } from '../constants/config'
import { _getUser } from './user.graph'

export const getOneUser = async (userId) => {
     return await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_getUser(userId))
     })
}