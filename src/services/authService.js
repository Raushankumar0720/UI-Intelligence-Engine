/**
 * Auth Service — API communication layer for authentication.
 * Separates network concerns from state management.
 */

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Intelligent Path Normalization: Auto-correction for cloud dashboard drifts
if (API_URL && !API_URL.endsWith('/api')) {
  // If the user forgot to add /api in the Vercel dashboard, we append it here
  API_URL = API_URL.endsWith('/') ? `${API_URL}api` : `${API_URL}/api`;
}

class AuthService {
  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || `Login failed (${res.status})`);
    }
    
    return res.json();
  }

  async register(name, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || `Registration failed (${res.status})`);
    }
    
    return res.json();
  }

  async getProfile(token) {
    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  }
}

export const authService = new AuthService();
