import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";
import { mathjax_config } from "../constants/config";

const ListItemRoot = ({ item }) => {
     const classLevel = () => {
          if (item?.level == 3) {
               return `#fc7373`;
          } else if (item?.level == 4) {
               console.log(".....");
               return "red";
          } else return "black";
     };
     return (
          <div className="list-item">
               <MathJaxContext version={3} config={mathjax_config}>
                    <div className="list-item__name">
                         <strong>#{item?._id}</strong> <br />
                         <MathJax>{item?.content}</MathJax>
                    </div>
                    <div className="list-item__topic">{item?.topic?.content}</div>
                    <div className="list-item__level" style={{ color: classLevel() }}>
                         {item?.level}
                    </div>
                    <div className="option-container">
                         <div className="edit-option">Edit</div>
                         <div className="delete-option">Delete</div>
                    </div>
               </MathJaxContext>
          </div>
     );
};

export default ListItemRoot;
