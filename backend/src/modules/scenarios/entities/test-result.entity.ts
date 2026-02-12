import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum TestStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PARTIAL = 'PARTIAL',
}

@Entity('test_results')
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  scenarioId: string;

  @Column({
    type: 'enum',
    enum: TestStatus,
  })
  status: TestStatus;

  @Column({ type: 'jsonb' })
  results: Record<string, any>;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @CreateDateColumn()
  executedAt: Date;
}
