import { TokenTypes } from '@modules/auth/auth.constants';
import { AuthService } from '@modules/auth/auth.service';
import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const token: string = context.args[0].handshake.headers['v-at'];
    try {
      const decoded = this.authService.verifyToken(token, TokenTypes.Access);
      return new Promise((resolve, reject) => {
        resolve(decoded);
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
