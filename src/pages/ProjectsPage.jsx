import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Pencil, Trash2, FolderKanban } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'
import ProjectForm from '../components/Projects/ProjectForm'

// Helper to compute completed task count for a project.
function completedCount(tasks, projectId) {
  return tasks.filter((t) => t.projectId === projectId && t.status === 'Completed').length
}

function totalCount(tasks, projectId) {
  return tasks.filter((t) => t.projectId === projectId).length
}

export default function ProjectsPage() {
  const { projects, tasks, addProject, updateProject, deleteProject } = useAppData()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [success, setSuccess] = useState('')

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (project) => {
    setEditing(project)
    setModalOpen(true)
  }

  const handleSubmit = (data) => {
    if (editing) {
      updateProject(editing.id, data)
      setSuccess('Project updated successfully.')
    } else {
      addProject(data)
      setSuccess('Project created successfully.')
    }
    setModalOpen(false)
    setEditing(null)
  }

  const confirmDelete = () => {
    deleteProject(deleteTarget.id)
    setDeleteTarget(null)
    setSuccess('Project deleted successfully.')
  }

  return (
    <div>
      <div className="page-head">
        <div className="page-head-left">
          <h1>Projects</h1>
          <p>Manage your software training projects.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Create Project
        </button>
      </div>

      <SuccessMessage message={success} onDismiss={() => setSuccess('')} />

      {projects.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No projects yet"
            message="Create your first project to start adding tasks and AI recommendations."
            icon={FolderKanban}
            action={
              <button className="btn btn-primary" onClick={openCreate}>
                <Plus size={16} /> Create Project
              </button>
            }
          />
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((p) => {
            const total = totalCount(tasks, p.id)
            const done = completedCount(tasks, p.id)
            return (
              <div className="project-card" key={p.id}>
                <div className="project-card-head">
                  <div>
                    <div className="project-card-title">{p.name}</div>
                    <div className="text-sm text-muted">#{p.id} &middot; {p.createdAt}</div>
                  </div>
                </div>
                <p className="project-card-desc">{p.description}</p>
                <div>
                  {p.techStack.map((tech) => (
                    <span className="tech-tag" key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="text-sm text-muted">
                  {done} of {total} tasks completed
                </div>
                <div className="project-card-actions">
                  <Link to={`/projects/${p.id}`} className="btn btn-secondary btn-sm">
                    <Eye size={14} /> View
                  </Link>
                  <button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)}>
                    <Pencil size={14} /> Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(p)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create / Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        title={editing ? 'Edit Project' : 'Create Project'}
        size="md"
      >
        <ProjectForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => { setModalOpen(false); setEditing(null) }}
        />
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This will also remove all tasks belonging to this project.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
