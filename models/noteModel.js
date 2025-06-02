import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function getNotesByUser(userId) {
  const result = await pool.query(
    'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

export async function createNoteForUser(userId, title, text) {
  const result = await pool.query(
    `INSERT INTO notes (user_id, title, text)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title, text]
  );
  return result.rows[0];
}

export async function updateNoteById(userId, id, title, text) {
  const result = await pool.query(
    `UPDATE notes SET title = $1, text = $2, modified_at = NOW()
     WHERE id = $3 AND user_id = $4 RETURNING *`,
    [title, text, id, userId]
  );
  return result.rows[0];
}

export async function deleteNoteById(userId, id) {
  const result = await pool.query(
    'DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *',
    [id, userId]
  );
  return result.rows[0];
}

export async function searchNotesByTitle(userId, query) {
  const result = await pool.query(
    `SELECT * FROM notes
     WHERE user_id = $1 AND LOWER(title) LIKE LOWER($2)`,
    [userId, `%${query}%`]
  );
  return result.rows;
}
