import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class createTableEquipements1593336575385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Equipement',
            columns: [
                new TableColumn({
                    name: 'id',
                    type: 'int',
                    isNullable: false,
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: 'increment',
                }),
                new TableColumn({
                    name: 'nom',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                }),
                new TableColumn({
                    name: 'cout',
                    type: 'json',
                    isNullable: false,
                }),
                new TableColumn({
                    name: 'logo',
                    type: 'varchar',
                    isNullable: false,
                }),
                new TableColumn({
                    name: 'bonus',
                    type: 'varchar',
                    isNullable: false,
                }),
                new TableColumn({
                    name: 'info',
                    type: 'text',
                    isNullable: false,
                }),
                new TableColumn({
                    name: 'reparer',
                    type: 'boolean',
                    isNullable: false,
                    default: false,
                }),
                new TableColumn({
                    name: 'img',
                    type: 'varchar',
                    isNullable: false,
                }),
            ],
        }))

        await queryRunner.createTable(new Table({
            name: 'Joueur_Equipement',
            columns: [
                new TableColumn({
                    name: 'joueurId',
                    type: 'varchar',
                    isNullable: false,
                }),
                new TableColumn({
                    name: 'equipementId',
                    type: 'int',
                    isNullable: false,
                }),
            ],
            uniques: [{ columnNames: ['joueurId', 'equipementId'] }],
            foreignKeys: [
                {
                    columnNames: ['joueurId'],
                    referencedTableName: 'Joueur',
                    referencedColumnNames: ['id'],
                },
                {
                    columnNames: ['equipementId'],
                    referencedTableName: 'Equipement',
                    referencedColumnNames: ['id'],
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey('Equipement')
        await queryRunner.dropTable('Equipement')
        await queryRunner.dropTable('Joueur_Couleur')
    }

}
