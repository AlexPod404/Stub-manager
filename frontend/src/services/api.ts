import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const mocksApi = {
  getAll: () => apiClient.get('/mocks'),
  getOne: (id: string) => apiClient.get(`/mocks/${id}`),
  create: (data: any) => apiClient.post('/mocks', data),
  update: (id: string, data: any) => apiClient.put(`/mocks/${id}`, data),
  delete: (id: string) => apiClient.delete(`/mocks/${id}`),
  start: (id: string) => apiClient.post(`/mocks/${id}/start`),
  stop: (id: string) => apiClient.post(`/mocks/${id}/stop`),
  setDelay: (id: string, delay: number) => apiClient.put(`/mocks/${id}/delay`, { delay }),
}

export const scenariosApi = {
  getAll: () => apiClient.get('/scenarios'),
  getOne: (id: string) => apiClient.get(`/scenarios/${id}`),
  create: (data: any) => apiClient.post('/scenarios', data),
  update: (id: string, data: any) => apiClient.put(`/scenarios/${id}`, data),
  delete: (id: string) => apiClient.delete(`/scenarios/${id}`),
  execute: (id: string) => apiClient.post(`/scenarios/${id}/execute`),
  getResults: (id: string) => apiClient.get(`/scenarios/${id}/results`),
}
