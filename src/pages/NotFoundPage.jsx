import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="empty-state">
          <div className="empty-state-icon">
            <Compass size={28} />
          </div>
          <p className="empty-state-title">Page Not Found</p>
          <p className="empty-state-text">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary mt-3">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
