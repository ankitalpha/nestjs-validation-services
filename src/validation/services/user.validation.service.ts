import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserValidation } from '../entities/user.validation.entity';
import { Repository } from 'typeorm';
import { Crypt, CommonService } from '@servicelabsco/nestjs-utility-services';
import { UserValidationDto } from '../../dto/user.validation.dto';
import { getRepository } from 'typeorm';

export const generatorType = {
  alphanumeric:
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
};

@Injectable()
export class UserValidationService extends CommonService<UserValidation> {
  private token: string;
  private source_type: string;
  private source_id: number;
  private length: number;
  private valid_upto: number; //in minutes
  private type: string;

  constructor(
    @InjectRepository(UserValidation)
    private UserValidationRepository: Repository<UserValidation>,
    options: [],
  ) {
    super(UserValidationRepository);
    this.source_type = options['source_type'];
    this.source_id = options['source_id'];
    this.length = options['length'];
    this.valid_upto = options['valid_upto'];
    this.type = options['type'];
  }

  async generateOtp(type: string): Promise<string> {
    const unexpiredToken: any = this.checkUnexpiredToken();

    if (unexpiredToken) {
      return unexpiredToken.token;
    }

    this.createToken({
      source_id: this.source_id,
      source_type: this.source_type,
      valid_upto: 1234,
    });
    // await this.UserValidationRepository.createQueryBuilder('UserValidation')
    //   .insert()
    //   .into(UserValidation)
    //   .values([
    //     {
    //       source_type: this.source_type,
    //       source_id: this.source_id,
    //       token: this.generate(generatorType[type]),
    //       created_at: '1232',
    //       updated_at: '234',
    //       valid_upto: 12324,
    //     },
    //   ])
    //   .execute();

    return this.token;
  }

  async createToken(
    createTokenDto: UserValidationDto,
  ): Promise<UserValidation> {
    const userValidation = new UserValidation();

    userValidation.source_type = createTokenDto.source_type;
    userValidation.source_id = createTokenDto.source_id;
    userValidation.token = this.generate(generatorType[this.type]);
    userValidation.valid_upto = createTokenDto.valid_upto;

    await userValidation.save();

    return;
  }

  async getValidToken(userValidationDto: UserValidationDto): any {
    const query = await getRepository(UserValidation)
      .createQueryBuilder('uservalidation')
      .where('uservalidation.source_type = : type', {
        type: userValidationDto.source_type,
      })
      .where('uservalidation.source_id = : source_id', {
        source_id: this.source_id,
      })
      .where('uservalidation.verified_at IS NULL');

    return query;
  }

  async verifyToken(
    userValidationDto: UserValidationDto,
  ): Promise<UserValidation | null> {
    const query = this.getValidToken(userValidationDto);

    query.where('uservalidation.token = : token', { token: this.token });
    const userValidation = query.getOne();

    return userValidation ? userValidation.token : false;
  }

  async verifyOtp(): Promise<boolean> {
    const query = this.UserValidationRepository.createQueryBuilder(
      'uservalidation',
    );

    query.andWhere('uservalidation.source_type = : source_type', {
      source_type: this.source_type,
    });
    query.andWhere('uservalidation.source_id = : source_id', {
      source_id: this.source_id,
    });
    query.andWhere('uservalidation.token = : token ', { token: this.token });

    const record = await query.getOne();

    if (record && record.token === this.token) {
      return true;
    }

    return false;
  }

  private async checkUnexpiredToken(): Promise<any> {
    const query = this.UserValidationRepository.createQueryBuilder(
      'uservalidation',
    );

    query.andWhere('uservalidation.source_type = : source_type', {
      source_type: this.source_type,
    });
    query.andWhere('uservalidation.source_id = : source_id', {
      source_id: this.source_id,
    });
    query.andWhere('uservalidation.verified_at IS NULL');

    const record = await query.getOne();

    return record;
  }

  public generate(set: string): string {
    for (let i = this.length; i > 0; --i) {
      this.token += set.charAt[Math.floor(Math.random() * set.length)];
    }

    return this.token;
  }
}
