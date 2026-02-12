import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';
import { CreateRouteDto } from '../dto/create-route.dto';
import { UpdateRouteDto } from '../dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  async create(mockId: string, createRouteDto: CreateRouteDto): Promise<Route> {
    const route = this.routeRepository.create({
      ...createRouteDto,
      mockId,
    });
    return this.routeRepository.save(route);
  }

  async findAllByMock(mockId: string): Promise<Route[]> {
    return this.routeRepository.find({
      where: { mockId },
      relations: ['conditions'],
    });
  }

  async findOne(id: string): Promise<Route> {
    const route = await this.routeRepository.findOne({
      where: { id },
      relations: ['conditions'],
    });
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return route;
  }

  async update(id: string, updateRouteDto: UpdateRouteDto): Promise<Route> {
    await this.findOne(id);
    await this.routeRepository.update(id, updateRouteDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const route = await this.findOne(id);
    await this.routeRepository.remove(route);
  }
}
