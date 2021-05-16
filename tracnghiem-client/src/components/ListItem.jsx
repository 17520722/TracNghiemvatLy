import React from 'react';

const ListItemRoot = ({item}) => {
     const classLevel = () => {
          console.log(item)
          if (item?.level == 3) {
               return `#fc7373`;
          }
          else if (item?.level == 4) {
               console.log('.....')
               return 'red';
          }
          else return 'black';
     }
     return (
          <div className="list-item">
                <div className="list-item__name" >
                    <strong>#{item?._id}</strong> <br />{item?.content}
                </div>
                <div className="list-item__topic">
                    {item?.topic?.content}
                </div>
                <div className="list-item__level" style={{color: classLevel()}}>
                    {item?.level}
                </div>
                <div className="option-container">
                    <div className="edit-option">
                         Edit
                    </div>
                    <div className="delete-option">
                         Delete
                    </div>
                </div>
          </div>
     )
}

export default ListItemRoot;
