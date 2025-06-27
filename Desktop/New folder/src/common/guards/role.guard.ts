import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../../app.contants";

@Injectable()
export class RolesGuart implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const requiresRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiresRoles) {
      return true;
    }
    const permition = req.user.roles.some((role: any) =>
      requiresRoles.includes(role.value),
    );
    if (!permition) {
      throw new ForbiddenException({ message: "Sizga Ruxsat berilmagan" });
    }
    return true;
  }
}
