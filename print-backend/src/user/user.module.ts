import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRouter } from './user.router';
import { DatabaseModule } from '../db/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserRouter],
})
export class UserModule {}
