import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case Types.SET_SELECTED_TOPIC:
            state = action.topics;
            return state;
        
        case Types.ADD_SELECTED_TOPIC:
            state.push(action.topic);
            return state;

        case Types.DELETE_ONE_SELECTED_TOPIC:
            const index = _.findIndex(state, ['id', action.id]);
            console.log(index);
            state.splice(index, 1);
            return state;
        
        case Types.EMPTY_SELECTED_TOPICS:
            state = [];
            return state;

        default: return state;
    }
}

export default myReducer;