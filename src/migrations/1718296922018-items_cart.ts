import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class ItemsCart1718296922018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "items_cart",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "cart_id",
            type: "int",
          },
          {
            name: "product_id",
            type: "int",
          },
          {
            name: "quantity",
            type: "int",
          },
        ],
      })
    );

    await queryRunner.createForeignKeys("items_cart", [
      new TableForeignKey({
        columnNames: ["cart_id"],
        referencedTableName: "carts",
        referencedColumnNames: ["id"],
      }),
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys("items_cart", [
      new TableForeignKey({
        columnNames: ["cart_id"],
        referencedTableName: "carts",
        referencedColumnNames: ["id"],
      }),
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
      }),
    ]);

    await queryRunner.dropTable("items_cart");
  }
}
