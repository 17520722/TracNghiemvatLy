import * as Types from "../../constants/TypeActions";

var initialState = [];

const findIndex = (arr, item) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].topicId === item.topicId) {
      return i;
    }
  }
  return -1;
}

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_ANS_CORRECT_PER_TOPIC:
      let existed = findIndex(state, action.item);
      console.log(existed);
      if (existed === -1) {
        state.push(action.item);
      }
      return state;

    default:
      return state;
  }
};

export default myReducer;
