import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): any {
    return 'Hello World!';
    // let dto: any = new ValidationDto();
    // dto = {
    //   source_type: 'User',
    //   source_id: 123,
    //   valid_upto: 60,
    //   verified_at: null,
    //   token: '',
    //   type_id: 1,
    // };

    // const a = new ValidationUtility(dto, 'numeric', 6);

    // const b = a.generateToken();

    // return b;

    // const c = new ValidationUtility(dto);
    // const d = c.verifyToken();

    // return d;
  }
}
