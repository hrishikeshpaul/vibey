import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { RedisModule } from '@db/redis.module';
import { MongoDBModule } from '@db/mongo.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TagModule } from '@modules/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    RedisModule,
    MongoDBModule,
    AuthModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [RedisModule, MongoDBModule],
})
export class AppModule {}
