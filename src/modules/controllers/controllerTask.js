const Task = require('../../db/models/task/index');

module.exports.getAllTasks = (req, res) => {
	Task.find().then(result => {
		res.send({ data: result });
	});
};

module.exports.getTaskById = async (req, res) => {
	try {
		const taskId = req.query._id;
		if (!taskId) return res.status(422).send('Error! Params not correct');
		const result = await Task.findOne({ _id: taskId });
		return result ? res.send(result) : res.status(422).send('Not found');
	} catch (error) {
		return res.status(422).send({ error, message: 'Error! Params not correct!' });
	}
}

module.exports.createNewTask = async (req, res) => {
	try {
		const body = req.body;
		if (!(body.hasOwnProperty('text') && body.hasOwnProperty('isCheck'))) return res.status(422).send('Error! Params not found!');
		const task = new Task(body);
		await task.save();
		res.send({ task: task, message: 'Task save' });
	} catch (error) {
		return res.status(422).send({ error, message: 'Error! Params not correct!' });
	};
};

module.exports.changeTaskInfo = async (req, res) => {
	try {
		const body = req.body;
		if (!(body.hasOwnProperty('_id') && body.hasOwnProperty('text') && body.hasOwnProperty('isCheck'))) return res.status(422).send('Error! Params not found!');
		const result = await Task.updateOne({ _id: body._id }, body);
		return result.matchedCount > 0 ? res.send('Task update!') : res.send('Task not found!');
	} catch (error) {
		return res.status(422).send({ error, message: 'Error! Params not correct!' });
	};
};

module.exports.deleteTask = async (req, res) => {
	try {
		const taskId = req.query._id;
		if (!taskId) return res.status(422).send('Error! Params not correct');
		const result = await Task.deleteOne({ _id: taskId });
		return result.deletedCount > 0 ? res.send('Task delete!') : res.send('Task not found!');
	} catch (error) {
		return res.status(422).send({ error, message: 'Error! Params not correct!' });
	};
};