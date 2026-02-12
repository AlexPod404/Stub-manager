import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
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

  @Column({ unique: true })
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

  @Column({ type: 'int', default: 0 })
  responseDelay: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @OneToMany(() => Route, (route) => route.mock)
  routes: Route[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
