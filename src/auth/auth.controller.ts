import { BadRequestException, Body, Controller, Post, ValidationPipe,} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.dto';
import { SignupDTO } from './dto/signup.dto';
import { ConfirmationCredentialsDTO } from './dto/confirmation.dto';
import { userService } from 'src/user/services/user.service';

@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post('Signin')
  async login( @Body(ValidationPipe) authenticateRequest: LoginDTO, ) {
    try {  
      return await this.authService.signIn(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/Signup')
  public async register(@Body(ValidationPipe) credentials: SignupDTO) {
    const singUpInput = plainToClass(SignupDTO, credentials);
    return  this.authService.registerUser(singUpInput);
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
