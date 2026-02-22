import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileRouter } from './profile.router';

@Module({
  providers: [ProfileService, ProfileRouter],
})
export class ProfileModule {}
