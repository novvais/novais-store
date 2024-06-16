import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableColumnClientsCpfTypeForVarchar1718318933244
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "clients",
      "cpf",
      new TableColumn({
        name: "cpf",
        type: "varchar",
      })
    );

    await queryRunner.changeColumn(
      "clients",
      "phone",
      new TableColumn({
        name: "phone",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "clients",
      "cpf",
      new TableColumn({
        name: "cpf",
        type: "varchar(11)",
        isUnique: true,
      })
    );

    await queryRunner.changeColumn(
      "clients",
      "phone",
      new TableColumn({
        name: "phone",
        type: "varchar",
        isUnique: true
      })
    );
  }
}
