import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @Field(() => Int)
  id: number;
}
