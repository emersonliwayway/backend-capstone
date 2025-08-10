import db from "#db/client";

export async function createPostTag(post_id, tag_id) {
  const sql = `
    INSERT INTO post_tags
      (post_id, tag_id)
    VALUES
      ($1, $2)
    RETURNING *
    `;

  const {
    rows: [post_tag],
  } = await db.query(sql, [post_id, tag_id]);
  return post_tag;
}

export async function getPostTagsById(post_id) {
  const sql = `
    SELECT *
    FROM post_tags
    WHERE post_id = $1
    `;

  const { rows: post_tags } = await db.query(sql, [post_id]);
  return post_tags;
}
