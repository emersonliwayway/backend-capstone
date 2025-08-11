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

export async function deleteBookmark(user_id, post_id) {
  const sql = `
    DELETE FROM bookmarks
    WHERE user_id = $1 AND post_id = $2
    RETURNING *
  `;

  const {
    rows: [bookmark],
  } = await db.query(sql, [user_id, post_id]);
  return bookmark;
}

export async function getBookmarksByUserId(user_id) {
  const sql = `
    SELECT *
    FROM bookmarks
    WHERE user_id = $1
  `;

  const { rows: bookmarks } = await db.query(sql, [user_id]);
  return bookmarks;
}
