import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification) private notification: typeof Notification,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    return await this.notification.create(createNotificationDto);
  }

  async findAll() {
    return await this.notification.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.notification.findByPk(id);
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return await this.notification.update(updateNotificationDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deletedCount = await this.notification.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error(`Social with id ${id} not found.`);
    }
    return { message: 'Deleted successfully.' };
  }
}
