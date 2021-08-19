const express = require("express");
const commentController = require("../controllers/comment");

const router = express.Router();

router.post("/posts/:postId/comments", commentController.createComment);
router.delete(
  "/posts/:postId/comments/:commentId",
  commentController.deleteComment
);
router.put("/posts/:postId/comments/:commentId", commentController.editComment);

module.exports = router;
