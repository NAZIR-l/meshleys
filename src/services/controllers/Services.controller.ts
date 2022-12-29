import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {  Services_Service } from '../Services/Services.service';
import { Observable } from 'rxjs';
import { Services } from '../models/Services.interface';

@Controller('services')
export class Services_Controller {
    constructor(private applicationservice: Services_Service){}
    
@Post('create')
create_services(@Body() post:Services){
    return this.applicationservice.create_services(post);
}

@Get('findAll')
findAll_services(): Observable<Services[]> {
    return this.applicationservice.findAll();
}
@Get('findAllById/:id')
findOne(@Param('id') id:Services):Observable<Services[]>  {
    return this.applicationservice.findOne(id);
}
}
