import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services_Controller } from './controllers/Services.controller';
import { ServicesEntity } from './models/Services.entity';
import { Services_Service } from './Services/Services.service';


@Module({
  imports: [TypeOrmModule.forFeature([ServicesEntity])],
  controllers: [Services_Controller],
  providers: [Services_Service],
})
export class ServicesModule {}
