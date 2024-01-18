import { Controller, Get } from '@nestjs/common';
import { NoAuth } from './decorators/public.decorator';

@Controller()
export class AppController {
  @Get()
  @NoAuth()
  baseUrl() {
    return 'OK';
  }
}
