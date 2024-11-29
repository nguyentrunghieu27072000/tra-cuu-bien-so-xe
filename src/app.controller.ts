import { ProvinceService } from './modules/provinces/province.service';
import { Controller, Get, Render } from '@nestjs/common';
import { ApiResult } from './modules/common/classes/api-result';

@Controller()
export class AppController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  @Render('index')
  async index() {
    const result = await this.provinceService.getListProvinceCode();
    return new ApiResult().success(result);
  }
}
