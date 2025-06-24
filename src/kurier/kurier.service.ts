import { Injectable } from '@nestjs/common';
import { CreateKurierDto } from './dto/create-kurier.dto';
import { UpdateKurierDto } from './dto/update-kurier.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Kurier } from './entities/kurier.entity';

@Injectable()
export class KurierService {
  constructor(@InjectModel(Kurier) private kurierModel: typeof Kurier) {}
  async create(createKurierDto: CreateKurierDto) {
    return await this.kurierModel.create(createKurierDto);
  }

  async findAll() {
    return await this.kurierModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.kurierModel.findByPk(id);
  }

  async update(id: number, updateKurierDto: UpdateKurierDto) {
    return await this.kurierModel.update(updateKurierDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deletedCount = await this.kurierModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error(`Social with id ${id} not found.`);
    }
    return { message: 'Deleted successfully.' };
  }
}
