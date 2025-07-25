import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
      @InjectRepository(History)
      private readonly historyRepo: Repository<History>,
    ) {}

  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const History = this.historyRepo.create(createHistoryDto);
    return this.historyRepo.save(History);
  }

  async findAll(): Promise<History[]> {
    return this.historyRepo.find();
  }

  async findOne(id: number): Promise<History> {
    const History = await this.historyRepo.findOneBy({ id });
    if (!History) {
      throw new Error('History not found');
    }
    return History;
  }

  async update(
    id: number,
    updateHistoryDto: UpdateHistoryDto,
  ): Promise<History> {
    await this.historyRepo.update(id, updateHistoryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.historyRepo.delete(id);
  }
}
