// Reusable badge for task priority and status.
const PRIORITY_CLASS = {
  High: 'badge-high',
  Medium: 'badge-medium',
  Low: 'badge-low',
}

const STATUS_CLASS = {
  Pending: 'badge-pending',
  'In Progress': 'badge-progress',
  Completed: 'badge-completed',
}

export function PriorityBadge({ value }) {
  return (
    <span className={`badge ${PRIORITY_CLASS[value] || 'badge-pending'}`}>
      {value}
    </span>
  )
}

export function StatusBadge({ value }) {
  return (
    <span className={`badge ${STATUS_CLASS[value] || 'badge-pending'}`}>
      {value}
    </span>
  )
}

export function AIGeneratedBadge({ value }) {
  if (!value) return <span className="text-muted text-sm">No</span>
  return <span className="badge badge-ai">AI</span>
}
