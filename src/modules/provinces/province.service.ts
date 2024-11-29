import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SearchProvinceCodeDto } from 'src/search-province-code.dto';
import { ApiError } from '../common/classes/api-error';
import { chain } from 'lodash';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProvinceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.province.findMany();
  }

  async getListProvinceCode(query?: SearchProvinceCodeDto) {
    let prismaQuery: Prisma.ProvinceCodeFindManyArgs = {
      orderBy: { code: 'asc' },
      include: { province: true },
    };

    if (query) {
      const { keyword } = query;
      const provinceCode = Number(keyword.slice(0, 2));
      if (!Number.isInteger(provinceCode)) {
        throw new ApiError('Biển số không hợp lệ', HttpStatus.BAD_REQUEST);
      }
      prismaQuery = {
        ...prismaQuery,
        where: {
          code: provinceCode,
        },
      };
    }

    const provinceCodes = await this.prisma.provinceCode.findMany(prismaQuery);

    return chain(provinceCodes)
      .groupBy((item) => item.provinceId)
      .map((value, key) => {
        return {
          id: key,
          orderByCode: value[0].code,
          name: value[0]['province'].name,
          codes: value.map((item) => item.code.toString()).join(', '),
        };
      })
      .orderBy('orderByCode', 'asc')
      .value();
  }
}
