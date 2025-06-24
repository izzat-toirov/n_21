import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../app.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly refrector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const requiredRoles = this.refrector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const permission = requiredRoles.includes(req.user.role);
    if (!permission) {
      throw new ForbiddenException('Sizga ruxsat berilmagan');
    }
    return true;
  }
}
