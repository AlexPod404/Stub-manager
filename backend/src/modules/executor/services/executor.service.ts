import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ExecutorService {
  constructor(
    @InjectQueue('scenario-execution')
    private readonly executionQueue: Queue,
  ) {}

  async executeScenario(scenarioId: string): Promise<void> {
    await this.executionQueue.add('execute', {
      scenarioId,
      startTime: Date.now(),
    });
  }

  async stopExecution(jobId: string): Promise<void> {
    const job = await this.executionQueue.getJob(jobId);
    if (job) {
      await job.remove();
    }
  }

  async getExecutionStatus(jobId: string): Promise<any> {
    const job = await this.executionQueue.getJob(jobId);
    if (!job) {
      return null;
    }
    return {
      id: job.id,
      progress: await job.progress(),
      state: await job.getState(),
      data: job.data,
    };
  }
}
