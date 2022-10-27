import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthConfig } from './auth.config';
import { ConfirmationCredentialsDTO } from './dto/confirmation.dto';
import { SignupDTO } from './dto/signup.dto';
@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  async authenticateUser(user: { name: string; password: string }) {
    const { name, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });

    const userData = {
      Username: name,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log({ result });
          resolve(result);
        },
        onFailure: (err) => {
          console.error(err);
          reject(err);
        },
      });
    });
  }

  async registerUser(authRegisterUserDto: SignupDTO) {
    const { username, email, password } = authRegisterUserDto;

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        username,
        password,
        [
          new CognitoUserAttribute({
            Name: 'email',
            Value: email,
          }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async confirmRegistration(
    confirmationCredentials: ConfirmationCredentialsDTO,
  ) {
    return new Promise((resolve, reject) => {
      const { Username } = confirmationCredentials;
      const userData = {
        Username: Username,
        Pool: this.userPool,
      };

      const confirmUser = new CognitoUser(userData);

      return confirmUser.confirmRegistration(
        confirmationCredentials.ConfirmationCode,
        false,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }
}
