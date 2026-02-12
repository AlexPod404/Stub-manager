import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition } from './entities/condition.entity';
import { ConditionsController, ConditionController } from './controllers/conditions.controller';
import { ConditionsService } from './services/conditions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Condition])],
  controllers: [ConditionsController, ConditionController],
  providers: [ConditionsService],
  exports: [ConditionsService],
})
export class ConditionsModule {}
