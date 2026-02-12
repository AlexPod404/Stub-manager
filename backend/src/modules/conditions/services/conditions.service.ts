import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Condition } from '../entities/condition.entity';
import { CreateConditionDto } from '../dto/create-condition.dto';
import { UpdateConditionDto } from '../dto/update-condition.dto';

@Injectable()
export class ConditionsService {
  constructor(
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
  ) {}

  async create(
    routeId: string,
    createConditionDto: CreateConditionDto,
  ): Promise<Condition> {
    const condition = this.conditionRepository.create({
      ...createConditionDto,
      routeId,
    });
    return this.conditionRepository.save(condition);
  }

  async findAllByRoute(routeId: string): Promise<Condition[]> {
    return this.conditionRepository.find({
      where: { routeId },
      order: { priority: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Condition> {
    const condition = await this.conditionRepository.findOne({
      where: { id },
    });
    if (!condition) {
      throw new NotFoundException(`Condition with ID ${id} not found`);
    }
    return condition;
  }

  async update(
    id: string,
    updateConditionDto: UpdateConditionDto,
  ): Promise<Condition> {
    await this.findOne(id);
    await this.conditionRepository.update(id, updateConditionDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const condition = await this.findOne(id);
    await this.conditionRepository.remove(condition);
  }
}
