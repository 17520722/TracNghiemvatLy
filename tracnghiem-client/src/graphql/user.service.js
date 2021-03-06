
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

export const signUp = async (username, email, password) => {
     let userParams = new URLSearchParams();
     userParams.append("username", username);
     userParams.append("email", email);
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

export const updateUser = async (username, token) => {
     return await fetch(API_AUTH.concat("/updateUser") , {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Authorization': 'Bearer '.concat(token),
               'username': username
          },
          redirect: 'follow'
     })
}

export const addTestForUser = async (username, token, testId) => {
     let testParams = new URLSearchParams();
     testParams.append("testid", testId);
     return await fetch(API_AUTH.concat("/addTest") , {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Authorization': 'Bearer '.concat(token),
               'username': username,
          },
          body: testParams,
          redirect: 'follow'
     })
}
