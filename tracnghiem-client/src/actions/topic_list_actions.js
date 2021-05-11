import * as Types from "../constants/TypeActions";
import * as graphql_topic from "../graphql/topic.service"

export const get_topic_list = (topic_list) => {
    return {
        type: Types.GET_TOPIC_LIST,
        topic_list
    }
}

export const get_topic_list_req = () => {
    return dispatch => {
        return graphql_topic.getAllTopic().then(res => res.text()).then(result => {
            let temp = JSON.parse(result);
            dispatch(get_topic_list(temp.data.topics));
        });
    }
}