import { Inject, Injectable } from '@nestjs/common';
import { Order } from './order.schema';
import { TRPCError } from '@trpc/server';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Injectable()
export class OrderService {
  private orders: Order[] = [];

  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
  ) {}

  //the thing actually doing the data saving, so this is where we'd hook into the database
  createOrder(orderData: Order) {
    this.orders.push(orderData);
    return orderData;
  }

  updateOrder(id: number, data: Partial<Order>) {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new TRPCError({
        message: 'Order not found',
        code: 'NOT_FOUND',
      });
    }
    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      ...data,
    };
    return this.orders[orderIndex];
  }

  deleteOrder(id: number) {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      return false;
    }
    this.orders.splice(orderIndex, 1);
    return true;
  }

  getOrderById(id: number) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new TRPCError({
        message: 'Order not found',
        code: 'NOT_FOUND',
      });
    }
    return order;
  }

  getAllOrders() {
    return this.orders;
  }
}
