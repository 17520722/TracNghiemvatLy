import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import TestItem from "../components/TestItem";
import "../css/test-manager.css"
import { getTests } from "../graphql/test.service";
import { getOneUser } from "../graphql/user.service";
import * as _ from "lodash";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { mathjax_config } from "../constants/config";

const TestManager = () => {
     const [user, setUserSession] = useState();
     const [listTest, setListTest] = useState([]);
     //const [current, setCurrentTest] = useState();
     const { currentTest } = useSelector(state => state.test_manager);
     const [listQuestion, setListQuestion] = useState();

     useEffect(() => {
          const userSession = JSON.parse(sessionStorage.getItem("user"));
          getOneUser(userSession._id).then(res => res.json()).then(result => {
               setUserSession(result.data.user);
               setListTest(result.data.user.listOfTest);
          })
          // getTests()
     },[]);

     useEffect(() => {
          setListQuestion(_.flatten([
               currentTest.setOfRemember,
               currentTest.setOfUnderstand,
               currentTest.setOfApply,
               currentTest.setOfAnalyzing
          ]));
     }, [currentTest])

     function convertDiff(number) {
          if (number === 1) {
               return "dễ";
          }
          else if (number === 2) {
               return "trung bình";
          }
          else return "khó";
     }

     function styleAns(correctAns, answerLabel, answer, questionLabel) {
          
          if (answer.isCorrect && correctAns === answerLabel) {
               return {
                    color: "green",
                    fontWeight: "bold"
               }
          } else if (questionLabel === answerLabel) {
               return {
                    color: "red",
                    fontWeight: "bold"
               }
          }
          //console.log(indexQuestion + answerLabels[indexAnswer])
          // if (correctAns.id === correctLabel) {
          //      return {
          //           color: "green",
          //           fontWeight: "bold"
          //      }
          // }
     }

     return (
          <>
               <Header />
               <h2>Danh sách bài kiểm tra</h2>
               <div className="main-container">
                    <div className="test-container">
                         {
                              listTest.map((testId, index) => {
                                   return (
                                        <>
                                             <TestItem testId={testId} />
                                        </>
                                   );
                              })
                         }
                    </div>
                    <div className="content-container">
                         <div className="id">
                              <h6>Id: { currentTest._id }</h6>
                         </div>
                         <div className="level">
                              <h6>Độ khó: { convertDiff(currentTest.levelOfDifficult) }</h6>
                         </div>
                         <div className="correct-ans">
                              <h6>Số câu đúng: { currentTest.correctAnsNumber }</h6>
                         </div>
                         <div className="sum-ans">
                              <h6>Tổng số câu: { currentTest.correctAnsNumber + currentTest.incorrectAnsNumber }   </h6>
                         </div>
                         <div className="text-explain" style={{marginTop: "1rem"}}>
                              <h6>Các câu có màu <span style={{color: "green"}}>Xanh</span>: Trả lời đúng</h6>
                         </div>
                         <div className="text-explain">
                              <h6>Các câu có màu <span style={{color: "red"}}>Đỏ</span>: Trả lời sai</h6>
                         </div>
                         <div className="text-explain">
                              <h6><a href="#dapan">Đáp án</a> ở cuối đề.</h6>
                         </div>
                         <div className="list-question">
                              {
                                   currentTest?.answerSet?.map((answer, index) => {
                                        const question = listQuestion.filter(question => question?._id === answer.questionId)[0];

                                        const ansLabel = ['A', 'B', 'C', 'D'];
                                        const questionNumber = index + 1;

                                        let correctAnswer = "";
                                        for (let i = 0; i < question?.setOfAnswer.length; i++) {
                                             if (question.setOfAnswer[i].isCorrect) {
                                                  correctAnswer = questionNumber + ansLabel[i];
                                             }
                                        }
                                        
                                        return (
                                             <div>
                                                  <MathJaxContext version={3} config={mathjax_config}>
                                                       <div className="question-block">
                                                            <MathJax>
                                                                 { "Câu " + questionNumber + ": "}
                                                                 { question?.content }
                                                            </MathJax>
                                                       </div>
                                                  </MathJaxContext>     
                                                  {
                                                       question?.setOfAnswer.map((ans, ind) => {
                                                            const questionLabel = questionNumber + ansLabel[ind];
                                                            return (
                                                                 <div>
                                                                      <MathJaxContext version={3} config={mathjax_config}>
                                                                           <div className="answer-block" style={
                                                                                     styleAns(correctAnswer, answer.answerId, ans, questionLabel)}>
                                                                                <MathJax>
                                                                                     <span style={{
                                                                                          fontWeight: "bold"
                                                                                     }}>
                                                                                          { ansLabel[ind] + ". "}
                                                                                     </span>
                                                                                     { ans.content }
                                                                                </MathJax>                                                                              
                                                                           </div>
                                                                      </MathJaxContext>
                                                                 </div>
                                                            )
                                                       })
                                                  }                               
                                             </div>
                                        )
                                   })
                              }
                         </div>
                         
                         <div id="dapan">
                              {
                                   currentTest?.answerSet?.map((answer, ind) => {
                                        const label = ["A", "B", "C", "D"];
                                        const questionNumber = ind + 1;
                                        const question = listQuestion.filter(question => question?._id === answer.questionId)[0];
                                        const index = question?.setOfAnswer.findIndex(ans => ans.isCorrect === true);
                                        const questionLabel = questionNumber + label[index];
                                        return (
                                             <div className="question-label">
                                                  <span>{questionLabel}</span>
                                             </div>
                                        )
                                   })
                              }
                         </div>
                    </div>
               </div>
          </>
     )
}

export default TestManager;