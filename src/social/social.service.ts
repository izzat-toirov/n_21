import { Injectable } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Social } from './entities/social.entity';
import { SocialModule } from './social.module';

@Injectable()
export class SocialService {
  constructor(@InjectModel(Social) private socialModel: typeof Social){}
  async create(createSocialDto: CreateSocialDto) {
    return await this.socialModel.create(createSocialDto);
  }

  async findAll() {
    return await this.socialModel.findAll({ include: { all:true } });
  }

  async findOne(id: number) {
    return this.socialModel.findByPk(id);
  }

  async update(id: number, updateSocialDto: UpdateSocialDto) {
    return await this.socialModel.update(updateSocialDto, {
      where: { id }, returning: true,
    });
  }

  async remove(id: number) {
    const deletedCount = await this.socialModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error(`Social with id ${id} not found.`);
    }
    return { message: 'Deleted successfully.' };
  }
  
}
