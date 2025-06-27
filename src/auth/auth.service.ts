import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcript from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/model/user.model";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { SigninUserDto } from "../users/dto/signin-user.Dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userServise: UsersService,
    private readonly jwtServise: JwtService,
  ) {}

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      roles: user.roles,
    };
    const  token = this.jwtServise.sign(payload) ;
    return  token
    
  }

  async signup(createUserDto: CreateUserDto) {
    const condidate = await this.userServise.getUserByEmail(createUserDto.email);
    if (condidate) {
      throw new ConflictException("bunday foydalanuvchi mavjud");
    }
    const hashedpassword = await bcript.hash(createUserDto.password, 7);
    createUserDto.password = hashedpassword;
    const newuser = await this.userServise.create(createUserDto);
    return newuser;
  }

  async singin(SigninUserDto: SigninUserDto) {
    const user = await this.userServise.getUserByEmail(SigninUserDto.email);
    if (!user) {
      throw new UnauthorizedException("Email yoki password notogri");
    }
    const validPassword = await bcript.compare(
      SigninUserDto.password,
      user.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException("bunday foydalanuvchi mavjud emas");
    }
    const token = await this.generateToken(user);
    return { message: "user Signed in", id: user.id, token };
  }
}
