import { Body, Controller, Get, Post } from '@nestjs/common';
import { userService } from '../services/user.service';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Controller('user')
export class userController {
    constructor(private Userservice: userService){}
    
@Post('create')
create(@Body() user:User){
    return this.Userservice.createUser(user);
}

@Get('findAll')
findAll(): Observable<User[]> {
    return this.Userservice.findAll();
}
}
