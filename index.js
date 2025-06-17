import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// JWT認証ミドルウェア
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ルーティング
app.use('/api/user', userRoutes);
// 認証が必要なルートだけミドルウェアを挟む方法
app.use('/api/notes', authenticateToken, noteRoutes);

// Swagger設定
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swing Notes API',
      version: '1.0.0',
      description: 'API documentation for Swing Notes',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Note: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Ett genererat ID för denna anteckning.' },
            title: { type: 'string', maxLength: 50, description: 'Titeln på anteckningen.' },
            text: { type: 'string', maxLength: 300, description: 'Själva anteckningstexten.' },
            createdAt: { type: 'string', format: 'date-time', description: 'När anteckningen skapades.' },
            modifiedAt: { type: 'string', format: 'date-time', description: 'När anteckningen sist modifierades.' },
          },
          required: ['id', 'title', 'text', 'createdAt', 'modifiedAt'],
        },
        NoteInput: {
          type: 'object',
          properties: {
            title: { type: 'string', maxLength: 50 },
            text: { type: 'string', maxLength: 300 },
          },
          required: ['title', 'text'],
        },
        NoteUpdate: {
          type: 'object',
          properties: {
            id: { type: 'string' },  // 更新にはIDが必要
            title: { type: 'string', maxLength: 50 },
            text: { type: 'string', maxLength: 300 },
          },
        required: ['id', 'title', 'text', 'createdAt', 'modifiedAt'],
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('Swing Notes API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});


