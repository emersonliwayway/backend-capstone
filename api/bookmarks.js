import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

import {
  createBookmark,
  getBookmarks,
  deleteBookmark,
  getBookmarkById,
} from "#db/queries/bookmarks";

router.use(requireUser);

router.route("/").get(async (req, res) => {
  const bookmarks = await getBookmarks(req.user.id);
  res.send(bookmarks);
});

router.route("/").post(requireBody(["post_id"]), async (req, res) => {
  const { post_id } = req.body;
  const bookmark = await createBookmark(req.user.id, post_id);
  res.status(201).send(bookmark);
});

router.param("id", async (req, res, next, id) => {
  const bookmark = await getBookmarkById(id);
  if (!bookmark) return res.status(404).send("Bookmark not found.");
  req.bookmark = bookmark;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.bookmark);
});

router.route("/:id").delete(async (req, res) => {
  await deleteBookmark(req.bookmark.id);
  res.sendStatus(204);
});
