import {
  BadRequestException,
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.dto';
import { ConfirmationCredentialsDTO } from './dto/confirmation.dto';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(ValidationPipe)
    authenticateRequest: LoginDTO,
  ) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/signup')
  public async register(@Body(ValidationPipe) credentials: SignupDTO) {
    const singUpInput = plainToClass(SignupDTO, credentials);
    return this.authService.registerUser(singUpInput);
  }

  @Post('/confirm')
  @ApiOperation({
    summary: 'Confirm registered user',
  })
  public async confirmRegistration(
    @Body(ValidationPipe) confirmationCredentials: ConfirmationCredentialsDTO,
  ) {
    return this.authService.confirmRegistration(confirmationCredentials);
  }
}
