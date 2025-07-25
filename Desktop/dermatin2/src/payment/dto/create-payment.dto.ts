import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentDto {
  @Field()
  order_id: number;
  @Field()
  amout: string;
  @Field()
  method: number;
  @Field()
  user_id: number;
  @Field()
  status: string;
}
