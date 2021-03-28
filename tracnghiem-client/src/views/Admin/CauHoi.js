import { Component } from "react";

export default class CauHoiPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      txt_noidung: "",
      dapan: {
        dapan1: "",
        dapan2: "",
        dapan3: "",
        dapan4: "",
      },
      select_doKho: 1,
      select_dangToan: 1,
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
        [name]: value
      } 
    })
  }

  handleSubmit = (event) => {

    event.preventDefault();
    localStorage.setItem("CauHoi", JSON.stringify(this.state));
    
  };

  render() {

    var {
      txt_noidung,
      dapan,
      select_doKho,
      select_dangToan,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="txt_noidung">Nội dung</label>
            <textarea
              className="form-control"
              id="txt_noidung"
              rows="4"
              name="txt_noidung"
              value={txt_noidung}
              onChange={this.handleChange}
            />

            <div className="form-group">
              <label htmlFor="dapan1">Đáp án 1</label>
              <input
                type="text"
                className="form-control"
                id="dapan1"
                name="dapan1"
                value={dapan.dapan1}
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
                value={dapan.dapan2}
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
                value={dapan.dapan3}
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
                value={dapan.dapan4}
                onChange={this.handleChangeAnswer}
              />
            </div>

          </div>
          <div className="row">
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">

              <div className="form-group">
                <label htmlFor="select_doKho">Độ khó</label>
                <select
                  className="form-control"
                  id="select_doKho"
                  name="select_doKho"
                  value={select_doKho}
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
                  name="select_dangToan"
                  value={select_dangToan}
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
