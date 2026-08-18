import axios from 'axios'

// Axios service prepared for the future FastAPI backend.
// The frontend currently runs on mock data (see src/data/mockData.js).
// When the backend is ready, set VITE_USE_MOCK_DATA=false in your .env file.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Reusable API functions for future backend integration.

export async function checkBackendHealth() {
  return apiClient.get('/api/health')
}

export async function getDashboardStatistics() {
  return apiClient.get('/api/dashboard')
}

export async function getProjects() {
  return apiClient.get('/api/projects')
}

export async function getProjectById(projectId) {
  return apiClient.get(`/api/projects/${projectId}`)
}

export async function createProject(projectData) {
  return apiClient.post('/api/projects', projectData)
}

export async function updateProject(projectId, projectData) {
  return apiClient.put(`/api/projects/${projectId}`, projectData)
}

export async function deleteProject(projectId) {
  return apiClient.delete(`/api/projects/${projectId}`)
}

export async function getTasks() {
  return apiClient.get('/api/tasks')
}

export async function getTaskById(taskId) {
  return apiClient.get(`/api/tasks/${taskId}`)
}

export async function createTask(taskData) {
  return apiClient.post('/api/tasks', taskData)
}

export async function updateTask(taskId, taskData) {
  return apiClient.put(`/api/tasks/${taskId}`, taskData)
}

export async function updateTaskStatus(taskId, status) {
  return apiClient.patch(`/api/tasks/${taskId}/status`, { status })
}

export async function deleteTask(taskId) {
  return apiClient.delete(`/api/tasks/${taskId}`)
}

export async function generateAIPlan(requestData) {
  return apiClient.post('/api/ai/plan', requestData)
}

export async function recommendNextTask(requestData) {
  return apiClient.post('/api/ai/next-task', requestData)
}

export async function getAIHistory(projectId) {
  return apiClient.get(`/api/ai/history/${projectId}`)
}

export default apiClient
