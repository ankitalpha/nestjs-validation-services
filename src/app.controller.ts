import { Controller, Get } from '@nestjs/common';
import { UserValidationUtility } from './validation/services/user.validation.utility.service';
import { UserValidationDto } from './dto/user.validation.dto';

@Controller()
export class AppController {

  @Get()
  getHello(): any {
    let dto  : any = new UserValidationDto();
    dto = {
      'source_type' :  'User',
      'source_id' :  123,
      'valid_upto' : 60,
      'verified_at' :  null
    }
    const a =  new UserValidationUtility(dto, 'alphanumeric', 6);

    const b = a.generateToken();
    return b;
  }
}
