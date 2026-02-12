import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ScenarioAction } from './scenario-action.entity';

export enum ScenarioStatus {
  DRAFT = 'DRAFT',
  READY = 'READY',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity('scenarios')
export class Scenario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ScenarioStatus,
    default: ScenarioStatus.DRAFT,
  })
  status: ScenarioStatus;

  @OneToMany(() => ScenarioAction, (action) => action.scenario)
  actions: ScenarioAction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
