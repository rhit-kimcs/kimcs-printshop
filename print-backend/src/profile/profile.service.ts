import { Inject, Injectable } from '@nestjs/common';
import { Profile } from './profile.schema';
import { TRPCError } from '@trpc/server';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Injectable()
export class ProfileService {
  private profiles: Profile[] = [];

  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
  ) {}

  //the thing actually doing the data saving, so this is where we'd hook into the database
  createProfile(profileData: Profile) {
    this.profiles.push(profileData);
    return profileData;
  }

  updateProfile(id: number, data: Partial<Profile>) {
    const profileIndex = this.profiles.findIndex(
      (profile) => profile.id === id,
    );
    if (profileIndex === -1) {
      throw new TRPCError({
        message: 'Profile not found',
        code: 'NOT_FOUND',
      });
    }
    this.profiles[profileIndex] = {
      ...this.profiles[profileIndex],
      ...data,
    };
    return this.profiles[profileIndex];
  }

  deleteProfile(id: number) {
    const profileIndex = this.profiles.findIndex(
      (profile) => profile.id === id,
    );
    if (profileIndex === -1) {
      return false;
    }
    this.profiles.splice(profileIndex, 1);
    return true;
  }

  getProfileById(id: number) {
    const printingProfile = this.profiles.find((profile) => profile.id === id);
    if (!printingProfile) {
      throw new TRPCError({
        message: 'Profile not found',
        code: 'NOT_FOUND',
      });
    }
    return printingProfile;
  }

  getAllProfiles() {
    return this.profiles;
  }
}
