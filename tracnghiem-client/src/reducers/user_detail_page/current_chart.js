import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = 0;

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case Types.SET_CURRENT_CHART:
        state = action.number;
        console.log(state);
        return state;

    default:
      return state;
  }
};

export default myReducer;