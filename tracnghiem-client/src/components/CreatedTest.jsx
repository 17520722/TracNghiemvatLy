import { Component } from "react";
import topic_list from "../constants/topic_list";
import { connect } from "react-redux";
import * as topic_actions from "../actions/selected_topics_action";
import * as test_actions from "../actions/created_test_info_actions";
import * as _ from "lodash";

let selectedTopic = [];
let topic_edited = [];

class CreatedTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "vatly",
      classes: "thpt",
      term: "cn",
      time: "50",
      level: "2",

      topic: [],
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.classes !== this.state.classes) {
      this.props.onSetEmptySelectedTopics();
    }
  };

  componentDidMount = () => {
    this.props.onSetSeletedTopics(selectedTopic);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var test = {
      id: `TE${Date.now()}`,
      subject: this.state.subject,
      classes: this.state.classes,
      term: this.state.term,
      time: this.state.time,
      level: this.state.level,
    }
    this.props.onSetTestInfo(test);
    this.props.nextStepTopNotice();
  };

  handleChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  addTopic = (event) => {
    var {selected_topics} = this.props;
    var value = event.target;
    var { topic } = this.state;
    this.setState({
      topic: value,
    });
    for (let i = 0; i < selected_topics.length; i++) {
      if (selected_topics[i].id === topic) return;
    }
    const index = _.findIndex(topic_edited, ['id', topic]);
    this.props.onAddSelectedTopic(topic_edited[index]);
  };

  sliceTopic = (topics, classes, term) => {
    var tempRe = [];
    for (let i = 0; i < topics.length; i++) {
      var te = topics[i].id.slice(2, 3);
      var cla = topics[i].id.slice(0, 2);
      if (term === "cn" && classes === cla) {
        tempRe.push(topics[i]);
      } else if (term === te && classes === cla) {
        tempRe.push(topics[i]);
      } else if (classes === "thpt") {
        tempRe.push(topics[i]);
      }
    }
    return tempRe;
  };

  handleTermTopic = () => {
    var { term, classes } = this.state;
    var topic_e = this.sliceTopic(topic_list, classes, term);
    return topic_e;
  };

  handleDeleteTopic = (event) => {
    var {selected_topics} = this.props;
    var id = event.target.id;
    for (let i = 0; i < selected_topics.length; i++) {
      if (selected_topics[i].id === id) {
        this.props.onDeleteOneTopic(id);
        this.setState({});
        break;
      }
    }
  }

  showSelectedTopic = (topics, topic_list) => {
    var temp = [];
    for (let i = 0; i < topics.length; i++) {
      for (let j = 0; j < topic_list.length; j++) {
        if (topics[i].id === topic_list[j].id) {
          temp.push(topic_list[j]);
        }
      }
    }
    var result;
    result = temp.map((t, i) => {
      return (
        <div key={i} className="deleted_topic_wrapper">
          <button
            key={i}
            type="button"
            id={t.id}
            className="btn btn-secondary selected-topic-btn"
            onClick={this.handleDeleteTopic}
          >
            {t.topic}
          </button>
          <i className="fas fa-trash-alt"></i>
        </div>
      );
    });
    return result;
  };

  render() {
    var { subject, classes, term, time, level, topic } = this.state;
    var { selected_topics } = this.props;
    topic_edited = this.handleTermTopic();
    return (
      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
        <p className="title-create-test">TẠO ĐỀ THI</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-wrapper">
            <div className="form-content">
              <div className="form-group">
                <label>Chọn môn:</label>
                <select
                  className="form-control"
                  name="subject"
                  value={subject}
                  onChange={this.handleChange}
                >
                  <option value="vatly">Vật lý</option>
                </select>
              </div>

              <div className="form-group">
                <label>Thời gian:</label>
                <select
                  className="form-control"
                  name="time"
                  value={time}
                  onChange={this.handleChange}
                >
                  <option value="50">Tiêu chuẩn (50 phút)</option>
                  <option value="15">15 phút</option>
                  <option value="45">45 phút</option>
                </select>
              </div>

              <div className="form-group">
                <label>Độ khó:</label>
                <select
                  className="form-control"
                  name="level"
                  value={level}
                  onChange={this.handleChange}
                >
                  <option value="none">Theo năng lực</option>
                  <option value="1">Dễ</option>
                  <option value="2">Trung bình</option>
                  <option value="3">Khó</option>
                </select>
              </div>

              <div className="row">
                <div className="form-group col-6">
                  <label>Chọn lớp:</label>
                  <select
                    className="form-control"
                    name="classes"
                    value={classes}
                    onChange={this.handleChange}
                  >
                    <option value="thpt">THPT</option>
                    <option value="10">Lớp 10</option>
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12</option>
                  </select>
                </div>

                <div className="form-group col-6">
                  <label>Học kỳ:</label>
                  <select
                    className="form-control"
                    name="term"
                    value={term}
                    onChange={this.handleChange}
                  >
                    <option value="cn">Cả năm</option>
                    <option value="1">HK1</option>
                    <option value="2">HK2</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Chủ đề:</label>
                <select
                  className="form-control topic-props"
                  multiple
                  name="topic"
                  value={topic}
                  onChange={this.handleChange}
                >
                  {topic_edited.map((topic, i) => {
                    return (
                      <option key={i} value={topic.id} onClick={this.addTopic}>
                        [{topic.id}] {topic.topic}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <p>Chủ đề đã chọn:</p>
                {this.showSelectedTopic(selected_topics, topic_list)}
              </div>

              <div className="text-right">
                <button className="btn btn-success" type="submit">
                  Tạo đề
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected_topics: state.selected_topics,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSetSeletedTopics: (topics) => {
      dispatch(topic_actions.set_seleted_topics(topics));
    },
    onSetEmptySelectedTopics: () => {
      dispatch(topic_actions.empty_selected_topics());
    },
    onDeleteOneTopic: (id) => {
      dispatch(topic_actions.delete_one_topic(id));
    },
    onAddSelectedTopic: (topic) => {
      dispatch(topic_actions.add_selected_topic(topic));
    },

    onSetTestInfo: (test) => {
      dispatch(test_actions.set_created_test_info(test))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatedTest);
