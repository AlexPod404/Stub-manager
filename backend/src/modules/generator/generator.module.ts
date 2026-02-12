import { Module } from '@nestjs/common';
import { GeneratorService } from './services/generator.service';

@Module({
  providers: [GeneratorService],
  exports: [GeneratorService],
})
export class GeneratorModule {}
