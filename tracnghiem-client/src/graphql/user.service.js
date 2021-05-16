import { API_ENDPOINT, API_AUTH } from '../constants/config'
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

export const signIn = async (username, password) => {

     let userParams = new URLSearchParams();
     userParams.append("username", username);
     userParams.append("hashPassword", password);

     return await fetch(API_AUTH.concat("/signin") , {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               "Content-Type": "application/x-www-form-urlencoded",
          },
          body: userParams,
          redirect: 'follow'
     })
}

export const signUp = async (username, password) => {
     let userParams = new URLSearchParams();
     userParams.append("username", username);
     userParams.append("hashPassword", password);

     return await fetch(API_AUTH.concat("/register") , {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               "Content-Type": "application/x-www-form-urlencoded",
          },
          body: userParams,
          redirect: 'follow'
     })
}
