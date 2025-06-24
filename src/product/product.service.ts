import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesService } from '../categories/categories.service';
import { Product } from './entities/product.entity';
// import { AdminsModule } from '../admins/admins.module';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    private readonly adminService: AdminsService,
    private readonly CategoryService: CategoriesService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const creator = await this.adminService.findOneADMIN(
        createProductDto.creator_id,
      );
      if (!creator) {
        throw new HttpException(
          {
            success: false,
            message: 'creator topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const category = await this.CategoryService.findOneCATEGORY(
        createProductDto.category_id,
      );
      if (!category) {
        throw new HttpException(
          {
            success: false,
            message: 'category topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const newProduct = await this.productModel.create(createProductDto);
      return {
        success: true,
        message: 'Product yaratildi',
        data: newProduct,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Product yaratilmadi',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.findAll();
      return {
        success: true,
        message: 'Barcha Productlar',
        count: products.length,
        data: products,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Productlar topilmadi',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    return this.productModel.findByPk(id);
  }

  async findOnePRODUCT(id: number) {
    try {
      const product = await this.productModel.findByPk(id);
      if (!product) {
        throw new HttpException(
          {
            success: false,
            message: 'product topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'product topildi',
        data: product,
      };
    } catch (error) {
      console.error(error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: 'productni olishda xatolik',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productModel.findByPk(id);
      if (!product) {
        throw new HttpException(
          {
            success: false,
            message: 'product topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const updated = await product.update(updateProductDto);
      return {
        success: true,
        message: 'product yangilandi',
        data: updated,
      };
    } catch (error) {
      console.error(error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: 'product yangilanmadi',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productModel.findByPk(id);
      if (!product) {
        throw new HttpException(
          {
            success: false,
            message: 'product topilmadi',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await product.destroy();
      return {
        success: true,
        message: 'product ochirildi',
      };
    } catch (error) {
      throw error instanceof HttpException
        ? error
        : new HttpException(
            {
              success: false,
              message: 'productni ochirishda xatolik',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }
}
