import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class UserValidation1594987422520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sys_user_validations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            unsigned: true,
            generationStrategy: 'increment',
          },
          { name: 'source_type', type: 'varchar' },
          { name: 'source_id', type: 'int' },
          { name: 'token', type: 'varchar' },
          { name: 'type_id', type: 'int', isNullable: true },
          { name: 'verified_at', type: 'datetime', isNullable: true },
          { name: 'valid_upto', type: 'datetime', isNullable: false },
          { name: 'deleted_at', type: 'datetime', isNullable: true },
          { name: 'updated_at', type: 'datetime', isNullable: true },
          { name: 'created_at', type: 'datetime', isNullable: true },
          {
            name: 'created_by', //make it foreign key in future
            type: 'bigint',
            isNullable: true,
            unsigned: true,
          },
          {
            name: 'updated_by', //make it foreign key in future
            type: 'bigint',
            isNullable: true,
            unsigned: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'sys_user_validations',
      new TableIndex({
        name: 'sys_user_validations_source_type_source_id',
        columnNames: ['source_type', 'source_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(new Table({ name: 'sys_user_validations' }));

    global.console.log('Reverted Migration ', __filename);
  }
}
