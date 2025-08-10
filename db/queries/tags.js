import db from "#db/client";

export async function getTags() {
  const sql = `
  SELECT *
  FROM tags
  `;

  const { rows: tags } = await db.query(sql);
  return tags;
}

export async function createTag(tag_name) {
  const sql = `
  INSERT INTO tags
    (tag_name)
  VALUES
    ($1)
  RETURNING *
  `;

  const {
    rows: [tag],
  } = await db.query(sql, [tag_name]);
  return tag;
}

export async function deleteTag(tag_id) {
  const sql = `
    DELETE FROM tags
    WHERE tag_id = $1
    RETURNING *
    `;

  const {
    rows: [tag],
  } = await db.query(sql, [tag_id]);
  return tag;
}

export async function getTagById(tag_id) {
  const sql = `
  SELECT *
  FROM tags
  WHERE tag_id = $1
  `;

  const {
    rows: [tag],
  } = await db.query(sql, [tag_id]);
  return tag;
}

export async function getTagsByPostId(post_id) {
  const sql = `
  SELECT tags.tag_id, tag_name
  FROM tags
  JOIN tag_list ON tags.tag_id = tag_list.tag_id
  JOIN posts ON tag_list.list_id = posts.list_id
  WHERE posts.post_id = $1
  `;

  const { rows: tags } = await db.query(sql, [post_id]);
  return tags;
}
