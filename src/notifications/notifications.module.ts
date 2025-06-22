import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [SequelizeModule.forFeature([Notification])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
