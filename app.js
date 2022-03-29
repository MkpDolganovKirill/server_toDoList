const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8000;

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());

const url = 'mongodb://localhost:27017/allTasks';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use("/", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});