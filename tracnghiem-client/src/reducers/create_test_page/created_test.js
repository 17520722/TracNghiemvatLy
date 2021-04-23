import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = {
    id: '',
    subject: "vatly",
    classes: "thpt",
    term: "cn",
    time: "50",
    level: "2",
}

var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case Types.SET_CREATED_TEST_INFO:
            state = action.test;
            console.log(state);
            return state;

        default: return state;
    }
}

export default myReducer;