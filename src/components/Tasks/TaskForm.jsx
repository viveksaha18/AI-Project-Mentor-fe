import { useState } from 'react'

// Reusable form for creating and editing a task.
// `projects` is the list of available projects for the dropdown.
// `fixedProjectId` locks the project (used on the Project Details page).
export default function TaskForm({ initial, projects, fixedProjectId, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    projectId: initial?.projectId ?? fixedProjectId ?? projects[0]?.id ?? '',
    title: initial?.title || '',
    description: initial?.description || '',
    priority: initial?.priority || 'Medium',
    status: initial?.status || 'Pending',
    aiGenerated: initial?.aiGenerated ?? false,
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!form.projectId) next.projectId = 'Please select a project.'
    if (!form.title.trim()) next.title = 'Task title is required.'
    if (!form.description.trim()) next.description = 'Task description is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      projectId: Number(form.projectId),
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      status: form.status,
      aiGenerated: form.aiGenerated,
    })
  }

  const update = (field) => (e) => {
    const value = field === 'aiGenerated' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="task-project">Select Project</label>
          <select
            id="task-project"
            className={`form-control ${errors.projectId ? 'invalid' : ''}`}
            value={form.projectId}
            onChange={update('projectId')}
            disabled={!!fixedProjectId}
          >
            <option value="">Choose a project...</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {errors.projectId && <span className="form-error">{errors.projectId}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            className={`form-control ${errors.title ? 'invalid' : ''}`}
            value={form.title}
            onChange={update('title')}
            placeholder="e.g. Build login page"
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="task-desc">Task Description</label>
        <textarea
          id="task-desc"
          className={`form-control ${errors.description ? 'invalid' : ''}`}
          value={form.description}
          onChange={update('description')}
          placeholder="Describe what needs to be done"
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            className="form-control"
            value={form.priority}
            onChange={update('priority')}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-status">Status</label>
          <select
            id="task-status"
            className="form-control"
            value={form.status}
            onChange={update('status')}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={form.aiGenerated}
            onChange={update('aiGenerated')}
          />
          <span className="form-label" style={{ marginBottom: 0 }}>
            AI Generated task
          </span>
        </label>
      </div>

      <div className="flex gap-1" style={{ justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Task
        </button>
      </div>
    </form>
  )
}
