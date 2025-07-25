import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const Message = this.messageRepo.create(createMessageDto);
    return this.messageRepo.save(Message);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepo.find();
  }

  async findOne(id: number): Promise<Message> {
    const Message = await this.messageRepo.findOneBy({ id });
    if (!Message) {
      throw new Error('Message not found');
    }
    return Message;
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    await this.messageRepo.update(id, updateMessageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.messageRepo.delete(id);
  }
}
