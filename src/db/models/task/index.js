const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
	text: String,
	isCheck: Boolean
});

module.exports = Task = mongoose.model("allTasks", taskSchema);