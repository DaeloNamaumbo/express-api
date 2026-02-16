require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Enhanced request logger middleware: logs timestamp, method, url, ip, body (non-GET),
// response status and response time on finish.
function requestLogger(req, res, next) {
  const start = Date.now();
  const { method, originalUrl } = req;
  const ip = req.ip || req.connection?.remoteAddress || '-';

  console.log(`${method} ${originalUrl} - ${ip}`);
  if (method !== 'GET' && req.body) {
    try {
      console.log('  body:', JSON.stringify(req.body));
    } catch (e) {
      console.log('  body: [unserializable]');
    }
  }

  next();
}

app.use(requestLogger);
app.use(express.json());

// GET /
app.get('/', (req, res) => {
  res.send('My Week 2 API!');
});

// POST /user -> accepts {name,email}
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  res.send(`Hello, ${name}!`);
});

// GET /user/:id
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(`user[${id}] profile`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
