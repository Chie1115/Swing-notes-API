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
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createNote(req, res) {
  try {
    const { title, text } = req.body;
    if (!title || !text) return res.status(400).json({ message: 'Title and text are required' });

    const note = await createNoteForUser(req.user.id, title, text);
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateNote(req, res) {
  try {
    const { id, title, text } = req.body;
    if (!id || !title || !text) return res.status(400).json({ message: 'ID, title, and text are required' });

    const updated = await updateNoteById(req.user.id, id, title, text);
    if (!updated) return res.status(404).json({ message: 'Note not found or not yours' });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'ID required' });

    const deleted = await deleteNoteById(req.user.id, id);
    if (!deleted) return res.status(404).json({ message: 'Note not found or not yours' });

    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function searchNotes(req, res) {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Search query missing' });

    const results = await searchNotesByTitle(req.user.id, query);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
