import { Module } from '@nestjs/common';
import { PruductImageService } from './pruduct_image.service';
import { PruductImageController } from './pruduct_image.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImeg } from './entities/pruduct_image.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([ProductImeg]), FilesModule],
  controllers: [PruductImageController],
  providers: [PruductImageService]
})
export class PruductImageModule {}
