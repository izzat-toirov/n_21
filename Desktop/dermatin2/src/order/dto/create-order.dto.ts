import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderDto {
  @Field()
  user_id: number;
  @Field()
  store_id: number;
  @Field()
  dermatin_id: number;
  @Field()
  total_prise: number;
  @Field()
  remaing_prise: number;
}
