import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto) {
    const hash = await bcrypt.hash(createAdminDto.password_hash, 10);
    return await this.adminModel.create({
      ...createAdminDto,
      password_hash: hash,
    });
  }

  async findAll() {
    return await this.adminModel.findAll({ include: { all: true } });
  }

  async findOneADMIN(id: number) {
    try {
      const admin = await this.adminModel.findByPk(id);
      if (!admin) {
        throw new HttpException(
          {
            success: false,
            message: 'Admin topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Admin topildi',
        data: admin,
      };
    } catch (error) {
      console.error(error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: 'Adminni olishda xatolik',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async findOne(id: number) {
    return await this.adminModel.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deletedCount = await this.adminModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error(`Social with id ${id} not found.`);
    }
    return { message: 'Deleted successfully.' };
  }
}
