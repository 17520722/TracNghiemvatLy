const express = require('express');
const { db } = require('../models/Question');
const QuestionModel = require('../models/Question');
const Test = require('../models/Test');
const User = require('../models/User');
const router = express.Router();

//question { correctAns, countAns, isCorrectAns }
router.post('/saveQuestionRecord', (req, res) => {
     const listQuestion = req.body.listQuestion;

     for (let question of listQuestion) {
          let correctAns;
          let countAns;

          if (question.countAns === undefined || question.correctAns === undefined 
              || question.countAns === null || question.correctAns === null) {
               correctAns = 0;
               countAns = 0;
          }
          else {
               correctAns = question.correctAns;
               if (question.isCorrectAns) {
                    correctAns = question.correctAns + 1;
               }
               countAns = question.countAns + 1;
          }

          QuestionModel.findOneAndUpdate({ _id: question._id }, { $set: {
               correctAns: correctAns,
               countAns: countAns
          }}, (err, doc) => {
               try {
                    if (err) throw err;
                    if (doc) {
                    }
               }
               catch (e) {
                    console.log(e);
               }
          });
     }

     res.status(201).send({message: "OK"});
});

router.post('/updateQuestion', (req, res) => {

});

router.post('/resetScore', async (req, res) => {
     const listQuestion = await QuestionModel.find({}, (err) => {
          if (err) {
               res.status(500).send({message: "error"});
          }
     });

     for (let question of listQuestion) {
          QuestionModel.findOneAndUpdate({ _id: question._id }, { $set: {
               correctAns: 0,
               countAns: 0
          }}, (err, doc) => {
               try {
                    if (err) throw err;
                    if (doc) {

                    }
               }
               catch (e) {
                    console.log(e);
               }
          });
     }

     const listUser = await User.find({}, (err) => {
          if (err) {
               res.status(500).send({message: "error"});
          }
     });

     for (let user of listUser) {
          User.findOneAndUpdate({ username: user.username }, { $set: {
               listOfTest: [],
               listOfEvaluatedDoc: [] 
          }},(err, doc) => {
               try {
                    if (err) throw err;
                    if (doc) {

                    }
               }
               catch (e) {
                    console.log(e);
               }
          });
     }

     db.dropCollection('tests', err => console.log(err));
     db.dropCollection('evaluateddocs', err => console.log(err));

     res.status(201).send({message: "OK"});
})

module.exports = router;
