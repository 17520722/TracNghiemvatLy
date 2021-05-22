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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));	

app.post('/auth/register', (req, res) => {
	User.findOne({username: req.body.username},(err, user) => {
		if (err) throw err;
		if (user) {
			return res.status(401).json({message: "Exist!"});
		}
		else {
			let newUser = new User(req.body);
			newUser.hashPassword = bcrypt.hashSync(req.body.hashPassword, 10);
			newUser.role = "member";
			newUser.save((err, user) => {
				if (err) {
					return res.status(400).send({message: err});
				}
				else {
					user.hashPassword = undefined;
					return res.json(user);
				}
			});
		}
	});
});

app.post('/auth/signin', (req, res) => {
	User.findOne({username: req.body.username}, async (err, user) => {
          try {
			if (err) throw err;
			if (!user) {
				res.status(401).json({message: "Authentication failed. User not found."});
			}
			else if (user) {
				if (!user.comparePassword(req.body.hashPassword, user.hashPassword)) {
					res.status(401).json({message: "Authentication failed. Wrong password."});
				}
				else {
					let refreshToken = randToken.generate(100); // tạo 1 refresh token ngẫu nhiên

					if (!user.refreshToken) {
						// Nếu user này chưa có refresh token thì lưu refresh token đó vào database
						await User.updateOne({username: user.username}, {
							refreshToken: refreshToken
						});
					}
					else {
						// Nếu user này đã có refresh token thì lấy refresh token đó từ database
						refreshToken = user.refreshToken;
					}

					return res.json({token: jwt.sign({
						username: user.username,
						email: user.email,
						role: user.role,
						info: user.info,
						refreshToken: refreshToken,
						listOfTest: user.listOfTest,
						listOfEvaluatedDoc: user.listOfEvaluatedDoc
					}, "RESTFULAPIs"),
								username: user.username,
								email: user.email,
								role: user.role,
								info: user.info,
								refreshToken: refreshToken,
								listOfTest: user.listOfTest,
								listOfEvaluatedDoc: user.listOfEvaluatedDoc});
				}
			}
		}
		catch(e) {
			console.log(e);
			return res.status(500).json({message: "Internal Error"});
		}
     });
});

app.post('/api/saveQuestion', (req, res) => {
	const data = req.body;
	console.log(data);
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

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", URL_CLIENT);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
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

app.listen(5000, () => {
	console.log("App listening port 5000!");
});
