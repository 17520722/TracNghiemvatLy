import { combineReducers } from "redux";
import selected_topics from "./create_test_page/selected_topics";
import created_test from "./create_test_page/created_test";
import set_show_toast from "./Toast";

const myReducer = combineReducers({
    selected_topics,
    created_test,
    set_show_toast
});

export default myReducer;
