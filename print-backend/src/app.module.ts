import { Module } from '@nestjs/common';
import { TrpcModule } from './trpc/trpc.module';
import { DatabaseModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { OrderModule } from './order/order.module';
import { ProfileModule } from './profile/profile.module';
import { TemplateModule } from './template/template.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    DatabaseModule,
    TrpcModule,
    UserModule,
    DepartmentModule,
    JobModule,
    OrderModule,
    TemplateModule,
    ProfileModule,
  ],
})
export class AppModule {}
