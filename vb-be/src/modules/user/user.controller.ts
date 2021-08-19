import {
  Controller,
  Get,
  Response,
  Headers,
  Param,
  Logger,
} from '@nestjs/common';
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

      if (!user)
        throw new ErrorHandler(HttpStatus.NotFound, ErrorText.UserNotFound);

      return res.status(HttpStatus.OK).json(user);
    } catch (err) {
      Logger.error(err);
      return res.status(err.statusCode || HttpStatus.InternalError).send(err);
    }
  }

  @Get('/me')
  async getMe(
    @Headers('decoded') decoded: IDecodedToken,
    @Response() res: Res,
  ) {
    try {
      const user = await this.userService.findOne(decoded.email);

      if (!user)
        throw new ErrorHandler(HttpStatus.NotFound, ErrorText.UserNotFound);

      return res.status(HttpStatus.OK).json(user);
    } catch (err) {
      Logger.error(err);
      return res.status(err.statusCode || HttpStatus.InternalError).send(err);
    }
  }
}