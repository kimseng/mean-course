const express = require("express");
const Post = require("../backend/models/post");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://loanmg:Welcome24@cluster0.uqmm7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

/* For Express <4.16
app.use(bodyparser.json);
app.use(bodyparser.urlencoded({ extended: false })); */

/**From Express >4.16 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**Add middle ware */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type ,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  /* const post = new Post({
    title: req.body.title,
    content: req.body.content,
  }); */

  const post = req.boby;

  console.log(post);
  res.status(200).json({
    message: "Post added successfully!",
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    { id: "fa323d", title: "First Post", content: "This is my post content 1" },
    {
      id: "fa333d",
      title: "Second Post",
      content: "This is my post content 2",
    },
    { id: "fa343d", title: "Third Post", content: "This is my post content 3" },
    { id: "fa353d", title: "Forth Post", content: "This is my post content 4" },
    { id: "fa363d", title: "Fifth Post", content: "This is my post content 5" },
  ];
  res.status(200).json({
    message: "Posts fetched successfully",
    posts: posts,
  });
});

module.exports = app;
