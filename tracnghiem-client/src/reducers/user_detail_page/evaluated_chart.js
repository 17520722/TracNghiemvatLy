import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = [];

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case Types.SET_EVALUATED_CHART:
        state = action.chart_data;
        console.log(state);
        return state;

    case Types.CLEAR_EVALUATED_CHART:
        state = initialState;
        console.log("A");
        return state;

    default:
      return state;
  }
};

export default myReducer;