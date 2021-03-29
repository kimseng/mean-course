const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post");

const router = express.Router();

/** Since each middleware API has the same URI (/api/posts) so it's filter from router
 *all /api/posts has remove from here and filter at router posts.js
 *
 */

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  //console.log(post);
  post.save().then((result) => {
    res.status(200).json({
      message: "Post added successfully!",
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successfully!" });
  });
});

router.delete("/:id", (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
  });
  res.status(200).json({ message: "Post deleted!" });
});

module.exports = router;
