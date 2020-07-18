import {
  Entity,
  CreateDateColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@servicelabsco/nestjs-utility-services';

@Entity('sys_user_validations')
export class UserValidation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source_type: string;

  @Column()
  source_id: number;

  @Column()
  token: string;

  @Column()
  valid_upto: number;

  @Column()
  verified_at: Date;
}
