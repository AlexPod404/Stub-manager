import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { RoutesController, RouteController } from './controllers/routes.controller';
import { RoutesService } from './services/routes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  controllers: [RoutesController, RouteController],
  providers: [RoutesService],
  exports: [RoutesService],
})
export class RoutesModule {}
