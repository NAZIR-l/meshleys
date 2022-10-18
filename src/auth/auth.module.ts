import { Module } from '@nestjs/common';
import { AuthConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthConfig, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
