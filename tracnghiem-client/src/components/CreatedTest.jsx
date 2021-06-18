import { Component } from "react";
import { connect } from "react-redux";
import * as topic_actions from "../actions/selected_topics_action";
import * as test_actions from "../actions/created_test_info_actions";
import * as record_test_actions from "../actions/test_records_actions";
import * as _ from "lodash";
import { bias, flexGenerateLevel, level, levelOfTest } from "../constants/genaral_define";
import * as graphsql_question from "../graphql/question.service";
import { getEvaluatedTopic } from "../services/topicEvaluate";

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
      level: 2,

      topic: [],
      isSetIdAnswer: false,
      questionsFilterTopic: []
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.classes !== this.state.classes) {
      this.props.onSetEmptySelectedTopics();
    }
  };

  componentDidMount = () => {
    this.props.onClearInfoTest();
    this.props.onSetSeletedTopics(selectedTopic);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    var test = {
      id: "AZX",
      subject: this.state.subject,
      classes: this.state.classes,
      term: this.state.term,
      time: this.state.time,
      level: this.state.level,
    };
    await this.getQuestionFromServer();
    await this.props.onSetTestInfo(test);
    await this.props.onSetLevelOfTest(parseInt(test.level));
    this.props.nextStepToNotice();
  };

  handleChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    if (name === "level") {
      value = parseInt(value);
    }
    this.setState({
      [name]: value,
    });

  };

  //lấy id user
  //lấy topicScore
  //lay questionScore
  //if (testlevel == 0) 
  //questionInTopic1,
  //    filter(listQuestion, topic)
  //questionInTopic2,
  //questionInTopic3,
  //questionInTopic4
  
  createTestOnRedux = async(test, questions) => {
    var { test_records } = this.props;
    var number_question_for_lv = "";
    if (test.level === 1) {
      number_question_for_lv = levelOfTest(40, level[1]);
    } else if (test.level === 2) {
      number_question_for_lv = levelOfTest(40, level[2]);
    } else if (test.level === 3) {
      number_question_for_lv = levelOfTest(40, level[3]);
    } else if (test.level === 0) {
      number_question_for_lv = flexGenerateLevel(selectedTopic);
    }

    if (test.level !== 0) {
      console.log(number_question_for_lv);
      let allQuestionLenght = questions.length;

      for (let i = 0; i < allQuestionLenght; i++) {
        console.log("SDSDSDS")
        const index = _.random(0, questions.length - 1);
        if (questions[index].level === 1) {
          this.props.onAddQuestionToTest(questions[index]);
          questions.splice(index, 1);
        }
        if (test_records.setOfRemember.length === number_question_for_lv.remember) {
          break;
        }
      }
      for (let i = 0; i < allQuestionLenght; i++) {
        console.log("SDSDSDSssss")
        const index = _.random(0, questions.length - 1);
        if (questions[index].level === 2) {
          this.props.onAddQuestionToTest(questions[index]);
          questions.splice(index, 1);
        }
        if (test_records.setOfUnderstand.length === number_question_for_lv.understand) {
          break;
        }
      }
      for (let i = 0; i < allQuestionLenght; i++) {
        const index = _.random(0, questions.length - 1);
        if (questions[index].level === 3) {
          this.props.onAddQuestionToTest(questions[index]);
          questions.splice(index, 1);
        }
        if (test_records.setOfApply.length === number_question_for_lv.apply) {
          break;
        }
      }
      for (let i = 0; i < allQuestionLenght; i++) {
        console.log("SDSDSDSmkvsmkvm")
        const index = _.random(0, questions.length - 1);
        if (questions[index].level === 4) {
          this.props.onAddQuestionToTest(questions[index]);
          questions.splice(index, 1);
        }
        if (test_records.setOfAnalyzing.length === number_question_for_lv.analyzing) {
          break;
        }
      }
    }
    else {
      //get score
      let user = JSON.parse(sessionStorage.getItem("user"));
      let listScoreTopic = [];
      await getEvaluatedTopic(selectedTopic, user.token).then(response => response.json()).then(result => {
        listScoreTopic = result;
        console.log("EHEHEHEHHEHEHE")
      });
      
      listScoreTopic.forEach(topicScore =>  {
        let arr = questions.filter(question => topicScore.topicId == question.topic.topicId);
        arr = this.sortQuestionByScore(arr);
        let temp = this.state.questionsFilterTopic;
        temp.push(arr);
        this.setState({ questionsFilterTopic:  temp})
        console.log(arr)
      });
      //random topic.
      for (let index = 0; index < number_question_for_lv.remember; index++) {
        let rand = Math.floor(Math.random() * listScoreTopic.length) + 1;
        //list question in topic specific 
        let filterTopics = this.state.questionsFilterTopic[rand];
        //check element of list question in topic

        for (let i = filterTopics.length - 1; i >= 0; i++) {
          if (filterTopics[i].level !== 1) {
            continue;
          }
          //get topicScore of question
          this.filterQuestionAndAddToTest(listScoreTopic, filterTopics, rand, i);
        }
      }

      for (let index = 0; index < number_question_for_lv.understand; index++) {
        let rand = Math.floor(Math.random() * listScoreTopic.length) + 1;
        //list question in topic specific 
        let filterTopics = this.state.questionsFilterTopic[rand];
        //check element of list question in topic

        for (let i = filterTopics.length - 1; i >= 0; i++) {
          if (filterTopics[i].level !== 2) {
            continue;
          }
          //get topicScore of question
          this.filterQuestionAndAddToTest(listScoreTopic, filterTopics, rand, i);
        }
      }

      for (let index = 0; index < number_question_for_lv.apply; index++) {
        let rand = Math.floor(Math.random() * listScoreTopic.length) + 1;
        //list question in topic specific 
        let filterTopics = this.state.questionsFilterTopic[rand];
        //check element of list question in topic

        for (let i = filterTopics.length - 1; i >= 0; i++) {
          if (filterTopics[i].level !== 3) {
            continue;
          }
          //get topicScore of question
          this.filterQuestionAndAddToTest(listScoreTopic, filterTopics, rand, i);
        }
      }

      for (let index = 0; index < number_question_for_lv.analyzing; index++) {
        let rand = Math.floor(Math.random() * listScoreTopic.length) + 1;
        //list question in topic specific 
        let filterTopics = this.state.questionsFilterTopic[rand];
        //check element of list question in topic

        for (let i = filterTopics.length - 1; i >= 0; i++) {
          if (filterTopics[i].level !== 4) {
            continue;
          }
          //get topicScore of question
          this.filterQuestionAndAddToTest(listScoreTopic, filterTopics, rand, i);
        }
      }
    }
  };

  filterQuestionAndAddToTest = (listScoreTopic, filterTopics, rand, index ) => {
    const topicScore = listScoreTopic.find(element => element.topicId === filterTopics[index].topic.topicId);
    const questionScore = isNaN(filterTopics[index].correctAns / filterTopics[index].countAns) ? 0 :
          (filterTopics[index].correctAns / filterTopics[index].countAns);
    if (questionScore <= topicScore.NLScore - bias) {
      this.props.onAddQuestionToTest(filterTopics[index]);
      
      let newState = this.state.questionsFilterTopic;
      newState[rand].splice(index, 1);

      this.setState({ questionsFilterTopic: newState });
    }
    console.log(this.props.test_records.setOfQuestions);
  };

  sortQuestionByScore = (listQuestion) => {
    for (let i = 0; i < listQuestion.length - 1; i++) {
      for (let j = i + 1; j < listQuestion.length; j++) {
          let scoreA = isNaN(listQuestion[i].correctAns / listQuestion[i].countAns) ? 0 : 
              (listQuestion[i].correctAns / listQuestion[i].countAns);
          let scoreB = isNaN(listQuestion[j].correctAns / listQuestion[j].countAns) ? 0 :
              (listQuestion[j].correctAns / listQuestion[j].countAns);
          
          if (scoreA > scoreB) {
            let temp = listQuestion[i];
            listQuestion[i] = listQuestion[j];
            listQuestion[j] = temp;
          }
      }
    }
    return listQuestion;
  }

  filterQuestionByTopic = (allQuestion, topicList) => {
    let tempArr = [];
    for (let i = 0; i < topicList.length; i++) {
      allQuestion.forEach((element) => {
        if (element.topic?.topicId === topicList[i]?.topicId) {
          tempArr.push(element);
        }
      });
    }
    return tempArr;
  };

  getQuestionFromServer = () => {
    var { test_records } = this.props;
    graphsql_question
      .getAllQuestion()
      .then((res) => res.text())
      .then((result) => {
        let temp = JSON.parse(result);
        let allQuestion = temp.data.allQuestion;
        let test = this.state;

        if (selectedTopic.length !== 0) {

          let temp = this.filterQuestionByTopic(allQuestion, selectedTopic);
          allQuestion = temp;
        } else {
          let temp = this.filterQuestionByTopic(allQuestion, topic_edited);
          allQuestion = temp;
        }
        this.createTestOnRedux(test, allQuestion);
        this.props.onSetIdForAnswer();
        this.props.onSetNullAnswerSet();
      });
  };

  addTopic = (event) => {
    var { selected_topics } = this.props;
    var value = event.target;
    var { topic } = this.state;
    this.setState({
      topic: value,
    });
    for (let i = 0; i < selected_topics.length; i++) {
      if (selected_topics[i].topicId === topic) return;
    }
    const index = _.findIndex(topic_edited, ["topicId", topic]);
    console.log(index);
    this.props.onAddSelectedTopic(topic_edited[index]);
  };

  sliceTopic = (topics, classes, term) => {
    var tempRe = [];
    for (let i = 0; i < topics.length; i++) {
      var te = topics[i].topicId.slice(2, 3);
      var cla = topics[i].topicId.slice(0, 2);
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
    var topic_e = this.sliceTopic(this.props.topic_list, classes, term);
    return topic_e;
  };

  handleDeleteTopic = (event) => {
    var { selected_topics } = this.props;
    var id = event.target.id;
    console.log(id);
    for (let i = 0; i < selected_topics.length; i++) {
      if (selected_topics[i].topicId === id) {
        this.props.onDeleteOneTopic(id);
        this.setState({});
        break;
      }
    }
  };

  showSelectedTopic = (topics, topic_list) => {
    var temp = [];
    for (let i = 0; i < topics.length; i++) {
      for (let j = 0; j < topic_list.length; j++) {
        if (topics[i].topicId === topic_list[j].topicId) {
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
            id={t.topicId}
            className="btn btn-secondary selected-topic-btn"
            onClick={this.handleDeleteTopic}
          >
            {t.content}
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      );
    });
    return result;
  };

  render() {
    var { subject, classes, term, time, level, topic } = this.state;
    var { selected_topics } = this.props;
    topic_edited = this.handleTermTopic();
    console.log(this.props.test_records);

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
                  <option value={0}>Theo năng lực</option>
                  <option value={1}>Dễ</option>
                  <option value={2}>Trung bình</option>
                  <option value={3}>Khó</option>
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
                      <option
                        key={i}
                        value={topic.topicId}
                        onClick={this.addTopic}
                      >
                        [{topic.topicId}] {topic.content}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <p>Chủ đề đã chọn:</p>
                {this.showSelectedTopic(selected_topics, this.props.topic_list)}
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

const mapStateToProps = (state) => {
  return {
    selected_topics: state.selected_topics,
    test_records: state.test_records,
    topic_list: state.topic_list,
  };
};

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
      dispatch(test_actions.set_created_test_info(test));
    },
    onAddQuestionToTest: (question) => {
      dispatch(record_test_actions.add_question_to_test(question));
    },
    onSetNullAnswerSet: () => {
      dispatch(record_test_actions.set_null_for_answerset());
    },
    onSetIdForAnswer: () => {
      dispatch(record_test_actions.set_id_for_answer());
    },
    onSetLevelOfTest: (level) => {
      dispatch(record_test_actions.set_level_of_test(level))
    },
    onClearInfoTest: () => {
      dispatch(record_test_actions.clear_info_test());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatedTest);
