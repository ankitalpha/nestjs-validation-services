import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '@servicelabsco/nestjs-utility-services';

@Entity('sys_user_validations')
export class UserValidation extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  source_type: string;

  @Column()
  source_id: number;

  @Column()
  token: string;

  @Column()
  valid_upto: string;

  @Column()
  verified_at: Date;

  @Column()
  type_id: number;
}
