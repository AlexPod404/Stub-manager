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
import { CreateConditionDto } from '../dto/create-condition.dto';
import { UpdateConditionDto } from '../dto/update-condition.dto';

@ApiTags('conditions')
@Controller('routes/:routeId/conditions')
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new condition for a route' })
  @ApiResponse({ status: 201, description: 'Condition created successfully' })
  create(
    @Param('routeId') routeId: string,
    @Body() createConditionDto: CreateConditionDto,
  ) {
    return this.conditionsService.create(routeId, createConditionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all conditions for a route' })
  @ApiResponse({ status: 200, description: 'Return all conditions' })
  findAll(@Param('routeId') routeId: string) {
    return this.conditionsService.findAllByRoute(routeId);
  }
}

@ApiTags('conditions')
@Controller('conditions')
export class ConditionController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a condition by ID' })
  @ApiResponse({ status: 200, description: 'Return the condition' })
  @ApiResponse({ status: 404, description: 'Condition not found' })
  findOne(@Param('id') id: string) {
    return this.conditionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a condition' })
  @ApiResponse({ status: 200, description: 'Condition updated successfully' })
  update(@Param('id') id: string, @Body() updateConditionDto: UpdateConditionDto) {
    return this.conditionsService.update(id, updateConditionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a condition' })
  @ApiResponse({ status: 204, description: 'Condition deleted successfully' })
  remove(@Param('id') id: string) {
    return this.conditionsService.remove(id);
  }
}
