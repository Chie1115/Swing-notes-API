import {
  getNotesByUser,
  createNoteForUser,
  updateNoteById,
  deleteNoteById,
  searchNotesByTitle
} from '../models/noteModel.js';

// Get all notes for the logged-in user
export async function getNotes(req, res) {
  try {
    const notes = await getNotesByUser(req.user.id);  // Fetch notes by user ID
    res.json(notes);  // Return notes as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });  // Server error
  }
}

// Create a new note for the logged-in user
export async function createNote(req, res) {
  try {
    const { title, text } = req.body;

    // Validate required fields
    if (!title || !text) return res.status(400).json({ message: 'Title and text are required.' });

    // Validate length limits according to requirements
    if (title.length > 50) return res.status(400).json({ message: 'Title must be at most 50 characters.' });
    if (text.length > 300) return res.status(400).json({ message: 'Text must be at most 300 characters.' });

    const note = await createNoteForUser(req.user.id, title, text);  // Create note in DB
    res.status(201).json(note);  // Return the created note
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update an existing note (owned by the logged-in user)
export async function updateNote(req, res) {
  try {
    const { id, title, text, createdAt, modifiedAt } = req.body;

    // Validate required fields
    if (!id || !title || !text || !createdAt || !modifiedAt) {
      return res.status(400).json({ message: 'id, title, text, createdAt, and modifiedAt are required.' });
    }

    // Validate length limits
    if (title.length > 50) return res.status(400).json({ message: 'Title must be at most 50 characters.' });
    if (text.length > 300) return res.status(400).json({ message: 'Text must be at most 300 characters.' });

    // Note: date format validation could be added here if needed

    const updated = await updateNoteById(req.user.id, id, title, text, createdAt, modifiedAt); // Update note in DB

    // If note not found or not owned by user
    if (!updated) return res.status(404).json({ message: 'Note not found or not owned by you.' });

    res.json(updated);  // Return updated note
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete a note by id (owned by the logged-in user)
export async function deleteNote(req, res) {
  try {
    const { id } = req.query;

    if (!id) return res.status(400).json({ message: 'ID is required.' });

    const deleted = await deleteNoteById(req.user.id, id);

    // If note not found or not owned by user
    if (!deleted) return res.status(404).json({ message: 'Note not found or not owned by you.' });

    res.json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Search notes by title 
export async function searchNotes(req, res) {
  try {
    const { title } = req.query;

    if (!title) return res.status(400).json({ message: 'Search query is missing.' });

    const results = await searchNotesByTitle(req.user.id, title);  // Search notes by title for this user
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

