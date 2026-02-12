import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Scenario } from './scenario.entity';

export enum ActionType {
  START_MOCK = 'START_MOCK',
  STOP_MOCK = 'STOP_MOCK',
  SET_DELAY = 'SET_DELAY',
  WAIT = 'WAIT',
  HTTP_REQUEST = 'HTTP_REQUEST',
}

@Entity('scenario_actions')
export class ScenarioAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  scenarioId: string;

  @ManyToOne(() => Scenario, (scenario) => scenario.actions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scenarioId' })
  scenario: Scenario;

  @Column({ type: 'int' })
  order: number;

  @Column({
    type: 'enum',
    enum: ActionType,
  })
  actionType: ActionType;

  @Column({ type: 'jsonb' })
  parameters: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
