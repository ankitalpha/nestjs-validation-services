import { Controller, Get } from '@nestjs/common';
import { ValidationUtility } from './validation/services/validation.utility.service';
import { ValidationDto } from './dto/validation.dto';
import { Validation } from './validation/entities/validation.entity';
import { getRepository, getManager } from 'typeorm';

@Controller()
export class AppController {
  @Get()
  getHello(): any {
    let dto: any = new ValidationDto();
    dto = {
      source_type: 'User',
      source_id: 123,
      valid_upto: 60,
      verified_at: null,
      token: '',
      type_id: 1,
    };

    const a = new ValidationUtility(dto, 'numeric', 6);

    const b = a.generateToken();

    return b;

    const c = new ValidationUtility(dto);
    const d = c.verifyToken();

    return d;
  }
}
