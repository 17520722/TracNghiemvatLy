import * as Types from "../../constants/TypeActions";
import * as _ from "lodash";

var initialState = {
  testId: "",
  setOfRemember: [],
  setOfUnderstand: [],
  setOfApply: [],
  setOfAnalyzing: [],
  levelOfDifficult: "",
  correctAnsNumber: 0,
  incorrectAnsNumber: 0,
  answerSet: [],
  time: "",
};

var myReducer = (state = initialState, action) => {
  let numberQuestions = state.setOfRemember
    .concat(state.setOfUnderstand)
    .concat(state.setOfApply)
    .concat(state.setOfAnalyzing);

  switch (action.type) {
    case Types.ADD_QUESTION_TO_TEST:
      var index_question = -1;
      switch (action.ans_question.level) {
        case "1":
          index_question = _.findIndex(state.setOfRemember, [
            "questionId",
            action.ans_question.questionId,
          ]);
          if (index_question === -1) {
            state.setOfRemember.push(action.ans_question);
          }
          return state;
        case "2":
          index_question = _.findIndex(state.setOfUnderstand, [
            "questionId",
            action.ans_question.questionId,
          ]);
          if (index_question === -1) {
            state.setOfUnderstand.push(action.ans_question);
          }
          return state;
        case "3":
          index_question = _.findIndex(state.setOfApply, [
            "questionId",
            action.ans_question.questionId,
          ]);
          if (index_question === -1) {
            state.setOfApply.push(action.ans_question);
          }
          return state;
        case "4":
          index_question = _.findIndex(state.setOfAnalyzing, [
            "questionId",
            action.ans_question.questionId,
          ]);
          if (index_question === -1) {
            state.setOfAnalyzing.push(action.ans_question);
          }
          return state;
        default:
          return state;
      }

    case Types.UPDATE_QUESTION_TO_TEST:
      return state;

    case Types.CLEAR_INFO_TEST:
      state = initialState;
      return state;

    case Types.ADD_ANSWERD_TO_TEST:
      state.answerSet.push(action.answered);
      return state;

    case Types.UPDATE_ANSWERD_TO_TEST:
      var index_answered = _.findIndex(state.answerSet, [
        "questionId",
        action.answered.questionId,
      ]);
      state.answerSet[index_answered] = action.answered;
      return state;

    case Types.SET_NUMBER_CORRECT:
      state.correctAnsNumber = action.num_correct;
      state.incorrectAnsNumber = numberQuestions.length - state.correctAnsNumber;
      return state;

    case Types.SET_TIME_FINNISH_TEST:
      state.time = `${action.m}:${action.s}`;
      console.log(state.time);
      return state;

    case Types.SET_NULL_FOR_ANSWERSET:
      for (let i = 0; i < numberQuestions.length; i++) {
        const nullOnj = {
          questionId: numberQuestions[i].questionId,
          answerId: "NA"
        };
        state.answerSet.push(nullOnj);
      }

    default:
      return state;
  }
};

export default myReducer;
