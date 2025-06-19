import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Social } from './entities/social.entity';

@Module({
  imports:[SequelizeModule.forFeature([Social])],
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
