import { SET_CURRENT_TEST } from "../actions/TestManager";

const initState = {
     currentTest: {}
}

const TestReducer = (state = initState, action) => {
     switch(action.type) {
          case SET_CURRENT_TEST:
               return {
                    ...state,
                    currentTest: action.test
               }
          default: return state;
     }
}

export default TestReducer;