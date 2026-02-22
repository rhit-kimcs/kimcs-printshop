import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { TemplateService } from './template.service';
import { templateSchema } from './template.schema';
import type { Template } from './template.schema';
import { Inject } from '@nestjs/common';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Router({ alias: 'template' })
export class TemplateRouter {
  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
    private readonly templateService: TemplateService,
  ) {}

  @Query({
    input: z.object({ id: z.number(), uid: z.number() }),
    output: templateSchema,
  })
  async getTemplate(@Input('id') id: number, @Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('id', mssql.Int, id)
      .input('uid', mssql.Int, uid)
      .execute(`dbo.GetTemplate`);

    console.log('result:', result.recordset);
    return result.recordset[0] as Template;
  }

  @Query({
    input: z.object({ uid: z.number() }),
    output: z.array(templateSchema),
  })
  async listTemplates(@Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('uid', mssql.Int, uid)
      .execute(`dbo.ListTemplates`);

    console.log('result:', result.recordset);
    return result.recordset as Template[];
  }

  @Mutation({
    input: templateSchema,
    output: templateSchema,
  })
  createTemplate(@Input() templateData: Template) {
    return this.templateService.createTemplate(templateData);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
      data: templateSchema.partial(),
    }),
    output: templateSchema,
  })
  updateTemplate(
    @Input('id') id: number,
    @Input('data') data: Partial<Template>,
  ) {
    //return this.templateService.updateTemplate(id, data);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
    }),
    output: z.boolean(),
  })
  deleteTemplate(@Input('id') id: number) {
    //return this.templateService.deleteTemplate(id);
  }
}
