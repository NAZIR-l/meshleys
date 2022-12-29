import { ServicesEntity } from '../../services/models/Services.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn} from 'typeorm';


@Entity('application')
export class applicationPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @OneToMany(() => ServicesEntity, (service) => service.application)
  services: ServicesEntity[]


}
