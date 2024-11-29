import {
  Controller,
  Get,
  Query,
  Render,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ApiResult } from '../common/classes/api-result';
import { SearchProvinceCodeDto } from 'src/search-province-code.dto';

@Controller('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('/')
  @Render('index')
  async getProvinces() {
    const result = await this.provinceService.findAll();
    return new ApiResult().success(result);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/search')
  async searchProvinceCode(@Query() query: SearchProvinceCodeDto) {
    const result = await this.provinceService.getListProvinceCode(query);
    return new ApiResult().success(result);
  }
}
