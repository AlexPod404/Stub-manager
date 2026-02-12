import { IsEnum, IsNotEmpty, IsString, IsOptional, IsNumber, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConditionType, ParameterSource } from '../entities/condition.entity';

export class CreateConditionDto {
  @ApiProperty({ enum: ConditionType, description: 'Тип условия' })
  @IsEnum(ConditionType)
  type: ConditionType;

  @ApiProperty({ description: 'Имя параметра' })
  @IsNotEmpty()
  @IsString()
  parameterName: string;

  @ApiProperty({ enum: ParameterSource, description: 'Источник параметра' })
  @IsEnum(ParameterSource)
  parameterSource: ParameterSource;

  @ApiPropertyOptional({ description: 'Путь к параметру (для body)' })
  @IsOptional()
  @IsString()
  parameterPath?: string;

  @ApiProperty({ description: 'Значение для сравнения' })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiPropertyOptional({ description: 'Приоритет условия', default: 0 })
  @IsOptional()
  @IsNumber()
  priority?: number;

  @ApiProperty({ description: 'Ответ для данного условия' })
  @IsNotEmpty()
  @IsObject()
  response: CreateResponseDto;
}

export class CreateResponseDto {
  @ApiProperty({ description: 'HTTP статус код', default: 200 })
  @IsNumber()
  statusCode: number;

  @ApiProperty({ description: 'Тело ответа' })
  @IsNotEmpty()
  body: any;

  @ApiPropertyOptional({ description: 'Заголовки ответа' })
  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;
}

export class UpdateConditionDto {
  @ApiPropertyOptional({ enum: ConditionType, description: 'Тип условия' })
  @IsOptional()
  @IsEnum(ConditionType)
  type?: ConditionType;

  @ApiPropertyOptional({ description: 'Имя параметра' })
  @IsOptional()
  @IsString()
  parameterName?: string;

  @ApiPropertyOptional({ enum: ParameterSource, description: 'Источник параметра' })
  @IsOptional()
  @IsEnum(ParameterSource)
  parameterSource?: ParameterSource;

  @ApiPropertyOptional({ description: 'Путь к параметру (для body)' })
  @IsOptional()
  @IsString()
  parameterPath?: string;

  @ApiPropertyOptional({ description: 'Значение для сравнения' })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional({ description: 'Приоритет условия' })
  @IsOptional()
  @IsNumber()
  priority?: number;

  @ApiPropertyOptional({ description: 'Ответ для данного условия' })
  @IsOptional()
  @IsObject()
  response?: CreateResponseDto;
}
