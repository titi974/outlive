import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addColumnRessourceToLeader1592913541777 implements MigrationInterface {
  name = 'addColumnRessourceToLeader1592913541777'
  readonly column = new TableColumn({
    name: 'ressources',
    type: 'json',
    isNullable: false,
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('Leader', this.column)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Leader', this.column)
  }
}
