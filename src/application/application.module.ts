import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersController } from './controllers/controllers.controller';
import { applicationPostEntity } from './models/post.entity';
import { Services_Service } from './services/services.service';
// import { ServicesService } from './services/services.service';

@Module({
  imports: [TypeOrmModule.forFeature([applicationPostEntity])],
  controllers: [ControllersController],
  providers: [Services_Service],
})
export class ApplicationModule {}
