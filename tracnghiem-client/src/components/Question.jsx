import { Component } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { mathjax_config } from "../constants/config";
import { connect } from "react-redux";
import * as record_test_actions from "../actions/test_records_actions";

const abcArr = ["A", "B", "C", "D"];

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setPoint: 0
    };
  }

  componentDidMount = () => {
    this.loadAnsPerPage();
  }

  handleCheckChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    var id = event.target.id;
    var { number, test_records, question } = this.props;

    if (value === "on") {
      this.onFillColor(name);

      console.log(test_records);
      const answered = {
        questionId: question.questionId,
        answerId: id,
      };

      if (test_records.answerSet) {
        for (let i = 0; i < test_records.answerSet.length; i++) {
          if (test_records.answerSet[i].questionId === question.questionId) {
            this.props.onUpdateAnsweredTest(answered);
            return;
          }
        }
      }
      // this.props.onAddAnsweredTest(answered);
    }
  };

  onFillColor = (name) => {
    var element = document.getElementById(`num${name}`);
    element.style.backgroundColor = "green";
    element.style.color = "white";
  };

  loadAnsPerPage = () => {
    var { test_records, number } = this.props;
    test_records.answerSet.forEach((e) => {
      for (let i = 0; i < abcArr.length; i++) {
        if (e.answerId === number + abcArr[i]) {
          let radioInput = document.getElementById(e.answerId);
          radioInput.checked = true;
        }
      }
    });
  };

  render() {
    var { question, number } = this.props;
    return (
      <div>
        <MathJaxContext version={3} config={mathjax_config}>
          <div>
            <b>Câu {number}: </b> <MathJax>{question.content}</MathJax>
          </div>
          {question.setOfAnswer.map((an, i) => {
            return (
              <div key={i} className="one-answer mt-2">
                <input
                  type="radio"
                  id={`${number}${abcArr[i]}`}
                  name={`${number}`}
                  onChange={this.handleCheckChange}
                />
                <label htmlFor={`${number}${abcArr[i]}`}>
                  <MathJax>{`${abcArr[i]}. ${an.content} `}</MathJax>
                </label>
              </div>
            );
          })}
        </MathJaxContext>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    test_records: state.test_records,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddAnsweredTest: (answer) => {
      dispatch(record_test_actions.add_answerd_to_test(answer));
    },
    onUpdateAnsweredTest: (answer) => {
      dispatch(record_test_actions.update_answerd_to_test(answer));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
