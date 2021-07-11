import * as Types from "../../constants/TypeActions";
import _ from "lodash";

var initialState = [];

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_TOPIC_LIST:
      let listArr = _.orderBy(action.topic_list, ["topicId"], "asc");
      state = listArr;
      return [...state];

    default:
      return state;
  }
};

export default myReducer;
