import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './setting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema },
    ])],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService]
})
export class SettingModule { }
