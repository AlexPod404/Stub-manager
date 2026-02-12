import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Condition } from '../entities/condition.entity';
import { Response } from '../entities/response.entity';
import { CreateConditionDto, UpdateConditionDto } from '../dto/condition.dto';

@Injectable()
export class ConditionsService {
  constructor(
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
  ) {}

  async create(routeId: string, createConditionDto: CreateConditionDto): Promise<Condition> {
    const { response: responseDto, ...conditionData } = createConditionDto;
    
    const condition = this.conditionRepository.create({
      ...conditionData,
      routeId,
    });
    
    const savedCondition = await this.conditionRepository.save(condition);

    const response = this.responseRepository.create({
      ...responseDto,
      conditionId: savedCondition.id,
    });
    
    await this.responseRepository.save(response);

    return await this.findOne(savedCondition.id);
  }

  async findAllByRoute(routeId: string): Promise<Condition[]> {
    return await this.conditionRepository.find({
      where: { routeId },
      relations: ['response'],
      order: { priority: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Condition> {
    const condition = await this.conditionRepository.findOne({
      where: { id },
      relations: ['response', 'route'],
    });
    if (!condition) {
      throw new NotFoundException(`Condition with ID ${id} not found`);
    }
    return condition;
  }

  async update(id: string, updateConditionDto: UpdateConditionDto): Promise<Condition> {
    const condition = await this.findOne(id);
    const { response: responseDto, ...conditionData } = updateConditionDto;
    
    Object.assign(condition, conditionData);
    await this.conditionRepository.save(condition);

    if (responseDto && condition.response) {
      Object.assign(condition.response, responseDto);
      await this.responseRepository.save(condition.response);
    }

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const condition = await this.findOne(id);
    await this.conditionRepository.remove(condition);
  }
}
