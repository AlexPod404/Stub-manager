import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScenarioExecution, ExecutionStatus } from '../../scenarios/entities/scenario-execution.entity';
import { Scenario } from '../../scenarios/entities/scenario.entity';
import { MocksService } from '../../mocks/services/mocks.service';

@Injectable()
export class ScenarioExecutorService {
  constructor(
    @InjectRepository(ScenarioExecution)
    private readonly executionRepository: Repository<ScenarioExecution>,
    @InjectRepository(Scenario)
    private readonly scenarioRepository: Repository<Scenario>,
    private readonly mocksService: MocksService,
  ) {}

  async executeScenario(executionId: string): Promise<void> {
    const execution = await this.executionRepository.findOne({
      where: { id: executionId },
      relations: ['scenario', 'scenario.actions'],
    });

    if (!execution) {
      throw new Error(`Execution ${executionId} not found`);
    }

    execution.status = ExecutionStatus.RUNNING;
    execution.startedAt = new Date();
    await this.executionRepository.save(execution);

    try {
      const actions = execution.scenario.actions.sort((a, b) => a.order - b.order);
      const results = [];

      for (const action of actions) {
        // Wait for timeOffset
        if (action.timeOffsetMs > 0) {
          await this.sleep(action.timeOffsetMs);
        }

        // Execute action
        const result = await this.executeAction(action);
        results.push({
          actionId: action.id,
          type: action.actionType,
          timestamp: new Date(),
          result,
        });
      }

      execution.status = ExecutionStatus.COMPLETED;
      execution.completedAt = new Date();
      execution.results = results;
    } catch (error) {
      execution.status = ExecutionStatus.FAILED;
      execution.completedAt = new Date();
      execution.results = { error: error.message };
    }

    await this.executionRepository.save(execution);
  }

  private async executeAction(action: any): Promise<any> {
    switch (action.actionType) {
      case 'start':
        await this.mocksService.start(action.targetMockId);
        return { success: true, message: 'Mock started' };
      
      case 'stop':
        await this.mocksService.stop(action.targetMockId);
        return { success: true, message: 'Mock stopped' };
      
      case 'set_delay':
        await this.mocksService.setDelay(action.targetMockId, action.params?.delayMs || 0);
        return { success: true, message: 'Delay set' };
      
      default:
        throw new Error(`Unknown action type: ${action.actionType}`);
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
