import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'

// Reusable confirmation dialog for destructive actions like delete.
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = true,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="md"
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={danger ? 'btn btn-danger' : 'btn btn-primary'} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-1">
        {danger && (
          <div
            className="stat-icon"
            style={{ background: 'var(--error-50)', color: 'var(--error-600)', flexShrink: 0 }}
          >
            <AlertTriangle size={20} />
          </div>
        )}
        <p className="text-sm" style={{ color: 'var(--neutral-700)' }}>
          {message}
        </p>
      </div>
    </Modal>
  )
}
