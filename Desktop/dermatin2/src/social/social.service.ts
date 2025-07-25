import { Injectable } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Social } from './entities/social.entity';

@Injectable()
export class SocialService {
   constructor(
      @InjectRepository(Social)
      private readonly socialRepo: Repository<Social>,
    ) {}

async create(createSocialDto: CreateSocialDto): Promise<Social> {
    const Social = this.socialRepo.create(createSocialDto);
    return this.socialRepo.save(Social);
  }

  async findAll(): Promise<Social[]> {
    return this.socialRepo.find();
  }

  async findOne(id: number): Promise<Social> {
    const Social = await this.socialRepo.findOneBy({ id });
    if (!Social) {
      throw new Error('Social not found');
    }
    return Social;
  }

  async update(
    id: number,
    updateSocialDto: UpdateSocialDto,
  ): Promise<Social> {
    await this.socialRepo.update(id, updateSocialDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.socialRepo.delete(id);
  }
}
