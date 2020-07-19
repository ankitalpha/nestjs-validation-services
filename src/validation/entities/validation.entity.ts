import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { CommonEntity } from '@servicelabsco/nestjs-utility-services';

/**
 * @export
 * @class Validation
 * @extends {CommonEntity}
 */
@Entity('sys_validations')
export class Validation extends BaseEntity {
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
