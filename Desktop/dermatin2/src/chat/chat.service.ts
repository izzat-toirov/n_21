import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const Chat = this.chatRepo.create(createChatDto);
    return this.chatRepo.save(Chat);
  }

  async findAll(): Promise<Chat[]> {
    return this.chatRepo.find();
  }

  async findOne(id: number): Promise<Chat> {
    const Chat = await this.chatRepo.findOneBy({ id });
    if (!Chat) {
      throw new Error('Chat not found');
    }
    return Chat;
  }

  async update(
    id: number,
    updateChatDto: UpdateChatDto,
  ): Promise<Chat> {
    await this.chatRepo.update(id, updateChatDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.chatRepo.delete(id);
  }
}
