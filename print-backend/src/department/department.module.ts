import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentRouter } from './department.router';

@Module({
  providers: [DepartmentService, DepartmentRouter],
})
export class DepartmentModule {}
