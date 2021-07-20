import { result } from "lodash";
import * as Types from "../constants/TypeActions";
import { getEvaluatedTestsUser, getEvaluatedTopic } from "../services/topicEvaluate";

export const get_evaluated_topics = (list) => {
  return {
    type: Types.GET_EVALUE_TOPICS_USER,
    list,
  };
};

export const get_evaluated_topics_req = (username) => {
  return (dispatch) => {
    return getEvaluatedTestsUser(username).then((res) => {
      return (res.json());
    }).then(rlt => {
        console.log(rlt);
        dispatch(get_evaluated_topics(rlt.topicScoreForUser))
    });
  };
};

export const set_evaluated_chart = (chart_data) => {
  return {
    type: Types.SET_EVALUATED_CHART,
    chart_data
  }
}

export const clear_evaluated_chart = () => {
  return {
    type: Types.CLEAR_EVALUATED_CHART
  }
}

export const on_change_count_data_chart = (count) => {
  return {
    type: Types.CHANGE_COUNT_DATA_CHART,
    count
  }
}