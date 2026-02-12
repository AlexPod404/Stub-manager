import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mock, MockStatus } from '../entities/mock.entity';
import { CreateMockDto } from '../dto/create-mock.dto';
import { UpdateMockDto } from '../dto/update-mock.dto';

@Injectable()
export class MocksService {
  constructor(
    @InjectRepository(Mock)
    private readonly mockRepository: Repository<Mock>,
  ) {}

  async create(createMockDto: CreateMockDto): Promise<Mock> {
    const mock = this.mockRepository.create(createMockDto);
    return this.mockRepository.save(mock);
  }

  async findAll(): Promise<Mock[]> {
    return this.mockRepository.find({ relations: ['routes'] });
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
    await this.findOne(id);
    await this.mockRepository.update(id, updateMockDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const mock = await this.findOne(id);
    await this.mockRepository.remove(mock);
  }

  async start(id: string): Promise<Mock> {
    await this.findOne(id);
    await this.mockRepository.update(id, { status: MockStatus.ACTIVE });
    return this.findOne(id);
  }

  async stop(id: string): Promise<Mock> {
    await this.findOne(id);
    await this.mockRepository.update(id, { status: MockStatus.INACTIVE });
    return this.findOne(id);
  }

  async setDelay(id: string, delay: number): Promise<Mock> {
    await this.findOne(id);
    await this.mockRepository.update(id, { responseDelay: delay });
    return this.findOne(id);
  }
}
