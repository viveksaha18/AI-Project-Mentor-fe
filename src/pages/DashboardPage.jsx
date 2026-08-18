import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FolderKanban,
  ListTodo,
  Clock,
  Loader,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import ProgressBar from '../components/Common/ProgressBar'
import { PriorityBadge, StatusBadge } from '../components/Common/Badge'

// Helper to compute completed percentage for a project.
function completionPct(tasks, projectId) {
  const projectTasks = tasks.filter((t) => t.projectId === projectId)
  if (projectTasks.length === 0) return 0
  const done = projectTasks.filter((t) => t.status === 'Completed').length
  return Math.round((done / projectTasks.length) * 100)
}

export default function DashboardPage() {
  const { projects, tasks } = useAppData()

  const stats = useMemo(() => {
    const pending = tasks.filter((t) => t.status === 'Pending').length
    const inProgress = tasks.filter((t) => t.status === 'In Progress').length
    const completed = tasks.filter((t) => t.status === 'Completed').length
    return {
      projects: projects.length,
      tasks: tasks.length,
      pending,
      inProgress,
      completed,
    }
  }, [projects, tasks])

  const recentTasks = useMemo(
    () =>
      [...tasks]
        .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
        .slice(0, 5),
    [tasks],
  )

  // Mock AI recommendation for the dashboard section.
  const recommendation = useMemo(() => {
    if (projects.length === 0) return null
    const project = projects[0]
    const nextTask = tasks.find(
      (t) => t.projectId === project.id && t.status !== 'Completed',
    )
    return {
      projectName: project.name,
      task: nextTask ? nextTask.title : 'Review project scope',
      reason: nextTask
        ? 'This task is the next pending item and unblocks other work.'
        : 'No pending tasks; consider reviewing the project scope.',
    }
  }, [projects, tasks])

  const projectName = (id) =>
    projects.find((p) => p.id === id)?.name || 'Unknown'

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FolderKanban, color: 'blue' },
    { label: 'Total Tasks', value: stats.tasks, icon: ListTodo, color: 'indigo' },
    { label: 'Pending Tasks', value: stats.pending, icon: Clock, color: 'amber' },
    { label: 'In Progress', value: stats.inProgress, icon: Loader, color: 'cyan' },
    { label: 'Completed Tasks', value: stats.completed, icon: CheckCircle2, color: 'green' },
  ]

  return (
    <div>
      <div className="page-head">
        <div className="page-head-left">
          <h1>Dashboard</h1>
          <p>Overview of your projects, tasks and AI recommendations.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="stat-grid">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div className="stat-card" key={label}>
            <div className="stat-card-top">
              <div>
                <div className="stat-label">{label}</div>
                <div className="stat-value">{value}</div>
              </div>
              <div className={`stat-icon ${color}`}>
                <Icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Project progress */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Project Progress</h2>
            <Link to="/projects" className="btn btn-ghost btn-sm">
              View all
            </Link>
          </div>
          <div className="card-body">
            {projects.length === 0 ? (
              <p className="text-muted text-sm">No projects yet.</p>
            ) : (
              <div className="flex" style={{ flexDirection: 'column', gap: 'var(--space-2)' }}>
                {projects.map((p) => {
                  const pct = completionPct(tasks, p.id)
                  const count = tasks.filter((t) => t.projectId === p.id).length
                  return (
                    <div key={p.id}>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <Link
                            to={`/projects/${p.id}`}
                            style={{ fontWeight: 600, color: 'var(--neutral-900)' }}
                          >
                            {p.name}
                          </Link>
                          <div className="text-sm text-muted">
                            {p.techStack.join(', ')} &middot; {count} tasks
                          </div>
                        </div>
                      </div>
                      <ProgressBar value={pct} />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* AI recommended next task */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="flex items-center gap-1">
                <Sparkles size={18} style={{ color: 'var(--indigo-600)' }} />
                AI Recommended Next Task
              </span>
            </h2>
          </div>
          <div className="card-body">
            {recommendation ? (
              <div className="ai-response-card">
                <div className="text-sm text-muted">Project</div>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                  {recommendation.projectName}
                </div>
                <div className="text-sm text-muted">Recommended task</div>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                  {recommendation.task}
                </div>
                <div className="text-sm text-muted">Reason</div>
                <p className="text-sm" style={{ marginBottom: '0.75rem' }}>
                  {recommendation.reason}
                </p>
                <Link to="/ai-mentor" className="btn btn-primary btn-sm">
                  View Recommendation <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <p className="text-muted text-sm">No projects available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent tasks */}
      <div className="card mt-3">
        <div className="card-header">
          <h2 className="card-title">Recent Tasks</h2>
          <Link to="/tasks" className="btn btn-ghost btn-sm">
            View all
          </Link>
        </div>
        <div className="card-body">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 500 }}>{t.title}</td>
                    <td>{projectName(t.projectId)}</td>
                    <td><PriorityBadge value={t.priority} /></td>
                    <td><StatusBadge value={t.status} /></td>
                    <td className="text-muted">{t.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
