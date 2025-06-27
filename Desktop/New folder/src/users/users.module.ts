import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import { RolesModule } from "../roles/roles.module";
import { Roles } from "../roles/model/role.model";
import { UserRole } from "./model/user-role.model";

@Module({
  imports: [SequelizeModule.forFeature([User, Roles, UserRole]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
