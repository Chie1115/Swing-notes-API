import express from 'express';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes
} from '../controllers/noteController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getNotes);
router.post('/', createNote);
router.put('/', updateNote);
router.delete('/', deleteNote);
router.get('/search', searchNotes);

export default router;
