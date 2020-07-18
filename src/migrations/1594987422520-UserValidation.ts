import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserValidation1594987422520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'utl_user_validations',
        columns: [
          {
            name: 'id', type: 'int',isPrimary: true,
          },
          {
            name: 'source_type',
            type: 'varchar',
          },
          {
            name: 'source_id',
            type: 'int',
          },
          {
            name: 'token',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'utl_validations',
      new TableIndex({
        name: 'utl_validations_source_type_source_id',
        columnNames: ['source_type', 'source_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
