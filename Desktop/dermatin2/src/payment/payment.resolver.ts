import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  createPayment(@Args('createPaymentDto') createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Query(() => [Payment], { name: 'getAllPayments' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Query(() => Payment, { name: 'getPayment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.findOne(id);
  }

  @Mutation(() => Payment)
  updatePayment(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePaymentDto') updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Mutation(() => Boolean)
  async removePayment(@Args('id', { type: () => Int }) id: number) {
    await this.paymentService.remove(id);
    return true;
  }
}
