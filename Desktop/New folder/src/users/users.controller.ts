import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { ActivateUserDto } from "./dto/activate.user.dto";
import { JwtAuthGuart } from "../common/guards/jwt-auth.guard";
import { SelfGuart } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuart } from "../common/guards/role.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles("ADMIN", "SUPERADMIN")
  @UseGuards(RolesGuart)
  @UseGuards(JwtAuthGuart)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuart)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(SelfGuart)
  @UseGuards(JwtAuthGuart)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(":id")
  getUserByMail(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @HttpCode(200)
  @Roles("ADMIN", "SUPERADMIN")
  @UseGuards(RolesGuart)
  @UseGuards(JwtAuthGuart)
  @Post("add_role")
  async addRoles(@Body() addRoledto: AddRoleDto) {
    return this.usersService.addRole(addRoledto);
  }

  @HttpCode(200)
  @Post("remove_role")
  async removeRoles(@Body() addRoledto: AddRoleDto) {
    return this.usersService.addRole(addRoledto);
  }

  // @HttpCode(200)
  // @Post("avtivate")
  // async activateUser(@Body() activateUserDto: ActivateUserDto) {
  //   return this.usersService.ActivateUser(activateUserDto);
  // }
}
