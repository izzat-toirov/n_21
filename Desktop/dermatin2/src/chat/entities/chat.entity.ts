import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Chat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column()
  user_id: number;
  
  @Field()
  @Column()
  store_id: number;

}
