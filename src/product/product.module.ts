import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
// import { Admin } from '../admins/entities/admin.entity';
import { AdminsModule } from '../admins/admins.module';
import { CategoriesModule } from '../categories/categories.module';
// import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product]), AdminsModule, CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
