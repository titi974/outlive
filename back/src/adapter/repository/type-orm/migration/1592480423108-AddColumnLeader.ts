import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnLeader1592480423108 implements MigrationInterface {
  name = 'AddColumnLeader1592480423108';
  private columns = [
    new TableColumn({
      name: 'identite',
      type: 'varchar(30)',
    }),
    new TableColumn({
      name: 'profession',
      type: 'varchar(50)',
    }),
    new TableColumn({
      name: 'age',
      type: 'int',
    }),
    new TableColumn({
      name: 'photo',
      type: 'varchar(20)',
    }),
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Leader', this.columns);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('Leader', this.columns);
  }
}
