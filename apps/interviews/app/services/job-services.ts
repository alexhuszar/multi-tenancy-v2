import { Job, JobStatus } from '../types';

class JobServices {
  private queue: Job[] = [];
  private runningJobs = new Set<string>();
  private maxConcurrency: number;

  constructor(maxConcurrency = 3) {
    this.maxConcurrency = maxConcurrency;
    this.startProcessor();
  }

  async add(job: Job): Promise<void> {
    // Implementation needed
  }

  private async startProcessor(): Promise<void> {
    // Implementation needed
  }

  async getStatus(id: string): Promise<JobStatus> {
    // Implementation needed

    return 'completed';
  }
}
