import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/model/user.model";
import { SigninUserDto } from "../users/dto/signin-user.Dto";
import { singularize } from "sequelize/types/utils";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() signinUserDto: SigninUserDto) {
    return this.authService.singin(signinUserDto);
  }
}
