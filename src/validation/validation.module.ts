import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationService } from './services/validation.service';
import { Validation } from './entities/validation.entity';

/**
 * @export
 * @class ValidationModule
 */
@Module({
  imports: [TypeOrmModule.forFeature([Validation])],
  controllers: [],
  providers: [ValidationService],
})
export class ValidationModule {}
