import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
      @InjectRepository(Order)
      private readonly orderRepo: Repository<Order>,
    ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const Order = this.orderRepo.create(createOrderDto);
    return this.orderRepo.save(Order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  async findOne(id: number): Promise<Order> {
    const Order = await this.orderRepo.findOneBy({ id });
    if (!Order) {
      throw new Error('Order not found');
    }
    return Order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    await this.orderRepo.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepo.delete(id);
  }
}
