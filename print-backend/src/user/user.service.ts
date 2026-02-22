import { Inject, Injectable } from '@nestjs/common';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';
import { User } from './user.schema';
import { TRPCError } from 'node_modules/@trpc/server/dist/unstable-core-do-not-import.mjs';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
  ) {}

  //the thing actually doing the data saving, so this is where we'd hook into the database
  createUser(userData: User) {
    this.users.push(userData);
    return userData;
  }

  async updateUser(id: number, data: Partial<User>) {
    const result = await this.pool
      .request()
      .input('id', mssql.Int, id)
      .input('first', mssql.NVarChar, data.first)
      .input('last', mssql.NVarChar, data.last)
      .input('phone', mssql.NVarChar, data.phone)
      .input('did', mssql.Int, data.default_did)
      .execute(`dbo.UpdateUser`);

    console.log('Update result:', result.recordset);
    return result.recordset[0] as User;
  }

  // deleteUser(id: string) {
  //   const userIndex = this.users.findIndex((user) => user.id === id);
  //   if (userIndex === -1) {
  //     return false;
  //   }
  //   this.users.splice(userIndex, 1);
  //   return true;
  // }

  // getUserById(id: string) {
  //   const user = this.users.find((user) => user.id === id);
  //   if (!user) {
  //     throw new TRPCError({
  //       message: 'User not found',
  //       code: 'NOT_FOUND',
  //     });
  //   }
  //   return user;
  // }

  async getAllUsers() {
    const result = await this.pool.query(
      'SELECT id, cid, first, last, email, phone, default_did FROM "Users"',
    );

    if (!result || !result.recordset) {
      throw new TRPCError({
        message: 'Failed to retrieve users',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    return result.recordset;
  }
}
