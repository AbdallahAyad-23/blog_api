const express = require("express");
const postController = require("../controllers/post");

const router = express.Router();

router.get("/posts", postController.getPosts);
router.get("/posts/:postId", postController.getPost);

router.post("/posts", postController.createPost);

router.delete("/posts/:postId", postController.deletePost);

router.put("/posts/:postId", postController.editPost);

module.exports = router;
