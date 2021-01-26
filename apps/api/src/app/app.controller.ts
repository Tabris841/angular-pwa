import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('lessons')
  getLessons() {
    return this.appService.getLessons();
  }

  @Get('lesson/:id')
  getLesson(@Param('id') id: string) {
    return this.appService.getById(Number(id));
  }
}
