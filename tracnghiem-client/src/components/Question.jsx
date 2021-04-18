import { Component } from "react";
import MathJax from "react-mathjax-preview";

const abcArr = ["A", "B", "C", "D"];

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: '',
    }
  }

  handleCheckChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    var id = event.target.id;
    this.setState({selectedAnswer: id})
    if (value === "on") {
      this.onFillColor(name);
    }
  };

  onFillColor = (name) => {
    var element = document.getElementById(`num${name}`);
    element.style.backgroundColor = "green";
    element.style.color = "white";
  };

  render() {
    var { question, number } = this.props;
    console.log(this.state);
    return (
      <div>
        <div>
          <MathJax math={`Câu ${number}: ${question.content}`}/>
        </div>
        {question.setOfAnswer.map((an, i) => {
          return (
            <div key={i} className="one-answer mt-2" >
              <input
                type="radio"
                id={`${number}${abcArr[i]}`}
                name={`${number}`}
                onChange={this.handleCheckChange}
              />
              <label htmlFor={`${number}${abcArr[i]}`}>
                {" "}
                <MathJax math={`${abcArr[i]}. ${an.content} `}/>
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
