import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Route } from '../../routes/entities/route.entity';

export enum MockProtocol {
  REST = 'REST',
  GRPC = 'GRPC',
  KAFKA = 'KAFKA',
}

export enum MockStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('mocks')
export class Mock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: MockProtocol,
    default: MockProtocol.REST,
  })
  protocol: MockProtocol;

  @Column({
    type: 'enum',
    enum: MockStatus,
    default: MockStatus.INACTIVE,
  })
  status: MockStatus;

  @OneToMany(() => Route, (route) => route.mock)
  routes: Route[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
