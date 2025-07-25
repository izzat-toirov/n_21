import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => Int)
  id: number;
  
  @Field({ nullable: true })
  full_name?: string;

  @Field({ nullable: true })
  email?: string;
}
