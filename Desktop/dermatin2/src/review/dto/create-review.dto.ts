import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewDto {
  @Field()
  dermatin_id: number;
  @Field()
  ranking: string;
  @Field()
  user_id: number;
}
