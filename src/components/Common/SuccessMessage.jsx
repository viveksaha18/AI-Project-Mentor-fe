import { CheckCircle } from 'lucide-react'

// Reusable inline success message that auto-dismisses.
import { useEffect } from 'react'

export default function SuccessMessage({ message, onDismiss, duration = 3000 }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => onDismiss?.(), duration)
    return () => clearTimeout(t)
  }, [message, onDismiss, duration])

  if (!message) return null
  return (
    <div className="msg msg-success" role="status">
      <CheckCircle size={18} />
      <p className="flex-1">{message}</p>
    </div>
  )
}
