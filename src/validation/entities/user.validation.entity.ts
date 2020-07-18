import { Entity, CreateDateColumn, Column, BaseEntity } from 'typeorm';
import { CommonEntity } from '@servicelabsco/nestjs-utility-services';

@Entity()
export class UserValidation extends BaseEntity {
  @Column()
  source_type: string;

  @Column()
  source_id: number;

  @Column()
  token: string;

  @Column()
  valid_upto: number;

  @CreateDateColumn()
  verified_at: Date;
}
