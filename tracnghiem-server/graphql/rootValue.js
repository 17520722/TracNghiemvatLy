const QuestionModel = require("../models/Question");
const UserModel = require("../models/User");
const TopicModel = require("../models/Topic");
const AnswerModel = require("../models/Answer");

const createItem = async (input, modelName, objectName=null, exact=true) => {
	const query = {
		...input,
	}

	console.log(modelName);

	const objectRespone = await modelName.findOne(query, function(err, result) {
		if (err) {
			return {
				code: 500, 
				content: "Err when find item!"
			}
		}
	});
	console.log(objectRespone);

	if (objectRespone !== null && exact == true) {
		return {
			code: 302,
			content: "existed!"
		}
	}
	else {
		console.log("helo there")
		let newItem;

		if (objectName !== null) {
			newItem = objectName;
		}
		else {
			newItem = new modelName(query);
		}
		console.log("new item:");
		console.log(newItem);

		try {
			const saveResult = await newItem.save(err => console.log("ERR when inserted item"));
			if (saveResult !== null) {
				return {
					code: 201,
					content: "Saved!"
				}
			}
			else {
				return {
					code: 500,
					content: "Can't save data"
				}
			}
		}
		catch {
			console.log("Some thing went wrong! Let's check the server or database");
		}
	}

	return {
		code: 500,
		content: "Lỗi không xác định!"
	}
}

const updateItem = async (id, input, modelName) => {
	try {
		const objectRespone = await modelName.updateOne({_id: id},
			{
				$set: input
			});
	}
	catch {
		return {
			code: 500,
			content: "? can't update data!"
		};
	}

	return {
		code: 201,
		content: "Updated!"
	};
}

const findAllItem = async(modelName) => {
	const objectRespone = await modelName.find({}, (err, result) => {
		if (err) console.log(err);
	});

	console.log(objectRespone);
	return objectRespone;
}

const root = {
	//----------------For Topic Model -----------------
	topic: async({id}) => {
		try {
			return await TopicModel.findOne({_id: id});
		}
		catch {
			return null;
		}
	},

	topics: async() => {
		return findAllItem(TopicModel);
	},

	createTopic: ({input}) => {
		return createItem(input, TopicModel);
	},

	updateTopic: ({id, input}) => {
		return updateItem(id, input, TopicModel);
	},

	//-----------------For Answer Model ----------------
	answer: async({id}) => {
		try {
			return await AnswerModel.findOne({_id: id});
		}
		catch {
			return null;
		}
	},

	answers: async({ids}) => {
		let objectRespone = [];

		await ids.forEach(item => {
			try {
				objectRespone.push(AnswerModel.findOne({_id: item}));

				console.log("inserted");
				console.log(objectRespone);
			}
			catch {
				console.log("err find item");
			}
		});
		console.log("end");
		return objectRespone;
	},

	allAnswer: () => {
		return findAllItem(AnswerModel);
	},

	createAnswer: ({input}) => {
		return createItem(input, AnswerModel, null, false);
	},

	updateAnswer: ({id, input}) => {
		return updateItem(id, input, AnswerModel);
	},

	//-----------------For Question model-----------
     //get all question
	/*
	{
		questions {
			param
		}
	}
	*/
	questions: async() => {
		const objectRespone = await QuestionModel.find({}, (err, result) => {
			if (err) console.log(err);
		});

		console.log(objectRespone);
		return objectRespone;
	},

	//get one question
	/*
	{
		question(id: #id of question) {
			param
		}
	}
	*/
	question: async({id}) => {
		return await QuestionModel.findOne({_id: id});
	},

	createQuestion: ({input}) => {
		return createItem(input, QuestionModel);
	},

	updateQuestion: async({id, input}) => {
		console.log("------------------------")

		try {
			const objectRespone = await QuestionModel.updateOne({_id: id},
				{
					$set: input
				});
		}
		catch {
			return {
				code: 500,
				content: "? can't update data!"
			};
		}

		return {
			code: 201,
			content: "Updated!"
		};
	},

	//------------------For Answered Model ---------------------
	answered: async({answerId}) => {

	},

	answereds: async({answerIds}) => {

	},

	createAnswered: async({input}) => {

	},

	updateAnswered: async({answerId, input}) => {

	},

	//------------------For Test Model--------------------------
	test: async({id}) => {

	},

	tests: async({ids}) => {

	},

	createTest: async({input}) => {

	},

	updateTest: async({id, input}) => {

	},

	//-------------------For evaluatedDoc Model-----------------
	evaluatedDoc: async({id}) => {

	},

	evaluatedDocs: async({ids}) => {

	},

	createEvaluatedDoc: async({input}) => {

	},

	updateEvaluatedDoc: async({id, input}) => {

	},

	//------------------For User Model -------------------------
	user: async({id}) => {

	},

	users: async({ids}) => {

	},

	allUser: async() => {
		try {
			const objectRespone = await UserModel.find({}, (err, result) => {
				if (err) console.log(err);
			});

			return objectRespone;
		}
		catch {
			console.log("Some thing went wrong");
			return [];
		}
	},

	createUser: ({input}) => {
		const objectName = new UserModel(input);
		return createItem(input, UserModel, objectName);
	},

	updateUser: async({id, input}) => {
		return updateItem(id, input, UserModel);
	},

	//-------------------Ability Model--------------------
	ability: async({topicId, userId}) => {

	},

	abilities: async({userId}) => {

	},

	createAbility: async({input}) => {

	},

	updateAbility: async({userId, topicId, input}) => {

	},

	//----------------Generated Test Model ---------------
	generatedTest: async({id}) => {

	},

	generatedTests: async() => {

	},

	createGeneratedTest: async({input}) => {

	},

	updateGeneratedTest: async({id, input}) => {

	}
};

module.exports = root;
