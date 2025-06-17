import { Pool } from 'pg'; 
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Insert a new user into the database and return basic info
export async function createUser(name, email, hashedPassword) {
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );
  return result.rows[0]; // Return inserted user (without password)
}

// Find a user by email (used for login)
export async function getUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0]; // Return user object (may include hashed password)
}
