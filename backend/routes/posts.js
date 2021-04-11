const express = require("express");
const mongoose = require("mongoose");
const PostController = require("../controllers/posts");

const {
  createShorthandPropertyAssignment,
  createPostfix,
} = require("typescript");
const { path } = require("../app");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const router = express.Router();
/* const MINE_TYPE_MAP = {
  "images/png": "png",
  "images/jpeg": "jpeg",
  "images/jpg": "jpg",
}; */

/** Since each middleware API has the same URI (/api/posts) so it's filter from router
 *all /api/posts has remove from here and filter at router posts.js
 *
 */

router.post("", checkAuth, extractFile, PostController.createPost);

/**
 * multer({ storage: storage }).single("image")  Extract the image
 */
router.put("/:id", checkAuth, extractFile, PostController.updatePost);
//http://localhost:3000/api/posts?pageSize=2&currentPage=2&Something=test
router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
