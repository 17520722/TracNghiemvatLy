import { combineReducers } from "redux";
import selected_topics from "./create_test_page/selected_topics";
import created_test from "./create_test_page/created_test";
import toast from "./Toast";
import answerd_questions from "./testing_page/answerd_questions";
import test_records from "./testing_page/test_records";
import topic_list from "./create_test_page/topic_list";

const myReducer = combineReducers({
    selected_topics,
    topic_list,
    created_test,
    toast,
    test_records,
    answerd_questions,
});

export default myReducer;
