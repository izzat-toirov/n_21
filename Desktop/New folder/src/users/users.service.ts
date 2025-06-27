import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import { RolesService } from "../roles/roles.service";
import { Roles } from "../roles/model/role.model";
import { AddRoleDto } from "./dto/add-role.dto";
// import { ActiveRoleDto } from "./dto/active-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly roleService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.findRoleByValue(createUserDto.value);
    if (!role) {
      // throw new NotFoundException(`Not found such a role`)
      throw new HttpException(`Not found such a role`, HttpStatus.NOT_FOUND);
    }
    const newUser = await this.userModel.create(createUserDto);
    // await newUser.$set("roles", [role.id]);
    return newUser;
  }

  findAll() {
    return this.userModel.findAll({
      include: {
        model: Roles,
        attributes: ["id", "value"],
        through: { attributes: [] },
      },
    });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, { attributes: ["id", "name", "email"] });
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: {
        model: Roles,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });

    return user?.dataValues;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);
    if (!user) {
      throw new Error("Bunday foydalanuvchi mavjud emas");
    }
    const role = await this.roleService.findRoleByValue(addRoleDto.value);
    if (!role) {
      throw new NotFoundException(`Not found such a role`);
    }
    await user.$add("roles", role.id);
    const uptadeUser = await this.userModel.findByPk(addRoleDto.userId, {
      include: { all: true },
    });
    return uptadeUser;
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);
    if (!user) {
      throw new Error("Bunday foydalanuvchi mavjud emas");
    }
    const role = await this.roleService.findRoleByValue(addRoleDto.value);
    if (!role) {
      throw new NotFoundException(`Not found such a role`);
    }
    await user.$remove("roles", role.id);
    const uptadeUser = await this.userModel.findByPk(addRoleDto.userId, {
      include: { all: true },
    });
    return uptadeUser;
  }

  // async activeUser(activeRoleDto: ActiveRoleDto){
  //   const user = await this.userModel.findByPk(activeRoleDto.userId);
  //   if(!user){
  //     throw new Error("Bunday foydalanuvchi mavjud emas");

  //   }
  //   user.is_active=true;
  //   await user.save();
  //   return "User activated";
  // }
}
