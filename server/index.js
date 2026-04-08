/**
 * server/index.js — Main entry point for the backend.
 * Task 5: Authentication (Light Backend)
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware (Task 8: Production Security)
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`
  🚀 UI Intelligence Server Operational
  📡 Mode: ${process.env.NODE_ENV || 'development'}
  🔗 Endpoint: http://localhost:${PORT}
  🌍 Allowed Origins: ${allowedOrigins.join(', ')}
  `);
});
