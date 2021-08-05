import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './database/redis.module';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rs: RedisService,
  ) {}

  @Get()
  getHello(): string {
    this.rs.redisJWTClient.set('hi', 'hello');
    return this.appService.getHello();
  }
}
