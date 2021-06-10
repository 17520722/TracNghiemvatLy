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

     return (
          <div className="list-item">
               <MathJaxContext version={3} config={mathjax_config}>
                    <div className="list-item__name">
                         <strong>#{item?._id}</strong> <br />
                         <MathJax>{item?.content}</MathJax>
                    </div>
                    <div className="list-item__topic">{item?.topic?.content}</div>
                    <div className="list-item__level" style={{ color: classLevel() }}>
                         {Difficult(item?.level)}
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
