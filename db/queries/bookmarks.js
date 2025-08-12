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

export async function getBookmarks(user_id) {
  const sql = `
    SELECT *
    FROM bookmarks
    WHERE user_id = $1
  `;

  const { rows: bookmarks } = await db.query(sql, [user_id]);
  return bookmarks;
}

export async function getBookmarkById(id) {
  const sql = `
    SELECT *
    FROM bookmarks
    WHERE id = $1
  `;

  const {
    rows: [bookmark],
  } = await db.query(sql, [id]);
  return bookmark;
}

export async function deleteBookmark(id) {
  const sql = `
    DELETE FROM bookmarks
    WHERE id = $1
    RETURNING *
  `;

  const {
    rows: [bookmark],
  } = await db.query(sql, [id]);
  return bookmark;
}
