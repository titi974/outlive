import { MigrationInterface, QueryRunner } from 'typeorm'
import * as csv from 'csvtojson'
import * as path from 'path'

export class datasEquipements1593378233278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const equipements = await csv({ noheader: false }).fromFile(path.join(__dirname, '../../../../../ressources/equipements.csv'))
        let insert = 'INSERT INTO `Equipement` (`nom`,`cout`, `logo`,`img`,`bonus`,`info`,`reparer`) VALUES '
        insert += equipements
            .map(({ nom, cout, logo, img, bonus, info, reparer }) => `('${nom}','${cout.replace(/'/g, '"')}','${logo}','${img}','${bonus}','${info}','${reparer ? 1 : 0}')`).join(' , ')
        await queryRunner.query(insert)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
