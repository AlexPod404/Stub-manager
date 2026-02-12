import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScenarioExecutorService } from './services/scenario-executor.service';
import { ScenarioExecution } from '../scenarios/entities/scenario-execution.entity';
import { Scenario } from '../scenarios/entities/scenario.entity';
import { MocksModule } from '../mocks/mocks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScenarioExecution, Scenario]),
    MocksModule,
  ],
  providers: [ScenarioExecutorService],
  exports: [ScenarioExecutorService],
})
export class ExecutorModule {}
