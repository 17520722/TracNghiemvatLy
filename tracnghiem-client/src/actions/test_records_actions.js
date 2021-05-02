import * as Types from "../constants/TypeActions";

export const add_question_to_test = (ans_question) => {
    return {
        type: Types.ADD_QUESTION_TO_TEST,
        ans_question,
    }
}

export const update_question_to_test = (ans_question) => {
    return {
        type: Types.UPDATE_QUESTION_TO_TEST,
        ans_question,
    }
}

export const add_answerd_to_test = (answered) => {
    return {
        type: Types.ADD_ANSWERD_TO_TEST,
        answered
    }
}   

export const update_answerd_to_test = (answered) => {
    return {
        type: Types.UPDATE_ANSWERD_TO_TEST,
        answered
    }
}

export const clear_info_test = () => {
    return {
        type: Types.CLEAR_INFO_TEST,
    }
}

export const set_time_finnish_test = (m, s) => {
    return {
        type: Types.SET_TIME_FINNISH_TEST,
        m,
        s
    }
}

export const set_correct_number = (num_correct) => {
    return {
        type: Types.SET_NUMBER_CORRECT,
        num_correct
    }
}