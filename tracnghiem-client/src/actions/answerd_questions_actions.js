import * as Types from "../constants/TypeActions";

export const add_answerd_question = (number, ans_id) => {
    return {
        type: Types.ADD_ANSWERD_QUESTION,
        number,
        ans_id
    }
}

export const update_answerd = (number, ans_id) => {
    return {
        type: Types.UPDATE_ANSWERD,
        number,
        ans_id
    }
}