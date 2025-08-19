import express from "express";
const router = express.Router();
router.use(express.json());
export default router;

import { getPostsByTagId } from "#db/queries/posts";
import { createTag, getTags, getTagById } from "#db/queries/tags";

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.route("/").get(async (req, res) => {
  const tags = await getTags();
  res.send(tags);
});

router.route("/").post(requireUser, requireBody(["name"]), async (req, res) => {
  const { name } = req.body;
  const tag = await createTag(name);
  console.log(tag);
  res.status(201).json(tag);
});

router.param("id", async (req, res, next, id) => {
  const tag = await getTagById(id);
  if (!tag) return res.status(404).send("Tag not found.");
  req.tag = tag;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.tag);
});

router.route("/:id/posts").get(async (req, res) => {
  const posts = await getPostsByTagId(req.tag.id);
  res.status(200).send(posts);
});
