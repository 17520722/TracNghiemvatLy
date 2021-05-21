import * as Types from "../constants/TypeActions";

export const add_ans_correct_per_topic = (item) => {
    return {
        type: Types.ADD_ANS_CORRECT_PER_TOPIC,
        item
    }
}