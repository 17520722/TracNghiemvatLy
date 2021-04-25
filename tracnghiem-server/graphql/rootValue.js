const QuestionModel = require("../models/Question");
const UserModel = require("../models/User");
const TopicModel = require("../models/Topic");
const AnswerModel = require("../models/Answer");
const AnsweredModel = require("../models/Answered");
const TestModel = require("../models/Test")

const findItem = async(id, modelName) => {
	return await modelName.findOne({_id: id});
}

const findItems = async (ids = [], modelName) => {
	const promise = ids.map(async (item) => {
		try {
			const res = await modelName.findOne({_id: item});
			return res;
		}
		catch(e) {
			console.log(e);
		}
	});

	const respone = await Promise.all(promise);
	return respone;
}

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

	return objectRespone;
}

const findQuestion = async(id) => {
	const objectResponse = await QuestionModel.findOne({_id: id});
	let jsonObj = JSON.parse(JSON.stringify(objectResponse));

	await findItems(jsonObj.setOfAnswerId, AnswerModel).then((res) => {
		jsonObj.setOfAnswer = res;
	});
	jsonObj.topic = await findItem(jsonObj.topicId, TopicModel);

	return jsonObj;
}

const findQuestions = async(ids) => {
	let objectRespone = [];

	for (let index = 0; index < ids.length; index++) {
		try {
			//tim cau hoi
			let object = await QuestionModel.findOne({_id: ids[index]});
			let jsonObj = JSON.parse(JSON.stringify(object));
			//neu tim duoc thi tim ca cau tra loi trong truong setOfAnswer
			if (object) {
				await findItems(jsonObj.setOfAnswerId, AnswerModel).then((res) => {
					jsonObj.setOfAnswer = res;
				});
				jsonObj.topic = await findItem(jsonObj.topicId, TopicModel);
			}

			objectRespone.push(jsonObj);
		}
		catch(e) {
			console.log(e);
		}
	}

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

		await findItems(ids, AnswerModel).then((res) => {
			objectRespone = res;
		});
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
	allQuestion: async() => {
		const objectRespone = await QuestionModel.find({}, (err, result) => {
			if (err) console.log(err);
		});

		let respone = [];
		for (let index = 0; index < objectRespone.length; index++) {
			let jsonObj = JSON.parse(JSON.stringify(objectRespone[index]));

			await findItems(jsonObj.setOfAnswerId, AnswerModel).then((res) => {
				jsonObj.setOfAnswer = res;
			});
			jsonObj.topic = await findItem(jsonObj.topicId, TopicModel);
			respone.push(jsonObj);
		}
		return respone;
	},

	questions: ({ids}) => {
		return findQuestions(ids);
	},

	//get one question
	/*
	{
		question(id: #id of question) {
			param
		}
	}
	*/
	question: ({id}) => {
		return findQuestion(id);
	},

	createQuestion: ({input}) => {
		return createItem(input, QuestionModel);
	},

	updateQuestion: ({id, input}) => {
		return updateItem(id, input, QuestionModel);
	},

	//------------------For Answered Model ---------------------
	answered: async({id}) => {
		return findItem(id, AnsweredModel);
	},

	answereds: async({ids}) => {
		return findItems(ids, AnsweredModel);
	},

	createAnswered: async({input}) => {
		return createItem(input, AnsweredModel);
	},

	updateAnswered: async({id, input}) => {
		return updateItem(id, input, AnsweredModel);
	},

	//------------------For Test Model--------------------------
	test: async({id}) => {
		
	},

	tests: async({ids}) => {
		let objectRespone = [];

		for (let index = 0; index < ids.length; index++) {
			try {
				//tim cau hoi
				let object = await TestModel.findOne({_id: ids[index]});
				let jsonObj = JSON.parse(JSON.stringify(object));
				//neu tim duoc thi tim ca cau tra loi trong truong setOfAnswer
				const _1 = await findQuestions(jsonObj.setOfRemember).then((res) => {
					jsonObj.setOfRemember = res;
				});
				const _2 = await findQuestions(jsonObj.setOfRemember).then((res) => {
					jsonObj.setOfUnderstand = res;
				});
				const _3 = await findQuestions(jsonObj.setOfRemember).then((res) => {
					jsonObj.setOfApply = res;
				});
				const _4 = await findQuestions(jsonObj.setOfRemember).then((res) => {
					jsonObj.setOfAnalyzing = res;
				});

				await Promise.all([_1, _2, _3, _4]);

				console.log(jsonObj);
				objectRespone.push(jsonObj);
			}
			catch(e) {
				console.log(e);
			}
		}

		return objectRespone;
	},

	createTest: async({input}) => {
		return createItem(input, TestModel);
	},

	updateTest: async({id, input}) => {
		return updateItem(id, input, TestModel);
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
