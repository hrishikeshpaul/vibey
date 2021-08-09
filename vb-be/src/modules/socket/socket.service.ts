import { Injectable } from '@nestjs/common';

import { RedisService } from '@db/redis.module';

@Injectable()
export class SocketService {
  constructor(private readonly redis: RedisService) {}
}
