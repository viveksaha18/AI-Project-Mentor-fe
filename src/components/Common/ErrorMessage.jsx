import { AlertCircle } from 'lucide-react'

// Reusable inline error message.
export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null
  return (
    <div className="msg msg-error" role="alert">
      <AlertCircle size={18} />
      <div className="flex-1">
        <p>{message}</p>
        {onRetry && (
          <button className="btn btn-ghost btn-sm mt-2" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
