import * as Types from "../constants/TypeActions";

export const SET_TEXT_TOAST = "SET_TEXT_TOAST";
export const SET_TYPE_TOAST = "SET_TYPE_TOAST";
export const SET_TOAST = "SET_TOAST";

export const set_show_toast = (isShow) => {
     return {
          type: Types.SET_SHOW_TOAST,
          isShow
     }
}

export const set_text_toast = (text) => {
     return {
          type: SET_TEXT_TOAST,
          text
     }
}

export const set_type_toast = (typeToast) => {
     return {
          type: SET_TYPE_TOAST,
          typeToast
     }
}

export const set_toast = (typeToast, text) => {
     return {
          type: SET_TOAST,
          typeToast,
          text
     }
}
