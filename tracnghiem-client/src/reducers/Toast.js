import * as Types from "../constants/TypeActions";

let toastState = {
     isShowToast: false,
}

const toast = (state = toastState, action) => {
     switch(action.type) {
          case Types.SET_SHOW_TOAST:
               return {
                    ...state,
                    isShowToast: action.isShow
               }
          default:
               return state;
     }
}

export default toast
