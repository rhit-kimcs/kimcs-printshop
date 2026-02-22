import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobRouter } from './job.router';

@Module({
  providers: [JobService, JobRouter],
})
export class JobModule {}
