import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConditionsController } from './controllers/conditions.controller';
import { ConditionsService } from './services/conditions.service';
import { Condition } from './entities/condition.entity';
import { Response } from './entities/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Condition, Response])],
  controllers: [ConditionsController],
  providers: [ConditionsService],
  exports: [ConditionsService],
})
export class ConditionsModule {}
