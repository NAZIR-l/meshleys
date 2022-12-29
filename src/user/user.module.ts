import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userController } from './controllers/user.controller';
import { UserEntity } from './models/user.entity';
import { userService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [userController],
  providers: [userService],
})
export class UserModule {}
