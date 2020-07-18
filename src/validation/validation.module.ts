import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserValidationService } from './services/user.validation.service';
import { UserValidation } from './entities/user.validation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserValidation])],
  controllers: [],
  providers: [UserValidationService],
})
export class ValidationModule {}
