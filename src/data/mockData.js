// Centralised mock data for the AI Project Mentor frontend.
// Later this can be replaced with real API calls from src/services/api.js.

export const mockProjects = [
  {
    id: 1,
    name: 'Student Placement Portal',
    description:
      'A portal for students to track placements, upload resumes and view interview schedules.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'Ollama'],
    createdAt: '2026-07-04',
  },
  {
    id: 2,
    name: 'Hospital Appointment System',
    description:
      'Booking system for patients to schedule appointments with available doctors.',
    techStack: ['React', 'FastAPI', 'SQL Server'],
    createdAt: '2026-07-21',
  },
  {
    id: 3,
    name: 'AI Resume Mentor',
    description:
      'An AI-powered resume review tool that gives feedback and improvement suggestions.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'GPT-OSS'],
    createdAt: '2026-08-02',
  },
]

export const mockTasks = [
  {
    id: 1,
    title: 'Design login and signup screens',
    description: 'Create responsive auth pages with form validation.',
    projectId: 1,
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-10',
  },
  {
    id: 2,
    title: 'Build FastAPI auth endpoints',
    description: 'Implement /register, /login and /me endpoints with JWT.',
    projectId: 1,
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-06',
    updatedAt: '2026-08-12',
  },
  {
    id: 3,
    title: 'Create SQL Server schema for students',
    description: 'Tables for students, companies, applications and interviews.',
    projectId: 1,
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-08',
    updatedAt: '2026-07-08',
  },
  {
    id: 4,
    title: 'Integrate Ollama for resume screening',
    description: 'Send resume text to GPT-OSS and parse suitability score.',
    projectId: 1,
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-07-12',
    updatedAt: '2026-07-12',
  },
  {
    id: 5,
    title: 'Doctor availability calendar',
    description: 'Frontend calendar showing available slots per doctor.',
    projectId: 2,
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-22',
    updatedAt: '2026-08-14',
  },
  {
    id: 6,
    title: 'Appointment booking API',
    description: 'POST /api/appointments and conflict validation.',
    projectId: 2,
    priority: 'High',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-24',
    updatedAt: '2026-07-24',
  },
  {
    id: 7,
    title: 'Patient registration page',
    description: 'Form with validation and success confirmation message.',
    projectId: 2,
    priority: 'Low',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-25',
    updatedAt: '2026-08-01',
  },
  {
    id: 8,
    title: 'Resume upload and parsing',
    description: 'Accept PDF upload and extract text for AI review.',
    projectId: 3,
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-08-03',
    updatedAt: '2026-08-15',
  },
  {
    id: 9,
    title: 'AI feedback display component',
    description: 'Show structured feedback returned from GPT-OSS model.',
    projectId: 3,
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-08-05',
    updatedAt: '2026-08-05',
  },
  {
    id: 10,
    title: 'User dashboard with resume history',
    description: 'List previous resume reviews and allow re-opening.',
    projectId: 3,
    priority: 'Low',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-08-06',
    updatedAt: '2026-08-06',
  },
]

export const mockAIHistory = [
  {
    id: 1,
    projectId: 1,
    taskType: 'Break Requirement into Tasks',
    userPrompt:
      'I want students to apply to companies and track their application status.',
    aiResponse:
      'Requirement Understanding: Students need a way to apply to companies and monitor each application. Frontend Tasks: Build application list page, application detail modal. Backend Tasks: Create /api/applications endpoints. Database Tasks: Applications table with status column. Testing Steps: Verify status transitions. Possible Blockers: Status workflow complexity. Recommended Next Action: Start with the Applications table.',
    modelName: 'gpt-oss:20b',
    createdAt: '2026-07-15',
  },
  {
    id: 2,
    projectId: 2,
    taskType: 'Identify Project Blockers',
    userPrompt:
      'What could block the hospital appointment system from launching on time?',
    aiResponse:
      'Requirement Understanding: Identify risks for the appointment system. Frontend Tasks: Calendar component needs timezone handling. Backend Tasks: Concurrency on double-booked slots. Database Tasks: Index on appointment time. Testing Steps: Load test concurrent bookings. Possible Blockers: Doctor schedule changes. Recommended Next Action: Add slot locking mechanism.',
    modelName: 'gpt-oss:20b',
    createdAt: '2026-07-28',
  },
  {
    id: 3,
    projectId: 3,
    taskType: 'Generate Testing Checklist',
    userPrompt: 'Give me a testing checklist for the resume upload feature.',
    aiResponse:
      'Requirement Understanding: Ensure resume upload works reliably. Frontend Tasks: Test drag-and-drop, file size validation. Backend Tasks: Test PDF parsing, malformed files. Database Tasks: Verify resume storage. Testing Steps: Upload valid PDF, upload empty file, upload large file. Possible Blockers: Large file timeouts. Recommended Next Action: Add file size limit.',
    modelName: 'gpt-oss:20b',
    createdAt: '2026-08-08',
  },
  {
    id: 4,
    projectId: 1,
    taskType: 'Recommend Next Task',
    userPrompt: 'What should I work on next for the placement portal?',
    aiResponse:
      'Requirement Understanding: Decide the next high-impact task. Frontend Tasks: Application tracking page is pending. Backend Tasks: Auth endpoints are in progress. Database Tasks: Students schema is pending. Testing Steps: Cover auth flow first. Possible Blockers: Schema changes may block endpoints. Recommended Next Action: Complete the SQL Server schema for students.',
    modelName: 'gpt-oss:20b',
    createdAt: '2026-08-16',
  },
]

// Mock AI response generator used by the AI Mentor page.
export function generateMockAIResponse(projectName, requirement, taskType) {
  return {
    requirementUnderstanding: `For the project "${projectName}", the requirement "${requirement}" is understood as a core feature that needs structured planning using the ${taskType} approach.`,
    frontendTasks: [
      'Create a responsive page for this feature',
      'Add form validation and error messages',
      'Connect the page to the backend API',
    ],
    backendTasks: [
      'Create a FastAPI router for this feature',
      'Add request validation and error handling',
      'Store and retrieve data from SQL Server',
    ],
    databaseTasks: [
      'Design the required table with proper columns',
      'Add indexes for frequently queried fields',
      'Create relationships to existing tables',
    ],
    testingSteps: [
      'Write unit tests for the API endpoint',
      'Test the form with valid and invalid input',
      'Verify the database stores data correctly',
    ],
    possibleBlockers: [
      'Unclear business rules may need clarification',
      'Database schema changes may affect other features',
      'AI model response time may vary',
    ],
    recommendedNextAction:
      'Start by creating the database table, then build the backend endpoint, and finally connect the frontend page.',
  }
}
