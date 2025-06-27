import { IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../model/role.model";

export class CreateRoleDto implements Partial<Roles> {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  destcription: string;
}
