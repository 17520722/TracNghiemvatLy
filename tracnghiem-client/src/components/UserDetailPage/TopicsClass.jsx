import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as evaluated_actions from "../../actions/evalue_topics_user_actions";

function TopicsClass(props) {
  const onClick = (topic) => {
    props.onClearChartData();
    let topicChart = [];
    props.evaluated.forEach(element => {
      if (element.topicId === topic.topicId) {
        topicChart.push(element);
        if (topicChart.length > props.count_data) {
          topicChart.shift();
        }
      }
    });
    props.onSetChartData(topicChart);
  }

  let result = null;
  if (props.topic_list.length > 0) {
    result = props.topic_list.map((topic, index) => {
      let cls = topic.topicId.slice(0, 2);
      if (cls === props.classIndex) {
        return <button key={index} onClick={() => onClick(topic)}>{topic.content}</button>;
      } else {
        return null;
      }
    });
  }
  return result;
}

const mapsStateToProps = (state) => {
  return {
    topic_list: state.topic_list,
    evaluated: state.evaluated_topics_user,
    count_data: state.count_data
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSetChartData: (chart_data) => {
      dispatch(evaluated_actions.set_evaluated_chart(chart_data));
    },
    onClearChartData: () => {
      dispatch(evaluated_actions.clear_evaluated_chart());
    }
  }
}

export default connect(mapsStateToProps, mapDispatchToProps)(TopicsClass);
