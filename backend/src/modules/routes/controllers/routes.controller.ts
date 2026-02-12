import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoutesService } from '../services/routes.service';
import { CreateRouteDto, UpdateRouteDto } from '../dto/route.dto';
import { Route } from '../entities/route.entity';

@ApiTags('routes')
@Controller()
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('mocks/:mockId/routes')
  @ApiOperation({ summary: 'Создание роута для заглушки' })
  @ApiResponse({ status: 201, description: 'Роут создан', type: Route })
  async create(
    @Param('mockId') mockId: string,
    @Body() createRouteDto: CreateRouteDto,
  ): Promise<Route> {
    return await this.routesService.create(mockId, createRouteDto);
  }

  @Get('mocks/:mockId/routes')
  @ApiOperation({ summary: 'Получение роутов заглушки' })
  @ApiResponse({ status: 200, description: 'Список роутов', type: [Route] })
  async findAllByMock(@Param('mockId') mockId: string): Promise<Route[]> {
    return await this.routesService.findAllByMock(mockId);
  }

  @Get('routes/:id')
  @ApiOperation({ summary: 'Получение роута по ID' })
  @ApiResponse({ status: 200, description: 'Роут найден', type: Route })
  @ApiResponse({ status: 404, description: 'Роут не найден' })
  async findOne(@Param('id') id: string): Promise<Route> {
    return await this.routesService.findOne(id);
  }

  @Put('routes/:id')
  @ApiOperation({ summary: 'Обновление роута' })
  @ApiResponse({ status: 200, description: 'Роут обновлен', type: Route })
  @ApiResponse({ status: 404, description: 'Роут не найден' })
  async update(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ): Promise<Route> {
    return await this.routesService.update(id, updateRouteDto);
  }

  @Delete('routes/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удаление роута' })
  @ApiResponse({ status: 204, description: 'Роут удален' })
  @ApiResponse({ status: 404, description: 'Роут не найден' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.routesService.remove(id);
  }
}
