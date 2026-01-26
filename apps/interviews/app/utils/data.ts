import { Test, Criteria } from '../types';

export const tests: Test[] = [
  {
    id: 1,
    title: 'Test 1: Core Job Queue System',
    subtitle: 'Implement the foundational job processing system',
    color: 'blue',
    time: '30 mins',
    status: 'not-started',
    requirements: [
      {
        id: '1.1',
        title: '1.1 Complete JobServices Class',
        description: 'Implement core job queue functionality',
        items: [
          'Store jobs in memory',
          'Execute jobs in order (FIFO)',
          'Track job status: pending, running, completed, failed',
          'Return job results or errors',
        ],
        codeHint: `type Job = {
  id: string;
  run: () => Promise<void>;
  createdAt: Date;
};

class JobServices {
  async add(job: Job) {
    // TODO: Implement
  }
}`,
      },
      {
        id: '1.2',
        title: '1.2 Concurrency Control',
        description: 'Handle parallel job execution',
        items: [
          'Allow N jobs to run concurrently',
          'Handle job dependencies (job B waits for job A)',
        ],
      },
      {
        id: '1.3',
        title: '1.3 Job Retry Logic',
        description: 'Implement robust error handling',
        items: [
          'Retry failed jobs (configurable attempts)',
          'Exponential backoff for retries',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Test 2: Backend API Development',
    subtitle: 'Build RESTful API with persistence and security',
    color: 'green',
    time: '45 mins',
    status: 'not-started',
    requirements: [
      {
        id: '2.1',
        title: '2.1 Express/Koa API Endpoints',
        description: 'Create comprehensive REST API',
        items: [
          'POST /jobs - Add new job',
          'GET /jobs - List all jobs with status',
          'GET /jobs/:id - Get job details',
          'DELETE /jobs/:id - Cancel a job',
          'POST /jobs/bulk - Add multiple jobs',
        ],
      },
      {
        id: '2.2',
        title: '2.2 Persistence Layer',
        description: 'Implement database storage',
        items: [
          'Store jobs in MongoDB/PostgreSQL',
          'Implement proper database schema',
          'Add indexes for performance',
        ],
        codeHint: `// Job schema should include:
// - id, userId, status, createdAt, updatedAt
// - parameters, result, error, retryCount
// - priority, dependencies, scheduledFor`,
      },
      {
        id: '2.3',
        title: '2.3 Authentication & Authorization',
        description: 'Add security features',
        items: [
          'JWT-based auth',
          'Rate limiting per user',
          'User-specific job isolation',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Test 3: Frontend Dashboard',
    subtitle: 'Create React-based job management interface',
    color: 'purple',
    time: '45 mins',
    status: 'not-started',
    requirements: [
      {
        id: '3.1',
        title: '3.1 Job Management UI',
        description: 'Build comprehensive user interface',
        items: [
          'Form to create new jobs',
          'Real-time job status monitoring',
          'Job history with filters',
          'Cancel/retry controls',
        ],
      },
      {
        id: '3.2',
        title: '3.2 State Management',
        description: 'Implement data flow and updates',
        items: [
          'Use React Query or Redux for job data',
          'WebSocket for real-time updates',
          'Optimistic UI updates',
        ],
      },
      {
        id: '3.3',
        title: '3.3 Advanced Features',
        description: 'Add enhanced functionality',
        items: [
          'Drag-and-drop job reordering',
          'Job templates/saved configurations',
          'Performance metrics dashboard',
        ],
        uiHint:
          'Job List Table, Status Badges, Create Job Form, Filter Controls, Real-time Updates, Charts for Metrics',
      },
    ],
  },
  {
    id: 4,
    title: 'Test 4: Advanced System Features',
    subtitle: 'Extend system with scheduling, plugins, and testing',
    color: 'yellow',
    time: '60 mins',
    status: 'not-started',
    requirements: [
      {
        id: '4.1',
        title: '4.1 Job Scheduling',
        description: 'Implement scheduled job execution',
        items: [
          'Cron-like scheduling expressions',
          'One-time vs recurring jobs',
          'Timezone support',
        ],
      },
      {
        id: '4.2',
        title: '4.2 Plugin Ecosystem',
        description: 'Create extensible architecture',
        items: [
          'Custom job types/plugins',
          'Webhook integrations',
          'Result transformation pipelines',
        ],
      },
      {
        id: '4.3',
        title: '4.3 Testing Requirements',
        description: 'Implement comprehensive testing',
        items: [
          'Unit tests for JobServices',
          'Integration tests for API',
          'E2E tests for complete flow',
          'Load testing simulation',
        ],
        uiHint:
          'Unit tests with Jest, API tests with Supertest, E2E with Cypress/Playwright, Load testing with Artillery/k6',
      },
    ],
  },
];

export const evaluationCriteria: Criteria[] = [
  {
    title: 'Code Quality (25%)',
    percentage: 25,
    icon: 'FaStar',
    color: 'blue',
    items: [
      'TypeScript usage & type safety',
      'Error handling & edge cases',
      'Clean, readable code',
      'Proper abstraction',
    ],
  },
  {
    title: 'System Design (25%)',
    percentage: 25,
    icon: 'FaProjectDiagram',
    color: 'green',
    items: [
      'Scalability considerations',
      'Database design',
      'API design principles',
      'Architecture decisions',
    ],
  },
  {
    title: 'Problem Solving (25%)',
    percentage: 25,
    icon: 'FaLightbulb',
    color: 'purple',
    items: [
      'Algorithm efficiency',
      'Concurrency handling',
      'Debugging approach',
      'Solution creativity',
    ],
  },
  {
    title: 'Communication (25%)',
    percentage: 25,
    icon: 'FaComments',
    color: 'yellow',
    items: [
      'Explaining decisions',
      'Asking clarifying questions',
      'Collaborative approach',
      'Documentation clarity',
    ],
  },
];
