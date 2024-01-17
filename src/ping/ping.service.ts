import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    this.logger.log('Ping server.');
  }
}