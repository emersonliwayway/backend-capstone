import db from "#db/client";

export async function createPostTags(tag_id) {
  const sql = `
    INSERT INTO post_tags
      (tag_id)
    VALUES
      ($1)
    RETURNING *
  `;

  const {
    rows: [post_tags],
  } = await db.query(sql, [tag_id]);
  return post_tags;
}
export async function addTagToPostTags(id, tag_id) {
  const sql = `
    UPDATE post_tags
    SET tag_id = ARRAY_APPEND(tag_id, $1)
    WHERE id = $2
    RETURNING *
  `;

  const {
    rows: [post_tags],
  } = await db.query(sql, [id, tag_id]);
  return post_tags;
}

export async function getPostTags() {
  const sql = `
    SELECT *
    FROM post_tags
    ORDER BY id
  `;

  const { rows: post_tags } = await db.query(sql);
  return post_tags;
}

export async function getPostTagsById(id) {
  const sql = `
    SELECT *
    FROM post_tags
    WHERE id = $1
  `;

  const {
    rows: [post_tags],
  } = await db.query(sql, [id]);
  return post_tags;
}

export async function deletePostTags(id) {
  const sql = `
    DELETE FROM post_tags
    WHERE id = $1
    RETURNING *
  `;

  const { rows: post_tags } = await db.query(sql, [id]);
  return post_tags;
}

export async function deleteFromPostTags(id, tag_id) {
  const sql = `
    UPDATE post_tags
    SET tag_id = array_remove(tag_id, $2)
    WHERE id = $1
    RETURNING *
  `;

  const {
    rows: [post_tags],
  } = await db.query(sql, [id, tag_id]);
  return post_tags;
}
