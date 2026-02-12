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
import { CreateRouteDto } from '../dto/create-route.dto';
import { UpdateRouteDto } from '../dto/update-route.dto';

@ApiTags('routes')
@Controller('mocks/:mockId/routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new route for a mock' })
  @ApiResponse({ status: 201, description: 'Route created successfully' })
  create(@Param('mockId') mockId: string, @Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(mockId, createRouteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all routes for a mock' })
  @ApiResponse({ status: 200, description: 'Return all routes' })
  findAll(@Param('mockId') mockId: string) {
    return this.routesService.findAllByMock(mockId);
  }
}

@ApiTags('routes')
@Controller('routes')
export class RouteController {
  constructor(private readonly routesService: RoutesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a route by ID' })
  @ApiResponse({ status: 200, description: 'Return the route' })
  @ApiResponse({ status: 404, description: 'Route not found' })
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a route' })
  @ApiResponse({ status: 200, description: 'Route updated successfully' })
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(id, updateRouteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a route' })
  @ApiResponse({ status: 204, description: 'Route deleted successfully' })
  remove(@Param('id') id: string) {
    return this.routesService.remove(id);
  }
}
