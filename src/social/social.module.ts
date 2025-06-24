import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Social } from './entities/social.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Social]), FilesModule],
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
