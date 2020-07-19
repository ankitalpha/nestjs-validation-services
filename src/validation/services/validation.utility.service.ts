import { Validation } from '../entities/validation.entity';
import { DateUtil } from '@servicelabsco/nestjs-utility-services';
import { ValidationDto } from '../../dto/validation.dto';
import { getRepository } from 'typeorm';

export const generatorType = {
  alphanumeric:
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
};

/**
 * @export
 * @class ValidationUtility
 */
export class ValidationUtility {
  private token = '';
  private length: number;
  private valid_upto: number; //in minutes
  private validationDto: ValidationDto;
  private tokenType: string;

  /**
   * Creates an instance of ValidationUtility.
   * @param {ValidationDto} ValidationDto
   * @param {string} [tokenType='alphanumeric']
   * @param {number} [length=6]
   * @memberof ValidationUtility
   */
  constructor(
    validationDto: ValidationDto,
    tokenType = 'alphanumeric',
    length = 6,
  ) {
    this.validationDto = validationDto;
    this.token = validationDto.token;
    this.valid_upto = validationDto.valid_upto;
    this.length = length;
    this.tokenType = tokenType;
  }

  /**
   * @returns {(Promise<string | any>)}
   * @memberof ValidationUtility
   */
  public async generateToken(): Promise<string | any> {
    const query = await this.getValidToken();
    const record = await query.getOne();

    if (record) {
      return record.token;
    }

    return this.createToken();
  }

  /**
   * @private
   * @returns {Promise<string>}
   * @memberof ValidationUtility
   */
  private async createToken(): Promise<string> {
    this.generate(generatorType[this.tokenType]);
    const record = new Validation();

    record.source_type = this.validationDto.source_type;
    record.source_id = this.validationDto.source_id;
    record.token = this.token;
    record.valid_upto = DateUtil.getFutureDateTime(this.valid_upto);
    record.type_id = this.validationDto.type_id;

    await record.save();

    return record.token;
  }

  /**
   * @private
   * @returns {Promise<any>}
   * @memberof ValidationUtility
   */
  private async getValidToken(): Promise<any> {
    const query = getRepository(Validation)
      .createQueryBuilder('validate')
      .where('validate.source_type = :type', {
        type: this.validationDto.source_type,
      })
      .andWhere('validate.source_id = :source_id', {
        source_id: this.validationDto.source_id,
      })
      .andWhere('validate.verified_at IS NULL');

    return query;
  }

  /**
   *
   *
   * @returns {(Promise<string | boolean>)}
   * @memberof ValidationUtility
   */
  public async verifyToken(): Promise<string | boolean> {
    const query = await this.getValidToken();

    query.andWhere('validate.token = :token', { token: this.token });
    const record = await query.getOne();

    if (!record || record.token !== this.token) {
      return false;
    }

    record.verified_at = DateUtil.getDateTime();
    record.save();
    return true;
  }

  /**
   *
   *
   * @private
   * @param {string} set
   * @returns {string}
   * @memberof ValidationUtility
   */
  private generate(set: string): void {
    for (let i = this.length; i > 0; --i) {
      this.token += set.charAt(Math.floor(Math.random() * set.length));
    }
  }
}
