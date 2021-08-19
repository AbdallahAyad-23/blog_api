const mongoose = require("mongoose");
const Post = require("../models/post");
const Comment = require("../models/comment");

exports.createComment = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.postId);
  const { content, user } = req.body;
  const comment = new Comment({
    content,
    user,
    post: id,
  });
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.json({ error: "This post doesn't exist" });
      }
      comment.save().then((comment) => {
        return res.json({ comment });
      });
    })
    .catch((err) => res.json({ error: err.message }));
};

exports.deleteComment = (req, res, next) => {
  const id = req.params.commentId;
  Comment.findByIdAndRemove(id).then((comment) => {
    if (!comment) return res.json({ error: "This comment doesn't exist" });
    return res.json({ comment });
  });
};

exports.editComment = (req, res, next) => {
  const id = req.params.commentId;
  const { content } = req.body;
  Comment.findByIdAndUpdate(id, { content }, { new: true }).then((comment) => {
    if (!comment) return res.json({ error: "this comment doesn't exist" });
    return res.json({ comment });
  });
};
