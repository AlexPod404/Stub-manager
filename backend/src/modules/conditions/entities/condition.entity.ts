import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Route } from '../../routes/entities/route.entity';
import { Response } from './response.entity';

export enum ConditionType {
  EQUALS = 'equals',
  CONTAINS = 'contains',
  REGEX = 'regex',
}

export enum ParameterSource {
  HEADER = 'header',
  QUERY = 'query',
  BODY = 'body',
  PATH = 'path',
}

@Entity('conditions')
export class Condition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  routeId: string;

  @ManyToOne(() => Route, (route) => route.conditions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'routeId' })
  route: Route;

  @Column({
    type: 'enum',
    enum: ConditionType,
    default: ConditionType.EQUALS,
  })
  type: ConditionType;

  @Column({ type: 'varchar', length: 255 })
  parameterName: string;

  @Column({
    type: 'enum',
    enum: ParameterSource,
    default: ParameterSource.QUERY,
  })
  parameterSource: ParameterSource;

  @Column({ type: 'varchar', length: 500, nullable: true })
  parameterPath: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ type: 'integer', default: 0 })
  priority: number;

  @OneToOne(() => Response, (response) => response.condition, { cascade: true })
  response: Response;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
