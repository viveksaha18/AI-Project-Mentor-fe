import { Menu, Search, Bell, User } from 'lucide-react'

// Top header with page title, search, notifications and profile placeholder.
export default function Header({ title, onMenuClick }) {
  return (
    <header className="header">
      <button
        className="icon-btn mobile-menu-btn"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu size={22} />
      </button>

      <h1 className="header-title">{title}</h1>

      <div className="header-search">
        <Search size={16} className="header-search-icon" />
        <input type="search" placeholder="Search..." aria-label="Search" />
      </div>

      <div className="header-actions">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="badge-dot" />
        </button>
        <div className="profile-chip" title="Profile placeholder">
          <div className="profile-avatar">
            <User size={18} />
          </div>
          <span className="profile-name">Student</span>
        </div>
      </div>
    </header>
  )
}
