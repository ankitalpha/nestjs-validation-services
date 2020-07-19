import * as config from 'config';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Check typeORM documentation for more information.
const db = config.get('db');
const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || db.host,
  port: process.env.DB_PORT || db.port,
  username: process.env.DB_PORT || db.user,
  password: process.env.DB_PASSWORD || db.password,
  database: process.env.DB_NAME || db.database,
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // listen for subscribers
  // subscribers: [join(__dirname, '/../**/*.subscriber{.ts,.js}')],

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  logger: 'file',

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrationsTableName: 'sys_migrations',
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },

  // change the naming strategy to snake case
  namingStrategy: new SnakeNamingStrategy(),
};

export = dbConfig;
