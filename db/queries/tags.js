import db from "#db/client";

export async function getTags() {
  const sql = `
  SELECT *
  FROM tags
  `;

  const { rows: tags } = await db.query(sql);
  return tags;
}

export async function createTag(name) {
  const sql = `
  INSERT INTO tags
    (name)
  VALUES
    ($1)
  RETURNING *
  `;

  const {
    rows: [tag],
  } = await db.query(sql, [name]);
  return tag;
}

export async function deleteTag(id) {
  const sql = `
    DELETE FROM tags
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [tag],
  } = await db.query(sql, [id]);
  return tag;
}

export async function getTagById(id) {
  const sql = `
  SELECT *
  FROM tags
  WHERE id = $1
  `;

  const {
    rows: [tag],
  } = await db.query(sql, [id]);
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
