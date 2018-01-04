import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactoring1514466461219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `guoyingxu`.`user` ADD `password` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `guoyingxu`.`user` DROP `password`");
    }

}
