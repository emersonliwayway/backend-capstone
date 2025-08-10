import db from "#db/client";

export async function createTagList(tag_id) {
  const sql = `
  INSERT INTO tag_list
    (tag_id)
  VALUES
    ($1)
  RETURNING *
    `;

  const {
    rows: [tag_list],
  } = await db.query(sql, [tag_id]);
  return tag_list;
}
export async function addTagToList(list_id, tag_id) {
  const sql = `
  INSERT INTO tag_list
    (list_id, tag_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;

  const {
    rows: [tag_list],
  } = await db.query(sql, [list_id, tag_id]);
  return tag_list;
}

export async function getTagLists() {
  const sql = `
  SELECT *
  FROM tag_list
  `;

  const { rows: tag_lists } = await db.query(sql);
  return tag_lists;
}

export async function getTagListById(list_id) {
  const sql = `
  SELECT *
  FROM tag_list
  WHERE list_id = $1
  `;

  const {
    rows: [tag_list],
  } = await db.query(sql, [list_id]);
  return tag_list;
}

export async function deleteTagList(list_id) {
  const sql = `
  DELETE FROM tag_list
  WHERE list_id = $1
  RETURNING *
  `;

  const { rows: tag_list } = await db.query(sql, [list_id]);
  return tag_list;
}

export async function deleteTagFromList(list_id, tag_id) {
  const sql = `
  DELETE FROM tag_list
  WHERE post_id = $1 AND tag_id =  $2
  RETURNING *
  `;

  const {rows: tag_list} = await db.query(sql, [list_id, tag_id])
  return tag_list;


}
