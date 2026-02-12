import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scenario, ScenarioStatus } from '../entities/scenario.entity';
import { ScenarioAction } from '../entities/scenario-action.entity';
import { TestResult } from '../entities/test-result.entity';
import { CreateScenarioDto } from '../dto/create-scenario.dto';
import { UpdateScenarioDto } from '../dto/update-scenario.dto';
import { CreateActionDto } from '../dto/create-action.dto';

@Injectable()
export class ScenariosService {
  constructor(
    @InjectRepository(Scenario)
    private readonly scenarioRepository: Repository<Scenario>,
    @InjectRepository(ScenarioAction)
    private readonly actionRepository: Repository<ScenarioAction>,
    @InjectRepository(TestResult)
    private readonly testResultRepository: Repository<TestResult>,
  ) {}

  async create(createScenarioDto: CreateScenarioDto): Promise<Scenario> {
    const scenario = this.scenarioRepository.create(createScenarioDto);
    return this.scenarioRepository.save(scenario);
  }

  async findAll(): Promise<Scenario[]> {
    return this.scenarioRepository.find({ relations: ['actions'] });
  }

  async findOne(id: string): Promise<Scenario> {
    const scenario = await this.scenarioRepository.findOne({
      where: { id },
      relations: ['actions'],
    });
    if (!scenario) {
      throw new NotFoundException(`Scenario with ID ${id} not found`);
    }
    return scenario;
  }

  async update(
    id: string,
    updateScenarioDto: UpdateScenarioDto,
  ): Promise<Scenario> {
    await this.findOne(id);
    await this.scenarioRepository.update(id, updateScenarioDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const scenario = await this.findOne(id);
    await this.scenarioRepository.remove(scenario);
  }

  async addAction(
    scenarioId: string,
    createActionDto: CreateActionDto,
  ): Promise<ScenarioAction> {
    await this.findOne(scenarioId);
    const action = this.actionRepository.create({
      ...createActionDto,
      scenarioId,
    });
    return this.actionRepository.save(action);
  }

  async execute(id: string): Promise<{ message: string; scenarioId: string }> {
    const scenario = await this.findOne(id);
    await this.scenarioRepository.update(id, {
      status: ScenarioStatus.RUNNING,
    });
    // TODO: Implement actual execution logic via ExecutorService
    return {
      message: 'Scenario execution started',
      scenarioId: scenario.id,
    };
  }

  async getResults(scenarioId: string): Promise<TestResult[]> {
    return this.testResultRepository.find({
      where: { scenarioId },
      order: { executedAt: 'DESC' },
    });
  }
}
