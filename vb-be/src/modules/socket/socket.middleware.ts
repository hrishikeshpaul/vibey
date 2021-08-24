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
      console.log('Guard Exception');
      throw new WsException({
        text: ErrorText.Unauthorized,
        event: event,
        data: data,
      });
    }
  }
}

@Injectable()
export class RsGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: any): Promise<any> {
    const { event, data, headers } = context.args[1];
    const accessToken: string = headers['v-at'];
    const refreshToken: string = headers['v-rt'];

    try {
      if (!accessToken || !refreshToken) {
        return false;
      }

      // verify with jwt, and validate JWT pair in whitelist
      const decoded = await this.authService.verifyToken(
        refreshToken,
        TokenTypes.Refresh,
      );
      const cacheResult = await this.authService.getAsyncJwtClient(accessToken);
      if (cacheResult !== refreshToken) {
        return false;
      }
      context.args[1]['decoded'] = decoded;
      return true;
    } catch (ex) {
      console.log('Refresh Exception');
      throw new WsException({
        text: ErrorText.Unauthorized,
        event: event,
        data: data,
      });
    }
  }
}
