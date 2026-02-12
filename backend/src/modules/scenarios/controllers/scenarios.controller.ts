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
import { CreateScenarioDto } from '../dto/create-scenario.dto';
import { UpdateScenarioDto } from '../dto/update-scenario.dto';
import { CreateActionDto } from '../dto/create-action.dto';

@ApiTags('scenarios')
@Controller('scenarios')
export class ScenariosController {
  constructor(private readonly scenariosService: ScenariosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new scenario' })
  @ApiResponse({ status: 201, description: 'Scenario created successfully' })
  create(@Body() createScenarioDto: CreateScenarioDto) {
    return this.scenariosService.create(createScenarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all scenarios' })
  @ApiResponse({ status: 200, description: 'Return all scenarios' })
  findAll() {
    return this.scenariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a scenario by ID' })
  @ApiResponse({ status: 200, description: 'Return the scenario' })
  @ApiResponse({ status: 404, description: 'Scenario not found' })
  findOne(@Param('id') id: string) {
    return this.scenariosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a scenario' })
  @ApiResponse({ status: 200, description: 'Scenario updated successfully' })
  update(@Param('id') id: string, @Body() updateScenarioDto: UpdateScenarioDto) {
    return this.scenariosService.update(id, updateScenarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a scenario' })
  @ApiResponse({ status: 204, description: 'Scenario deleted successfully' })
  remove(@Param('id') id: string) {
    return this.scenariosService.remove(id);
  }

  @Post(':id/actions')
  @ApiOperation({ summary: 'Add action to scenario' })
  @ApiResponse({ status: 201, description: 'Action added successfully' })
  addAction(@Param('id') id: string, @Body() createActionDto: CreateActionDto) {
    return this.scenariosService.addAction(id, createActionDto);
  }

  @Post(':id/execute')
  @ApiOperation({ summary: 'Execute scenario' })
  @ApiResponse({ status: 200, description: 'Scenario execution started' })
  execute(@Param('id') id: string) {
    return this.scenariosService.execute(id);
  }

  @Get(':id/results')
  @ApiOperation({ summary: 'Get scenario execution results' })
  @ApiResponse({ status: 200, description: 'Return execution results' })
  getResults(@Param('id') id: string) {
    return this.scenariosService.getResults(id);
  }
}
