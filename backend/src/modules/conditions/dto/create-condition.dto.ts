import { IsString, IsEnum, IsInt, IsOptional, IsObject, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConditionOperator, ParameterSource } from '../entities/condition.entity';

export class CreateConditionDto {
  @ApiProperty({ description: 'Parameter name to check' })
  @IsString()
  parameterName: string;

  @ApiProperty({ enum: ParameterSource, description: 'Parameter source location' })
  @IsEnum(ParameterSource)
  parameterSource: ParameterSource;

  @ApiProperty({ enum: ConditionOperator, description: 'Comparison operator' })
  @IsEnum(ConditionOperator)
  operator: ConditionOperator;

  @ApiProperty({ description: 'Expected value for comparison' })
  @IsString()
  expectedValue: string;

  @ApiProperty({ description: 'Response to return when condition matches' })
  @IsObject()
  response: Record<string, any>;

  @ApiPropertyOptional({ description: 'HTTP status code' })
  @IsInt()
  @IsOptional()
  statusCode?: number;

  @ApiPropertyOptional({ description: 'Priority order (higher = checked first)' })
  @IsInt()
  @Min(0)
  @IsOptional()
  priority?: number;
}
