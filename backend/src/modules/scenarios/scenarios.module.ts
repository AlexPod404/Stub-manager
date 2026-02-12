import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scenario } from './entities/scenario.entity';
import { ScenarioAction } from './entities/scenario-action.entity';
import { TestResult } from './entities/test-result.entity';
import { ScenariosController } from './controllers/scenarios.controller';
import { ScenariosService } from './services/scenarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scenario, ScenarioAction, TestResult])],
  controllers: [ScenariosController],
  providers: [ScenariosService],
  exports: [ScenariosService],
})
export class ScenariosModule {}
