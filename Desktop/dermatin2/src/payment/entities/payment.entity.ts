import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  order_id: number;

  @Field()
  @Column()
  amout: string;

  @Field()
  @Column()
  method: number;

  @Field()
  @Column()
  user_id: number;

  @Field()
  @Column()
  status: string;
}