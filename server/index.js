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

// Middleware (Task 8: Resilient Production Security)
const rawFrontendUrl = process.env.FRONTEND_URL || '';
const cleanFrontendUrl = rawFrontendUrl.endsWith('/') ? rawFrontendUrl.slice(0, -1) : rawFrontendUrl;

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  cleanFrontendUrl,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // 1. Allow browser extensions, mobile apps, or local curl
    if (!origin) return callback(null, true);
    
    // 2. Normalization: Check against the whitelist (handling trailing slash variance)
    const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
    
    if (allowedOrigins.indexOf(normalizedOrigin) !== -1 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // 3. Environment Fallback: If no FRONTEND_URL is set on Render, block but log better
    if (!process.env.FRONTEND_URL && process.env.NODE_ENV === 'production') {
      console.warn('⚠️ WARNING: FRONTEND_URL not set in Cloud Dashboard. CORS may block requests.');
    }
    
    return callback(new Error(`CORS Violation: ${origin} is not in Allowed Origins.`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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
