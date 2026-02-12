import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Scenario } from './scenario.entity';

export enum ActionType {
  START = 'start',
  STOP = 'stop',
  SET_DELAY = 'set_delay',
}

@Entity('scenario_actions')
export class ScenarioAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  scenarioId: string;

  @ManyToOne(() => Scenario, (scenario) => scenario.actions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'scenarioId' })
  scenario: Scenario;

  @Column({ type: 'integer' })
  timeOffsetMs: number;

  @Column({
    type: 'enum',
    enum: ActionType,
  })
  actionType: ActionType;

  @Column({ type: 'uuid' })
  targetMockId: string;

  @Column({ type: 'jsonb', nullable: true })
  params: any;

  @Column({ type: 'integer' })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
