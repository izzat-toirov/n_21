import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/entities/product.entity';

interface ICategory {
  name: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ICategory> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @HasMany(()=> Product)
  product:Product;
}
