// swagger/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swing Notes API',
      version: '1.0.0',
      description: 'API documentation for Swing Notes',
    },
    servers: [
      { url: `http://localhost:${PORT}` }  // Local server
    ],
    components: {
      // JWT authentication setup
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },

      // Schema definitions for request/response objects
      schemas: {
        // User object
        User: {
          type: "object",
          properties: {
            id: { type: "integer", description: "User ID" },
            username: { type: "string", description: "Username" },
            email: { type: "string", description: "User email address" }
          },
          required: ["id", "username", "email"],
        },

        // Full note object
        Note: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Generated ID for this note.' },
            user_id: { type: 'integer', description: 'User ID associated with this note.' },
            title: { type: 'string', maxLength: 50, description: 'Title of the note.' },
            text: { type: 'string', maxLength: 300, description: 'Content text of the note.' },
            created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp.' },
            modified_at: { type: 'string', format: 'date-time', description: 'Last modified timestamp.' },
          },
          required: ['id', 'user_id', 'title', 'text', 'created_at', 'modified_at'],
        },

        // Used when creating a new note
        NoteInput: {
          type: 'object',
          properties: {
            title: { type: 'string', maxLength: 50, description: 'Title of the note.' },
            text: { type: 'string', maxLength: 300, description: 'Content text of the note.' },
          },
          required: ['title', 'text'],
        },

        // Used when updating a note
        NoteUpdate: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID of the note to update.' },
            title: { type: 'string', maxLength: 50, description: 'Updated title.' },
            text: { type: 'string', maxLength: 300, description: 'Updated content text.' },
          },
          required: ['id', 'title', 'text'],
        },

        // Used for error responses
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", description: "Error message" },
          },
          required: ["message"],
        },

        // Login request body
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email", description: "User email address" },
            password: { type: "string", description: "User password" },
          },
          required: ["email", "password"],
        },

        // Login success response
        LoginResponse: {
          type: "object",
          properties: {
            message: { type: "string", description: "Response message" },
            token: { type: "string", description: "JWT token" },
          },
          required: ["message", "token"],
        },
      },
    },

    // Apply global security for all routes unless overridden
    security: [{ bearerAuth: [] }],
  },

  // Path to files containing OpenAPI annotations
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
