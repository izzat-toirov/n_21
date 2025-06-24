import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.create(createCategoryDto);
  }

  async findAll() {
    return await this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.categoryModel.findByPk(id);
  }

  async findOneCATEGORY(id: number) {
    try {
      const category = await this.categoryModel.findByPk(id);
      if (!category) {
        throw new HttpException(
          {
            success: false,
            message: 'Kategoriya topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Kategoriya topildi',
        data: category,
      };
    } catch (error) {
      console.error(error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: 'Kategoriya olishda xatolik',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }
  

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deletedCount = await this.categoryModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error(`Social with id ${id} not found.`);
    }
    return { message: 'Deleted successfully.' };
  }
}
