import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class createAbris1592842620923 implements MigrationInterface {
    name = 'createAbris1592842620923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `Abris` (`id` varchar(255) NOT NULL, `ressources` JSON NULL, `radioactivite` int NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB',
        )
        await queryRunner.addColumn(
            'Joueur',
            new TableColumn({ name: 'abrisId', type: 'varchar', isNullable: true }),
        )

        await queryRunner.createForeignKey(
            'Joueur',
            new TableForeignKey({
                columnNames: ['abrisId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'Abris',
                onDelete: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('Joueur')
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('abrisId') !== -1)
        await queryRunner.dropForeignKey('Joueur', foreignKey)
        await queryRunner.dropColumn(
            'Joueur',
            new TableColumn({
                name: 'abrisId',
                type: 'varchar',
            }),
        )
        await queryRunner.dropTable('Abris')
    }
}
