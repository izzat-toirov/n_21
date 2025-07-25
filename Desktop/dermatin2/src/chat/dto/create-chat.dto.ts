import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatDto {
  @Field()
  user_id: number;

  @Field()
  store_id: number;
}
