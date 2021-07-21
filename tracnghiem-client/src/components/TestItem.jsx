import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentTest } from "../actions/TestManager"
import "../css/test-manager.css"
import { getTest } from "../graphql/test.service"

const TestItem = ({testId}) => {
     const dispatch = useDispatch();

     function onClickTest() {
          getTest(testId).then(res => res.json()).then(testResult => {
               dispatch(setCurrentTest(testResult.data.test));
          })
     }

     return (
          <div className="test-item" onClick={onClickTest}>
               {testId}
          </div>
     )
}

export default TestItem;