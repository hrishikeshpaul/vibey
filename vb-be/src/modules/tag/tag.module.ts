import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { TagController } from '@modules/tag/tag.controller';
import { TagService } from '@modules/tag/tag.service';
import { SearchTagMiddleware } from '@modules/tag/tag.middleware';

@Module({
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SearchTagMiddleware)
      .forRoutes({ path: '/api/tag/search', method: RequestMethod.GET });
  }
}
