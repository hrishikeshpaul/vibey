import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { RedisService } from '@db/redis.module';

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
