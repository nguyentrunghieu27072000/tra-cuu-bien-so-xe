import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [ProvinceController],
  providers: [ProvinceService, PrismaService],
  exports: [ProvinceService],
})
export class ProvinceModule {}
