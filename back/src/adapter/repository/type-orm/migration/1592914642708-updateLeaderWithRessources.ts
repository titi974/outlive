import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateLeaderWithRessources1592914642708 implements MigrationInterface {
    name = 'updateLeaderWithRessources1592914642708'
    cbk = (queryRunner: QueryRunner) => ({ ressources, identite }) => {
        queryRunner.query('UPDATE `Leader` SET `ressources`=? WHERE `identite`= ?', [
            ressources,
            identite,
        ])
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        const cbk1 = this.cbk(queryRunner)

        const updatePromise = [
            {
                ressources: `[{"name":"EAU", "quantite":2}]`,
                identite: 'ERIN McCARTHY',
            },
            {
                ressources: `[{"name":"MUNITION", "quantite":2},{"name":"PUCE","quantite":1}]`,
                identite: 'GRAYSON PIGOTT',
            },
            {
                ressources: `[{"name":"METAL", "quantite":2},{"name":"PUCE","quantite":1}]`,
                identite: 'JACOB ROWLETT',
            },
            {
                ressources: `[{"name":"MUNITION", "quantite":1},{"name":"BOIS","quantite":2}]`,
                identite: 'KOOPER FROSTE',
            },
            {
                ressources: `[{"name":"MUNITION", "quantite":3}]`,
                identite: 'LIZA VALENTINE',
            },
            {
                ressources: `[{"name":"PUCE", "quantite":3}]`,
                identite: 'LILY-ROSE WELY',
            },
            { ressources: `[]`, identite: 'MARY KOOLPEPPER' },
            {
                ressources: `[{"name":"CONSERVE","quantite":2}]`,
                identite: 'SOLEN LIVRICH',
            },
            {
                ressources: `[{"name":"MUNITION","quantite":1},{"name":"PUCE","quantite":2}]`,
                identite: 'SWIFTY BINGHAM',
            },
            {
                ressources: `[{"name":"GIBIER","quantite":2}]`,
                identite: 'WILSON FRYE',
            },
        ].map(cbk1)
        await Promise.all(updatePromise)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE Leader SET ressources ='[]'`)
    }
}
