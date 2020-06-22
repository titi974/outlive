import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addColumnLeaderIntoJoueur1592604561417
  implements MigrationInterface {
  name = 'addColumnLeaderIntoJoueur1592604561417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Joueur',
      new TableColumn({
        name: 'leaderId',
        type: 'mediumint',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'Joueur',
      new TableForeignKey({
        columnNames: ['leaderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Leader',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Joueur');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('leaderId') !== -1,
    );
    await queryRunner.dropForeignKey('Joueur', foreignKey);
    await queryRunner.dropColumn(
      'Joueur',
      new TableColumn({
        name: 'leaderId',
        type: 'mediumint',
      }),
    );
  }
}
