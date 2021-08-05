import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisDBModule } from 'src/database/redis.module';
import { MongoDBModule } from 'src/database/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    RedisDBModule,
    MongoDBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [RedisDBModule, MongoDBModule],
})
export class AppModule {}
