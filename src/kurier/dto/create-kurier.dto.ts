import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsEnum } from "class-validator";

export class CreateKurierDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsString()
  phone_number: string;

  @ApiProperty({ enum: ['foot', 'bike', 'car', 'motorcycle'] })
  @IsEnum(['foot', 'bike', 'car', 'motorcycle'])
  vehicle_type: 'foot' | 'bike' | 'car' | 'motorcycle';

  @ApiProperty()
  @IsString()
  vehicle_plate_number: string;

  @ApiProperty()
  @IsBoolean()
  is_active: boolean;
}
