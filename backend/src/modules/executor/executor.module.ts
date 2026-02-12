import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ExecutorService } from './services/executor.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scenario-execution',
    }),
  ],
  providers: [ExecutorService],
  exports: [ExecutorService],
})
export class ExecutorModule {}
