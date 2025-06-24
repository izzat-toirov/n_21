import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNumber()
  user_id: number;
  @ApiProperty()
  @IsString()
  message: string;
}
