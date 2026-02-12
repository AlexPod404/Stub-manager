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
import { ScenariosService } from '../services/scenarios.service';
import { CreateScenarioDto, UpdateScenarioDto } from '../dto/scenario.dto';
import { Scenario } from '../entities/scenario.entity';
import { ScenarioExecution } from '../entities/scenario-execution.entity';

@ApiTags('scenarios')
@Controller('scenarios')
export class ScenariosController {
  constructor(private readonly scenariosService: ScenariosService) {}

  @Post()
  @ApiOperation({ summary: 'Создание сценария' })
  @ApiResponse({ status: 201, description: 'Сценарий создан', type: Scenario })
  async create(@Body() createScenarioDto: CreateScenarioDto): Promise<Scenario> {
    return await this.scenariosService.create(createScenarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка сценариев' })
  @ApiResponse({ status: 200, description: 'Список сценариев', type: [Scenario] })
  async findAll(): Promise<Scenario[]> {
    return await this.scenariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение сценария по ID' })
  @ApiResponse({ status: 200, description: 'Сценарий найден', type: Scenario })
  @ApiResponse({ status: 404, description: 'Сценарий не найден' })
  async findOne(@Param('id') id: string): Promise<Scenario> {
    return await this.scenariosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновление сценария' })
  @ApiResponse({ status: 200, description: 'Сценарий обновлен', type: Scenario })
  @ApiResponse({ status: 404, description: 'Сценарий не найден' })
  async update(
    @Param('id') id: string,
    @Body() updateScenarioDto: UpdateScenarioDto,
  ): Promise<Scenario> {
    return await this.scenariosService.update(id, updateScenarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удаление сценария' })
  @ApiResponse({ status: 204, description: 'Сценарий удален' })
  @ApiResponse({ status: 404, description: 'Сценарий не найден' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.scenariosService.remove(id);
  }

  @Post(':id/execute')
  @ApiOperation({ summary: 'Выполнение сценария' })
  @ApiResponse({ status: 201, description: 'Сценарий запущен', type: ScenarioExecution })
  @ApiResponse({ status: 404, description: 'Сценарий не найден' })
  async execute(@Param('id') id: string): Promise<ScenarioExecution> {
    return await this.scenariosService.createExecution(id);
  }

  @Get('executions/:id/results')
  @ApiOperation({ summary: 'Получение результатов выполнения сценария' })
  @ApiResponse({ status: 200, description: 'Результаты получены', type: ScenarioExecution })
  @ApiResponse({ status: 404, description: 'Выполнение не найдено' })
  async getResults(@Param('id') id: string): Promise<ScenarioExecution> {
    return await this.scenariosService.getExecutionResults(id);
  }
}
