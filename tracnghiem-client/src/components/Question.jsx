import { Component } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const abcArr = ["A", "B", "C", "D"];

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: "",
    };
  }

  handleCheckChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    var id = event.target.id;
    this.setState({ selectedAnswer: id });
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
        <MathJaxContext version={3} config={config}>
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
