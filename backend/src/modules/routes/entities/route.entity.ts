import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Mock } from '../../mocks/entities/mock.entity';
import { Condition } from '../../conditions/entities/condition.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  mockId: string;

  @ManyToOne(() => Mock, (mock) => mock.routes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mockId' })
  mock: Mock;

  @Column({ type: 'varchar', length: 255 })
  path: string;

  @Column({ type: 'varchar', length: 10, default: 'GET' })
  method: string;

  @Column({ type: 'integer', default: 0 })
  delayMs: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Condition, (condition) => condition.route)
  conditions: Condition[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
