import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRouter } from './order.router';

@Module({
  providers: [OrderService, OrderRouter],
})
export class OrderModule {}
