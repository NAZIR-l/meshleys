import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class userService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
      ) {}
        createUser(CreateUser:User): Observable<User>{
          return from(this.UserRepository.save(CreateUser));
        }
        findAll(): Observable<User[]> {
        return from(this.UserRepository.find());
    }
}