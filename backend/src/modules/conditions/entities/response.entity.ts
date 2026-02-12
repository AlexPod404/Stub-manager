import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Condition } from './condition.entity';

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  conditionId: string;

  @OneToOne(() => Condition, (condition) => condition.response, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'conditionId' })
  condition: Condition;

  @Column({ type: 'integer', default: 200 })
  statusCode: number;

  @Column({ type: 'jsonb' })
  body: any;

  @Column({ type: 'jsonb', nullable: true })
  headers: Record<string, string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
