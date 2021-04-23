const express = require("express");
const bodyParser = require("body-parser");
require("./mongoose/mongoose");
const { graphqlHTTP } = require('express-graphql');
const root = require("./graphql/rootValue");
const schema = require("./graphql/schema");
const app = express();
const URL_CLIENT = "http://localhost:3000";

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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
