import { IsEnum, IsInt, IsObject, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActionType } from '../entities/scenario-action.entity';

export class CreateActionDto {
  @ApiProperty({ description: 'Action order in scenario' })
  @IsInt()
  @Min(0)
  order: number;

  @ApiProperty({ enum: ActionType, description: 'Type of action' })
  @IsEnum(ActionType)
  actionType: ActionType;

  @ApiProperty({ description: 'Action parameters' })
  @IsObject()
  parameters: Record<string, any>;
}
