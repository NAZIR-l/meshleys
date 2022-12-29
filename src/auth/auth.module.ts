import { Module } from '@nestjs/common';
import { AuthConfig } from '../config/auth.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/models/user.entity';



@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([UserEntity])],
  providers: [ AuthConfig, AuthService , JwtStrategy  ,Repository],
  controllers: [AuthController],
})
export class AuthModule {}
