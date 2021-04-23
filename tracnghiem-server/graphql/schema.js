const { buildSchema } = require('graphql');
const _ = require('lodash');

const topicSchema = `
     input TopicInput {
          content: String
     }

     type Topic {
          _id: ID
          content: String
     }
`

const answerSchema = `
     input AnswerInput {
          content: String
          isCorrect: Boolean
     }

     type Answer {
          _id: ID
          content: String
          isCorrect: Boolean
     }
`

const questionSchema = `
     input QuestionInput {
          content: String
          setOfAnswer: [String]
          level: Int
          topic: String
     }

     type Question {
          _id: ID
          content: String
          setOfAnswer: [String]
          level: Int
          topic: String
     }
`

const answeredSchema = `
     input AnsweredInput {
          questionId: ID
          answerId: ID
     }

     type Answered {
          questionId: ID
          answerId: ID
     }
`

const testSchema = `
     input TestInput {
          setOfRemember: [ID]
          setOfUnderstand: [ID]
          setOfApply: [ID]
          setOfAnalyzing: [ID]
          levelOfDifficult: Int
          correctAnsNumber: Int
          incorrectAnsNumber: Int
          answerSet: [ID]
     }

     type Test {
          _id: ID
          setOfRemember: [Question]
          setOfUnderstand: [Question]
          setOfApply: [Question]
          setOfAnalyzing: [Question]
          levelOfDifficult: Int
          correctAnsNumber: Int
          incorrectAnsNumber: Int
          answerSet: [Answered]
     }
`

const evaluatedDoc = `
     input EvaluatedDocInput {
          content: String
          test: ID
     }
     type EvaluatedDoc {
          _id: ID
          content: String
          test: Test
     }
`

const userSchema = `
     input UserInput {
          username: String
          info: String
     }

     input UserUpdate {
          username: String
          info: String
          listOfTest: [ID]
          listOfEvaluatedDoc: [ID]
     }

     type User {
          _id: ID
          username: String
          info: String
          listOfTest: [Test]
          listOfEvaluatedDoc: [EvaluatedDoc]
     }
`

const abilitySchema = `
     type Ability {
          _id: ID
          topic: Topic
          ability: String
          user: User
     }
`

const generatedTestSchema = `
     type GeneratedTest {
          _id: ID
          numberOfQuestion: Int
          levelOfDifficult: Int
          setOfTopic: [Topic]
     }
`

const specialSchema = `
     type Response {
          code: Int,
          content: String
     }

     type Query {
          topic(id: ID): Topic
          topics: [Topic]

          answer(id: ID): Answer
          answers(ids: [ID]): [Answer]
          allAnswer: [Answer]

          questions: [Question]
          question(id: ID!): Question

          user(id: ID): User
          allUser: [User]
          users(setOfId: [ID]): [User]
     }

     type Mutation {
          createTopic(input: TopicInput): Response
          updateTopic(id: ID!, input: TopicInput): Response

          createAnswer(input: AnswerInput): Response
          updateAnswer(id: ID!, input: AnswerInput): Response

          createQuestion(input: QuestionInput): Response
          updateQuestion(id: ID!, input: QuestionInput): Response

          createUser(input: UserInput): Response
          updateUser(id: ID!, input: UserUpdate): Response
     }
`

const schema = buildSchema(topicSchema + answerSchema + questionSchema + answeredSchema + testSchema + evaluatedDoc + userSchema + abilitySchema + generatedTestSchema + specialSchema);

module.exports = schema;
