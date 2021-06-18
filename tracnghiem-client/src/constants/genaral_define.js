import { getEvaluatedTopic } from "../services/topicEvaluate";

export const time = ["50", "45", "15"];

export const bias = 0.2;

export const level = [
  {
    id: 0,
    level: "Theo năng lực",
    remember: 0,
    understand: 0,
    apply: 0,
    analyzing: 0
  },
  {
    id: 1,
    level: "Dễ",
    remember: 50,
    understand: 30,
    apply: 10,
    analyzing: 10
  },
  {
    id: 2,
    level: "Trung bình",
    remember: 30,
    understand: 40,
    apply: 20,
    analyzing: 10
  },
  {
    id: 3,
    level: "Khó",
    remember: 20,
    understand: 30,
    apply: 30,
    analyzing: 20
  },
];

export const classes = [
  {
    id: "thpt",
    classes: "THPT",
  },
  {
    id: "10",
    classes: "Lớp 10",
  },
  {
    id: "11",
    classes: "Lớp 11",
  },
  {
    id: "12",
    classes: "Lớp 12",
  },
];

export const term = [
  {
    id: "cn",
    term: "Cả năm",
  },
  {
    id: "1",
    term: "Học kỳ 1",
  },
  {
    id: "2",
    term: "Học kỳ 2",
  },
];

export var levelOfTest = (numberQuestion, level) => {
  let rate = numberQuestion / 100;
  let result = {
    remember: rate * level.remember ,
    understand: rate * level.understand,
    apply: rate * level.apply,
    analyzing: 0
  }
  console.log(result);
  result.analyzing = numberQuestion - (result.remember + result.understand + result.apply);
  return result;
}

export const flexGenerateLevel = async (listTopic) => {
  const user = JSON.parse(sessionStorage.getItem("user"))
  const listScoreTopic = await getEvaluatedTopic(listTopic, user.token).then(response => response.json());
  console.log(listScoreTopic);
  let sum = 0;

  for (let topicScore of listScoreTopic) {
    sum += topicScore.NLScore;
  }

  const avg = sum / listScoreTopic.length;

  if (avg >= 7) {
    return levelOfTest(40, level[3]);
  }
  else if (avg >= 5) {
    return levelOfTest(40, level[2]);
  }
  else {
    return levelOfTest(40, level[1]);
  }
}

export const QUESTIONS_PER_PAGE = 10;
export const CAUTION_TIME_50 = 9;
export const CAUTION_TIME_45 = 8;
export const CAUTION_TIME_15 = 2;

export const levelQuestions = {
  remember: 0.6,
  understand: 0.7,
  apply: 0.8,
  analyzing: 0.9
}
