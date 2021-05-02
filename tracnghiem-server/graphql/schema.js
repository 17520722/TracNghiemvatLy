const { buildSchema } = require('graphql');
const _ = require('lodash');

const topicSchema = `
     input TopicInput {
          topicId: String
          content: String
     }

     type Topic {
          _id: ID
          topicId: String
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
          setOfAnswerId: [ID]
          level: Int
          topic: ID
     }

     type Question {
          _id: ID
          content: String
          setOfAnswerId: [ID]
          setOfAnswer: [Answer]
          level: Int
          topicId: ID
          topic: Topic
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
          testId: ID
     }
     type EvaluatedDoc {
          _id: ID
          content: String
          testId: ID
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
          listOfTest: [ID]
          listOfEvaluatedDoc: [ID]
     }
`

const abilitySchema = `
     input AbilityInput {
          topicId: ID
          ability: String
          userId: ID
     }

     type Ability {
          _id: ID
          topicId: ID
          ability: String
          userId: ID
     }
`

const generatedTestSchema = `
     input GeneratedTestInput {
          numberOfQuestion: Int
          levelOfDifficult: Int
          setOfTopic: [ID]
     }

     type GeneratedTest {
          _id: ID
          numberOfQuestion: Int
          levelOfDifficult: Int
          setOfTopic: [ID]
     }
`

const specialSchema = `
     type Response {
          code: Int,
          content: String
     }

     type Query {
          topic(topicId: String): Topic
          topics: [Topic]

          answer(id: ID): Answer
          answers(ids: [ID]): [Answer]
          allAnswer: [Answer]

          allQuestion: [Question]
          questions(ids: [ID]): [Question]
          question(id: ID!): Question

          user(id: ID): User
          allUser: [User]
          users(setOfId: [ID]): [User]

          answered(id: ID): Answered
          answereds(ids: [ID]): [Answered]

          test(id: ID): Test
          tests(ids: [ID]): [Test]

          evaluatedDoc(id: ID): EvaluatedDoc
          evaluatedDocs(ids: [ID]): [EvaluatedDoc]

          ability(id: ID): Ability
          abilities(ids: [ID]): [Ability]

          generatedTest(id: ID): GeneratedTest
          generatedTests(ids: [ID]): [GeneratedTest]
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

          createAnswered(input: AnsweredInput): Response
          updateAnswered(id: ID!, input: AnsweredInput): Response

          createTest(input: TestInput): Response
          updateTest(id: ID!, input: TestInput): Response

          createEvaluatedDoc(input: EvaluatedDocInput): Response
          updateEvaluatedDoc(id: ID, input: EvaluatedDocInput): Response

          createAbility(input: AbilityInput): Response
          updateAbility(id: ID!, input: AbilityInput): Response

          createGeneratedTest(input: GeneratedTestInput): Response
          updateGeneratedTest(id: ID!, input: GeneratedTestInput): Response
     }
`

const schema = buildSchema(topicSchema + answerSchema + questionSchema + answeredSchema + testSchema + evaluatedDoc + userSchema + abilitySchema + generatedTestSchema + specialSchema);

module.exports = schema;
