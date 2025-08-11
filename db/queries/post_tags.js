import db from "#db/client";

export async function createPostTags(user_id, tag_id) {
  const sql = `
    INSERT INTO post_tags
      (user_id, tag_id)
    VALUES
      ($1, $2)
    RETURNING *
  `;

  const {
    rows: [post_tags],
  } = await db.query(sql, [user_id, tag_id]);
  return post_tags;
}
export async function addTagToPostTags(id, user_id, tag_id) {
  const sql = `
    UPDATE post_tags
    SET tag_id = ARRAY_APPEND(tag_id, $3)
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  const {
    rows: [post_tags],
  } = await db.query(sql, [id, user_id, tag_id]);
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

export async function getPostTagsByUserId(user_id) {
  const sql = `
    SELECT *
    FROM post_tags
    WHERE user_id = $1
  `;

  const {
    rows: [post_tags],
  } = await db.query(sql, [user_id]);
  return post_tags;
}

export async function deletePostTags(id, user_id) {
  const sql = `
    DELETE FROM post_tags
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  const { rows: post_tags } = await db.query(sql, [id, user_id]);
  return post_tags;
}

export async function deleteFromPostTags(id, user_id, tag_id) {
  const sql = `
    UPDATE post_tags
    SET tag_id = array_remove(tag_id, $3)
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  const {
    rows: [post_tags],
  } = await db.query(sql, [id, user_id, tag_id]);
  return post_tags;
}
