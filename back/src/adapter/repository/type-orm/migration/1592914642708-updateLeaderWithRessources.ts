import {MigrationInterface, QueryRunner} from 'typeorm'

export class updateLeaderWithRessources1592914642708 implements MigrationInterface {
    name = 'updateLeaderWithRessources1592914642708'
    cbk = (queryRunner: QueryRunner) => ({ressources, identite}) => {
        queryRunner.query(
            'UPDATE `Leader` SET `ressources`=? WHERE `identite`= ?',
            [ressources, identite],
        )
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        const cbk1 = this.cbk(queryRunner);

        const updatePromise = [
            { ressources: `[{"EAU":2}]`, identite: 'ERIN McCARTHY' },
            { ressources: `[{"MUNITION":2},{"PUCE":1}]`, identite: 'GRAYSON PIGOTT' },
            { ressources: `[{"METAL":2},{"PUCE":1}]`, identite: 'JACOB ROWLETT' },
            { ressources: `[{"MUNITION":1},{"BOIS":2}]`, identite: 'KOOPER FROSTE' },
            { ressources: `[{"MUNITION":3}]`, identite: 'LIZA VALENTINE' },
            { ressources: `[{"PUCE":3}]`, identite: 'LILY-ROSE WELY' },
            { ressources: `[]`, identite: 'MARY KOOLPEPPER' },
            { ressources: `[{"CONSERVE":2}]`, identite: 'SOLEN LIVRICH' },
            { ressources: `[{"MUNITION":1},{"PUCE":2}]`, identite: 'SWIFTY BINGHAM' },
            { ressources: `[{"GIBIER":2}]`, identite: 'WILSON FRYE' },
        ].map(cbk1)
        await Promise.all(updatePromise)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE Leader SET ressources ='[]'`)
    }
}

