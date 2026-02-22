import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { DepartmentService } from './department.service';
import { departmentSchema } from './department.schema';
import type { Department } from './department.schema';
import { Inject } from '@nestjs/common';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';
@Router({ alias: 'department' })
export class DepartmentRouter {
  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
    private readonly departmentService: DepartmentService,
  ) {}

  @Query({
    input: z.object({ id: z.number(), uid: z.number() }),
    output: departmentSchema,
  })
  async getDepartment(@Input('id') id: number, @Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('id', mssql.Int, id)
      .input('uid', mssql.Int, uid)
      .execute(`dbo.GetDepartment`);

    console.log('result:', result.recordset);
    return result.recordset[0] as Department;
  }

  @Query({
    input: z.object({ uid: z.number() }),
    output: z.array(departmentSchema),
  })
  async listDepartments(@Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('uid', mssql.Int, uid)
      .execute(`dbo.ListDepartment`);

    console.log('result:', result.recordset);
    return result.recordset as Department[];
  }

  @Mutation({
    input: departmentSchema,
    output: departmentSchema,
  })
  createDepartment(@Input() departmentData: Department) {
    return this.departmentService.createDepartment(departmentData);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
      data: departmentSchema.partial(),
    }),
    output: departmentSchema,
  })
  updateDepartment(
    @Input('id') id: number,
    @Input('data') data: Partial<Department>,
  ) {
    //return this.departmentService.updateDepartment(id, data);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
    }),
    output: z.boolean(),
  })
  deleteDepartment(@Input('id') id: number) {
    //return this.departmentService.deleteDepartment(id);
  }
}
