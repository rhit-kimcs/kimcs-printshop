import { Inject, Injectable } from '@nestjs/common';
import { Template } from './template.schema';
import { TRPCError } from '@trpc/server';
import mssql from 'mssql';
import { DATABASE_POOL } from '../db/db.provider';

@Injectable()
export class TemplateService {
  private templates: Template[] = [];

  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: mssql.ConnectionPool,
  ) {}

  //the thing actually doing the data saving, so this is where we'd hook into the database
  createTemplate(templateData: Template) {
    this.templates.push(templateData);
    return templateData;
  }

  updateTemplate(id: number, data: Partial<Template>) {
    const templateIndex = this.templates.findIndex(
      (template) => template.id === id,
    );
    if (templateIndex === -1) {
      throw new TRPCError({
        message: 'Template not found',
        code: 'NOT_FOUND',
      });
    }
    this.templates[templateIndex] = {
      ...this.templates[templateIndex],
      ...data,
    };
    return this.templates[templateIndex];
  }

  deleteTemplate(id: number) {
    const templateIndex = this.templates.findIndex(
      (template) => template.id === id,
    );
    if (templateIndex === -1) {
      return false;
    }
    this.templates.splice(templateIndex, 1);
    return true;
  }

  getTemplateById(id: number) {
    const template = this.templates.find((template) => template.id === id);
    if (!template) {
      throw new TRPCError({
        message: 'Template not found',
        code: 'NOT_FOUND',
      });
    }
    return template;
  }

  getAllTemplates() {
    return this.templates;
  }
}
