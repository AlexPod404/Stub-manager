import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Mock } from '../../mocks/entities/mock.entity';
import { Condition } from '../../conditions/entities/condition.entity';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mockId: string;

  @ManyToOne(() => Mock, (mock) => mock.routes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mockId' })
  mock: Mock;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: HttpMethod,
    default: HttpMethod.GET,
  })
  method: HttpMethod;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  defaultResponse: Record<string, any>;

  @Column({ type: 'int', nullable: true })
  statusCode: number;

  @OneToMany(() => Condition, (condition) => condition.route)
  conditions: Condition[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
