import { Controller, Get, Req, Patch, Body } from '@nestjs/common';
import { SettingService } from './setting.service';
import { Setting } from './setting.schema';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) { }

  @Get()
  findSetting(@Req() req) {
    const { id } = req.user;

    return this.settingService.findSetting(id);
  }

  @Patch()
  update(@Req() req, @Body() setting: Setting) {
    const { id } = req.user;

    return this.settingService.update(id, setting);
  }
}
