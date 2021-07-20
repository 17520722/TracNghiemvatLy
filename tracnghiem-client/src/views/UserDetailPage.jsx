import Footer from "../components/Footer";
import Header from "../components/Header";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

import "../css/user_detail_page.css";
import * as actions_evaluated_topics from "../actions/evalue_topics_user_actions";
import LeftContentUserDetail from "../components/UserDetailPage/LeftContentUserDetail";
import { connect } from "react-redux";

function UserDetailPage(props) {
  const [HasData, setHasData] = useState(true);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [title, setTitle] = useState({});
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (props.evaluated.length === 0) {
      const userFromSession = JSON.parse(sessionStorage.getItem("user"));
      props.onGetEvaluatedTopics(userFromSession.username);
    }

    if (props.evaluated_chart.length > 0) {
      setHasData(true);
      let data = [];
      let labelsTemp = [];
      for (let i = 0; i < props.evaluated_chart.length; i++) {
        labelsTemp.push(props.evaluated_chart[i].testId);
        data
          .push(
            props.evaluated_chart[i].numberCorrectAns /
              props.evaluated_chart[i].numberAns
          )
          .toFixed(2);
      }
      setLabels(labelsTemp);
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      setDatasets([
        {
          data: data,
          label: props.evaluated_chart[0].topicId,
          borderColor: "#" + randomColor,
          fill: false,
        },
      ]);
    } else {
      setHasData(false);
    }
    setTitle({
      display: true,
      text: "Biểu đồ thể hiện sự phát triển chủ đề qua các đề thi",
      position: "bottom",
    });
  }, [props.evaluated_chart, props.evaluated]);

  const TopicName = () => {
    let result = "";
    if (props.evaluated_chart[0]) {
      for (let i = 0; i < props.topic_list.length; i++) {
        if (props.topic_list[i].topicId === props.evaluated_chart[0].topicId) {
          result = props.topic_list[i].content;
        }
      }
    }
    return "Chủ đề: " + result;
  };

  const RenderChart = () => {
    if (HasData === false) {
      return <div className="no-data-props">Không có dữ liệu</div>;
    } else {
      return (
        <div className="static">
          <Line
            data={{
              labels: labels,
              datasets: datasets,
            }}
            options={{
              plugins: {
                title: title,
              },
              elements: {
                point: {
                  pointStyle: "rect",
                },
              },
              maintainAspectRatio: "false",
            }}
          />
        </div>
      );
    }
  };

  const RenderEvaluatedText = () => {
    let avg = 0;
    let develop = "";
    let ability = "";
    if (datasets[0] === undefined) {
      return <div></div>;
    } else {
      let lengthA = datasets[0].data.length - 1;
      let up = true;
      let down = true;
      for (let i = 0; i < datasets[0].data.length; i++) {
        if (i !== datasets[0].data.length - 1) {
          if (datasets[0].data[i] < datasets[0].data[i + 1]) {
            down = false;
          } else if (datasets[0].data[i] > datasets[0].data[i + 1]) {
            up = false;
          }
        }
        avg = avg + datasets[0].data[i];
      }
      if (HasData === false) {
        return <div>Không có dữ liệu</div>;
      } else {
        avg = (avg / datasets[0].data.length).toFixed(2);
        console.log(avg);

        if (avg <= 0.3) {
          ability = "Yếu";
        } else if (avg <= 0.5) {
          ability = "Trung bình thấp";
        } else if (avg <= 0.7) {
          ability = "Trung bình khá";
        } else if (avg <= 0.9) {
          ability = "Tốt";
        } else {
          ability = "Rất tốt";
        }

        if (down === true && up === true) {
          develop = "Không có sự thay đổi";
        } else if (down === false && up === true) {
          develop = "Qua biểu đồ ta thấy thí sinh có sự tiến bộ theo thời gian";
        } else if (down === true && up === false) {
          develop =
            "Qua biểu đồ ta thấy thí sinh có sự sa sút về kiến thức theo thời gian";
        } else {
          if (datasets[0].data[0] < datasets[0].data[lengthA]) {
            develop =
              "Có sự tăng và giảm trong việc phát triển kiến thức nhưng nhìn chung năng lực của thí sinh đang dần phát triển theo thời gian";
          } else if (datasets[0].data[0] > datasets[0].data[lengthA]) {
            develop =
              "Có sự tăng và giảm trong việc phát triển kiến thức nhưng nhìn chung năng lực của thí sinh đang dần sa sút theo thời gian";
          } else {
            develop =
              "Có sự tăng và giảm trong việc phát triển kiến thức nhưng nhìn chung năng lực của thí sinh ít thay đổi";
          }
        }
      }
    }
    return (
      <div>
        <div>
          Qua biểu đồ ta có thể thấy được năng lực của thí sinh ở mức {ability}{" "}
          với điểm năng lực trung bình là: {avg}
        </div>
        <div>{develop}</div>
      </div>
    );
  };

  const changeCount = (event) => {
    let value = event.target.value;
    value = parseInt(value);
    setCount(value);

    props.onClearChartData();

    if (props.evaluated_chart[0]) {
      let topicChart = [];
      props.evaluated.forEach((element) => {
        if (element.topicId === props.evaluated_chart[0].topicId) {
          topicChart.push(element);
          if (topicChart.length > value) {
            topicChart.shift();
          }
        }
      });
      props.onSetChartData(topicChart);
    }

    props.onChangeCountDataChart(value);
  };

  return (
    <div>
      <Header />
      <div className="row">
        <LeftContentUserDetail />
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 right-content">
          <p className="title-right-content">Những đề gần đây</p>
          <div className="static-wrapper">
            <div className="col-3">
              <form>
                <div className="form-group">
                  <label htmlFor="select_count">Số đề thi</label>
                  <select
                    className="form-control"
                    id="select_count"
                    value={count}
                    onChange={changeCount}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="topic-name-text">
              <TopicName />
            </div>
            <RenderChart />
            <div className="note-chart">
              (Với trục ngang là số đề thi đã làm gần đây. Trục dọc là điểm số
              tương quan qua từng đề thi)
            </div>
          </div>
          <div>
            <div>*Dữ liệu được lấy từ {count} đề thi gần nhất</div>
            <span className="bold-text">Nhận xét: </span>
            <RenderEvaluatedText />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    topic_list: state.topic_list,
    evaluated_chart: state.evaluated_chart,
    evaluated: state.evaluated_topics_user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetEvaluatedTopics: (username) => {
      dispatch(actions_evaluated_topics.get_evaluated_topics_req(username));
    },
    onChangeCountDataChart: (count) => {
      dispatch(actions_evaluated_topics.on_change_count_data_chart(count));
    },
    onClearChartData: () => {
      dispatch(actions_evaluated_topics.clear_evaluated_chart());
    },
    onSetChartData: (data) => {
      dispatch(actions_evaluated_topics.set_evaluated_chart(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailPage);
