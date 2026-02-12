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
import { ConditionsService } from '../services/conditions.service';
import { CreateConditionDto, UpdateConditionDto } from '../dto/condition.dto';
import { Condition } from '../entities/condition.entity';

@ApiTags('conditions')
@Controller()
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Post('routes/:routeId/conditions')
  @ApiOperation({ summary: 'Создание условия для роута' })
  @ApiResponse({ status: 201, description: 'Условие создано', type: Condition })
  async create(
    @Param('routeId') routeId: string,
    @Body() createConditionDto: CreateConditionDto,
  ): Promise<Condition> {
    return await this.conditionsService.create(routeId, createConditionDto);
  }

  @Get('routes/:routeId/conditions')
  @ApiOperation({ summary: 'Получение условий роута' })
  @ApiResponse({ status: 200, description: 'Список условий', type: [Condition] })
  async findAllByRoute(@Param('routeId') routeId: string): Promise<Condition[]> {
    return await this.conditionsService.findAllByRoute(routeId);
  }

  @Get('conditions/:id')
  @ApiOperation({ summary: 'Получение условия по ID' })
  @ApiResponse({ status: 200, description: 'Условие найдено', type: Condition })
  @ApiResponse({ status: 404, description: 'Условие не найдено' })
  async findOne(@Param('id') id: string): Promise<Condition> {
    return await this.conditionsService.findOne(id);
  }

  @Put('conditions/:id')
  @ApiOperation({ summary: 'Обновление условия' })
  @ApiResponse({ status: 200, description: 'Условие обновлено', type: Condition })
  @ApiResponse({ status: 404, description: 'Условие не найдено' })
  async update(
    @Param('id') id: string,
    @Body() updateConditionDto: UpdateConditionDto,
  ): Promise<Condition> {
    return await this.conditionsService.update(id, updateConditionDto);
  }

  @Delete('conditions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удаление условия' })
  @ApiResponse({ status: 204, description: 'Условие удалено' })
  @ApiResponse({ status: 404, description: 'Условие не найдено' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.conditionsService.remove(id);
  }
}
