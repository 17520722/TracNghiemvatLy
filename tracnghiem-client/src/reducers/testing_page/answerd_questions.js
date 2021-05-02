import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = [];

var myReducer = (state = initialState, action) => {
  const ans = {
    number: action.number,
    ans_id: action.ans_id
  }
  switch (action.type) {
    case Types.ADD_ANSWERD_QUESTION:
      state.push(ans);
      return [...state];

    case Types.UPDATE_ANSWERD:
      const index = _.findIndex(state, ["number", action.number]);     
      state[index] = ans;
      return [...state];

    default:
      return [...state];
  }
};

export default myReducer;
