import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = false;

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case Types.SET_END_TEST:
        state = true;
        return state;

    case Types.SET_START_TEST:
        state = false;
        return state;

    default:
      return state;
  }
};

export default myReducer;