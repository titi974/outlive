import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class ConstructionSalle1602961785790 implements MigrationInterface {
    name = 'constructionSalle1602961785790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('Abris_Salles',
            [new TableColumn({
                name: 'construire',
                type: 'boolean',
                isNullable: false,
                default: false,
            })])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('Abris_Salles', [new TableColumn({
            name: 'construire',
            type: 'boolean',
        })])
    }

}
