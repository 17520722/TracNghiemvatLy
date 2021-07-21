import ReactPDF, {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import "../css/export_test.css";
import fontLink from "../font/STIXTwoMath-Regular.ttf";
import { connect } from "react-redux";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { mathjax_config } from "../constants/config";

Font.register({
  family: "STIXTwoMath-Regular",
  src: fontLink,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "STIXTwoMath-Regular",
  },
  text: {
    margin: 12,
    fontSize: 13,
    textAlign: "justify",
    fontFamily: "STIXTwoMath-Regular",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const ExportDocumentTest = (props) => {
  const RenderDocument = () => {
    let { test_records } = props;
    let result = null;
    result = test_records.setOfQuestions.map((question, index) => {
      return (
        <Text key={index}>
          <Text style={styles.text}>{`Câu ${index + 1}: ${
            question.content
          } \n`}</Text>
          <Text style={styles.text}>
            {`A. ${question.setOfAnswer[0].content} \n`}
          </Text>
          <Text
            style={styles.text}
          >{`B. ${question.setOfAnswer[1].content} \n`}</Text>
          <Text
            style={styles.text}
          >{`C. ${question.setOfAnswer[2].content} \n`}</Text>
          <Text
            style={styles.text}
          >{`D. ${question.setOfAnswer[3].content} \n`}</Text>
        </Text>
      );
    });
    return result;
  };

  const DocumentTest = () => {
    return (
      <Document>
        <Page style={styles.body}>
          <Text style={styles.title}>Đề thi THPT</Text>
          <RenderDocument />
        </Page>
      </Document>
    );
  };

  let { test_records } = props;
  console.log(test_records);
  return (
    <div className="text-center pdf-wrap">
      <PDFViewer width="1000px" height="700px">
        <DocumentTest />
      </PDFViewer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    test_records: state.test_records,
  };
};

export default connect(mapStateToProps, null)(ExportDocumentTest);
