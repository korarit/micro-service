import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  type: string;

  @Column('int')
  count: number;

  @Column('float')
  price: number;

  @CreateDateColumn()
  createAt: Date;
}
