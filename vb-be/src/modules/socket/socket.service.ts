import { RedisService } from '@db/redis.module';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  constructor(private readonly redis: RedisService) {}
}
