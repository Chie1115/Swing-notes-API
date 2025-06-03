import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT || 3000;
const express = require('express');

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);

// Swagger設定
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swing Notes API',
      version: '1.0.0',
      description: 'API documentation for Swing Notes',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
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
            id: { type: 'string', example: 'abc123' },
            title: { type: 'string', example: 'Shopping list' },
            text: { type: 'string', example: 'Buy milk and eggs' },
            createdAt: { type: 'string', format: 'date-time' },
            modifiedAt: { type: 'string', format: 'date-time' },
          },
        },
        NoteInput: {
          type: 'object',
          required: ['title', 'text'],
          properties: {
            title: { type: 'string', maxLength: 50, example: 'Meeting notes' },
            text: { type: 'string', maxLength: 300, example: 'Discussed new project timeline' },
          },
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

