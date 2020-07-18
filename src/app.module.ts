import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
import * as ormconfig from './ormconfig';
import { ValidationModule } from './validation/validation.module';

export function DatabaseOrmModule(): DynamicModule {
  // we could load the configuration from dotEnv here,
  // but typeORM cli would not be able to find the configuration file.

  return TypeOrmModule.forRoot(ormconfig);
}

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ValidationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
