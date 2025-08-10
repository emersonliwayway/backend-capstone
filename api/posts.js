import express from "express";
const router = express.Router();
export default router;

import {
  getPosts,
  createPost,
  deletePost,
  getPostById,
} from "#db/queries/posts";

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import { getTagsByPostId } from "#db/queries/tags";

router.route("/").get(async (req, res) => {
  const posts = await getPosts();
  res.send(posts);
});

router
  .route("/")
  .post(
    requireUser,
    requireBody(["title", "body", "tag_list"]),
    async (req, res) => {
      const { title, body, tag_list } = req.body;
      const timestamp = new Date();
      const post = await createPost(
        title,
        body,
        req.user.user_id,
        timestamp,
        tag_list
      );
      res.status(201).send(post);
    }
  );

router.param("id", async (req, res, next, id) => {
  const post = await getPostById(id);
  if (!post) return res.status(404).send("Post not found.");
  req.post = post;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.post);
});

router.route("/:id").delete(requireUser, async (req, res) => {
  if (req.user.user_id !== req.post.post_id) {
    return res.status(401).send("Post not made by user.");
  }
  await deletePost(req.post.post_id);
  res.sendStatus(204);
});

router.route("/:id/tags").get(async (req, res) => {
  const post_tags = await getTagsByPostId(req.post.post_id);
  res.send(post_tags);
});
