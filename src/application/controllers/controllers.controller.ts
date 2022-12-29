import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Services_Service } from '../services/services.service';
import { application } from '../models/post.interface';
import { Observable } from 'rxjs';

@Controller('applications')
export class ControllersController {
    constructor(private applicationservice: Services_Service){}
    
@Post('create')
create(@Body() post:application){
    return this.applicationservice.createPost(post);
}

@Get('findAll')
findAll(): Observable<application[]> {
    return this.applicationservice.findAll();
}

@Get('findAllById/:id')
findOne(@Param('id') id: application) {
    return this.applicationservice.findOne(id);
}

}
