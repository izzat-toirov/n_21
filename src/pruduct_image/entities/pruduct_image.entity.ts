import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "../../product/entities/product.entity";

// product-imeg.model.ts (yoki product.entity.ts)
interface ProductImegCreationAttrs {
    product_id: number;
    img_url: string;
  }
  
  @Table({ tableName: 'product-Imeg' })
  export class ProductImeg extends Model<ProductImeg, ProductImegCreationAttrs> {
    @ForeignKey(() => Product)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    product_id: number;
  
    @BelongsTo(() => Product, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    product: Product;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    img_url: string;
  }
  