import express from 'express';
import { signup, login } from '../controllers/userController.js';

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Chie
 *               email:
 *                 type: string
 *                 example: shikachie@gmail.com
 *               password:
 *                 type: string
 *                 example: shikachie15
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login and get JWT token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: shikachie@gmail.com
 *               password:
 *                 type: string
 *                 example: shikachie15
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized
 */


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;

