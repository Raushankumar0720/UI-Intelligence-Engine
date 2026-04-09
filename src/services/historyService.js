/**
 * History Service — API communication layer for generation history.
 * Task: Universal Memory (Persistent Storage)
 */

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Intelligent Path Normalization: Auto-correction for cloud dashboard drifts
if (API_URL && !API_URL.endsWith('/api')) {
  // If the user forgot to add /api in the Vercel dashboard, we append it here
  API_URL = API_URL.endsWith('/') ? `${API_URL}api` : `${API_URL}/api`;
}

class HistoryService {
  async getHistory(token) {
    const res = await fetch(`${API_URL}/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch history');
    return res.json();
  }

  async saveGeneration(item, token) {
    const res = await fetch(`${API_URL}/history`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to save generation');
    return res.json();
  }

  async deleteItem(id, token) {
    const res = await fetch(`${API_URL}/history/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete generation');
    return true;
  }

  async clearHistory(token) {
    const res = await fetch(`${API_URL}/history/clear`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to clear history');
    return true;
  }
}

export const historyService = new HistoryService();
