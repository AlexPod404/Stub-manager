import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ScenarioAction } from './scenario-action.entity';
import { ScenarioExecution } from './scenario-execution.entity';

@Entity('scenarios')
export class Scenario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => ScenarioAction, (action) => action.scenario, { cascade: true })
  actions: ScenarioAction[];

  @OneToMany(() => ScenarioExecution, (execution) => execution.scenario)
  executions: ScenarioExecution[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
