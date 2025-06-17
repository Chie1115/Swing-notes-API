// swagger/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

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
            id: { type: 'string' },
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

export { swaggerUi, specs };
