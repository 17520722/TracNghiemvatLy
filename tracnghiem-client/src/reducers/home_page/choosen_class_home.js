import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = "thpt";

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CHOOSE_CLASS_HOMEPAGE:
      state = action.classing;
      console.log(state);
      return state;

    default:
      return state;
  }
};

export default myReducer;
