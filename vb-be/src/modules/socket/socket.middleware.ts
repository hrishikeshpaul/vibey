import { TokenTypes } from '@modules/auth/auth.constants';
import { AuthService } from '@modules/auth/auth.service';
import { Injectable, CanActivate } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ErrorText } from 'src/util/error';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: any): Promise<any> {
    const { event, data, headers } = context.args[1];
    const token: string = headers['v-at'];

    try {
      await this.authService.verifyToken(token, TokenTypes.Access);
      return true;
    } catch (ex) {
      throw new WsException({
        text: ErrorText.Unauthorized,
        event: event,
        data: data,
      });
    }
  }
}
