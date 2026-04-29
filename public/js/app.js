const API_URL = 'http://localhost:5001/api';

window.API = {
  // --- Auth ---
  async registerUser(name, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async loginUser(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('spendify_token', data.token);
    return data;
  },

  logoutUser() {
    localStorage.removeItem('spendify_token');
  },

  getToken() {
    return localStorage.getItem('spendify_token');
  },

  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    };
  },

  async getProfile() {
    const res = await fetch(`${API_URL}/users/profile`, {
      headers: this.getAuthHeaders()
    });
    if (!res.ok) throw new Error('Not authorized');
    return await res.json();
  },

  // --- Expenses ---
  async getExpenses() {
    const res = await fetch(`${API_URL}/expenses`, {
      headers: this.getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch expenses');
    return await res.json();
  },

  async addExpense(name, amount, category, date) {
    const res = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ name, amount: parseFloat(amount), category, date })
    });
    if (!res.ok) throw new Error('Failed to add expense');
    return await res.json();
  },

  async deleteExpense(id) {
    const res = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete expense');
    return await res.json();
  },

  // --- Budget & Settings ---
  async setBudget(budget) {
    const res = await fetch(`${API_URL}/users/budget`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ budget: parseFloat(budget) })
    });
    if (!res.ok) throw new Error('Failed to set budget');
    return await res.json();
  },

  async setCategoryLimit(category, amount) {
    const res = await fetch(`${API_URL}/users/limits`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ category, amount: parseFloat(amount) })
    });
    if (!res.ok) throw new Error('Failed to set limit');
    return await res.json();
  },

  async setHealthProfile(healthProfile) {
    const res = await fetch(`${API_URL}/users/health`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ healthProfile })
    });
    if (!res.ok) throw new Error('Failed to set health profile');
    return await res.json();
  }
};
