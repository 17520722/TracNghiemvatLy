import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CAUTION_TIME_50 } from "../constants/genaral_define";
import * as test_records_actions from "../actions/test_records_actions";
const { Component } = require("react");

function Timer({onSetTimeFinnish}) {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(5);

  if (seconds < 0) {
    setSeconds(59);
    setMinutes(minutes - 1);
  }

  useEffect(() => {
    if (minutes > 0) {
      seconds >= 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (minutes === 0) {
      seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
    }
    return function setTime() {
      onSetTimeFinnish(minutes, seconds);
    }   
  });

  return (
    <span className={minutes <= CAUTION_TIME_50 ? "color-red" : ""}>{`Thời gian: ${minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`}</span>
  );
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSetTimeFinnish: (m, s) => {
      dispatch(test_records_actions.set_time_finnish_test(m, s));
    }
  }
}

export default connect(null, mapDispatchToProps)(Timer);
