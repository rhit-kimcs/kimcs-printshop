import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { UserService } from './user.service';
import { userSchema } from './user.schema';
import type { User } from './user.schema';
import { Inject } from '@nestjs/common';
import mssql from 'mssql';
import { TRPCError } from '@trpc/server';
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
    console.log('Getting user with id:', id);
    if (!this.pool) {
      throw new Error(
        'Database pool is not injected. Ensure DatabaseModule is imported by UserModule and that the pool provider is available.',
      );
    }
    const result = await this.pool
      .request()
      .input('inputID', mssql.Int, id)
      .execute(`dbo.GetUser`);

    console.log("SP result:", result);
    console.log('Update result:', result.recordset);
    const row = result.recordset[0] as Record<string, unknown>;
    if (!row) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }
    const user: User = {
      id: Number(row.id),
      cid: String(row.cid ?? ''),
      first: String(row.first ?? ''),
      last: String(row.last ?? ''),
      email: String(row.email ?? ''),
      phone: row.phone_number != null ? String(row.phone_number) : (row.phone != null ? String(row.phone) : null),
      default_did: row.default_did != null ? Number(row.default_did) : null,
      department: row.name != null ? String(row.name) : (row.department != null ? String(row.department) : null),
      FOPAL: row.FOPAL != null ? String(row.FOPAL) : null,
    };
    return user;
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
      data: userSchema
        .extend({
          department: z.string().nullable(),
          FOPAL: z.string().nullable(),
        })
        .partial(),
    }),
    output: userSchema,
  })
  async updateUser(
    @Input('id') id: number,
    @Input('data') data: Partial<User> & { department?: string | null; FOPAL?: string | null },
  ) {
    await this.pool
      .request()
      .input('uid', mssql.Int, id)
      .input('cid', mssql.NVarChar, data.cid ?? '')
      .input('fname', mssql.NVarChar, data.first ?? '')
      .input('lname', mssql.NVarChar, data.last ?? '')
      .input('email', mssql.NVarChar, data.email ?? '')
      .input('phone_number', mssql.NVarChar, data.phone ?? '')
      .input('department_name', mssql.NVarChar, data.department ?? '')
      .input('FOPAL', mssql.NVarChar, data.FOPAL ?? '')
      .execute(`dbo.UpdateUser`);
    return this.getUser(id);
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
