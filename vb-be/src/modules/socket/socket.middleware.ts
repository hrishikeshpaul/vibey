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
    const { event, data } = context.args[1];

    try {
      const decoded: string = await this.authService.verifyToken(
        token,
        TokenTypes.Access,
      );
      // can be accessed via [socket/client].data.decoded
      context.args[0].data.decoded = decoded;
      return;
    } catch (err) {
      console.log(err, data, event);
      // returns to FE as socket.on('exception', (data: { err: string, message: { text, event }})
      throw new WsException({
        text: ErrorText.Unauthorized,
        event: event,
        data: data,
      });
    }
  }
}
