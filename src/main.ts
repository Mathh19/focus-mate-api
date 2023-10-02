import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(8000);
  app.useStaticAssets(join(__dirname, '..', 'upload', 'avatar'));
  app.use(json({ limit: '200mb' }));
  app.use(
    urlencoded({ extended: true, limit: '200mb', parameterLimit: 200000 }),
  );
}
bootstrap();
