import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { applicationPostEntity } from '../models/post.entity';
import { application } from '../models/post.interface';

@Injectable()
export class Services_Service {
    constructor(
        @InjectRepository(applicationPostEntity)
        private readonly applicationPostRepository: Repository<applicationPostEntity>,
      ) {}

        createPost(application_post:application): Observable<application>{
          return from(this.applicationPostRepository.save(application_post));
        }
        findAll(): Observable<application[]> {
        return from(this.applicationPostRepository.find());
        } 
        findOne(id_E): Observable<application>{
          console.log(id_E);
          return from(this.applicationPostRepository.findOne({where: {
            id: id_E,
        },}));
        }
    }
