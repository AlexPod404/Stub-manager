import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { DatabaseConfigService } from './database/database-config.service';
import { MocksModule } from './modules/mocks/mocks.module';
import { RoutesModule } from './modules/routes/routes.module';
import { ConditionsModule } from './modules/conditions/conditions.module';
import { ScenariosModule } from './modules/scenarios/scenarios.module';
import { ExecutorModule } from './modules/executor/executor.module';
import { GeneratorModule } from './modules/generator/generator.module';
import { CacheModule } from './modules/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.BULL_REDIS_HOST || 'localhost',
        port: parseInt(process.env.BULL_REDIS_PORT) || 6379,
      },
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
