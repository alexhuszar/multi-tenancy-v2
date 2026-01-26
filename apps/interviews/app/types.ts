export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Job {
  id: string;
  run: () => Promise<void>;
  createdAt: Date;
  status: JobStatus;
  retries: number;
  maxRetries: number;
  dependencies?: string[];
}

export interface TestRequirement {
  id: string;
  title: string;
  description: string;
  items: string[];
  codeHint?: string;
  uiHint?: string;
}

export interface Test {
  id: number;
  title: string;
  subtitle: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
  time: string;
  requirements: TestRequirement[];
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface Criteria {
  title: string;
  percentage: number;
  icon: string;
  items: string[];
  color: string;
}
