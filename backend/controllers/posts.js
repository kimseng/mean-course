const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  console.log(req.userData);
  //return res.status(200).json({});

  console.log("New Post => " + post);
  post
    .save()
    .then((createdPost) => {
      res.status(200).json({
        message: "Post added successfully!",
        //Shorten Form using spread operator
        post: {
          ...createdPost,
          id: createdPost._id,
        },
        /**Long form */
        /* post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath,
      }, */
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating a post failed.",
      });
    });
};

exports.updatePost = (req, res, next) => {
  //Get image file url in update

  let imagePath = req.body.imagePath; //it catch the current
  console.log("Current image path=>" + imagePath);
  //in case upload new image file
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  console.log("Look at file => " + req.file);

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });
  //console.log("Before update to db=>" + post);
  console.log(req.userData, req.userData.userId);
  console.log("Post Id to update =>" + req.params.id);
  //return res.status(200).json({});
  console.log(post);

  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Update successfully!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
        next();
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update post",
      });
    });
};

exports.getPosts = (req, res, next) => {
  console.log(req.query);
  const pageSize = +req.query.pageSize; //+ sign to convert to number
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchPosts = documents;
      return Post.count();
      //console.log(res.json({ posts: documents }));
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: fetchPosts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching post failed.",
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching post failed.",
      });
    });
};
exports.deletePost = (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Update successfully!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Delete failed.",
      });
    });
};
