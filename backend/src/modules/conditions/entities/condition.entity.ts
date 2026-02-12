import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Route } from '../../routes/entities/route.entity';

export enum ConditionOperator {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  REGEX = 'REGEX',
}

export enum ParameterSource {
  QUERY = 'QUERY',
  HEADER = 'HEADER',
  BODY = 'BODY',
  PATH = 'PATH',
}

@Entity('conditions')
export class Condition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  routeId: string;

  @ManyToOne(() => Route, (route) => route.conditions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'routeId' })
  route: Route;

  @Column()
  parameterName: string;

  @Column({
    type: 'enum',
    enum: ParameterSource,
  })
  parameterSource: ParameterSource;

  @Column({
    type: 'enum',
    enum: ConditionOperator,
  })
  operator: ConditionOperator;

  @Column({ type: 'text' })
  expectedValue: string;

  @Column({ type: 'jsonb' })
  response: Record<string, any>;

  @Column({ type: 'int', nullable: true })
  statusCode: number;

  @Column({ type: 'int', default: 0 })
  priority: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
