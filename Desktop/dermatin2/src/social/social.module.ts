import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Social } from './entities/social.entity';
import { SocialResolver } from './social.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Social])],
  controllers: [SocialController],
  providers: [SocialService, SocialResolver],
  exports: [SocialService],
})
export class SocialModule {}
