import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuart implements CanActivate {
  constructor(private readonly Jwtservisw: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // console.log(req.headers);
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException({ message: "AuthHeaders Berilmagan" });
    }
    const barer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (barer != "Bearer" || !token) {
      throw new UnauthorizedException("token berilmagan");
    }

    let decodedpayoad: any;
    try {
      decodedpayoad = this.Jwtservisw.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi autharizasiyadan otmagan",
        error: error,
      });
    }
    req.user = decodedpayoad;
    return true;
  }
}
