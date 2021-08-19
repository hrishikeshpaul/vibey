import { Module } from '@nestjs/common';

import { UserService } from '@modules/user/user.service';
import { UserController } from '@modules/user/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
