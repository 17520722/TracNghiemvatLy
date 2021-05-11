import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import { classes, level } from "../constants/genaral_define";
import Loading from "./Loading";

class NoticeExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadedQuestion: false,
    };
  }

  removeTest = () => {
    this.props.removeTest();
  };

  findObj = (id, arr) => {
    var index = _.findIndex(arr, ["id", id]);
    return arr[index];
  };

  showSelectedTopics = () => {
    var { selected_topics } = this.props;
    var string_topics = "";
    for (let i = 0; i < selected_topics.length; i++) {
      string_topics =
        string_topics +
        selected_topics[i].content +
        (i === selected_topics.length - 1 ? ". " : ", ");
    }
    if (string_topics === "") string_topics = "Tất cả";
    return string_topics;
  };

  render() {
    var { created_test_info, test_records } = this.props;

    setTimeout(() => {
      if (test_records.setOfQuestions.length > 0) {
        this.setState({ isLoadedQuestion: true });
      } else {
        let timer = setInterval(() => {
          if (test_records.setOfQuestions.length > 0) {
            this.setState({ isLoadedQuestion: true });
            clearInterval(timer);
          }
        }, 500);
      }
    }, 500);

    if (this.state.isLoadedQuestion === false) {
      return (
        <Loading />
      );
    } else
      return (
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <div className="mr-3">
            <div>
              <p className="title-create-test">{`MÃ ĐỀ: ${created_test_info.id}`}</p>
              <p className="title-create-test text-left">Lưu ý làm bài:</p>
              <p>
                1. Đề thi trắc nghiệm có 40 câu với 50 phút làm bài. Đọc kỹ đề
                và phân bố thời gian hợp lý cho từng câu hỏi trong đề thi.
              </p>
              <p>
                2. Đề thi có các câu hỏi ở các cấp độ: Nhận biết, thông hiểu,
                vận dụng và vận dụng cao. Nên chọn những câu biết làm trước,
                tránh sa lầy làm mất nhiều thời gian cho một câu hỏi.
              </p>
              <p>
                3. Với mỗi trang đề thi nên xem lại có bỏ sót câu trả lời nào
                không, tránh không chọn câu trả lời để bị mất điểm. Ở bên phải
                là các ô hình tròn được đánh số tương ứng với câu hỏi, thí sinh
                có thể nhấn vào đây để chuyển đến câu hỏi nếu có bỏ sót hay cần
                sửa chữa.
              </p>
            </div>
            <div>
              <p className="title-create-test text-left">Thông tin đề thi:</p>
              <p>{`Thời gian làm bài: ${created_test_info.time} phút`}</p>
              <p>{`Độ khó: ${
                this.findObj(created_test_info.level, level).level
              }`}</p>
              <p>{`Phạm vi: ${
                this.findObj(created_test_info.classes, classes).classes
              }`}</p>
              <p>{`Chủ đề: ${this.showSelectedTopics()}`}</p>
            </div>
            <div className="text-right mr-5">
              <button className="btn btn-secondary" onClick={this.removeTest}>
                Tạo lại đề
              </button>
              <Link to="/home/testing">
                <button className="btn btn-success ml-3">
                  Bắt đầu làm bài
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    created_test_info: state.created_test,
    selected_topics: state.selected_topics,
    test_records: state.test_records,
  };
};

export default connect(mapStateToProps, null)(NoticeExam);
