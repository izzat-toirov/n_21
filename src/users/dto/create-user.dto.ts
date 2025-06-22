import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsEnum } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password_hash: string;

  @ApiProperty({ enum: ['creator', 'user'] })
  @IsEnum(['creator', 'user'])
  role: 'creator' | 'user';

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  avatar_uri: string;

  @ApiProperty()
  @IsString()
  banner_uri: string;
}
