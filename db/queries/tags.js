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

export async function getTagsByPostId(id) {
  const sql = `
    SELECT tags.id, tags.name
    FROM posts
      CROSS JOIN unnest(post_tags) AS tag
      JOIN tags ON tags.id = tag
    WHERE posts.id = $1
  `;

  const { rows: tags } = await db.query(sql, [id]);
  return tags;
}
