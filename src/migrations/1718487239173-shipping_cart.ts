import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class ShippingCart1718487239173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "shipping_carts",
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
            name: "shipping",
            type: "varchar",
          },
          {
            name: "price",
            type: "float",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "shipping_carts",
      new TableForeignKey({
        columnNames: ["cart_id"],
        referencedTableName: "carts",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "shipping_carts",
      new TableForeignKey({
        columnNames: ["cart_id"],
        referencedTableName: "cart",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.dropTable("shipping_carts")
  }
}
