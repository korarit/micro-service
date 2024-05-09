import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column('text')
  firstname: string;

  @Column('text')
  lastname: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  createAt: Date;
}
