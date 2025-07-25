import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSocialDto {
  @Field()
  name: string;
  @Field()
  type: string;
  @Field()
  link: string;
  @Field()
  store_id: number;
}
