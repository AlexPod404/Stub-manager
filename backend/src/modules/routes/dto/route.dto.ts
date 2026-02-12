import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRouteDto {
  @ApiProperty({ description: 'Путь роута' })
  @IsNotEmpty()
  @IsString()
  path: string;

  @ApiProperty({ description: 'HTTP метод', default: 'GET' })
  @IsString()
  method: string;

  @ApiPropertyOptional({ description: 'Задержка в миллисекундах', default: 0 })
  @IsOptional()
  @IsNumber()
  delayMs?: number;

  @ApiPropertyOptional({ description: 'Активен ли роут', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateRouteDto {
  @ApiPropertyOptional({ description: 'Путь роута' })
  @IsOptional()
  @IsString()
  path?: string;

  @ApiPropertyOptional({ description: 'HTTP метод' })
  @IsOptional()
  @IsString()
  method?: string;

  @ApiPropertyOptional({ description: 'Задержка в миллисекундах' })
  @IsOptional()
  @IsNumber()
  delayMs?: number;

  @ApiPropertyOptional({ description: 'Активен ли роут' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
