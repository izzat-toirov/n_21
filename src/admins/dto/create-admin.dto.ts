import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsEnum, IsBoolean, MinLength } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail({})
  email: string;

  @ApiProperty({ enum: ['super_admin', 'moderator'], example: 'moderator' })
  @IsEnum(['super_admin', 'moderator'])
  role: 'super_admin' | 'moderator';

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password_hash: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_active: boolean;
}
