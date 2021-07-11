import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";
import { useState } from "react";
import { mathjax_config } from "../constants/config";

const ListItemRoot = ({ item }) => {
     const [displayAns, setDisplayAns] = useState(false);

     const classLevel = () => {
          if (item?.level == 3) {
               return `#fc7373`;
          } else if (item?.level == 4) {
               console.log(".....");
               return "red";
          } else if (item?.level == 2) {
               return "#ebb134";
          } else return "#7aeb34";
     };
     
     const Difficult = (index) => {
          switch(index) {
               case 1: 
                    return "Nhận biết";
               case 2:
                    return "Hiểu";
               case 3:
                    return "Vận dụng";
               case 4:
                    return "Vận dụng cao";
               default: break;
          }
     };

     const styleList = () => {
          if (!displayAns) {
               return {
                    height: "0px",
                    overflow: "hidden",
                    marginTop: "0px",
               }
          }
          else {
               return {}
          }
     }

     function toggleShowAns() {
          setDisplayAns(!displayAns);
     }

     return (
          <>
               <div className="list-item" onClick={toggleShowAns}>
                    <MathJaxContext version={3} config={mathjax_config}>
                         <div className="question-body">
                              <div className="list-item__name">
                                   <strong>#{item?._id}</strong> <br />
                                   <MathJax>{item?.content}</MathJax>
                              </div>
                              <div className="list-item__topic">{item?.topic?.content}</div>
                              <div className="list-item__level" style={{ color: classLevel() }}>
                                   {Difficult(item?.level)}
                              </div>
                              <div className="option-container">
                                   <div className="correct-rate">{
                                        isNaN(item?.correctAns / item?.countAns)
                                        ? 0
                                        : (item.correctAns / item.countAns) }</div>
                                   <div className="edit-option">Edit</div>
                                   <div className="delete-option">Delete</div>
                              </div>
                         </div>
                         <div className="set-questions" style={styleList()}>
                              {
                                   item?.setOfAnswer.map(answer => {
                                        return (
                                             <div style={{ marginBottom: "0.5rem", 
                                                           color: answer.isCorrect? "green" : "unset"
                                                       }}
                                                  key={answer.index}>
                                                  {/* {answer.isCorrect && "CORRECT ANS"} */}
                                                  <MathJax>
                                                       {answer.content}
                                                  </MathJax>
                                             </div>
                                        )
                                   })
                              }
                         </div>
                    </MathJaxContext>
               </div>
          </>
     );
};

export default ListItemRoot;
