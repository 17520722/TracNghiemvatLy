const express = require("express");
const bodyParser = require("body-parser");
require("./mongoose/mongoose");
const { graphqlHTTP } = require('express-graphql');
const root = require("./graphql/rootValue");
const schema = require("./graphql/schema");
const app = express();
const URL_CLIENT = "http://localhost:3000";
var cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randToken = require('rand-token');
const Question = require("./models/Question");
const Test = require("./models/Test");
const authRouter = require("./user/auth");
const uploadRouter = require("./routes/upload");
const topicEvaluate = require("./routes/topicEvaluate");
const question = require("./routes/question");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));	

app.use('/auth', authRouter);

app.use('/uploads', uploadRouter);

app.use('/topicEvalute', topicEvaluate);

app.use('/question', question);

app.post('/api/saveQuestion', (req, res) => {
	const data = req.body;
	Question.findOne(data, async function(err, result) {
		try {
			if (err) {
				res.status(500).send({message: "Error from server!"});
			}
			if (result) {
				return res.status(302).send({message: "Exist!"});	
			}
			else {
				let newItem = new Question(data);
				try {
					const saveResult = await newItem.save(err => console.log("ERR when inserted item"));
					if (saveResult !== null) {
						res.status(201).send({message: "Saved!"});
					}
					else {
						return res.status(500).send({message: "Error from server!"});
					}
				}
				catch {
					console.log("Some thing went wrong! Let's check the server or database");
				}
			}
		}
		catch(e) {
			console.log(e);
			return res.status(500).json({message: "Internal Error"});
		}
	});

});

app.post('/api/saveTest', async(req, res) => {
	const data = req.body;
	let newItem = new Test(data);
	try {
		await newItem.save().then(testResponse => {
			if (testResponse) {
				return res.status(201).json(testResponse);
			}
			else {
				return res.status(500).send({message: "Error from server!"});
			}
		});
	}
	catch(e) {
		console.log("Some thing went wrong! Let's check the server or database");
		console.log(e);
		return res.status(500).send({message: "Error from server!"});
	}
});

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.get("/", (req, res) => {
	res.send("hello from server!");
});

app.get("/api/cau-hoi", async (req, res) => {

	const cauHoi = await CauHoiModel.find({});
	try {
		res.send(cauHoi);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.post("/api/cau-hoi", (req, res) => {
	let newCauHoi = new CauHoiModel({
		content: req.body.txt_content,
		setOfAnswer: req.body.setOfAnswer,
		level: req.body.select_level,
		topic: req.body.select_topic,
	});

	console.log(newCauHoi);

	CauHoiModel.find({});

	newCauHoi.save(function (err) {
		if (err) {
			console.log("Save error! " + err);
		} else {
			console.log("Save successful!");
			res.json({ msg: 'success' });
		}
	});
});

// app.listen(process.env.PORT, () => {
// 	console.log("App listening port 5000!");
// });

app.listen(5000, () => {
	console.log("App listening port 5000!");
});