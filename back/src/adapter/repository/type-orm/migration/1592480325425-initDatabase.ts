import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabase1592480325425 implements MigrationInterface {
    name = 'initDatabase1592480325425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `Joueur` (`id` varchar(255) NOT NULL, `couleur` varchar(255) NOT NULL, `jeuxId` varchar(255) NOT NULL, `pseudo` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Jeux` (`id` varchar(255) NOT NULL, `dateDebut` datetime NOT NULL, `nbreJoueur` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Leader` (`id` MEDIUMINT NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `Joueur` ADD CONSTRAINT `FK_bdbd3e39e036229811554a820b2` FOREIGN KEY (`jeuxId`) REFERENCES `Jeux`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Joueur` DROP FOREIGN KEY `FK_bdbd3e39e036229811554a820b2`");
        await queryRunner.query("DROP TABLE `Leader`");
        await queryRunner.query("DROP TABLE `Jeux`");
        await queryRunner.query("DROP TABLE `Joueur`");

    }

}
