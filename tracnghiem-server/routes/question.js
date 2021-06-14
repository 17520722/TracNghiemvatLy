const express = require('express');
const QuestionModel = require('../models/Question');
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

module.exports = router;
