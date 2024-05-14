import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  product_id: number;

  @Column('int')
  order_total: number;

  @Column('text')
  address: string;

  @CreateDateColumn()
  createAt: Date;
}
