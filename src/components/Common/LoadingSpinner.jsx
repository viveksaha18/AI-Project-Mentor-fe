// Reusable loading spinner with optional message.
export default function LoadingSpinner({ message = 'Loading...', size = 'md', inline = false }) {
  const spinner = (
    <div className={size === 'sm' ? 'spinner spinner-sm' : 'spinner'} aria-label="Loading" />
  )

  if (inline) {
    return (
      <span className="flex items-center gap-1">
        {spinner}
        <span className="text-sm text-muted">{message}</span>
      </span>
    )
  }

  return (
    <div className="loading-overlay">
      {spinner}
      <p>{message}</p>
    </div>
  )
}
