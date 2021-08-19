import { Controller, Get, Response, Headers, Param } from '@nestjs/common';
import { Response as Res } from 'express';

import { UserService } from '@modules/user/user.service';
import { IDecodedToken } from '@modules/auth/auth.constants';
import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') userId: string, @Response() res: Res) {
    try {
      const user = await this.userService.findOneById(userId);
      return res.status(HttpStatus.OK).json(user);
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.InternalError).send(err);
    }
  }

  @Get('/me')
  async getMe(
    @Headers('decoded') decoded: IDecodedToken,
    @Response() res: Res,
  ) {
    try {
      const user = await this.userService.findOne(decoded.email);
      return res.status(HttpStatus.OK).json(user);
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.InternalError).send(err);
    }
  }
}
