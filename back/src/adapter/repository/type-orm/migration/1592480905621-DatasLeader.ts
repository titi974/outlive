import { MigrationInterface, QueryRunner } from 'typeorm'

export class DatasLeader1592480905621 implements MigrationInterface {
    name = 'DatasLeader1592480905621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'INSERT INTO `Leader` (`identite`,`profession`, `age`,`photo`) VALUES ' +
                "('WILSON FRYE', 'Chasseur', 44,'wilson_frye'), " +
                "('SWIFTY BINGHAM', 'Ingénieur', 19,'swifty_bingham'), " +
                "('SOLEN LIVRICH', 'Kodeuse', 32, 'solen_livrich'), " +
                "('LIZA VALENTINE', 'Militaire', 25, 'liza_valentine'), " +
                "('LILY-ROSE WELY', 'Geekette', 20, 'lily_rose_wely'), " +
                "('KOOPER FROSTE', 'Bucheron', 51, 'kooper_froste'), " +
                "('JACOB ROWLETT', 'Mineur', 66, 'jacob_rowlett'), " +
                "('GRAYSON PIGOTT', 'Combattant', 38, 'grayson_pigott'), " +
                "('ERIN McCARTHY', 'Sourcière', 17, 'erin_mc_carthy'), " +
                "('MARY KOOLPEPPER', 'Policière', 23, 'mary_koolpepper')",
        )
    }

    public async down(queryRunne: QueryRunner): Promise<void> {}
}

//'DROP COLUMN identite, ' +
//             'DROP COLUMN profession,' +
//             'DROP COLUMN age
