import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserDto } from '../users/dto/sigin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    };

    let token: any;
    try {
      token = this.jwtService.sign(payload);
      console.log('token', token);
    } catch (error) {
      console.log(error);
    }

    return { token };
  }
  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(
      createUserDto.email,
    );
    if (candidate) {
      throw new ConflictException('such user exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password_hash, 7);
    createUserDto.password_hash = hashedPassword;
    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  async signin(signinUserDto: SigninUserDto) {
    const user = await this.userService.getUserByEmail(signinUserDto.email);

    if (!user) {
      throw new ConflictException('Email or password is incorrect');
    }

    const validPassword = await bcrypt.compare(
      signinUserDto.password_hash,
      user.password_hash,
    );

    if (!validPassword) {
      throw new ConflictException('Email or password is incorrect');
    }

    const token = await this.generateToken(user);

    return { message: 'User signed in', id: user.id, token };
  }
}
