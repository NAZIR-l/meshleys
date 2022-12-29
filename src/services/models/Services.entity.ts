import { applicationPostEntity } from '../../application/models/post.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn} from 'typeorm';


@Entity('service')
export class ServicesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => applicationPostEntity, (application) => application.services)
  application: applicationPostEntity

}
