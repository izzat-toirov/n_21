import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @Field(() => Int)
  id: number;
}
