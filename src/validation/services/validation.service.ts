import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Validation } from '../entities/validation.entity';
import { Repository } from 'typeorm';
import { CommonService } from '@servicelabsco/nestjs-utility-services';

/**
 * @export
 * @class ValidationService
 * @extends {CommonService<Validation>}
 */
@Injectable()
export class ValidationService extends CommonService<Validation> {
  constructor(
    @InjectRepository(Validation)
    private validationRepository: Repository<Validation>,
  ) {
    super(validationRepository);
  }
}
