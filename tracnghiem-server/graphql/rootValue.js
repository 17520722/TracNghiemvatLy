const QuestionModel = require("../models/Question");
const UserModel = require("../models/User");
const TopicModel = require("../models/Topic");
const AnswerModel = require("../models/Answer");
const AnsweredModel = require("../models/Answered");
const TestModel = require("../models/Test");
const EvaluatedDocModel = require("../models/EvaluatedDoc");
const AbilityModel = require("../models/Ability");
const GeneratedTestModel = require("../models/GeneratedTest");

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
	let query = ""
	if (modelName === TopicModel) {
		query = {
			topicId: input.topicId,
		}
	}
	else {
		query = {
			...input,
		}
	}
	
	const objectRespone = await modelName.findOne(query, function(err, result) {
		if (err) {
			return {
				code: 500, 
				content: "Err when find item!"
			}
		}
	});

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
	const objectRespone = await QuestionModel.findOne({_id: id}, (err, result) => {
		if (err) console.log(err);
	});
	let jsonObj = JSON.parse(JSON.stringify(objectRespone));
	jsonObj.topic = await TopicModel.findOne({topicId: jsonObj.topic});

	return jsonObj;
}

const findQuestions = async(ids) => {
	const promises = ids.map(async(id) => {
		try {
			//tim cau hoi
			let object = await QuestionModel.findOne({_id: id});
			let jsonObj = JSON.parse(JSON.stringify(object));
			//neu tim duoc thi tim ca cau tra loi trong truong setOfAnswer
			if (object) {
				jsonObj.topic = await TopicModel.findOne({topicId: jsonObj.topic});
			}

			return jsonObj;
		}
		catch(e) {
			console.log(e);
		}
	}); 
	const arrPromises = await Promise.all(promises);
	return arrPromises;
}

const root = {
	//----------------For Topic Model -----------------
	topic: async({topicID}) => {
		try {
			return await TopicModel.findOne({topicId: topicID});
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
		console.log("?")
		const objectRespone = await QuestionModel.find({}, (err, result) => {
			if (err) console.log(err);
		}).lean();
		console.log("complete Question")
		const topics = await TopicModel.find({}, (err, result) => {
			if (err) console.log(err);
		}).lean();
		console.log("complete Topic")

		let arrQuestion = [];
		for (let item of objectRespone) { //this is questions
			let question = JSON.parse(JSON.stringify(item));
			question.topic = topics.find(topic => topic.topicId === question.topic);
			arrQuestion.push(question);
			if (arrQuestion.length === objectRespone.length) {
				console.log("!");
				return arrQuestion;
			}
		}
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
		try {
			//tim cau hoi
			let object = await TestModel.findOne({_id: id});
			let jsonObj = JSON.parse(JSON.stringify(object));
			//neu tim duoc thi tim ca cau tra loi trong truong setOfAnswer
			await findQuestions(jsonObj.setOfRemember).then((res) => {
				jsonObj.setOfRemember = res;
			});
			await findQuestions(jsonObj.setOfUnderstand).then((res) => {
				jsonObj.setOfUnderstand = res;
			});
			await findQuestions(jsonObj.setOfApply).then((res) => {
				jsonObj.setOfApply = res;
			});
			await findQuestions(jsonObj.setOfAnalyzing).then((res) => {
				jsonObj.setOfAnalyzing = res;
			});
			console.log(jsonObj)
			return jsonObj;
		}
		catch(e) {
			console.log(e);
			return null;
		}
	},

	tests: async({ids = []}) => {
		const promises = ids.map(async(id) => {
			try {
				//tim cau hoi
				let object = await TestModel.findOne({_id: id});
				let jsonObj = JSON.parse(JSON.stringify(object));
				//neu tim duoc thi tim ca cau tra loi trong truong setOfAnswer
				await findQuestions(jsonObj.setOfRemember).then((res) => {
					jsonObj.setOfRemember = res;
				});
				await findQuestions(jsonObj.setOfUnderstand).then((res) => {
					jsonObj.setOfUnderstand = res;
				});
				await findQuestions(jsonObj.setOfApply).then((res) => {
					jsonObj.setOfApply = res;
				});
				await findQuestions(jsonObj.setOfAnalyzing).then((res) => {
					jsonObj.setOfAnalyzing = res;
				});
				console.log(jsonObj);
				return jsonObj;
			}
			catch(e) {
				console.log(e);
			}
		});

		const arrPromises = await Promise.all(promises);
		return arrPromises;
	},

	createTest: async({input}) => {
		return createItem(input, TestModel);
	},

	updateTest: async({id, input}) => {
		return updateItem(id, input, TestModel);
	},

	//-------------------For evaluatedDoc Model-----------------
	evaluatedDoc: async({id}) => {
		return findItem(id, EvaluatedDocModel);
	},

	evaluatedDocs: async({ids}) => {
		return findItems(ids, EvaluatedDocModel);
	},

	createEvaluatedDoc: async({input}) => {
		return createItem(input, EvaluatedDocModel);
	},

	updateEvaluatedDoc: async({id, input}) => {
		return updateItem(id, input, EvaluatedDocModel);
	},

	//------------------For User Model -------------------------
	user: async({id}) => {
		return findItem(id, UserModel);
	},

	users: async({ids}) => {
		return findItems(ids, UserModel);
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

	updateUser: ({id, input}) => {
		return updateItem(id, input, UserModel);
	},

	//-------------------Ability Model--------------------
	ability: async({tpId, urId}) => {
		return await AbilityModel.findOne({topicId: tpId, userId: urId});
	},

	abilities: async({urId}) => {
		return await AbilityModel.find({userId: urId});
	},

	createAbility: ({input}) => {
		return createItem(input, AbilityModel)
	},

	updateAbility: async({tpId, urId, input}) => {
		try {
			await modelName.updateOne({topicId: tpId, userId: urId},
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

	//----------------Generated Test Model ---------------
	generatedTest: async({id}) => {
		return findItem(id, GeneratedTestModel);
	},

	generatedTests: async() => {
		return findAllItem(GeneratedTestModel);
	},

	createGeneratedTest: async({input}) => {
		return createItem(input, GeneratedTestModel);
	},

	updateGeneratedTest: async({id, input}) => {
		return updateItem(id, input, GeneratedTestModel);
	}
};

module.exports = root;
