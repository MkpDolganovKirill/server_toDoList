const express = require('express');
const router = express.Router();

const {
	getAllTasks,
	getTaskById,
	createNewTask,
	changeTaskInfo,
	deleteTask
} = require('../controllers/controllerTask');

router.get('/allTasks', getAllTasks);
router.get('/getTaskById', getTaskById);
router.post('/createTask', createNewTask);
router.patch('/updateTask', changeTaskInfo);
router.delete('/deleteTask', deleteTask);

module.exports = router;