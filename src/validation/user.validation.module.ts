import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpController } from './otp.controller';
import { OtpService } from './services/user.validation.service';

@Module({
    imports : [
        TypeOrmModule.forRoot(),
    ],
    controllers : [OtpController],
    providers : [OtpService],
})
export class OtpModule {}
