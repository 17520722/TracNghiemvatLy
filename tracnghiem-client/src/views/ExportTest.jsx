import "../css/export_test.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../font/STIXTwoMath-Regular-normal";
import { connect } from "react-redux";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { mathjax_config } from "../constants/config";

const { Component } = require("react");
const marginLeft = 40;
const marginTop = 60;
const widthPage = 660;
const heightPage = 770;

class ExportTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_test: null,
    };
  }

  componentDidMount = () => {
    let { test_records } = this.props;
    if (this.state.text_test === null) {
      let questions = test_records.setOfQuestions;
      let temp = "";
      let ABCD = ["A", "B", "C", "D"];
      for (let i = 0; i < questions.length; i++) {
        temp = `${temp} Câu ${i + 1}: ${questions[i].content} \n`;
        for (let j = 0; j < ABCD.length; j++) {
          temp = `${temp} ${ABCD[j]}. ${questions[i].setOfAnswer[j].content} \n`;
        }
      }
      this.setState({
        text_test: temp,
      });
    }
    console.log(test_records);
  };

  generateTestPDF = () => {
    // let { test_records } = this.props;
    // let questions = test_records.setOfQuestions;
    // let y = marginTop;
    // let test_content = document.getElementById("textarea1").value;
    // let doc = new jsPDF("p", "pt");
    // let splitText = doc.splitTextToSize(test_content, widthPage);
    // // let pageHeight = doc.internal.pageSize.height;
    // doc.setFont("STIXTwoMath-Regular", "normal");
    // doc.text(30, 30, "Đề thi kiểm tra môn Vật lý THPT");
    // doc.setFontSize(13);
    // for (let i = 0; i < splitText.length; i++) {
    //   if (y > heightPage) {
    //     y = marginTop;
    //     doc.addPage();
    //   }
    //   doc.text(marginLeft, y, splitText[i]);
    //   y = y + 18;
    // }
    // window.open(doc.output("bloburl"), "_blank");

    let test_content = document.getElementById("test-preview");
    html2canvas(test_content).then(function(canvas) {
      let img = canvas.toDataURL("images/png");
      let doc = new jsPDF('p', 'mm');
      doc.addImage(img, 'PNG', 10, 10);
      doc.save('ssss.pdf');
      document.body.appendChild(canvas);
    })
  };

  changeText = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  RenderTest = () => {
    let { test_records } = this.props;
    let questions = test_records.setOfQuestions;
    let result = questions.map((question, index) => {
      return (
        <div key={index}>
          <MathJaxContext version={3} config={mathjax_config}>
            <div>
              <span>
                <MathJax>{`Câu ${index + 1}: ${question.content}`}</MathJax>
              </span>
              <span>
                <MathJax>{`A. ${question.setOfAnswer[0].content}`}</MathJax>
              </span>
              <span>
                <MathJax>{`B. ${question.setOfAnswer[1].content}`}</MathJax>
              </span>
              <span>
                <MathJax>{`C. ${question.setOfAnswer[2].content}`}</MathJax>
              </span>
              <span>
                <MathJax>{`D. ${question.setOfAnswer[3].content}`}</MathJax>
              </span>
            </div>
          </MathJaxContext>
        </div>
      );
    });
    return result;
  };

  render() {
    return (
      <div>
        <div className="title-pdf-test">Text in textarea</div>
        <div className="pdf-view text-center">
          <button onClick={this.generateTestPDF}>ON</button>
        </div>
        <div className="font-times margin-preview-test" id="test-preview">
          {/* <textarea
            rows="50"
            cols="175"
            id="textarea1"
            wrap="soft"
            value={this.state.text_test}
            name="text_test"
            onChange={this.changeText}
          /> */}
          <this.RenderTest />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    test_records: state.test_records,
  };
};

export default connect(mapStateToProps, null)(ExportTest);
