import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

import {
  getPostTags,
  createPostTags,
  getPostTagsById,
} from "#db/queries/post_tags";

router.route("/").get(async (req, res) => {
  const post_tags = await getPostTags();
  res.send(post_tags);
});

router
  .route("/")
  .post(requireUser, requireBody(["tag_id"]), async (req, res) => {
    const { tag_id } = req.body;
    const post_tags = await createPostTags(req.user.id, tag_id);
    res.status(201).send(post_tags);
  });

router.param("id", async (req, res, next, id) => {
  const post_tags = await getPostTagsById(id);
  if (!post_tags) return res.status(404).send("Post_tags not found.");
  req.post_tags = post_tags;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.post_tags);
});
