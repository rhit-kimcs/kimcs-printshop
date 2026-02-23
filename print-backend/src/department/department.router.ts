import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { DepartmentService } from './department.service';
import { departmentSchema } from './department.schema';
import type { Department } from './department.schema';
import { Inject } from '@nestjs/common';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

function rowToDepartment(row: Record<string, unknown>): Department {
  const get = (k: string) => {
    const key = Object.keys(row).find((kk) => kk.toLowerCase() === k.toLowerCase());
    return key != null ? row[key] : undefined;
  };
  return {
    id: Number(get('id') ?? 0),
    name: String(get('name') ?? ''),
    FOPAL: String(get('FOPAL') ?? ''),
  };
}

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

    const row = (result.recordset?.[0] ?? {}) as Record<string, unknown>;
    return rowToDepartment(row);
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

    const rows = (result.recordset ?? []) as Array<Record<string, unknown>>;
    return rows.map((row) => rowToDepartment(row));
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
      uid: z.number(),
      name: z.string(),
      FOPAL: z.string(),
    }),
    output: departmentSchema,
  })
  async addDepartment(
    @Input('uid') uid: number,
    @Input('name') name: string,
    @Input('FOPAL') FOPAL: string,
  ) {
    await this.pool
      .request()
      .input('UserID', mssql.Int, uid)
      .input('DepartmentName', mssql.NVarChar(100), name)
      .input('FOPAL', mssql.NVarChar(100), FOPAL)
      .execute(`dbo.AddDepartment`);
    const list = await this.pool
      .request()
      .input('uid', mssql.Int, uid)
      .execute(`dbo.ListDepartment`);
    const rows = (list.recordset ?? []) as Array<Record<string, unknown>>;
    const added = rows.find((r) => {
      const d = rowToDepartment(r);
      return d.name === name && d.FOPAL === FOPAL;
    });
    if (!added) throw new Error('AddDepartment did not return the new department');
    return rowToDepartment(added);
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
