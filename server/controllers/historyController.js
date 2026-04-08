/**
 * server/controllers/historyController.js — Manages generation history persistence.
 * Task: Universal Memory (Persistent Storage)
 */
const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(__dirname, '../data/history.json');

// Helper to read history
const readHistory = () => {
  try {
    const data = fs.readFileSync(HISTORY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper to write history
const writeHistory = (history) => {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
};

exports.getHistory = (req, res) => {
  const history = readHistory();
  // Filter by user ID if authenticated
  const userHistory = history.filter(h => h.userId === req.user.id);
  res.json(userHistory);
};

exports.getPublicItem = (req, res) => {
  const { id } = req.params;
  const history = readHistory();
  const item = history.find(h => h.id === id);
  
  if (!item) {
    return res.status(404).json({ message: 'Component not found' });
  }
  
  // Return only safe preview data
  res.json(item);
};

exports.addHistory = (req, res) => {
  const history = readHistory();
  const newItem = {
    ...req.body,
    userId: req.user.id,
    timestamp: new Date().toISOString()
  };
  
  // Update if exists (refinement/retry) or add new
  const index = history.findIndex(h => h.id === newItem.id);
  if (index !== -1) {
    history[index] = newItem;
  } else {
    history.unshift(newItem);
  }
  
  writeHistory(history.slice(0, 500)); // Cap at 500 total
  res.status(201).json(newItem);
};

exports.deleteHistory = (req, res) => {
  const { id } = req.params;
  let history = readHistory();
  history = history.filter(h => h.id !== id || h.userId !== req.user.id);
  writeHistory(history);
  res.status(204).end();
};

exports.clearHistory = (req, res) => {
  let history = readHistory();
  history = history.filter(h => h.userId !== req.user.id);
  writeHistory(history);
  res.status(204).end();
};
