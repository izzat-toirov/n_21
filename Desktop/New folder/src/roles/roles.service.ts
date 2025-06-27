import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Roles } from "./model/role.model";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles)
    private readonly rolesModel: typeof Roles,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const newrole = await this.rolesModel.create({
        ...createRoleDto,
        value: createRoleDto.value.toUpperCase(),
      });
      return {
        success: true,
        message: "Admin yaratildi",
        data: newrole,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          message: "role yaratilmadi",
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const roles = await this.rolesModel.findAll();
      return {
        success: true,
        message: "Barcha rolelar",
        count: roles.length,
        data: roles,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "rolelar topilmadi",
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.rolesModel.findByPk(id);
      if (!role) {
        throw new HttpException(
          {
            success: false,
            message: "role topilmadi",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: "role topildi",
        data: role,
      };
    } catch (error) {
      console.error(error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: "roleni olishda xatolik",
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async findRoleByValue(value: string) {
    try {
      return this.rolesModel.findOne({ where: { value: value.toUpperCase() } });
    } catch (error) {
      console.error(error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: "roleni olishda xatolik",
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.rolesModel.findByPk(id);
      if (!role) {
        throw new HttpException(
          {
            success: false,
            message: "role topilmadi",
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const updated = await role.update({
        ...updateRoleDto,
        value: updateRoleDto.value?.toUpperCase(),
      });
      return {
        success: true,
        message: "role yangilandi",
        data: updated,
      };
    } catch (error) {
      console.error(error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: "role yangilanmadi",
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async remove(id: number) {
    try {
      const role = await this.rolesModel.findByPk(id);
      if (!role) {
        throw new HttpException(
          {
            success: false,
            message: "role topilmadi",
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await role.destroy();
      return {
        success: true,
        message: "role ochirildi",
      };
    } catch (error) {
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: "roleni ochirishda xatolik",
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }
}
