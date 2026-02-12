import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MocksModule } from './modules/mocks/mocks.module';
import { RoutesModule } from './modules/routes/routes.module';
import { ConditionsModule } from './modules/conditions/conditions.module';
import { ScenariosModule } from './modules/scenarios/scenarios.module';
import { ExecutorModule } from './modules/executor/executor.module';
import { GeneratorModule } from './modules/generator/generator.module';
import { CacheModule } from './modules/cache/cache.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    MocksModule,
    RoutesModule,
    ConditionsModule,
    ScenariosModule,
    ExecutorModule,
    GeneratorModule,
    CacheModule,
  ],
})
export class AppModule {}
