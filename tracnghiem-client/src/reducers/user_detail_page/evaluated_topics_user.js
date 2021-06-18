import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = [];

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case Types.GET_EVALUE_TOPICS_USER:
        state = action.list;
        console.log(state);
        return state;

    default:
      return state;
  }
};

export default myReducer;