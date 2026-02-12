import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scenario } from '../entities/scenario.entity';
import { ScenarioAction } from '../entities/scenario-action.entity';
import { ScenarioExecution, ExecutionStatus } from '../entities/scenario-execution.entity';
import { CreateScenarioDto, UpdateScenarioDto } from '../dto/scenario.dto';

@Injectable()
export class ScenariosService {
  constructor(
    @InjectRepository(Scenario)
    private readonly scenarioRepository: Repository<Scenario>,
    @InjectRepository(ScenarioAction)
    private readonly actionRepository: Repository<ScenarioAction>,
    @InjectRepository(ScenarioExecution)
    private readonly executionRepository: Repository<ScenarioExecution>,
  ) {}

  async create(createScenarioDto: CreateScenarioDto): Promise<Scenario> {
    const { actions, ...scenarioData } = createScenarioDto;
    const scenario = this.scenarioRepository.create(scenarioData);
    const savedScenario = await this.scenarioRepository.save(scenario);

    if (actions && actions.length > 0) {
      const scenarioActions = actions.map((action) =>
        this.actionRepository.create({
          ...action,
          scenarioId: savedScenario.id,
        }),
      );
      await this.actionRepository.save(scenarioActions);
    }

    return await this.findOne(savedScenario.id);
  }

  async findAll(): Promise<Scenario[]> {
    return await this.scenarioRepository.find({
      relations: ['actions'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Scenario> {
    const scenario = await this.scenarioRepository.findOne({
      where: { id },
      relations: ['actions', 'executions'],
    });
    if (!scenario) {
      throw new NotFoundException(`Scenario with ID ${id} not found`);
    }
    return scenario;
  }

  async update(id: string, updateScenarioDto: UpdateScenarioDto): Promise<Scenario> {
    const scenario = await this.findOne(id);
    const { actions, ...scenarioData } = updateScenarioDto;

    Object.assign(scenario, scenarioData);
    await this.scenarioRepository.save(scenario);

    if (actions) {
      // Remove old actions
      await this.actionRepository.delete({ scenarioId: id });
      
      // Create new actions
      const scenarioActions = actions.map((action) =>
        this.actionRepository.create({
          ...action,
          scenarioId: id,
        }),
      );
      await this.actionRepository.save(scenarioActions);
    }

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const scenario = await this.findOne(id);
    await this.scenarioRepository.remove(scenario);
  }

  async createExecution(scenarioId: string): Promise<ScenarioExecution> {
    await this.findOne(scenarioId); // Validate scenario exists
    const execution = this.executionRepository.create({
      scenarioId,
      status: ExecutionStatus.PENDING,
    });
    return await this.executionRepository.save(execution);
  }

  async getExecutionResults(id: string): Promise<ScenarioExecution> {
    const execution = await this.executionRepository.findOne({
      where: { id },
      relations: ['scenario'],
    });
    if (!execution) {
      throw new NotFoundException(`Execution with ID ${id} not found`);
    }
    return execution;
  }
}
