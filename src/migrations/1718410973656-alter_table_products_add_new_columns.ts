import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableProductsAddNewColumns1718410973656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("products", [
      new TableColumn({
        name: "width",
        type: "int",
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: "height",
        type: "int",
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: "length",
        type: "int",
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: "weight",
        type: "float",
        isNullable: false,
        default: 0.0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("products", [
      "width",
      "height",
      "length",
      "weight",
    ]);
  }
}
