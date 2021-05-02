import { Component } from "react";
import topic_list from "../../constants/topic_list";
import callApi from "../../utils/apiCalller";
import "../../css/admin_question.css";

export default class CauHoiPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      setOfAnswer: {
        dapan1: "",
        dapan2: "",
        dapan3: "",
        dapan4: "",
      },
      topic: "1011",
      level: 1,
      urlImage: "",

      cb_da: "cb_da1",
      selectedFile: "",
      showImage: "",
    };
  }

  handleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleChangeAnswer = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({
      setOfAnswer: {
        ...this.state.setOfAnswer,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    var { content, setOfAnswer, level, topic, cb_da, urlImage } = this.state;
    event.preventDefault();

    const data = new FormData();
    data.append("file", this.state.selectedFile);
    // callApi("upload", "POST", data);

    let question = {
      content: content,
      setOfAnswer: [
        {
          content: setOfAnswer.dapan1,
          isCorrect: cb_da === "cb_da1" ? true : false,
        },
        {
          content: setOfAnswer.dapan2,
          isCorrect: cb_da === "cb_da2" ? true : false,
        },
        {
          content: setOfAnswer.dapan3,
          isCorrect: cb_da === "cb_da3" ? true : false,
        },
        {
          content: setOfAnswer.dapan4,
          isCorrect: cb_da === "cb_da4" ? true : false,
        },
      ],
      level: level,
      topic: topic,
      urlImage: urlImage,
    };
    console.log(question);
    callApi("questions", "POST", question);
  };

  renderTopic = () => {
    var result = null;
    result = topic_list.map((topic, index) => {
      return (
        <option
          key={index}
          value={topic.id}
        >{`${topic.id}: ${topic.topic}`}</option>
      );
    });
    return result;
  };

  onChangeImageHandler = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();

    if (file === undefined) {
      file = this.state.selectedFile;
    } else {
      this.setState({
        selectedFile: file,
        urlImage: `/images/${file.name}`,
      });
    }

    console.log(file);
    if (!file) {
      return;
    }

    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        showImage: [reader.result],
      });
    }.bind(this);
  };

  removeImg = () => {
    this.setState({ showImage: "", selectedFile: "" });
  };

  render() {
    var { content, setOfAnswer, level, topic, cb_da, showImage } = this.state;

    return (
      <div className="ml-5 mr-5 mt-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="content">Nội dung</label>
            <textarea
              className="form-control"
              id="content"
              rows="4"
              name="content"
              value={content}
              onChange={this.handleChange}
            />
            <div className="form-group">
              <label htmlFor="dapan1">Đáp án 1</label>
              <label htmlFor="cb_da1" className="ml-5">
                {" "}
                Đáp án đúng:{" "}
              </label>
              <input
                className="ml-2"
                type="radio"
                name="cb_da"
                id="cb_da1"
                checked={cb_da === "cb_da1"}
                value="cb_da1"
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="form-control"
                id="dapan1"
                name="dapan1"
                value={setOfAnswer.dapan1}
                onChange={this.handleChangeAnswer}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dapan2">Đáp án 2</label>
              <label htmlFor="cb_da2" className="ml-5">
                {" "}
                Đáp án đúng:{" "}
              </label>
              <input
                className="ml-2"
                type="radio"
                name="cb_da"
                id="cb_da2"
                value="cb_da2"
                checked={cb_da === "cb_da2"}
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="form-control"
                id="dapan2"
                name="dapan2"
                value={setOfAnswer.dapan2}
                onChange={this.handleChangeAnswer}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dapan3">Đáp án 3</label>
              <label htmlFor="cb_da3" className="ml-5">
                {" "}
                Đáp án đúng:{" "}
              </label>
              <input
                className="ml-2"
                type="radio"
                name="cb_da"
                id="cb_da3"
                value="cb_da3"
                checked={cb_da === "cb_da3"}
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="form-control"
                id="dapan3"
                name="dapan3"
                value={setOfAnswer.dapan3}
                onChange={this.handleChangeAnswer}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dapan4">Đáp án 4</label>
              <label htmlFor="cb_da4" className="ml-5">
                {" "}
                Đáp án đúng:{" "}
              </label>
              <input
                className="ml-2"
                type="radio"
                name="cb_da"
                id="cb_da4"
                value="cb_da4"
                checked={cb_da === "cb_da4"}
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="form-control"
                id="dapan4"
                name="dapan4"
                value={setOfAnswer.dapan4}
                onChange={this.handleChangeAnswer}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              <div className="form-group">
                <label htmlFor="level">Độ khó</label>
                <select
                  className="form-control"
                  id="level"
                  name="level"
                  value={level}
                  onChange={this.handleChange}
                >
                  <option value={1}>Nhận biết</option>
                  <option value={2}>Thông hiểu</option>
                  <option value={3}>Vận dụng</option>
                  <option value={4}>Vận dụng cao</option>
                </select>
              </div>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <label htmlFor="select_dangToan">Chủ đề</label>
                <select
                  className="form-control"
                  id="select_dangToan"
                  name="topic"
                  value={topic}
                  onChange={this.handleChange}
                >
                  {this.renderTopic()}
                </select>
              </div>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <label htmlFor="select_dangToan">Hình ảnh</label> <br />
                <input
                  type="file"
                  name="selectedFile"
                  onChange={this.onChangeImageHandler}
                />
                {showImage ? (
                  <img
                    className="preview-image"
                    src={showImage}
                    onClick={this.removeImg}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-primary mb-3">
              Thêm câu hỏi
            </button>
          </div>
        </form>
      </div>
    );
  }
}
