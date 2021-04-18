import { combineReducers } from "redux";
import selected_topics from "./create_test_page/selected_topics";
import created_test from "./create_test_page/created_test";

const myReducer = combineReducers({
    selected_topics,
    created_test
});

export default myReducer;