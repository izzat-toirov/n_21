import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
      @InjectRepository(Request)
      private readonly requestRepo: Repository<Request>,
    ) {}

   async create(createRequestDto: CreateRequestDto): Promise<Request> {
      const Request = this.requestRepo.create(createRequestDto);
      return this.requestRepo.save(Request);
    }
  
    async findAll(): Promise<Request[]> {
      return this.requestRepo.find();
    }
  
    async findOne(id: number): Promise<Request> {
      const Request = await this.requestRepo.findOneBy({ id });
      if (!Request) {
        throw new Error('Request not found');
      }
      return Request;
    }
  
    async update(
      id: number,
      updateRequestDto: UpdateRequestDto,
    ): Promise<Request> {
      await this.requestRepo.update(id, updateRequestDto);
      return this.findOne(id);
    }
  
    async remove(id: number): Promise<void> {
      await this.requestRepo.delete(id);
    }
}
