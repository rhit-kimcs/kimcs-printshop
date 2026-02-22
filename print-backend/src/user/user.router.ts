import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { UserService } from './user.service';
import { userSchema } from './user.schema';
import type { User } from './user.schema';
import { Inject } from '@nestjs/common';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Router({ alias: 'user' })
export class UserRouter {
  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
    private readonly userService: UserService,
  ) {}

  @Query({
    input: z.object({ id: z.number() }),
    output: userSchema,
  })
  async getUser(@Input('id') id: number) {
    const result = await this.pool
      .request()
      .input('id', mssql.Int, id)
      .execute(`dbo.GetUser`);

    console.log('Update result:', result.recordset);
    return result.recordset[0] as User;
  }

  @Query({
    output: z.array(userSchema),
  })
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    console.log(users);
    const parsed = userSchema.array().safeParse(users);
    return parsed.success ? parsed.data : [];
  }

  @Mutation({
    input: userSchema,
    output: userSchema,
  })
  createUser(@Input() userData: User) {
    return this.userService.createUser(userData);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
      data: userSchema.partial(),
    }),
    output: userSchema,
  })
  async updateUser(
    @Input('id') id: number,
    @Input('data') data: Partial<User>,
  ) {
    return await this.userService.updateUser(id, data);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
      data: userSchema
        .extend({
          department: z.string().nullable(),
          FOPAL: z.string().nullable(),
        })
        .partial(),
    }),
    output: userSchema,
  })
  async updateUserProfile(
    @Input('id') id: number,
    @Input('data')
    data: Partial<
      User & {
        department: string | null;
        FOPAL: string | null;
      }
    >,
  ) {
    console.log(data);
    const result = await this.pool
      .request()
      .input('id', mssql.Int, id)
      .input('first', mssql.NVarChar, data.first)
      .input('last', mssql.NVarChar, data.last)
      .input('phone', mssql.NVarChar, data.phone)
      .input('department', mssql.NVarChar, data.department)
      .input('FOPAL', mssql.NVarChar, data.FOPAL)
      .execute(`dbo.UpdateUserProfile`);

    console.log('Update result:', result.recordset);
    return result.recordset[0] as User;
  }

  @Mutation({
    input: z.object({
      id: z.number(),
    }),
    output: z.boolean(),
  })
  deleteUser(@Input('id') id: number) {
    //return this.userService.deleteUser(id);
  }
}
