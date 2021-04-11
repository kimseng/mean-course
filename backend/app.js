const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
//const Post = require("../backend/models/post");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const app = express();

mongoose
  .connect(
    "mongodb+srv://loanmg:" +
      process.env.MONGO_ATLAS_PWD +
      "@cluster0.uqmm7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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
/**Important setting to make your asset (image, css) working
 * http://localhost:3000/images/upload-image-1617138354828.png
 */
//app.use("/images", express.static(path.join("backend/images")));  //For Dev
app.use("/images", express.static(path.join(process.env.IMG_PATH))); //For Prod
/**Add middle ware */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type ,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

/* const posts = [
    { id: "fa3239", title: "First Post", content: "This is my post content 1" },
    {
      id: "fa333d",
      title: "Second Post",
      content: "This is my post content 2",
    },
    { id: "fa343d", title: "Third Post", content: "This is my post content 3" },
    { id: "fa353d", title: "Forth Post", content: "This is my post content 4" },
    { id: "fa363d", title: "Fifth Post", content: "This is my post content 5" },
  ]; */
