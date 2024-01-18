import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { SettingModule } from './setting/setting.module';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MulterModule.register({
      dest: './upload/avatar',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: process.env.MONGODB_NAME }),
    UserModule,
    AuthModule,
    TaskModule,
    SettingModule,
    PingModule,
  ],
})
export class AppModule { }
