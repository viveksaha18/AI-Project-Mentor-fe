import { useState } from 'react'

// Reusable form for creating and editing a project.
// Used inside a modal on the Projects page.
export default function ProjectForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    description: initial?.description || '',
    techStack: initial?.techStack?.join(', ') || '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Project name is required.'
    if (!form.description.trim()) next.description = 'Description is required.'
    if (!form.techStack.trim()) next.techStack = 'Technology stack is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
    })
  }

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="project-name">Project Name</label>
        <input
          id="project-name"
          className={`form-control ${errors.name ? 'invalid' : ''}`}
          value={form.name}
          onChange={update('name')}
          placeholder="e.g. Student Placement Portal"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="project-desc">Project Description</label>
        <textarea
          id="project-desc"
          className={`form-control ${errors.description ? 'invalid' : ''}`}
          value={form.description}
          onChange={update('description')}
          placeholder="Describe the project goal and main features"
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="project-tech">Technology Stack</label>
        <input
          id="project-tech"
          className={`form-control ${errors.techStack ? 'invalid' : ''}`}
          value={form.techStack}
          onChange={update('techStack')}
          placeholder="Comma-separated, e.g. React, FastAPI, SQL Server"
        />
        {errors.techStack && <span className="form-error">{errors.techStack}</span>}
        <span className="text-sm text-muted mt-2" style={{ display: 'block' }}>
          Separate each technology with a comma.
        </span>
      </div>

      <div className="flex gap-1" style={{ justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Project
        </button>
      </div>
    </form>
  )
}
