import { useMemo, useState } from 'react'
import { History, Trash2, Eye } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'

const TASK_TYPES = [
  'Generate Project Plan',
  'Break Requirement into Tasks',
  'Recommend Next Task',
  'Identify Project Blockers',
  'Explain Implementation',
  'Generate Testing Checklist',
]

export default function AIHistoryPage() {
  const { aiHistory, projects, deleteAIHistory } = useAppData()

  const [viewTarget, setViewTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [success, setSuccess] = useState('')

  // Filters
  const [projectFilter, setProjectFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  const projectName = (id) => projects.find((p) => p.id === id)?.name || 'Unknown'

  const filtered = useMemo(() => {
    return aiHistory.filter((h) => {
      if (projectFilter && h.projectId !== Number(projectFilter)) return false
      if (typeFilter && h.taskType !== typeFilter) return false
      if (dateFilter && h.createdAt !== dateFilter) return false
      return true
    })
  }, [aiHistory, projectFilter, typeFilter, dateFilter])

  const confirmDelete = () => {
    deleteAIHistory(deleteTarget.id)
    setDeleteTarget(null)
    setSuccess('History entry deleted successfully.')
  }

  const clearFilters = () => {
    setProjectFilter('')
    setTypeFilter('')
    setDateFilter('')
  }

  // Render the AI response stored as JSON string.
  const renderResponse = (entry) => {
    try {
      const parsed = JSON.parse(entry.aiResponse)
      return (
        <div>
          <p className="mb-2"><strong>Requirement Understanding:</strong> {parsed.requirementUnderstanding}</p>
          <p className="mb-2"><strong>Frontend Tasks:</strong> {parsed.frontendTasks.join(', ')}</p>
          <p className="mb-2"><strong>Backend Tasks:</strong> {parsed.backendTasks.join(', ')}</p>
          <p className="mb-2"><strong>Database Tasks:</strong> {parsed.databaseTasks.join(', ')}</p>
          <p className="mb-2"><strong>Testing Steps:</strong> {parsed.testingSteps.join(', ')}</p>
          <p className="mb-2"><strong>Possible Blockers:</strong> {parsed.possibleBlockers.join(', ')}</p>
          <p><strong>Recommended Next Action:</strong> {parsed.recommendedNextAction}</p>
        </div>
      )
    } catch {
      return <p>{entry.aiResponse}</p>
    }
  }

  return (
    <div>
      <div className="page-head">
        <div className="page-head-left">
          <h1>AI History</h1>
          <p>Review previous AI mentor interactions and recommendations.</p>
        </div>
      </div>

      <SuccessMessage message={success} onDismiss={() => setSuccess('')} />

      {/* Filters */}
      <div className="filters-bar">
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
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          aria-label="Filter by AI task type"
        >
          <option value="">All Task Types</option>
          {TASK_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <input
          type="date"
          className="form-control"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          aria-label="Filter by date"
        />
        <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          {filtered.length === 0 ? (
            <EmptyState
              title="No AI interactions found"
              message="Ask the AI mentor for a recommendation and it will appear here."
              icon={History}
            />
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Project</th>
                    <th>Task Type</th>
                    <th>User Prompt</th>
                    <th>AI Response Preview</th>
                    <th>Model</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((h) => (
                    <tr key={h.id}>
                      <td className="text-muted">#{h.id}</td>
                      <td>{projectName(h.projectId)}</td>
                      <td><span className="badge badge-ai">{h.taskType}</span></td>
                      <td style={{ maxWidth: '200px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {h.userPrompt}
                        </div>
                      </td>
                      <td style={{ maxWidth: '240px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--neutral-500)' }}>
                          {h.aiResponse.slice(0, 80)}...
                        </div>
                      </td>
                      <td className="text-muted">{h.modelName}</td>
                      <td className="text-muted">{h.createdAt}</td>
                      <td>
                        <div className="flex gap-1">
                          <button className="icon-btn" onClick={() => setViewTarget(h)} aria-label="View full response">
                            <Eye size={15} />
                          </button>
                          <button className="icon-btn" onClick={() => setDeleteTarget(h)} aria-label="Delete history entry">
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

      {/* View full response */}
      <Modal
        open={!!viewTarget}
        onClose={() => setViewTarget(null)}
        title="AI Interaction"
        size="lg"
      >
        {viewTarget && (
          <div>
            <div className="mb-2">
              <span className="text-sm text-muted">Project</span>
              <p style={{ fontWeight: 600 }}>{projectName(viewTarget.projectId)}</p>
            </div>
            <div className="mb-2">
              <span className="text-sm text-muted">Task Type</span>
              <p><span className="badge badge-ai">{viewTarget.taskType}</span></p>
            </div>
            <div className="mb-2">
              <span className="text-sm text-muted">User Prompt</span>
              <p>{viewTarget.userPrompt}</p>
            </div>
            <div className="mb-2">
              <span className="text-sm text-muted">Model</span>
              <p>{viewTarget.modelName}</p>
            </div>
            <div className="mb-2">
              <span className="text-sm text-muted">Created</span>
              <p>{viewTarget.createdAt}</p>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--neutral-200)', margin: 'var(--space-2) 0' }} />
            <span className="text-sm text-muted">AI Response</span>
            <div className="mt-2">{renderResponse(viewTarget)}</div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete History Entry"
        message="Are you sure you want to delete this AI interaction from history?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
