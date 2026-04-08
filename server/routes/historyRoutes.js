/**
 * server/routes/historyRoutes.js — Generation history routes.
 * Task: Universal Memory (Persistent Storage)
 */
const express = require('express');
const historyController = require('../controllers/historyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public Detail Route (Sharing)
router.get('/public/:id', historyController.getPublicItem);

// Protected routes require authentication
router.use(authMiddleware);

router.get('/', historyController.getHistory);
router.post('/', historyController.addHistory);
router.delete('/:id', historyController.deleteHistory);
router.delete('/clear', historyController.clearHistory);

module.exports = router;
