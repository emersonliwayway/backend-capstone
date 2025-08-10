import db from "#db/client";

export async function createBookmark(user_id, post_id) {
  const sql = `
    INSERT INTO bookmarks 
      (user_id, post_id)
    VALUES
      ($1, $2)
    RETURNING *
    `;

  const {
    rows: [bookmark],
  } = await db.query(sql, [user_id, post_id]);
  return bookmark;
}

export async function deleteBookmark(post_id) {
  const sql = `
  DELETE FROM bookmarks
  WHERE post_id = $1
  RETURNING *
  `;

  const {
    rows: [bookmark],
  } = await db.query(sql, [post_id]);
  return bookmark;
}

export async function getBookmarksByUserId(user_id) {
  const sql = `
    SELECT posts.*
    FROM posts
    JOIN bookmarks ON bookmarks.post_id = posts.post_id
    WHERE bookmarks.user_id = $1
    `;

  const { rows: bookmarks } = await db.query(sql, [user_id]);
  return bookmarks;
}
