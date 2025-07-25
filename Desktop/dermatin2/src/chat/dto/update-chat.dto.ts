import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateChatDto extends PartialType(CreateChatDto) {
  @Field(() => Int)
  id: number;
}
