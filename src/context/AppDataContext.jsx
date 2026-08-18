import { createContext, useContext, useMemo, useState } from 'react'
import {
  mockProjects,
  mockTasks,
  mockAIHistory,
  generateMockAIResponse,
} from '../data/mockData'

// AppDataContext holds all projects, tasks and AI history in local state.
// This lets the frontend perform CRUD operations without a backend.
// Later, these functions can be replaced with calls to src/services/api.js.

const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
  const [projects, setProjects] = useState(mockProjects)
  const [tasks, setTasks] = useState(mockTasks)
  const [aiHistory, setAIHistory] = useState(mockAIHistory)

  // --- Project helpers ---
  const getProjectById = (id) =>
    projects.find((p) => p.id === Number(id))

  const addProject = (data) => {
    const newProject = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setProjects((prev) => [newProject, ...prev])
    return newProject
  }

  const updateProject = (id, data) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === Number(id) ? { ...p, ...data } : p)),
    )
  }

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== Number(id)))
    // Also remove tasks belonging to the deleted project.
    setTasks((prev) => prev.filter((t) => t.projectId !== Number(id)))
  }

  // --- Task helpers ---
  const getTaskById = (id) => tasks.find((t) => t.id === Number(id))

  const tasksForProject = (projectId) =>
    tasks.filter((t) => t.projectId === Number(projectId))

  const addTask = (data) => {
    const newTask = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    }
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }

  const updateTask = (id, data) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === Number(id)
          ? { ...t, ...data, updatedAt: new Date().toISOString().slice(0, 10) }
          : t,
      ),
    )
  }

  const updateTaskStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === Number(id)
          ? { ...t, status, updatedAt: new Date().toISOString().slice(0, 10) }
          : t,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== Number(id)))
  }

  // --- AI helpers ---
  const generateAIResponse = (projectName, requirement, taskType) =>
    generateMockAIResponse(projectName, requirement, taskType)

  const addAIHistory = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setAIHistory((prev) => [newEntry, ...prev])
    return newEntry
  }

  const deleteAIHistory = (id) => {
    setAIHistory((prev) => prev.filter((h) => h.id !== Number(id)))
  }

  const value = useMemo(
    () => ({
      projects,
      tasks,
      aiHistory,
      getProjectById,
      addProject,
      updateProject,
      deleteProject,
      getTaskById,
      tasksForProject,
      addTask,
      updateTask,
      updateTaskStatus,
      deleteTask,
      generateAIResponse,
      addAIHistory,
      deleteAIHistory,
    }),
    [projects, tasks, aiHistory],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

// Custom hook so components can access data without importing useContext.
export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
