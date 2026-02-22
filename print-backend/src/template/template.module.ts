import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateRouter } from './template.router';

@Module({
  providers: [TemplateService, TemplateRouter],
})
export class TemplateModule {}
