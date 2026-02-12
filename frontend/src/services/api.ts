import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mocksApi = {
  getAll: () => api.get('/mocks'),
  getOne: (id: string) => api.get(`/mocks/${id}`),
  create: (data: any) => api.post('/mocks', data),
  update: (id: string, data: any) => api.put(`/mocks/${id}`, data),
  delete: (id: string) => api.delete(`/mocks/${id}`),
  start: (id: string) => api.post(`/mocks/${id}/start`),
  stop: (id: string) => api.post(`/mocks/${id}/stop`),
  setDelay: (id: string, delayMs: number) => api.put(`/mocks/${id}/delay`, { delayMs }),
};

export const routesApi = {
  getAll: (mockId: string) => api.get(`/mocks/${mockId}/routes`),
  getOne: (id: string) => api.get(`/routes/${id}`),
  create: (mockId: string, data: any) => api.post(`/mocks/${mockId}/routes`, data),
  update: (id: string, data: any) => api.put(`/routes/${id}`, data),
  delete: (id: string) => api.delete(`/routes/${id}`),
};

export const conditionsApi = {
  getAll: (routeId: string) => api.get(`/routes/${routeId}/conditions`),
  getOne: (id: string) => api.get(`/conditions/${id}`),
  create: (routeId: string, data: any) => api.post(`/routes/${routeId}/conditions`, data),
  update: (id: string, data: any) => api.put(`/conditions/${id}`, data),
  delete: (id: string) => api.delete(`/conditions/${id}`),
};

export const scenariosApi = {
  getAll: () => api.get('/scenarios'),
  getOne: (id: string) => api.get(`/scenarios/${id}`),
  create: (data: any) => api.post('/scenarios', data),
  update: (id: string, data: any) => api.put(`/scenarios/${id}`, data),
  delete: (id: string) => api.delete(`/scenarios/${id}`),
  execute: (id: string) => api.post(`/scenarios/${id}/execute`),
  getResults: (id: string) => api.get(`/scenarios/executions/${id}/results`),
};

export default api;
