import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.route("/").get(async (req, res) => {});
router
  .route("/")
  .post(requireUser, requireBody(["tag_id"]), async (req, res) => {});
