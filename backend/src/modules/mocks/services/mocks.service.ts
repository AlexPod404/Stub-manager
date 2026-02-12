import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mock, MockStatus } from '../entities/mock.entity';
import { CreateMockDto, UpdateMockDto } from '../dto/mock.dto';

@Injectable()
export class MocksService {
  constructor(
    @InjectRepository(Mock)
    private readonly mockRepository: Repository<Mock>,
  ) {}

  async create(createMockDto: CreateMockDto): Promise<Mock> {
    const mock = this.mockRepository.create(createMockDto);
    return await this.mockRepository.save(mock);
  }

  async findAll(): Promise<Mock[]> {
    return await this.mockRepository.find({ relations: ['routes'] });
  }

  async findOne(id: string): Promise<Mock> {
    const mock = await this.mockRepository.findOne({
      where: { id },
      relations: ['routes'],
    });
    if (!mock) {
      throw new NotFoundException(`Mock with ID ${id} not found`);
    }
    return mock;
  }

  async update(id: string, updateMockDto: UpdateMockDto): Promise<Mock> {
    const mock = await this.findOne(id);
    Object.assign(mock, updateMockDto);
    return await this.mockRepository.save(mock);
  }

  async remove(id: string): Promise<void> {
    const mock = await this.findOne(id);
    await this.mockRepository.remove(mock);
  }

  async start(id: string): Promise<Mock> {
    const mock = await this.findOne(id);
    mock.status = MockStatus.ACTIVE;
    return await this.mockRepository.save(mock);
  }

  async stop(id: string): Promise<Mock> {
    const mock = await this.findOne(id);
    mock.status = MockStatus.INACTIVE;
    return await this.mockRepository.save(mock);
  }

  async setDelay(id: string, delayMs: number): Promise<void> {
    // This will update all routes for this mock
    const mock = await this.findOne(id);
    // Implementation will be delegated to routes service
  }
}
