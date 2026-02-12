import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MocksController } from './controllers/mocks.controller';
import { MocksService } from './services/mocks.service';
import { Mock } from './entities/mock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mock])],
  controllers: [MocksController],
  providers: [MocksService],
  exports: [MocksService],
})
export class MocksModule {}
