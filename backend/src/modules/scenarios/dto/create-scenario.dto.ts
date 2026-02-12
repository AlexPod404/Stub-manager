import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateScenarioDto {
  @ApiProperty({ description: 'Scenario name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Scenario description' })
  @IsString()
  @IsOptional()
  description?: string;
}
