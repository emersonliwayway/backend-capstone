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
    SELECT tags.id AS tag_id, tags.name
    FROM post_tags
      CROSS JOIN unnest(tag_id) AS tag
      JOIN tags ON tag = tags.id
      JOIN posts ON posts.post_tags = post_tags.id
    WHERE posts.id = $1;
  `;

  const { rows: tags } = await db.query(sql, [post_id]);
  return tags;
}

// select tags.name, tag_id from post_tags cross join unnest(tag_id) as tag join tags on tags.id = tag;
// select tags.name, unnest(tag_id) from post_tags join tags on tag_name = post_tags.tag_id
