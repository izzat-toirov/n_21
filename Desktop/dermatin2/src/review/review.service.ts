import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
      @InjectRepository(Review)
      private readonly reviewRepo: Repository<Review>,
    ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const Review = this.reviewRepo.create(createReviewDto);
    return this.reviewRepo.save(Review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepo.find();
  }

  async findOne(id: number): Promise<Review> {
    const Review = await this.reviewRepo.findOneBy({ id });
    if (!Review) {
      throw new Error('Review not found');
    }
    return Review;
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    await this.reviewRepo.update(id, updateReviewDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepo.delete(id);
  }
}
