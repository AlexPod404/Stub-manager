import { IsString, IsEnum, IsOptional, IsInt, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpMethod } from '../entities/route.entity';

export class CreateRouteDto {
  @ApiProperty({ description: 'Route path' })
  @IsString()
  path: string;

  @ApiProperty({ enum: HttpMethod, description: 'HTTP method' })
  @IsEnum(HttpMethod)
  method: HttpMethod;

  @ApiPropertyOptional({ description: 'Route description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Default response object' })
  @IsObject()
  @IsOptional()
  defaultResponse?: Record<string, any>;

  @ApiPropertyOptional({ description: 'HTTP status code' })
  @IsInt()
  @IsOptional()
  statusCode?: number;
}
