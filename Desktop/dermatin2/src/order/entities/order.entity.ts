import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column()
  user_id: number;
  
  @Field()
  @Column()
  store_id: number;
  
  @Field()
  @Column()
  dermatin_id: number;

  @Field()
  @Column()
  total_prise: number;
  
  @Field()
  @Column()
  remaing_prise: number;

}