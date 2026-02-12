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
import { CreateMockDto, UpdateMockDto, SetDelayDto } from '../dto/mock.dto';
import { Mock } from '../entities/mock.entity';

@ApiTags('mocks')
@Controller('mocks')
export class MocksController {
  constructor(private readonly mocksService: MocksService) {}

  @Post()
  @ApiOperation({ summary: 'Создание заглушки' })
  @ApiResponse({ status: 201, description: 'Заглушка создана', type: Mock })
  async create(@Body() createMockDto: CreateMockDto): Promise<Mock> {
    return await this.mocksService.create(createMockDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка заглушек' })
  @ApiResponse({ status: 200, description: 'Список заглушек', type: [Mock] })
  async findAll(): Promise<Mock[]> {
    return await this.mocksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение заглушки по ID' })
  @ApiResponse({ status: 200, description: 'Заглушка найдена', type: Mock })
  @ApiResponse({ status: 404, description: 'Заглушка не найдена' })
  async findOne(@Param('id') id: string): Promise<Mock> {
    return await this.mocksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновление заглушки' })
  @ApiResponse({ status: 200, description: 'Заглушка обновлена', type: Mock })
  @ApiResponse({ status: 404, description: 'Заглушка не найдена' })
  async update(
    @Param('id') id: string,
    @Body() updateMockDto: UpdateMockDto,
  ): Promise<Mock> {
    return await this.mocksService.update(id, updateMockDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удаление заглушки' })
  @ApiResponse({ status: 204, description: 'Заглушка удалена' })
  @ApiResponse({ status: 404, description: 'Заглушка не найдена' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.mocksService.remove(id);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Запуск заглушки' })
  @ApiResponse({ status: 200, description: 'Заглушка запущена', type: Mock })
  @ApiResponse({ status: 404, description: 'Заглушка не найдена' })
  async start(@Param('id') id: string): Promise<Mock> {
    return await this.mocksService.start(id);
  }

  @Post(':id/stop')
  @ApiOperation({ summary: 'Остановка заглушки' })
  @ApiResponse({ status: 200, description: 'Заглушка остановлена', type: Mock })
  @ApiResponse({ status: 404, description: 'Заглушка не найдена' })
  async stop(@Param('id') id: string): Promise<Mock> {
    return await this.mocksService.stop(id);
  }

  @Put(':id/delay')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Изменение времени отклика' })
  @ApiResponse({ status: 204, description: 'Задержка установлена' })
  @ApiResponse({ status: 404, description: 'Заглушка не найдена' })
  async setDelay(
    @Param('id') id: string,
    @Body() setDelayDto: SetDelayDto,
  ): Promise<void> {
    await this.mocksService.setDelay(id, setDelayDto.delayMs);
  }
}
