import { UserValidation } from '../entities/user.validation.entity';
import { CommonService } from '@servicelabsco/nestjs-utility-services';
import { UserValidationDto } from '../../dto/user.validation.dto';
import { getRepository } from 'typeorm';

export const generatorType = {
  alphanumeric:
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
};

export class UserValidationUtility {
  private token: string;
  private source_type: string;
  private source_id: number;
  private length: number;
  private valid_upto: number; //in minutes
  private tokenType: string;
  private type  : number;
  private userValidationDto: UserValidationDto;

  constructor(
    userValidationDto: UserValidationDto,
    tokenType: string,
    length: number,
  ) {
    this.token = userValidationDto.token;
    this.source_type = userValidationDto.source_type;
    this.source_id = userValidationDto.source_id;
    this.type = userValidationDto.type;
    this.valid_upto = userValidationDto.valid_upto;
    this.length = length;
    this.createDTO();
  }

  createDTO(): any {
    this.userValidationDto = {
      'source_type': this.source_type,
      'source_id': this.source_id,
      'valid_upto': 1234,
      'token': this.token,
      'type' : this.type,
      'verified_at'  :  null
    };
  }

  async generateToken(): Promise<string | any> {
    const query = await this.getValidToken();
    const token = query.getOne();

    if (token) {
      return token.token;
    }

    this.createToken();

    return this.token;
  }

  async createToken(): Promise<UserValidation> {
    const userValidation = new UserValidation();

    userValidation.source_type = this.userValidationDto.source_type;
    userValidation.source_id = this.userValidationDto.source_id;
    userValidation.token = this.generate(generatorType[this.type]);
    userValidation.valid_upto = this.userValidationDto.valid_upto;

    // await userValidation.save();

    return userValidation;
  }

  async getValidToken(): Promise<any> {
    const query = getRepository(UserValidation)
      .createQueryBuilder('validate')
      .where('validate.source_type = : type', {
        type: this.userValidationDto.source_type,
      })
      .where('validate.source_id = : source_id', {
        source_id: this.userValidationDto.source_id,
      })
      .where('validate.verified_at IS NULL');

    return query;
  }

  async verifyToken(): Promise<string | boolean> {
    const query = await this.getValidToken();

    query.where('validation.token = : token', { token: this.token });
    const userValidation = query.getOne();

    return userValidation ? userValidation.token : false;
  }

  async verifyOtp(): Promise<string | boolean> {
    return this.verifyToken();
  }

  private async checkUnexpiredToken(): Promise<UserValidation | null> {
    const query = await this.getValidToken();
    return await query.getOne();
  }

  public generate(set: string): string {
    for (let i = this.length; i > 0; --i) {
      this.token += set.charAt[Math.floor(Math.random() * set.length)];
    }

    return this.token;
  }
}
