import { Component } from "react";
import "../css/create-test-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CreatedTest from "../components/CreatedTest";
import NoticeExam from "../components/NoticeExam";
import * as topic_list_actions from "../actions/topic_list_actions";
import * as record_test_actions from "../actions/test_records_actions";
import { connect } from "react-redux";

class CreatedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreated: false,
    };
  }

  componentDidMount = async () => {
    if (this.props.topic_list.length === 0) {
      await this.props.onGetTopicList();
      console.log(this.props.topic_list);
    }
  };

  nextStepToNotice = () => {
    this.setState({
      isCreated: true,
    });
  };

  removeTest = () => {
    this.setState({
      isCreated: false,
    });
  };

  render() {
    var { isCreated } = this.state;

    return (
      <>
        <Header />
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 side-block">
            <div className="side-block-content"></div>
          </div>
          {isCreated ? (
            <NoticeExam removeTest={this.removeTest} />
          ) : (
            <CreatedTest nextStepToNotice={this.nextStepToNotice} />
          )}
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    topic_list: state.topic_list
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetTopicList: () => {
      dispatch(topic_list_actions.get_topic_list_req());
    },
    onResetInfoTest: () => {
      dispatch(record_test_actions.clear_info_test());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatedPage)
