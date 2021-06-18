import { combineReducers } from "redux";
import selected_topics from "./create_test_page/selected_topics";
import created_test from "./create_test_page/created_test";
import toast from "./Toast";
import answerd_questions from "./testing_page/answerd_questions";
import test_records from "./testing_page/test_records";
import topic_list from "./create_test_page/topic_list";
import ans_correct_per_topics from "./after_test/ans_correct_per_topics";
import is_end_test from "./testing_page/is_end_test";
import current_chart from "./user_detail_page/current_chart";
import evaluated_topics_user from "./user_detail_page/evaluated_topics_user";
import evaluated_chart from "./user_detail_page/evaluated_chart";

const myReducer = combineReducers({
    selected_topics,
    topic_list,
    created_test,
    toast,
    test_records,
    answerd_questions,
    ans_correct_per_topics,
    is_end_test,
    current_chart,
    evaluated_topics_user,
    evaluated_chart
});

export default myReducer;
