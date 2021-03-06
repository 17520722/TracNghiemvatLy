import { Component } from "react";
import callApi from "../../utils/apiCalller";
import "../../css/admin_question.css";
import React from "react";
import { Button, CircularProgress, Input } from "@material-ui/core";
import { getAllTopic } from "../../graphql/topic.service";
import * as toast_actions from "../../actions/Toast";
import * as _ from "lodash";
import { connect } from "react-redux"
import Toast from "../../components/Toast";
import ListItemRoot from "../../components/ListItem";
import { createQuestion, getAllQuestion } from "../../graphql/question.service";
import { resetScore } from "../../services/question";
import { Pagination } from '@material-ui/lab';
import cloudinaryUpload from "../../services/uploads";

class CauHoiPage extends Component {
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
            topic: "1011",
            level: 1,
            urlImage: "",

            cb_da: "cb_da1",
            selectedFile: "",
            showImage: "",
            isShowModal: false,
            isLoading: false,
            typeToast: "success",
            textToast: "",
            listTopic: [],
            listQuestion: [],
            listQuestionRender: [],
            currentPage: 1,
            resetLoading: false,
            keyword: "",
        };
    }

    componentDidMount = () => {
        getAllTopic().then(response => response.text()).then(result => {
            let rawData = JSON.parse(result);

            if (rawData.data === null || rawData.data === undefined) {
                this.setState({
                     ...this.state,
                     isLoading: false,
                });
                this.props.set_toast("error", "Lỗi: không tiếp cận được máy chủ");
                this.props.set_show_toast(true);

                return;
            }

            const sortTopic = _.sortBy(rawData.data.topics, [o => o.topicId]);

            this.setState({
                listTopic: sortTopic,
            });
        });

        let questions = JSON.parse(sessionStorage.getItem("questions"));
        if (questions) {
            this.setState({
                listQuestion: questions,
                listQuestionRender: questions
            });
        }

        this.getQuestions();
    }

    getQuestions = () => {
        getAllQuestion().then(response => response.text()).then(result => {
            let rawData = JSON.parse(result);

            if (rawData.data === null || rawData.data === undefined) {
                this.setState({
                    ...this.state,
                    isLoading: false,
                });
                this.props.set_toast("error", "Lỗi: không tiếp cận được máy chủ");
                this.props.set_show_toast(true);

                return;
            }

            this.setState({
                listQuestion: rawData.data?.allQuestion,
                listQuestionRender: rawData.data?.allQuestion
            });

            sessionStorage.setItem("questions", JSON.stringify(this.state.listQuestion));
        });
    }

    onHandleModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal,
        })
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
            setOfAnswer: {
                ...this.state.setOfAnswer,
                [name]: value,
            },
        });
    };

    handleSubmit = (event) => {
        var { content, setOfAnswer, level, topic, cb_da, urlImage } = this.state;
        event.preventDefault();
        this.setState({
            ...this.state,
            isLoading: true,
        });

        const data = new FormData();
        data.append("file", this.state.selectedFile);
        // callApi("upload", "POST", data);

        let question = {
            content: content,
            setOfAnswer: [ 
                { content: setOfAnswer.dapan1, isCorrect: cb_da === "cb_da1" ? true : false, },
                { content: setOfAnswer.dapan2, isCorrect: cb_da === "cb_da2" ? true : false, },
                { content: setOfAnswer.dapan3, isCorrect: cb_da === "cb_da3" ? true : false, },
                { content: setOfAnswer.dapan4, isCorrect: cb_da === "cb_da4" ? true : false, },
            ],
            level: level,
            correctAns: 0,
            countAns: 0,
            topic: topic,
            image: urlImage,
        };
        
        const graphQLImageServices = JSON.stringify(question).replace(/"([^(")"]+)":/g,"$1:");
        console.log(graphQLImageServices)

        if (question.content.trim() === "") {
            this.setState({
                ...this.state,
                isLoading: false,
            });
            this.props.set_toast("error", "Trường nội dung bị trống");
            this.props.set_show_toast(true);
            return;
        }

        createQuestion(question).then(response => response.text()).then(result => {
            let rawData = JSON.parse(result);
            console.log(rawData);
            this.setState({
                ...this.state,
                isLoading: false,
            });

            if (rawData?.message == "Saved!") {
                this.props.set_toast("success", "Lưu thành công");
                this.props.set_show_toast(true);

                this.getQuestions();
            }
            else {
                this.props.set_toast("error", "Lỗi");
                this.props.set_show_toast(true);
            }

            this.setState({
                content: "", 
                setOfAnswer: {
                    dapan1: "",
                    dapan2: "",
                    dapan3: "",
                    dapan4: "",
                },
                urlImage: ""
            });
            this.removeImg();
        });
    };

    renderTopic = () => {
        return (
            <React.Fragment>
                { this.state.listTopic?.map((topicItem, index) => {
                    return (
                        <option key={index} value={topicItem.topicId}>{ topicItem.content }</option>
                    )
                })}
            </React.Fragment>
        )
    };

    onCreateQuestion = () => {

    }

    onChangeImageHandler = async (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();

        if (file === undefined) {
            file = this.state.selectedFile;
        } else {
            let img = await cloudinaryUpload(event.target.files);
            console.log(img);
            this.setState({
                selectedFile: file,
                urlImage: img.secure_url,
            });
        }

        console.log(file);
        if (!file) {
            return;
        }

        reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                showImage: [reader.result],
            });
        }.bind(this);
    };

    removeImg = () => {
        this.setState({ showImage: "", selectedFile: "" });
    };

    handleChangePage = (event, value) => {
        this.setState({ currentPage: value});
    }

    resetScoreQuestions = () => {
        this.setState({ resetLoading: true });
        if (this.state.listQuestion) {
            resetScore().then(response => response.json()).then(result => {
                console.log("OKOKOK");
                this.setState({ resetLoading: false });
            });
        }

        getAllQuestion().then(response => response.text()).then(result => {
            let rawData = JSON.parse(result);
            this.setState({
                listQuestion: rawData.data?.allQuestion,
            });

            sessionStorage.setItem("questions", JSON.stringify(this.state.listQuestion));
        });
    }

    onKeywordChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }
    
    submitKeyword = (e) => {
        e.preventDefault();
        console.log("keyword");

        let temp = this.state.listQuestion.filter(question => {
            if (question.content.includes(this.state.keyword) || 
                question._id.includes(this.state.keyword) || 
                JSON.stringify(question.setOfAnswer).includes(this.state.keyword)) {
                    return true;
                }
        });

        if (this.state.keyword === "") {
            temp = this.state.listQuestion;
        }

        this.setState({
            listQuestionRender: temp,
            currentPage: 1
        })
    }

    render() {
        var { content, setOfAnswer, level, topic, cb_da, showImage, currentPage } = this.state;
        const itemPerPage = 20;
        const countPage = Math.ceil(this.state.listQuestionRender?.length / itemPerPage);

        return (
            <>
                <div className="title-box">
                    <h1 className="title">Danh sách câu hỏi</h1>
                    <Button variant="contained" onClick={this.resetScoreQuestions}
                        disabled={this.state.resetLoading}
                        style={{marginLeft: "1rem", marginBottom: "1rem"}}>Đặt lại điểm</Button>
                </div>
                <Button variant="contained" className={ this.state.isShowModal ? "btn-secondary-color" : "btn-primary-color"} color="secondary" onClick={ this.onHandleModal }>
                                { this.state.isShowModal ? "Hủy" : "Thêm câu hỏi mới"}
                </Button>
                { this.state.isShowModal ? 
                    <React.Fragment>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="content">Nội dung</label>
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
                                    <label htmlFor="cb_da1" className="ml-5">
                                        {" "}
                        Đáp án đúng:{" "}
                                    </label>
                                    <input
                                        className="ml-2"
                                        type="radio"
                                        name="cb_da"
                                        id="cb_da1"
                                        checked={cb_da === "cb_da1"}
                                        value="cb_da1"
                                        onChange={this.handleChange}
                                    />
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
                                    <label htmlFor="cb_da2" className="ml-5">
                                        {" "}
                        Đáp án đúng:{" "}
                                    </label>
                                    <input
                                        className="ml-2"
                                        type="radio"
                                        name="cb_da"
                                        id="cb_da2"
                                        value="cb_da2"
                                        checked={cb_da === "cb_da2"}
                                        onChange={this.handleChange}
                                    />
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
                                    <label htmlFor="cb_da3" className="ml-5">
                                        {" "}
                        Đáp án đúng:{" "}
                                    </label>
                                    <input
                                        className="ml-2"
                                        type="radio"
                                        name="cb_da"
                                        id="cb_da3"
                                        value="cb_da3"
                                        checked={cb_da === "cb_da3"}
                                        onChange={this.handleChange}
                                    />
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
                                    <label htmlFor="cb_da4" className="ml-5">
                                        {" "}
                        Đáp án đúng:{" "}
                                    </label>
                                    <input
                                        className="ml-2"
                                        type="radio"
                                        name="cb_da"
                                        id="cb_da4"
                                        value="cb_da4"
                                        checked={cb_da === "cb_da4"}
                                        onChange={this.handleChange}
                                    />
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
                                        <label htmlFor="select_dangToan">Chủ đề</label>
                                        <select
                                            className="form-control"
                                            id="select_dangToan"
                                            name="topic"
                                            value={topic}
                                            onChange={this.handleChange}
                                        >
                                            {this.renderTopic()}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="select_dangToan">Hình ảnh</label> <br />
                                        <input
                                            type="file"
                                            name="selectedFile"
                                            onChange={this.onChangeImageHandler}
                                        />
                                        {showImage ? (
                                            <img
                                                className="preview-image"
                                                src={showImage}
                                                onClick={this.removeImg}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <Button variant="contained" className="btn-primary-color form-control-style btn-w-200"
                                    type="submit"
                                    color="secondary"
                                    disabled={this.state.isLoading}
                                    onClick={this.onCreateQuestion}>
                                    {this.state.isLoading ? <CircularProgress size={24}/> : "Thêm câu hỏi"}
                                </Button>
                            </div>
                        </form>
                    </React.Fragment> : null
                }

                <form onSubmit={this.submitKeyword}>
                    <Input className="search-input" 
                        placeholder="tìm câu hỏi..." 
                        value={this.state.keyword}
                        onChange={this.onKeywordChange}>
                    </Input>
                    <Button type="submit" color="primary">Tìm kiếm</Button>
                </form>

                {
                    this.state.listQuestionRender.map((item, index) => {
                        if (index < itemPerPage * currentPage && index >= itemPerPage * currentPage - itemPerPage) {
                            return (
                                <ListItemRoot item={item} key={index}/>
                            )
                        }
                    })
                }
                <div className="panigation">
                    <Pagination count={countPage} shape="rounded" color="secondary" page={this.state.currentPage} onChange={this.handleChangePage}></Pagination>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      
    };
};
  
const mapDispatchToProps = (dispatch, props) => {
    return {
        set_show_toast: (status) => {
            dispatch(toast_actions.set_show_toast(status))
        },
        set_toast: (typeToast, text) => {
            dispatch(toast_actions.set_toast(typeToast, text))
        }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CauHoiPage);
