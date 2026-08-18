import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Pencil, Sparkles, Trash2 } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'
import ProgressBar from '../components/Common/ProgressBar'
import { PriorityBadge, StatusBadge, AIGeneratedBadge } from '../components/Common/Badge'
import ProjectForm from '../components/Projects/ProjectForm'
import TaskForm from '../components/Tasks/TaskForm'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const {
    getProjectById,
    tasksForProject,
    updateProject,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  } = useAppData()

  const project = getProjectById(id)

  const [editOpen, setEditOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteTaskTarget, setDeleteTaskTarget] = useState(null)
  const [success, setSuccess] = useState('')

  if (!project) {
    return (
      <div className="card">
        <EmptyState
          title="Project not found"
          message="The project you are looking for does not exist."
          action={<Link to="/projects" className="btn btn-primary">Back to Projects</Link>}
        />
      </div>
    )
  }

  const projectTasks = tasksForProject(project.id)
  const completed = projectTasks.filter((t) => t.status === 'Completed').length
  const pct = projectTasks.length === 0 ? 0 : Math.round((completed / projectTasks.length) * 100)

  const handleEditSubmit = (data) => {
    updateProject(project.id, data)
    setEditOpen(false)
    setSuccess('Project updated successfully.')
  }

  const handleTaskSubmit = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data)
      setSuccess('Task updated successfully.')
    } else {
      addTask({ ...data, projectId: project.id })
      setSuccess('Task added successfully.')
    }
    setTaskModalOpen(false)
    setEditingTask(null)
  }

  const openEditTask = (task) => {
    setEditingTask(task)
    setTaskModalOpen(true)
  }

  const openAddTask = () => {
    setEditingTask(null)
    setTaskModalOpen(true)
  }

  const confirmDeleteTask = () => {
    deleteTask(deleteTaskTarget.id)
    setDeleteTaskTarget(null)
    setSuccess('Task deleted successfully.')
  }

  return (
    <div>
      <div className="page-head">
        <div className="page-head-left">
          <Link to="/projects" className="flex items-center gap-1 text-sm text-muted mb-2">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <h1>{project.name}</h1>
          <p>#{project.id} &middot; Created {project.createdAt}</p>
        </div>
        <div className="flex gap-1 flex-wrap">
          <button className="btn btn-secondary" onClick={() => setEditOpen(true)}>
            <Pencil size={16} /> Edit Project
          </button>
          <button className="btn btn-primary" onClick={openAddTask}>
            <Plus size={16} /> Add Task
          </button>
          <Link to="/ai-mentor" className="btn btn-secondary">
            <Sparkles size={16} /> Ask AI Mentor
          </Link>
          <Link to="/projects" className="btn btn-ghost">
            Return to Projects
          </Link>
        </div>
      </div>

      <SuccessMessage message={success} onDismiss={() => setSuccess('')} />

      {/* Project info */}
      <div className="card mb-2">
        <div className="card-body">
          <div className="grid-2">
            <div>
              <div className="text-sm text-muted mb-2">Description</div>
              <p style={{ color: 'var(--neutral-700)' }}>{project.description}</p>
              <div className="mt-3">
                <div className="text-sm text-muted mb-2">Technology Stack</div>
                {project.techStack.map((tech) => (
                  <span className="tech-tag" key={tech}>{tech}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted mb-2">Progress</div>
              <ProgressBar value={pct} label="Overall completion" />
              <div className="flex gap-2 mt-3">
                <div>
                  <div className="text-sm text-muted">Total tasks</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{projectTasks.length}</div>
                </div>
                <div>
                  <div className="text-sm text-muted">Completed</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success-600)' }}>{completed}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks for this project */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Tasks</h2>
          <button className="btn btn-primary btn-sm" onClick={openAddTask}>
            <Plus size={14} /> Add Task
          </button>
        </div>
        <div className="card-body">
          {projectTasks.length === 0 ? (
            <EmptyState
              title="No tasks yet"
              message="Add tasks to this project to start tracking progress."
              action={<button className="btn btn-primary" onClick={openAddTask}><Plus size={16} /> Add Task</button>}
            />
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>AI</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectTasks.map((t) => (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 500 }}>{t.title}</td>
                      <td><PriorityBadge value={t.priority} /></td>
                      <td>
                        <select
                          className="form-control"
                          style={{ width: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                          value={t.status}
                          onChange={(e) => updateTaskStatus(t.id, e.target.value)}
                          aria-label={`Change status for ${t.title}`}
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </td>
                      <td><AIGeneratedBadge value={t.aiGenerated} /></td>
                      <td className="text-muted">{t.updatedAt}</td>
                      <td>
                        <div className="flex gap-1">
                          <button className="icon-btn" onClick={() => openEditTask(t)} aria-label={`Edit ${t.title}`}>
                            <Pencil size={15} />
                          </button>
                          <button className="icon-btn" onClick={() => setDeleteTaskTarget(t)} aria-label={`Delete ${t.title}`}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit project modal */}
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Project"
      >
        <ProjectForm
          initial={project}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>

      {/* Add / edit task modal */}
      <Modal
        open={taskModalOpen}
        onClose={() => { setTaskModalOpen(false); setEditingTask(null) }}
        title={editingTask ? 'Edit Task' : 'Add Task'}
        size="lg"
      >
        <TaskForm
          initial={editingTask}
          fixedProjectId={project.id}
          projects={[project]}
          onSubmit={handleTaskSubmit}
          onCancel={() => { setTaskModalOpen(false); setEditingTask(null) }}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTaskTarget}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTaskTarget?.title}"?`}
        confirmLabel="Delete"
        onConfirm={confirmDeleteTask}
        onCancel={() => setDeleteTaskTarget(null)}
      />
    </div>
  )
}
