import * as Types from "../constants/TypeActions";

export const set_show_toast = (isShow) => {
     return {
          type: Types.SET_SHOW_TOAST,
          isShow
     }
}
