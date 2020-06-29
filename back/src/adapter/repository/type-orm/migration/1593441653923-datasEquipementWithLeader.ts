import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class datasEquipementWithLeader1593441653923 implements MigrationInterface {

    cbk = (queryRunner: QueryRunner) => async ({ identite, nom }) => {
        await queryRunner.query('UPDATE `Leader` set `equipementId` = (SELECT id FROM `Equipement` ' +
            'WHERE `nom` = ?)' +
            'WHERE `identite` = ?', [nom, identite])
    }

    public async up(queryRunner: QueryRunner): Promise<void> {

        const cbk1 = this.cbk(queryRunner)

        await queryRunner.addColumn('Leader', new TableColumn({
            name: 'equipementId',
            type: 'int',
            isNullable: true
        }))

        const updatePromise = [
            {
                nom: 'JERRICAN',
                identite: 'ERIN McCARTHY',
            },
            {
                nom: `BATTE DE BASEBALL`,
                identite: 'GRAYSON PIGOTT',
            },
            {
                nom: `PIOCHE`,
                identite: 'JACOB ROWLETT',
            },
            {
                nom: `HACHE`,
                identite: 'KOOPER FROSTE',
            },
            {
                nom: `KIT D ARTIFICIER`,
                identite: 'LIZA VALENTINE',
            },
            {
                nom: `SAC A DOS`,
                identite: 'LILY-ROSE WELY',
            },
            {
                nom: `LAMPE TORCHE`,
                identite: 'MARY KOOLPEPPER',
            },
            {
                nom: `GRAPPIN`,
                identite: 'SOLEN LIVRICH',
            },
            {
                nom: `CAPTEUR THERMIQUE`,
                identite: 'SWIFTY BINGHAM',
            },
            {
                nom: `FUSIL A POMPE`,
                identite: 'WILSON FRYE',
            },
        ].map(cbk1)

        await Promise.all(updatePromise)

        await queryRunner.createForeignKey('Leader', new TableForeignKey({
            columnNames: ['equipementId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Equipement',
            onDelete: 'CASCADE',
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('Leader')
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('equipementId') !== -1)
        await queryRunner.dropForeignKey('Leader', foreignKey)
        await queryRunner.query('UPDATE `Leader` set `equipementId` = null')
    }

}
