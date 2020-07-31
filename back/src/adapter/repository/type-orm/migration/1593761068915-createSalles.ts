import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class CreateSalles1593761068915 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Salle',
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
                        type: 'varchar(80)',
                        isNullable: false,
                        isUnique: true,
                    }),
                    new TableColumn({
                        name: 'activation',
                        type: 'varchar(30)',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'info',
                        type: 'text',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'img',
                        type: 'varchar(30)',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'action',
                        type: 'varchar(40)',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'type',
                        type: 'varchar(1)',
                        isNullable: false,
                        default: false,
                    }),
                    new TableColumn({
                        name: 'combien',
                        type: 'varchar(10)',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'entretien',
                        type: 'int',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'place',
                        type: 'int',
                        isNullable: false,
                    }),
                ],
            }),
        )

        await queryRunner.createTable(
            new Table({
                name: 'Abris_Salles',
                columns: [
                    new TableColumn({
                        name: 'abrisId',
                        type: 'varchar',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'salleId',
                        type: 'int',
                        isNullable: false,
                    }),
                ],
                uniques: [{ columnNames: ['abrisId', 'salleId'] }],
                foreignKeys: [
                    {
                        columnNames: ['abrisId'],
                        referencedTableName: 'Abris',
                        referencedColumnNames: ['id'],
                    },
                    {
                        columnNames: ['salleId'],
                        referencedTableName: 'Salle',
                        referencedColumnNames: ['id'],
                    },
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey('Salle')
        await queryRunner.dropTable('Salle')
        await queryRunner.dropTable('Abris_Salles')
    }
}
