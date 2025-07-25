import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
      @Field(() => Int)
      id: number;
}
