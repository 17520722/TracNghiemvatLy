const express = require('express');
const jwt = require('jsonwebtoken');
const EvaluatedDoc = require('../models/EvaluatedDoc');
const router = express.Router();
const TopicEvaluateModel = require("../models/EvaluatedDoc");
const TopicEvaluateUserModel = require("../models/TopicEvaluate");

router.post('/saveEvaluateTopicTest', (req, res) => {
     const token = req.headers.authorization;
	const decode = jwt.decode(token.replace('Bearer ',''));
	if (decode.username === req.body.username) {
          const data = {
			username: req.body.username,
			testId: req.body.testId,
			topicId: req.body.topicId,
			numberCorrectAns: req.body.numberCorrectAns,
			numberAns: req.body.numberAns
		}
		
		TopicEvaluateModel.findOne({ username: data.username, testId: data.testId, topicId: data.topicId },
			async (err, doc) => {
				try {
					if (err) throw err;
					if (doc) {
						TopicEvaluateModel.updateOne({ username: data.username, testId: data.testId, topicId: data.topicId }, {
							$set: { numberCorrectAns: data.numberCorrectAns,
								   numberAns: data.numberAns }
						});

						return res.json(doc);
					}
					else {
						let newDoc = new TopicEvaluateModel(data);
						newDoc.save((err, doc) => {
							if (err) {
								return res.status(400).send({message: err});
							}
							else {
								return res.json(doc);
							}
						});
					}
				}
				catch (e) {
					console.log(e);
				}
			})
	}
});

router.post('/getTopicScoreForUser', (req, res) => {
	TopicEvaluateModel.find({ username: req.body.username }, (err, doc) => {
		try {
			if (err) throw err;
			if (doc) {
				res.json({
					topicScoreForUser: doc
				})
			}
		}
		catch (e) {
			console.log(e);
		}
	});
});

router.post('/saveTopicScore', async (req, res) => {
	const token = req.headers.authorization;
	const decode = jwt.decode(token.replace('Bearer ',''));
	if (decode.username) {
		const topicList = req.body.listOfTopic;
		let listRes = [];

		for (const topic of topicList) {
			const list = await EvaluatedDoc.find({topicId: topic.topicId, username: decode.username}).sort({ _id: -1 }).limit(10);

			let NLScore = 0;
			let correct = 0;
			let sum = 0;
			for (const doc of list) {
				correct += doc.numberCorrectAns;
				sum += doc.numberAns;
			}
			NLScore = correct / sum;

			const query = {
				username: decode.username,
				topicId: topic.topicId,
				NLScore: NLScore
			}
			
			await TopicEvaluateUserModel.findOneAndUpdate({username: decode.username, topicId: topic.topicId},
				{
					$set: {
						NLScore: query.NLScore
					}
				}, async (err, result) => {
					try {
						if (err) throw err;
						if (result) {
							listRes.push(result);
						}
						else {
							const newDoc = new TopicEvaluateUserModel(query)
							await newDoc.save((err, result) => {
								listRes.push(result);
							});
						}
					}	
					catch (e) {
						console.log(e);
					}
			});

		}

		if (listRes.length === topicList.length) {
			await res.json({ listOfEvaluatedTopicUser: listRes });
		}
		else {
			await setTimeout(() => {
				res.json({ listOfEvaluatedTopicUser: listRes });
			}, 200);
		}
	}
});

router.post('/getTopicScore', async (req, res) => {
	const token = req.headers.authorization;
	const decode = jwt.decode(token.replace('Bearer ',''));
	if (decode.username) {
		const topicList = req.body.listOfTopic;
		listRes = [];

		console.log(topicList.length)
		if (!topicList) {
			await TopicEvaluateUserModel.find({ username: decode.username },
				(err, result) => {
					try {
						if (err) throw err;
						if (result) {
							listRes = result;
						}
					}
					catch (e) {
						console.log(e);
					}
				});
		}
		else {
			let index = 0;
			for (const topic of topicList) {
				await TopicEvaluateUserModel.findOne({ username: decode.username, topicId: topic.topicId },
					(err, result) => {
						try {
							if (err) throw err;
							if (result) {
								listRes.push(result);
								console.log(".......");
								index++;
								
								if (index === topicList.length) {
									res.json(listRes);
								}
							}
						}
						catch (e) {
							console.log(e);
						}
					});
			}
		}
		console.log(listRes);
	}
});

router.post('/getTopicScoreUser', async (req, res) => {
	const token = req.headers.authorization;
	const decode = jwt.decode(token.replace('Bearer ',''));
	if (decode.username) {
		await TopicEvaluateUserModel.find({ username: decode.username },
			(err, result) => {
				try {
					if (err) throw err;
					if (result) {
						res.json(result);
					}
				}
				catch (e) {
					console.log(e);
				}
			});
	}
});

module.exports = router;
