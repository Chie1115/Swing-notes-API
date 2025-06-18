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

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes for authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized
 */
router.get('/', getNotes);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Note data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteInput'
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', createNote);

/**
 * @swagger
 * /api/notes:
 *   put:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Note data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteUpdate'
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.put('/', updateNote);

/**
 * @swagger
 * /api/notes:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to delete
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       400:
 *         description: Invalid ID supplied
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.delete('/', deleteNote);

/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     summary: Search notes by title
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Title keyword to search
 *     responses:
 *       200:
 *         description: List of matched notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       400:
 *         description: Missing or invalid title parameter
 *       401:
 *         description: Unauthorized
 */
router.get('/search', authenticateToken, searchNotes);// Search notes by title for the logged-in user

export default router;
