import { applicationPostEntity } from 'src/application/models/post.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  authid: string;

  @Column('boolean', { default: false })
  verified: boolean;


  @ManyToMany(() => applicationPostEntity)
    @JoinTable()
    applications: applicationPostEntity[]
}
