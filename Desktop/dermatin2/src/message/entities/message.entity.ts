import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column()
  chat_id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  is_read: number;
}
