import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageDto {
  @Field()
  chat_id: number;
  @Field()
  text: string;
  @Field()
  is_read: number;
}
