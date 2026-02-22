import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { ProfileService } from './profile.service';
import { profileSchema } from './profile.schema';
import type { Profile } from './profile.schema';
import { Inject } from '@nestjs/common';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Router({ alias: 'profile' })
export class ProfileRouter {
  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
    private readonly profileService: ProfileService,
  ) {}

  @Query({
    input: z.object({ id: z.number(), uid: z.number() }),
    output: profileSchema,
  })
  async getProfile(@Input('id') id: number, @Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('id', mssql.Int, id)
      .input('uid', mssql.Int, uid)
      .execute(`dbo.GetProfile`);

    console.log('result:', result.recordset);
    return result.recordset[0] as Profile;
  }

  @Query({
    input: z.object({ uid: z.number() }),
    output: z.array(profileSchema),
  })
  async listProfiles(@Input('uid') uid: number) {
    const result = await this.pool
      .request()
      .input('uid', mssql.Int, uid)
      .execute(`dbo.ListPrintingProfile`);

    console.log('result:', result.recordset);
    return result.recordset as Profile[];
  }

  @Mutation({
    input: profileSchema,
    output: profileSchema,
  })
  createProfile(@Input() profileData: Profile) {
    return this.profileService.createProfile(profileData);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
      data: profileSchema.partial(),
    }),
    output: profileSchema,
  })
  updateProfile(
    @Input('id') id: number,
    @Input('data') data: Partial<Profile>,
  ) {
    //return this.profileService.updateProfile(id, data);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
    }),
    output: z.boolean(),
  })
  deleteProfile(@Input('id') id: number) {
    //return this.profileService.deleteProfile(id);
  }
}
