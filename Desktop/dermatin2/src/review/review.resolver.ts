import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  createReview(@Args('createReviewDto') createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Query(() => [Review], { name: 'getAllReviews' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Query(() => Review, { name: 'getReview' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.findOne(id);
  }

  @Mutation(() => Review)
  updateReview(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateReviewDto') updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Mutation(() => Boolean)
  async removeReview(@Args('id', { type: () => Int }) id: number) {
    await this.reviewService.remove(id);
    return true;
  }
}
