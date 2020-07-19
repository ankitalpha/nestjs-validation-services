import { UserValidation } from '../entities/user.validation.entity';
import {
  CommonService,
  DateUtil,
} from '@servicelabsco/nestjs-utility-services';
import { UserValidationDto } from '../../dto/user.validation.dto';
import { getRepository } from 'typeorm';

export const generatorType = {
  alphanumeric:
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
};

export class UserValidationUtility {
  private token = '';
  private length: number;
  private valid_upto: number; //in minutes
  private userValidationDto: UserValidationDto;
  private tokenType: string;

  /**
   *Creates an instance of UserValidationUtility.
   * @param {UserValidationDto} userValidationDto
   * @param {string} [tokenType='alphanumeric']
   * @param {number} [length=6]
   * @memberof UserValidationUtility
   */
  constructor(
    userValidationDto: UserValidationDto,
    tokenType = 'alphanumeric',
    length = 6,
  ) {
    this.userValidationDto = userValidationDto;
    this.token = userValidationDto.token;
    this.valid_upto = userValidationDto.valid_upto;
    this.length = length;
    this.tokenType = tokenType;
  }

  public async generateToken(): Promise<string | any> {
    const query = await this.getValidToken();
    const validationRecord = await query.getOne();

    if (validationRecord) {
      return validationRecord.token;
    }

    return this.createToken();
  }

  private async createToken(): Promise<string> {
    const userValidation = new UserValidation();

    userValidation.source_type = this.userValidationDto.source_type;
    userValidation.source_id = this.userValidationDto.source_id;
    userValidation.token = this.generate(generatorType[this.tokenType]);
    userValidation.valid_upto = DateUtil.getFutureDateTime(this.valid_upto);
    userValidation.type_id = this.userValidationDto.type_id;

    await userValidation.save();

    return userValidation.token;
  }

  private async getValidToken(): Promise<any> {
    const query = getRepository(UserValidation)
      .createQueryBuilder('validate')
      .where('validate.source_type = :type', {
        type: this.userValidationDto.source_type,
      })
      .andWhere('validate.source_id = :source_id', {
        source_id: this.userValidationDto.source_id,
      })
      .andWhere('validate.verified_at IS NULL');

    return query;
  }

  public async verifyToken(): Promise<string | boolean> {
    const query = await this.getValidToken();

    query.andWhere('validate.token = :token', { token: this.token });
    const userValidation = await query.getOne();

    if (!userValidation || userValidation.token !== this.token) {
      return false;
    }

    userValidation.verified_at = DateUtil.getDateTime();
    userValidation.save();
    return true;
  }

  private generate(set: string): string {
    for (let i = this.length; i > 0; --i) {
      this.token += set.charAt(Math.floor(Math.random() * set.length));
    }

    return this.token;
  }
}
