import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ServicesEntity } from '../models/Services.entity';
import { Services } from '../models/Services.interface';


@Injectable()
export class Services_Service {
    constructor(
        @InjectRepository(ServicesEntity)
        private readonly ServicesRepository: Repository<ServicesEntity>,
      ) {}

      create_services(Services_create:Services): Observable<Services>{
          return from(this.ServicesRepository.save(Services_create));
        }
        findAll(): Observable<Services[]> {
        return from(this.ServicesRepository.find());
    }
    findOne(id) : Observable<Services[]>{
      return from(this.ServicesRepository.query(`SELECT * FROM "service" WHERE "applicationId"= ${id}`));
    }
    }