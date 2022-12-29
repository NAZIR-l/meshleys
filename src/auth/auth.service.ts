import { Injectable } from '@nestjs/common';
import {  CognitoUser, CognitoUserAttribute, CognitoUserPool, } from 'amazon-cognito-identity-js';
import { AuthConfig } from '../config/auth.config';
import { SignupDTO } from './dto/signup.dto';
import { ConfirmationCredentialsDTO } from './dto/confirmation.dto';
import { Auth } from 'aws-amplify';
import { UserEntity } from 'src/user/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from } from 'rxjs';



@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
    private readonly authConfig: AuthConfig
    
    ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  async signIn(users: { username: string; password: string }) {
    try {
      const { username, password } = users;
      const user = await Auth.signIn(username, password);
      console.log(user)
    } catch (error) {
      return error
    }
  }

  async registerUser(authRegisterUserDto: SignupDTO) {
    const { username, gender,email, password  } = authRegisterUserDto;
    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        username,
        password,
        [
          new CognitoUserAttribute({
            Name: 'email',
            Value: email,
          }),
          new CognitoUserAttribute({
            Name: 'gender',
            Value: gender,
          }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            const authid = result.userSub
            from(this.UserRepository.save({username,email,authid}));
          
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
            const find = this.UserRepository.findOneBy({ username : Username },);
            console.log("find")
            find.then((res)=>{
              console.log(res);

                this.UserRepository.update({
                id: res.id,
              }, {
                verified: true,
              });
           
           
           
            })
            resolve(result);
          }
        },
      );
    });
  }
}

