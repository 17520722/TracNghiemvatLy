import Footer from "../components/Footer";
import Header from "../components/Header";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

import "../css/user_detail_page.css";
import LeftContentUserDetail from "../components/UserDetailPage/LeftContentUserDetail";
import { connect } from "react-redux";

function UserDetailPage(props) {
  const [HasData, setHasData] = useState(true);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [title, setTitle] = useState({});

  useEffect(() => {
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
      console.log(labelsTemp);
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
  }, [props.evaluated_chart]);

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
    console.log(datasets);
    if (HasData === false) {
      return <div className="no-data-props">Không có dữ liệu</div>;
    } else {
      return (
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
          }}
        />
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="row">
        <LeftContentUserDetail />
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 right-content">
          <p className="title-right-content">Những đề gần đây</p>
          <div className="static-wrapper">
            <div className="static">
              <RenderChart />
            </div>
            <div className="note-chart">
              (Với trục ngang là số đề thi đã làm gần đây. Trục dọc là điểm số
              tương quan qua từng đề thi)
            </div>
            <div className="topic-name-text">
              <TopicName />
            </div>
          </div>
          <div>
            <span className="bold-text">Nhận xét: </span>Nhìn chung trong 10 đề
            gần nhất có sự tiến bộ không đều. Kết quả đạt được khá tốt cần tiến
            bộ nhiều hơn.
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
  };
};

export default connect(mapStateToProps, null)(UserDetailPage);
