import { Component } from "react";
import callApi from "../../utils/apiCalller";

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
      topic: "1",
      level: 1,
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
      dapan: {
        ...this.state.dapan,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    var { txt_noidung, dapan, select_doKho, select_dangToan } = this.state;
    event.preventDefault();

    callApi("cau-hoi", "POST", {
      txt_noidung: txt_noidung,
      dapan: [dapan.dapan1, dapan.dapan2, dapan.dapan3, dapan.dapan4],
      select_doKho: select_doKho,
      select_dangToan: select_dangToan,
    });
  };

  render() {
    var { content, setOfAnswer, level, topic } = this.state;

    return (
      <div className="ml-5 mr-5 mt-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="txt_noidung">Nội dung</label>
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
              <label className="ml-2"> isCorrect: </label>
              <input className="ml-2" type="checkbox" />
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
                <label htmlFor="select_dangToan">Dạng toán</label>
                <select
                  className="form-control"
                  id="select_dangToan"
                  name="topic"
                  value={topic}
                  onChange={this.handleChange}
                >
                  <option value={1}>Dạng toán 1</option>
                  <option value={2}>Dạng toán 2</option>
                  <option value={3}>VDạng tians 3</option>
                  <option value={4}>Dạng toán 4</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            OK
          </button>
        </form>
      </div>
    );
  }
}
