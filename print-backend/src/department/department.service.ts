import { Inject, Injectable } from '@nestjs/common';
import { Department } from './department.schema';
import { TRPCError } from '@trpc/server';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Injectable()
export class DepartmentService {
  private departments: Department[] = [];

  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
  ) {}

  //the thing actually doing the data saving, so this is where we'd hook into the database
  createDepartment(departmentData: Department) {
    this.departments.push(departmentData);
    return departmentData;
  }

  updateDepartment(id: number, data: Partial<Department>) {
    const departmentIndex = this.departments.findIndex(
      (department) => department.id === id,
    );
    if (departmentIndex === -1) {
      throw new TRPCError({
        message: 'Department not found',
        code: 'NOT_FOUND',
      });
    }
    this.departments[departmentIndex] = {
      ...this.departments[departmentIndex],
      ...data,
    };
    return this.departments[departmentIndex];
  }

  deleteDepartment(id: number) {
    const departmentIndex = this.departments.findIndex(
      (department) => department.id === id,
    );
    if (departmentIndex === -1) {
      return false;
    }
    this.departments.splice(departmentIndex, 1);
    return true;
  }

  getDepartmentById(id: number) {
    const department = this.departments.find(
      (department) => department.id === id,
    );
    if (!department) {
      throw new TRPCError({
        message: 'Department not found',
        code: 'NOT_FOUND',
      });
    }
    return department;
  }

  getAllDepartments() {
    return this.departments;
  }
}
