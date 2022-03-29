const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

app.use(express.json());

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  text: String,
  isCheck: Boolean
})

const url = 'mongodb://localhost:27017/allTasks';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

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

app.post('/createTask', (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.send('task create!');
  });
});

app.delete('/deleteTask', (req, res) => {
  Task.findByIdAndDelete(req.query.id).then(result => {
    result ? res.send('Task deleted!') : res.send('Task is not found!');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});