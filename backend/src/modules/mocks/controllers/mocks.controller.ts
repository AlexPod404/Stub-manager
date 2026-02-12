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
import { MocksService } from '../services/mocks.service';
import { CreateMockDto } from '../dto/create-mock.dto';
import { UpdateMockDto } from '../dto/update-mock.dto';
import { SetDelayDto } from '../dto/set-delay.dto';

@ApiTags('mocks')
@Controller('mocks')
export class MocksController {
  constructor(private readonly mocksService: MocksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new mock' })
  @ApiResponse({ status: 201, description: 'Mock created successfully' })
  create(@Body() createMockDto: CreateMockDto) {
    return this.mocksService.create(createMockDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all mocks' })
  @ApiResponse({ status: 200, description: 'Return all mocks' })
  findAll() {
    return this.mocksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a mock by ID' })
  @ApiResponse({ status: 200, description: 'Return the mock' })
  @ApiResponse({ status: 404, description: 'Mock not found' })
  findOne(@Param('id') id: string) {
    return this.mocksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a mock' })
  @ApiResponse({ status: 200, description: 'Mock updated successfully' })
  update(@Param('id') id: string, @Body() updateMockDto: UpdateMockDto) {
    return this.mocksService.update(id, updateMockDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a mock' })
  @ApiResponse({ status: 204, description: 'Mock deleted successfully' })
  remove(@Param('id') id: string) {
    return this.mocksService.remove(id);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Start a mock' })
  @ApiResponse({ status: 200, description: 'Mock started successfully' })
  start(@Param('id') id: string) {
    return this.mocksService.start(id);
  }

  @Post(':id/stop')
  @ApiOperation({ summary: 'Stop a mock' })
  @ApiResponse({ status: 200, description: 'Mock stopped successfully' })
  stop(@Param('id') id: string) {
    return this.mocksService.stop(id);
  }

  @Put(':id/delay')
  @ApiOperation({ summary: 'Set response delay for a mock' })
  @ApiResponse({ status: 200, description: 'Delay set successfully' })
  setDelay(@Param('id') id: string, @Body() setDelayDto: SetDelayDto) {
    return this.mocksService.setDelay(id, setDelayDto.delay);
  }
}
