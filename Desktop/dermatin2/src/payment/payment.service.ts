import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
      @InjectRepository(Payment)
      private readonly paymentRepo: Repository<Payment>,
    ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const Payment = this.paymentRepo.create(createPaymentDto);
    return this.paymentRepo.save(Payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find();
  }

  async findOne(id: number): Promise<Payment> {
    const Payment = await this.paymentRepo.findOneBy({ id });
    if (!Payment) {
      throw new Error('Payment not found');
    }
    return Payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    await this.paymentRepo.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepo.delete(id);
  }
}
