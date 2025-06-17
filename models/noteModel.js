import { Pool } from 'pg';

// Create a new PostgreSQL connection pool using the connection string from environment variables
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

/**
 * Get all notes for a specific user
 * Notes are ordered by creation date (newest first)
 */
export async function getNotesByUser(userId) {
  const result = await pool.query(
    'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

/**
 * Create a new note for a given user
 * Returns the created note
 */
export async function createNoteForUser(userId, title, text) {
  const result = await pool.query(
    `INSERT INTO notes (user_id, title, text)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title, text]
  );
  return result.rows[0];
}

/**
 * Update an existing note by ID and user ID
 * Also updates the modified_at timestamp
 * Returns the updated note
 */
export async function updateNoteById(userId, id, title, text) {
  const result = await pool.query(
    `UPDATE notes SET title = $1, text = $2, modified_at = NOW()
     WHERE id = $3 AND user_id = $4 RETURNING *`,
    [title, text, id, userId]
  );
  return result.rows[0];
}

/**
 * Delete a note by ID and user ID
 * Returns the deleted note (if found and deleted)
 */
export async function deleteNoteById(userId, id) {
  const result = await pool.query(
    'DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *',
    [id, userId]
  );
  return result.rows[0];
}

/**
 * Search notes by title (case-insensitive) for a specific user
 * Returns an array of notes where the title includes the query string
 */
export async function searchNotesByTitle(userId, query) {
  const result = await pool.query(
    `SELECT * FROM notes
     WHERE user_id = $1 AND LOWER(title) LIKE LOWER($2)
     ORDER BY modified_at DESC`,
    [userId, `%${query}%`]
  );
  return result.rows;
}
