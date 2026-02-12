import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MockProtocol, MockStatus } from '../entities/mock.entity';

export class CreateMockDto {
  @ApiProperty({ description: 'Название заглушки' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Описание заглушки' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: MockProtocol,
    description: 'Протокол заглушки',
    default: MockProtocol.REST,
  })
  @IsEnum(MockProtocol)
  protocol: MockProtocol;
}

export class UpdateMockDto {
  @ApiPropertyOptional({ description: 'Название заглушки' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Описание заглушки' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: MockProtocol, description: 'Протокол заглушки' })
  @IsOptional()
  @IsEnum(MockProtocol)
  protocol?: MockProtocol;

  @ApiPropertyOptional({ enum: MockStatus, description: 'Статус заглушки' })
  @IsOptional()
  @IsEnum(MockStatus)
  status?: MockStatus;
}

export class SetDelayDto {
  @ApiProperty({ description: 'Задержка ответа в миллисекундах' })
  @IsNotEmpty()
  delayMs: number;
}
