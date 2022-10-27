import { ApiProperty } from '@nestjs/swagger';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ConfirmationCredentialsDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  ClientId: string;

  @ApiProperty()
  @IsEmail()
  Username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Pool: CognitoUserPool;

  @ApiProperty()
  @IsString()
  ConfirmationCode: string;
}
