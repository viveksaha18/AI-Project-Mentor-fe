import { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, Search, ListTodo } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'
import { PriorityBadge, StatusBadge, AIGeneratedBadge } from '../components/Common/Badge'
import TaskForm from '../components/Tasks/TaskForm'

export default function TasksPage() {
  const { tasks, projects, addTask, updateTask, updateTaskStatus, deleteTask } = useAppData()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [success, setSuccess] = useState('')

  // Filters
  const [search, setSearch] = useState('')
  const [projectFilter, setProjectFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const projectName = (id) => projects.find((p) => p.id === id)?.name || 'Unknown'

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
      if (projectFilter && t.projectId !== Number(projectFilter)) return false
      if (priorityFilter && t.priority !== priorityFilter) return false
      if (statusFilter && t.status !== statusFilter) return false
      return true
    })
  }, [tasks, search, projectFilter, priorityFilter, statusFilter])

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (task) => {
    setEditing(task)
    setModalOpen(true)
  }

  const handleSubmit = (data) => {
    if (editing) {
      updateTask(editing.id, data)
      setSuccess('Task updated successfully.')
    } else {
      addTask(data)
      setSuccess('Task created successfully.')
    }
    setModalOpen(false)
    setEditing(null)
  }

  const confirmDelete = () => {
    deleteTask(deleteTarget.id)
    setDeleteTarget(null)
    setSuccess('Task deleted successfully.')
  }

  const clearFilters = () => {
    setSearch('')
    setProjectFilter('')
    setPriorityFilter('')
    setStatusFilter('')
  }

  return (
    <div>
      <div className="page-head">
        <div className="page-head-left">
          <h1>Tasks</h1>
          <p>Track and manage all development tasks across your projects.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Add Task
        </button>
      </div>

      <SuccessMessage message={success} onDismiss={() => setSuccess('')} />

      {/* Filters */}
      <div className="filters-bar">
        <div className="header-search" style={{ maxWidth: '260px', position: 'relative' }}>
          <Search size={16} className="header-search-icon" />
          <input
            type="search"
            placeholder="Search task titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search tasks"
          />
        </div>
        <select
          className="form-control"
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          aria-label="Filter by project"
        >
          <option value="">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select
          className="form-control"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          aria-label="Filter by priority"
        >
          <option value="">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          className="form-control"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
          Clear
        </button>
      </div>

      {/* Tasks table */}
      <div className="card">
        <div className="card-body">
          {filteredTasks.length === 0 ? (
            <EmptyState
              title="No tasks found"
              message="Try adjusting your filters or add a new task."
              icon={ListTodo}
              action={<button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Add Task</button>}
            />
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>AI</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((t) => (
                    <tr key={t.id}>
                      <td className="text-muted">#{t.id}</td>
                      <td style={{ fontWeight: 500 }}>{t.title}</td>
                      <td>{projectName(t.projectId)}</td>
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
                      <td className="text-muted">{t.createdAt}</td>
                      <td className="text-muted">{t.updatedAt}</td>
                      <td>
                        <div className="flex gap-1">
                          <button className="icon-btn" onClick={() => openEdit(t)} aria-label={`Edit ${t.title}`}>
                            <Pencil size={15} />
                          </button>
                          <button className="icon-btn" onClick={() => setDeleteTarget(t)} aria-label={`Delete ${t.title}`}>
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

      {/* Add / Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        title={editing ? 'Edit Task' : 'Add Task'}
        size="lg"
      >
        <TaskForm
          initial={editing}
          projects={projects}
          onSubmit={handleSubmit}
          onCancel={() => { setModalOpen(false); setEditing(null) }}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
