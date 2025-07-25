import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestDto {
  @Field()
  user_id: number;
  @Field()
  text: string;
  @Field()
  status: string;
}
