import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialDto } from './create-social.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateSocialDto extends PartialType(CreateSocialDto) {
  @Field(() => Int)
  id: number;
}
