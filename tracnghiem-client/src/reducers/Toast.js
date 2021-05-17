import { SET_TEXT_TOAST, SET_TOAST, SET_TYPE_TOAST } from "../actions/Toast";
import * as Types from "../constants/TypeActions";

let toastState = {
     isShowToast: false,
     text: "",
     typeToast: "success",
}

const toast = (state = toastState, action) => {
     switch(action.type) {
          case Types.SET_SHOW_TOAST:
               return {
                    ...state,
                    isShowToast: action.isShow
               }
          case SET_TEXT_TOAST:
               return {
                    ...state,
                    text: action.text
               }
          case SET_TYPE_TOAST:
               return {
                    ...state,
                    typeToast: action.typeToast
               }
          case SET_TOAST:
               return {
                    ...state,
                    typeToast: action.typeToast,
                    text: action.text
               }
          default:
               return state;
     }
}

export default toast
