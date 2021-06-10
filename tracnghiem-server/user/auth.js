const express = require('express');
const auth_router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const randToken = require('rand-token');

auth_router.post('/register', (req, res) => {
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

auth_router.post('/signin', (req, res) => {
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

auth_router.post('/updateUser', (req, res) => {
	const token = req.headers.authorization;
	const decode = jwt.decode(token.replace('Bearer ',''));
	console.log(decode);
	if (decode.username === req.headers.username) {

	}
});

auth_router.post('/addTest', (req, res) => {
	const token = req.headers.authorization;
	const decode = jwt.decode(token.replace('Bearer ',''));
	if (decode.username === req.headers.username) {
		User.findOne({ username: decode.username }, async (err, user) => {
			try {
				if (err) throw err;
				if (!user) {
					res.status(401).json({message: "Authentication failed. User not found."});
				}
				else {
					let list = user.listOfTest;
					list.push(req.body.testid);
					User.updateOne({ username: decode.username }, {
						listOfTest: list
					}).then(doc => res.status(201).json(doc));
				}
			}
			catch (e) {
				console.log(e);
			}
		});
	}
});

module.exports = auth_router;
