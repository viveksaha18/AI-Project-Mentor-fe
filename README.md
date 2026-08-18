# AI Project Mentor

A beginner-friendly full-stack training application where users can create software projects, manage development tasks, view project progress, and ask an AI mentor to break requirements into development tasks.

## Application objective

AI Project Mentor helps students learn full-stack development by organising projects and tasks, and by using an AI mentor to generate structured development plans. The frontend is fully functional with mock data and is prepared for a future Python + FastAPI backend.

## Technology stack

**Frontend (current)**
- HTML5, CSS3, JavaScript ES6+
- React.js (functional components and hooks)
- Vite (build tool)
- React Router DOM (navigation)
- Axios (prepared for future API calls)
- lucide-react (icons)

**Planned backend (future)**
- Python
- FastAPI REST APIs
- SQL Server database
- Ollama Cloud API (GPT-OSS model)

## Current frontend features

- Dashboard with summary cards, project progress bars, recent tasks and AI recommendation
- Projects page with create, edit, delete and view actions
- Project Details page with task list and inline status changes
- Tasks page with filters (project, priority, status), search, create, edit, delete and status changes
- AI Mentor page with structured mock AI response and "Create Tasks from Recommendation"
- AI History page with filters and full response viewer
- Responsive sidebar (desktop) and collapsible mobile navigation
- Reusable UI components: loading spinner, error/success messages, empty state, modal, confirmation dialog, badges, progress bar
- Form validation with inline error messages
- Confirmation dialogs before deletes

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Folder structure

```
src/
  components/
    Layout/        App layout, sidebar, header
    Common/        Reusable UI (spinner, messages, modal, badge, etc.)
    Projects/      Project form
    Tasks/         Task form
  context/         AppDataContext (local-state CRUD)
  data/            mockData.js (projects, tasks, AI history)
  pages/            Dashboard, Projects, Project Details, Tasks, AI Mentor, AI History, Not Found
  services/         api.js (Axios service for future backend)
  styles/           global.css
  App.jsx           Routes
  main.jsx          Entry point
```

## Environment variables

Copy `.env.example` to `.env` and adjust if needed:

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the future FastAPI backend | `http://127.0.0.1:8000` |
| `VITE_USE_MOCK_DATA` | Whether to use mock data (`true` for now) | `true` |

The Ollama API key, database credentials and SQL Server connection string belong only in the future Python backend and are never placed in the frontend.

## Future FastAPI integration plan

The frontend is prepared to call these endpoints once the backend is ready:

- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/projects` / `POST /api/projects`
- `GET /api/projects/{id}` / `PUT /api/projects/{id}` / `DELETE /api/projects/{id}`
- `GET /api/tasks` / `POST /api/tasks`
- `GET /api/tasks/{id}` / `PUT /api/tasks/{id}`
- `PATCH /api/tasks/{id}/status` / `DELETE /api/tasks/{id}`
- `POST /api/ai/plan` / `POST /api/ai/next-task`
- `GET /api/ai/history/{project_id}`

Reusable API functions already exist in `src/services/api.js`. To switch from mock data to the real backend, replace the local-state calls in `src/context/AppDataContext.jsx` with the matching API functions and set `VITE_USE_MOCK_DATA=false`.
