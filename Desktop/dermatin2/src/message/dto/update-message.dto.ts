import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @Field(() => Int)
  id: number;
}
