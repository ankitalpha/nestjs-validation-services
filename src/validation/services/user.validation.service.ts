import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserValidation } from '../entities/user.validation.entity';
import { Repository } from 'typeorm';
import { CommonService } from '@servicelabsco/nestjs-utility-services';

@Injectable()
export class UserValidationService extends CommonService<UserValidation> {
  constructor(
    @InjectRepository(UserValidation)
    private UserValidationRepository: Repository<UserValidation>,
  ) {
    super(UserValidationRepository);
  }
}