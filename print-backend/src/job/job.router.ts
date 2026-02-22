import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { JobService } from './job.service';
import { jobSchema } from './job.schema';
import type { Job } from './job.schema';
import { Inject } from '@nestjs/common';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Router({ alias: 'job' })
export class JobRouter {
  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
    private readonly jobService: JobService,
  ) {}

  @Query({
    input: z.object({ id: z.number(), uid: z.number() }),
    output: jobSchema,
  })
  async getJob(@Input('id') id: number, @Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('id', mssql.Int, id)
      .input('uid', mssql.Int, uid)
      .execute(`dbo.GetJob`);

    console.log('result:', result.recordset);
    return result.recordset[0] as Job;
  }

  @Query({
    input: z.object({ uid: z.number() }),
    output: z.array(jobSchema),
  })
  async listJobs(@Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('uid', mssql.Int, uid)
      .execute(`dbo.ListJobs`);

    console.log('result:', result.recordset);
    return result.recordset as Job[];
  }

  @Mutation({
    input: jobSchema,
    output: jobSchema,
  })
  createJob(@Input() jobData: Job) {
    return this.jobService.createJob(jobData);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
      data: jobSchema.partial(),
    }),
    output: jobSchema,
  })
  updateJob(@Input('id') id: number, @Input('data') data: Partial<Job>) {
    //return this.jobService.updateJob(id, data);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
    }),
    output: z.boolean(),
  })
  deleteJob(@Input('id') id: number) {
    //return this.jobService.deleteJob(id);
  }
}
