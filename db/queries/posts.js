import db from "#db/client";

export async function createPost(title, body, user_id, created_at, post_tags) {
  const sql = `
    INSERT INTO posts
      (title, body, user_id, created_at, post_tags)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const {
    rows: [post],
  } = await db.query(sql, [title, body, user_id, created_at, post_tags]);
  return post;
}

export async function getPosts() {
  const sql = `
    SELECT *
    FROM posts
  `;

  const { rows: posts } = await db.query(sql);
  return posts;
}

export async function getPostById(id) {
  const sql = `
    SELECT *
    FROM posts
    WHERE id = $1
  `;

  const {
    rows: [post],
  } = await db.query(sql, [id]);
  return post;
}

export async function deletePost(id) {
  const sql = `
    DELETE FROM posts
    WHERE id = $1
    RETURNING *
  `;

  const {
    rows: [post],
  } = await db.query(sql, [id]);
  return post;
}

export async function getPostsByUserId(user_id) {
  const sql = `
    SELECT *
    FROM posts
    WHERE user_id = $1
  `;

  const { rows: posts } = await db.query(sql, [user_id]);
  return posts;
}

export async function getPostsByTagId(tag_id) {
  const sql = `
    SELECT posts.*
    FROM posts
      CROSS JOIN unnest(post_tags) AS tag_id
      JOIN tags ON tags.id = tag_id
    WHERE tag_id = $1
  `;

  const { rows: posts } = await db.query(sql, [tag_id]);
  return posts;
}
