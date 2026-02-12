import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScenariosController } from './controllers/scenarios.controller';
import { ScenariosService } from './services/scenarios.service';
import { Scenario } from './entities/scenario.entity';
import { ScenarioAction } from './entities/scenario-action.entity';
import { ScenarioExecution } from './entities/scenario-execution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scenario, ScenarioAction, ScenarioExecution])],
  controllers: [ScenariosController],
  providers: [ScenariosService],
  exports: [ScenariosService],
})
export class ScenariosModule {}
