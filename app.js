const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

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

app.get('/api/notes', authenticateToken, (req, res) => {
  res.json([]);
});

module.exports = app;
