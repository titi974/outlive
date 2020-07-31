import { MigrationInterface, QueryRunner } from 'typeorm'
import * as csv from 'csvtojson'
import * as path from 'path'

export class DatasSalles1593765454994 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const salles = await csv({ noheader: false }).fromFile(
            path.join(__dirname, '../../../../../ressources/salles.csv'),
        )
        let insert =
            'INSERT INTO `Salle` (`nom`,`activation`, `info`,`img`,`action`,`type`,`combien`,`entretien`,`place`) VALUES '
        insert += salles
            .map(
                ({ nom, activation, info, img, action, type, combien, entretien, place }) =>
                    `('${nom}','${activation}','${info}','${img}','${action}','${type}','${combien}','${entretien}','${place}')`,
            )
            .join(' , ')
        await queryRunner.query(insert)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('TRUNCATE TABLE `Salle`')
    }
}
