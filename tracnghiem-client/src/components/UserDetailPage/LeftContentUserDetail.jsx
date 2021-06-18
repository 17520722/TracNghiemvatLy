import React, { useState, useEffect } from "react";
import * as actions_topic_list from "../../actions/topic_list_actions";
import * as actions_current_chart from "../../actions/current_chart_actions";
import * as actions_evaluated_topics from "../../actions/evalue_topics_user_actions";
import { connect } from "react-redux";
import TopicsClass from "./TopicsClass";

function LeftContentUserDetail(props) {
  const [ShowTopics, setShowTopics] = useState(false);
  const showTopic = (e) => {
    setShowTopics(!ShowTopics);
    onTarget(e);
    props.onSetCurrentChart(1);

    const userFromSession = JSON.parse(sessionStorage.getItem("user"));
    props.onGetEvaluatedTopics(userFromSession.username);
  };

  const showChartTest = (e) => {
    onTarget(e);
    props.onSetCurrentChart(0);
  };

  const onTarget = (e) => {
    let targetElement = e.target;
    let isMenuItem = targetElement.classList.contains("menu-item");

    let elements = document.getElementsByClassName("menu-item");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active-menu");
    }
    if (isMenuItem === true) {
      targetElement.classList.add("active-menu");
    } else {
      targetElement.parentElement.classList.add("active-menu");
    }

    let isMenuTopic = targetElement.classList.contains("menu-topic-chart-item");
    if (isMenuTopic === false) {
      let parent_check = targetElement.parentElement.classList.contains(
        "menu-topic-chart-item"
      );
      if (parent_check === false) {
        setShowTopics(false);
      }
    }
  };

  useEffect(() => {
    if (ShowTopics === false) {
      let ele = document.getElementsByClassName("extends-drop-topic");
      ele[0].classList.add("height-0");
    } else {
      let ele = document.getElementsByClassName("extends-drop-topic");
      ele[0].classList.remove("height-0");
    }
    if (props.topic_list.length === 0) {
      props.onGetTopicList();
    }
  });

  const RenderTopicList = () => {
    return (
      <div>
        <div className="bold-text">Lớp 10</div>
        <TopicsClass classIndex="10" />
        <div className="bold-text">Lớp 11</div>
        <TopicsClass classIndex="11" />
        <div className="bold-text">Lớp 12</div>
        <TopicsClass classIndex="12" />
      </div>
    );
  };

  return (
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 left-content">
      <div
        className="menu-item menu-test-chart-item row"
        onClick={showChartTest}
      >
        <i className="far fa-file-alt col-2"></i>
        <span>Các đề làm gần đây</span>
      </div>
      <div>
        <div
          className="menu-item menu-topic-chart-item active-menu row"
          onClick={showTopic}
        >
          <i className="fas fa-bars col-2"></i>
          <span>Tiến bộ qua các chủ đề</span>
        </div>
        <div className="extends-drop-topic">
          <RenderTopicList />
        </div>
      </div>
    </div>
  );
}

const mapsStateToProps = (state) => {
  return {
    topic_list: state.topic_list,
    evaluated: state.evaluated_topics_user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetTopicList: () => {
      dispatch(actions_topic_list.get_topic_list_req());
    },
    onSetCurrentChart: (number) => {
      dispatch(actions_current_chart.set_current_chart(number));
    },
    onGetEvaluatedTopics: (username) => {
      dispatch(actions_evaluated_topics.get_evaluated_topics_req(username));
    },
  };
};

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(LeftContentUserDetail);
