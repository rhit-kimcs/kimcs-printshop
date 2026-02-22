import { Inject, Injectable } from '@nestjs/common';
import { Job } from './job.schema';
import { TRPCError } from '@trpc/server';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Injectable()
export class JobService {
  private jobs: Job[] = [];

  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
  ) {}

  //the thing actually doing the data saving, so this is where we'd hook into the database
  createJob(jobData: Job) {
    this.jobs.push(jobData);
    return jobData;
  }

  updateJob(id: number, data: Partial<Job>) {
    const jobIndex = this.jobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) {
      throw new TRPCError({
        message: 'Job not found',
        code: 'NOT_FOUND',
      });
    }
    this.jobs[jobIndex] = {
      ...this.jobs[jobIndex],
      ...data,
    };
    return this.jobs[jobIndex];
  }

  deleteJob(id: number) {
    const jobIndex = this.jobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) {
      return false;
    }
    this.jobs.splice(jobIndex, 1);
    return true;
  }

  getJobById(id: number) {
    const job = this.jobs.find((job) => job.id === id);
    if (!job) {
      throw new TRPCError({
        message: 'Job not found',
        code: 'NOT_FOUND',
      });
    }
    return job;
  }

  getAllJobs() {
    return this.jobs;
  }
}
