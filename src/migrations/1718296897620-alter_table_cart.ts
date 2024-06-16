import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTableCart1718296897620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "carts",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.dropColumns("carts", [
      "product_id",
      "quantity",
      "total_price",
      "finished",
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("carts", [
      new TableColumn({
        name: "product_id",
        type: "int",
      }),
      new TableColumn({
        name: "quantity",
        type: "int",
      }),
      new TableColumn({
        name: "total_price",
        type: "float",
      }),
      new TableColumn({
        name: "finished",
        type: "boolean",
      }),
    ]);

    await queryRunner.createForeignKey(
      "carts",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
      })
    );
  }
}
