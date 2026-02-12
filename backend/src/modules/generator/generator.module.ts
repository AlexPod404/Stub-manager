import { Module } from '@nestjs/common';
import { MockGeneratorService } from './services/mock-generator.service';

@Module({
  providers: [MockGeneratorService],
  exports: [MockGeneratorService],
})
export class GeneratorModule {}
