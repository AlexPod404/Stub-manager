import { IsString, IsEnum, IsOptional, IsInt, Min, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MockProtocol } from '../entities/mock.entity';

export class CreateMockDto {
  @ApiProperty({ description: 'Mock name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Mock description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: MockProtocol, description: 'Protocol type' })
  @IsEnum(MockProtocol)
  protocol: MockProtocol;

  @ApiPropertyOptional({ description: 'Response delay in milliseconds' })
  @IsInt()
  @Min(0)
  @IsOptional()
  responseDelay?: number;

  @ApiPropertyOptional({ description: 'Additional metadata' })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
