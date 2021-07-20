import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = 10;

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case Types.CHANGE_COUNT_DATA_CHART:
        state = action.count;
        return state;

    default:
      return state;
  }
};

export default myReducer;