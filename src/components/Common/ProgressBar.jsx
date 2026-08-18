// Reusable progress bar showing a percentage.
export default function ProgressBar({ value = 0, label }) {
  const pct = Math.min(100, Math.max(0, Math.round(value)))
  return (
    <div>
      {label != null && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted">{label}</span>
          <span className="text-sm" style={{ fontWeight: 600 }}>{pct}%</span>
        </div>
      )}
      <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
