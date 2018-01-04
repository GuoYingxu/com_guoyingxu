import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactoring1514466997371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `guoyingxu`.`user` DROP `userName`");
        await queryRunner.query("ALTER TABLE `guoyingxu`.`user` ADD `user_name` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `guoyingxu`.`user` DROP `user_name`");
        await queryRunner.query("ALTER TABLE `guoyingxu`.`user` ADD `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL");
    }

}
