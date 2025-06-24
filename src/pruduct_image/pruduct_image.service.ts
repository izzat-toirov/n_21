import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdatePruductImageDto } from './dto/update-pruduct_image.dto';
import { ProductImeg } from './entities/pruduct_image.entity';
import { CreatePruductImageDto } from './dto/create-pruduct_image.dto';
import { FilesService } from '../files/files.service';



@Injectable()
export class PruductImageService {
  constructor(
    @InjectModel(ProductImeg)
    private pruductImageModel: typeof ProductImeg,
    private readonly fileService: FilesService,
  ) {}

  async create(createPruductImageDto: CreatePruductImageDto, image: any) {
    try {
      const newImage = await this.pruductImageModel.create(createPruductImageDto);
    const fileName = await this.fileService.saveFile(image);
      return {
        success: true,
        message: 'Rasm muvaffaqiyatli qoʻshildi',
        data: newImage, image: fileName,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Rasmni yaratishda xatolik',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const images = await this.pruductImageModel.findAll();
      return {
        success: true,
        message: 'Barcha rasmlar olindi',
        data: images,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Rasmlarni olishda xatolik',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const image = await this.pruductImageModel.findByPk(id);
      if (!image) {
        throw new HttpException(
          {
            success: false,
            message: 'Rasm topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Rasm topildi',
        data: image,
      };
    } catch (error) {
      console.error(error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: 'Rasmni olishda xatolik',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async update(id: number, updatePruductImageDto: UpdatePruductImageDto) {
    try {
      const image = await this.pruductImageModel.findByPk(id);
      if (!image) {
        throw new HttpException(
          {
            success: false,
            message: 'Rasm topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await image.update(updatePruductImageDto);
      return {
        success: true,
        message: 'Rasm yangilandi',
        data: image,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Rasmni yangilashda xatolik',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const image = await this.pruductImageModel.findByPk(id);
      if (!image) {
        throw new HttpException(
          {
            success: false,
            message: 'Rasm topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await image.destroy();
      return {
        success: true,
        message: 'Rasm o‘chirildi',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Rasmni o‘chirishda xatolik',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
