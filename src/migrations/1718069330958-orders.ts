import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Orders1718069330958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "client_id",
            type: "int",
          },
          {
            name: "cart_id",
            type: "int",
          },
          {
            name: "total_price",
            type: "float",
          },
          {
            name: "transaction_id",
            type: "varchar",
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

    await queryRunner.createForeignKeys("orders", [
      new TableForeignKey({
        columnNames: ["client_id"],
        referencedTableName: "clients",
        referencedColumnNames: ["id"],
      }),
      new TableForeignKey({
        columnNames: ["cart_id"],
        referencedTableName: "carts",
        referencedColumnNames: ["id"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys("orders", [
      new TableForeignKey({
        columnNames: ["client_id"],
        referencedTableName: "clients",
        referencedColumnNames: ["id"],
      }),
      new TableForeignKey({
        columnNames: ["cart_id"],
        referencedTableName: "carts",
        referencedColumnNames: ["id"],
      }),
    ]);

    await queryRunner.dropTable("orders");
  }
}
