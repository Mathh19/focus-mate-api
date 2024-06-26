import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const https = require('https');

@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    this.logger.debug('Ping server.');
    const url = process.env.HOST;
    return new Promise((resolve, reject) => {
      const req = https.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve({
            statusCode: 200,
            body: 'Server pinged successfully',
          });
        } else {
          reject(
            new Error(`Server ping failed with status code: ${res.statusCode}`)
          );
        }
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }
}