import * as Types from "../../constants/TypeActions";

var initialState = [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_TOPIC_LIST:
            state = action.topic_list;
            return state;

        default: return state;
    }
}

export default myReducer;
