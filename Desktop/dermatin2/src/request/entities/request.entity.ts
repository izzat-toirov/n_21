import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Request
 {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column()
  user_id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  status: string;
}
