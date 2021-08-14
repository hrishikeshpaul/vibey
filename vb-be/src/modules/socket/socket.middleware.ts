import { Injectable, CanActivate } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { ErrorText } from 'src/util/error';

import { TokenTypes } from '@modules/auth/auth.constants';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: any): Promise<any> {
    const token: string = context.args[0].handshake.headers['v-at'];

    try {
      const decoded: string = await this.authService.verifyToken(
        token,
        TokenTypes.Access,
      );
      // can be accessed via [socket/client].data.decoded
      context.args[0].data.decoded = decoded;
      return true;
    } catch (err) {
      console.log(err);
      // returns to FE as socket.on('exception', (data: { err: string, message: string })
      throw new WsException(ErrorText.Unauthorized);
    }
  }
}
