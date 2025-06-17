import {
  getNotesByUser,
  createNoteForUser,
  updateNoteById,
  deleteNoteById,
  searchNotesByTitle
} from '../models/noteModel.js';

export async function getNotes(req, res) {
  try {
    const notes = await getNotesByUser(req.user.id);
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createNote(req, res) {
  try {
    const { title, text } = req.body;
    if (!title || !text) return res.status(400).json({ message: 'Title and text are required.' });

    if (title.length > 50) return res.status(400).json({ message: 'Title must be at most 50 characters.' });
    if (text.length > 300) return res.status(400).json({ message: 'Text must be at most 300 characters.' });

    const note = await createNoteForUser(req.user.id, title, text);
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateNote(req, res) {
  try {
    const { id, title, text, createdAt, modifiedAt } = req.body;

    if (!id || !title || !text || !createdAt || !modifiedAt) {
      return res.status(400).json({ message: 'id, title, text, createdAt, and modifiedAt are required.' });
    }

    if (title.length > 50) {
      return res.status(400).json({ message: 'Title must be at most 50 characters.' });
    }

    if (text.length > 300) {
      return res.status(400).json({ message: 'Text must be at most 300 characters.' });
    }

    // Optional: validate date format of createdAt and modifiedAt here

    const updated = await updateNoteById(req.user.id, id, title, text, createdAt, modifiedAt);
    if (!updated) return res.status(404).json({ message: 'Note not found or not owned by you.' });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'ID is required.' });

    const deleted = await deleteNoteById(req.user.id, id);
    if (!deleted) return res.status(404).json({ message: 'Note not found or not owned by you.' });

    res.json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function searchNotes(req, res) {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ message: 'Search query is missing.' });

    const results = await searchNotesByTitle(req.user.id, title);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
