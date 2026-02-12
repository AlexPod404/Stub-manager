import { Module, Global } from '@nestjs/common';
import { DeadCacheService } from './services/dead-cache.service';

@Global()
@Module({
  providers: [DeadCacheService],
  exports: [DeadCacheService],
})
export class CacheModule {}
