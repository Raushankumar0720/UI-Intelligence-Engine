/**
 * History Service — API communication layer for generation history.
 * Task: Universal Memory (Persistent Storage)
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
