import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class CreateHistoryDto {
  @Field()
  dermatin_id: number;
  @Field()
  user_id: number;
}
