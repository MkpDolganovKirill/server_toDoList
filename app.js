const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

app.use(express.json());

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  text: String,
  isCheck: Boolean
}, {versionKey: false})

const url = 'mongodb://localhost:27017/allTasks';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,  });

const Task = mongoose.model("allTasks", taskSchema);

app.get('/', (req, res) => {
  const task = new Task({
    text: "first task",
    isCheck: false
  });
  task.save().then(result => {
    res.send(result);  
  });
});

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {
    res.send({data: result});
  });
});

app.post('/createTask', async (req, res) => {
  try {
    const body = req.body;
    if (!(body.hasOwnProperty('text') && body.hasOwnProperty('isCheck'))) return res.status(422).send('Error! Params not found!');
    const task = new Task(body);
    await task.save();
    res.send({task: task, message: 'Task save'});
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
});

app.delete('/deleteTask', async (req, res) => {
  try {
    const taskId = req.query.id;
    if (!taskId) return res.status(422).send('Error! Params not correct');
    const result = await Task.deleteOne({ _id: taskId });
    return result.deletedCount > 0 ? res.send('Task delete!') : res.send('Task not found!');
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!'});
  };
});

app.patch('/updateTask', async (req, res) => {
  try {
    const body = req.body;
    if (!(body.hasOwnProperty('id') && body.hasOwnProperty('text') && body.hasOwnProperty('isCheck'))) return res.status(422).send('Error! Params not found!');
    const result = await Task.updateOne({ _id: body.id }, { text: body.text, isCheck: body.isCheck });
    return result.matchedCount > 0 ? res.send('Task update!') : res.send('Task not found!');
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});