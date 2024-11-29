import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './modules/provinces/province.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { CronService } from './cron/cron.service';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    ProvinceModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule {}
