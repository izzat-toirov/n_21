import {
    IsInt,
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsPositive,
    MaxLength,
    Min,
    IsOptional,
  } from 'class-validator';

  import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';
  
  export class CreateProductDto implements Partial<Product> {
    @ApiProperty({ example: 2, description: 'Mahsulot yaratuvchisining ID raqami' })
    @IsInt({ message: 'Creator ID butun son bolishi kerak' })
    @IsPositive({ message: 'Creator ID musbat son bolishi kerak' })
    creator_id: number;
  
    @ApiProperty({ example: 'Nike Air Max', description: 'Mahsulot nomi' })
    @IsString({ message: 'Mahsulot nomi satr bolishi kerak' })
    @IsNotEmpty({ message: 'Mahsulot nomi bosh bolmasligi kerak' })
    @MaxLength(100, { message: 'Mahsulot nomi 100 belgidan oshmasligi kerak' })
    name: string;
  
    @ApiProperty({ example: 'Yengil va qulay sport oyoq kiyim', description: 'Mahsulot tavsifi' })
    @IsString({ message: 'Tavsif satr bolishi kerak' })
    @IsOptional()
    @MaxLength(255, { message: 'Tavsif 255 belgidan oshmasligi kerak' })
    description: string;
  
    @ApiProperty({ example: 3, description: 'Mahsulotga tegishli rasmlar soni' })
    @IsInt({ message: 'Rasm soni butun son bolishi kerak' })
    @IsOptional()
    @Min(0, { message: 'Rasm soni 0 yoki undan katta bolishi kerak' })
    product_images: number;
  
    @ApiProperty({ example: 15, description: 'Ombordagi mavjud soni' })
    @IsInt({ message: 'Ombordagi soni butun son bolishi kerak' })
    @Min(0, { message: 'Ombordagi soni 0 yoki undan katta bolishi kerak' })
    in_stock: number;
  
    @ApiProperty({ example: true, description: 'Mahsulot mavjudmi yoki yoq' })
    @IsBoolean({ message: 'Mavjudlik true yoki false bolishi kerak' })
    is_available: boolean;
  
    @ApiProperty({ example: 249.99, description: 'Mahsulot narxi' })
    @IsPositive({ message: 'Narx musbat son bolishi kerak' })
    price: number;
  
    @ApiProperty({ example: 5, description: 'Kategoriya ID raqami' })
    @IsInt({ message: 'Category ID butun son bolishi kerak' })
    @IsPositive({ message: 'Category ID musbat son bolishi kerak' })
    category_id: number;
  }
  