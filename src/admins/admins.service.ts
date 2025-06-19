import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';


@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin){}
  async create(createAdminDto: CreateAdminDto) {
    return await this.adminModel.create(createAdminDto);
  }

  async findAll() {
    return await this.adminModel.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.adminModel.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.adminModel.update(updateAdminDto, {
      where: {id}, returning: true
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
