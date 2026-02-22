import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { OrderService } from './order.service';
import { orderSchema } from './order.schema';
import type { Order } from './order.schema';
import { Inject } from '@nestjs/common';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Router({ alias: 'order' })
export class OrderRouter {
  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
    private readonly orderService: OrderService,
  ) {}

  @Query({
    input: z.object({ id: z.number(), uid: z.number() }),
    output: orderSchema,
  })
  async getOrder(@Input('id') id: number, @Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('id', mssql.Int, id)
      .input('uid', mssql.Int, uid)
      .execute(`dbo.GetOrder`);

    console.log('result:', result.recordset);
    return result.recordset[0] as Order;
  }

  @Query({
    input: z.object({ uid: z.number() }),
    output: z.array(orderSchema),
  })
  async listOrders(@Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('uid', mssql.Int, uid)
      .execute(`dbo.ListOrders`);

    console.log('result:', result.recordset);
    return result.recordset as Order[];
  }

  @Mutation({
    input: orderSchema,
    output: orderSchema,
  })
  createOrder(@Input() orderData: Order) {
    return this.orderService.createOrder(orderData);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
      data: orderSchema.partial(),
    }),
    output: orderSchema,
  })
  updateOrder(@Input('id') id: number, @Input('data') data: Partial<Order>) {
    //return this.orderService.updateOrder(id, data);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
    }),
    output: z.boolean(),
  })
  deleteOrder(@Input('id') id: number) {
    //return this.orderService.deleteOrder(id);
  }
}
