import {
  getNotesByUser,
  createNoteForUser,
  updateNoteById,
  deleteNoteById,
  searchNotesByTitle
} from '../models/noteModel.js';

export async function getNotes(req, res) {
  const notes = await getNotesByUser(req.user.id);
  res.json(notes);
}

export async function createNote(req, res) {
  const { title, text } = req.body;
  if (!title || !text) return res.status(400).json({ message: 'Title and text are required' });

  const note = await createNoteForUser(req.user.id, title, text);
  res.status(201).json(note);
}

export async function updateNote(req, res) {
  const { id, title, text } = req.body;
  if (!id || !title || !text) return res.status(400).json({ message: 'ID, title, and text are required' });

  const updated = await updateNoteById(req.user.id, id, title, text);
  if (!updated) return res.status(404).json({ message: 'Note not found or not yours' });

  res.json(updated);
}

export async function deleteNote(req, res) {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'ID required' });

  const deleted = await deleteNoteById(req.user.id, id);
  if (!deleted) return res.status(404).json({ message: 'Note not found or not yours' });

  res.json({ message: 'Note deleted' });
}

export async function searchNotes(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'Search query missing' });

  const results = await searchNotesByTitle(req.user.id, query);
  res.json(results);
}
