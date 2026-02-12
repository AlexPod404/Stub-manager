import { IsNotEmpty, IsString, IsOptional, IsArray, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ActionType } from '../entities/scenario-action.entity';

export class CreateScenarioDto {
  @ApiProperty({ description: 'Название сценария' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Описание сценария' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Действия сценария', type: [Object] })
  @IsOptional()
  @IsArray()
  actions?: CreateScenarioActionDto[];
}

export class CreateScenarioActionDto {
  @ApiProperty({ description: 'Смещение по времени в миллисекундах' })
  @IsNumber()
  timeOffsetMs: number;

  @ApiProperty({ enum: ActionType, description: 'Тип действия' })
  @IsEnum(ActionType)
  actionType: ActionType;

  @ApiProperty({ description: 'ID целевой заглушки' })
  @IsUUID()
  targetMockId: string;

  @ApiPropertyOptional({ description: 'Параметры действия' })
  @IsOptional()
  params?: any;

  @ApiProperty({ description: 'Порядок выполнения' })
  @IsNumber()
  order: number;
}

export class UpdateScenarioDto {
  @ApiPropertyOptional({ description: 'Название сценария' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Описание сценария' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Действия сценария', type: [Object] })
  @IsOptional()
  @IsArray()
  actions?: CreateScenarioActionDto[];
}
