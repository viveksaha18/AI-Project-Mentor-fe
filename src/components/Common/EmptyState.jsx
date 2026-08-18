import { Inbox } from 'lucide-react'

// Reusable empty state shown when a list or table has no data.
export default function EmptyState({ title = 'Nothing here yet', message, icon: Icon = Inbox, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={28} />
      </div>
      <p className="empty-state-title">{title}</p>
      {message && <p className="empty-state-text">{message}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
