import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { RedisModule } from '@db/redis.module';
import { MongoDBModule } from '@db/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    RedisModule,
    MongoDBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [RedisModule, MongoDBModule],
})
export class AppModule {}
