import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetDelayDto {
  @ApiProperty({ description: 'Response delay in milliseconds' })
  @IsInt()
  @Min(0)
  delay: number;
}
