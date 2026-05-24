import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Projects ──────────────────────────────────────
export const getProjects = () => api.get('/projects');
export const getProject  = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// ── Contact ───────────────────────────────────────
export const sendMessage = (data) => api.post('/contact', data);

// ── Admin ─────────────────────────────────────────
export const adminLogin    = (data) => api.post('/admin/login', data);
export const getMessages   = () => api.get('/admin/messages');
export const deleteMessage = (id) => api.delete(`/admin/messages/${id}`);

export default api;
