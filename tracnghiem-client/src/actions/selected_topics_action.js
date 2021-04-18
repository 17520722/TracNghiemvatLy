import * as Types from "../constants/TypeActions";

export const set_seleted_topics = (topics) => {
    return {
        type: Types.SET_SELECTED_TOPIC,
        topics
    }
}

export const add_selected_topic = (topic) => {
    return {
        type: Types.ADD_SELECTED_TOPIC,
        topic
    }
}

export const delete_one_topic = (id) => {
    return {
        type: Types.DELETE_ONE_SELECTED_TOPIC,
        id
    }
}

export const empty_selected_topics = () => {
    return {
        type: Types.EMPTY_SELECTED_TOPICS
    }
}