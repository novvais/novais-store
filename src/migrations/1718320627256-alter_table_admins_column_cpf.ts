import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableAdminsColumnCpf1718320627256
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "admins",
      "cpf",
      new TableColumn({
        name: "cpf",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "admins",
      "cpf",
      new TableColumn({
        name: "cpf",
        type: "varchar",
        isUnique: true
      })
    );
  }
}
