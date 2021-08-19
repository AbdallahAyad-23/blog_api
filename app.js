const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

require("dotenv").config();

const app = express();

const mongoDb = process.env.DB;

mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(postRoutes);
app.use(commentRoutes);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
