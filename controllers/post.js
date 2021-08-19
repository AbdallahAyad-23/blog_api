const mongoose = require("mongoose");
const async = require("async");
const Post = require("../models/post");
const Comment = require("../models/comment");

exports.getPosts = (req, res, next) => {
  Post.find().then((posts) => {
    res.json({ posts });
  });
};
exports.getPost = (req, res, next) => {
  async.parallel(
    {
      post: function (callback) {
        Post.findById(req.params.postId).exec(callback);
      },
      comments: function (callback) {
        Comment.find({ post: req.params.postId }).exec(callback);
      },
    },
    function (err, results) {
      return res.json({ post: results.post, comments: results.comments });
    }
  );
};

exports.createPost = (req, res, next) => {
  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
  });
  post
    .save()
    .then((post) => {
      return res.json(post);
    })
    .catch((err) => {
      return res.json({ error: err.message });
    });
};

exports.deletePost = (req, res, next) => {
  Post.findByIdAndRemove(req.params.postId).then((post) => {
    if (!post) return res.json({ error: "This post doesn't exist" });

    Comment.deleteMany({ post: req.params.postId }).then((comments) => {
      return res.json({ post });
    });
  });
};
exports.editPost = (req, res, next) => {
  const { title, content } = req.body;
  Post.findByIdAndUpdate(
    req.params.postId,
    { title, content },
    { new: true }
  ).then((post) => {
    if (!post) return res.json({ error: "This post doesn't exist" });
    return res.json({ post });
  });
};
