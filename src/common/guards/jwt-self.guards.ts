import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.user);
    if (req.user.id != req.params.id) {
      throw new ForbiddenException({
        meaasge: 'Ruxsat etilmagan foydalanuvchi',
      });
    }

    return true;
  }
}
