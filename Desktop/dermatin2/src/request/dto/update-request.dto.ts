import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRequestDto extends PartialType(CreateRequestDto) {
  @Field(() => Int)
  id: number;
}
