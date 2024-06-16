import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTableOrdersForSale1718296960662
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["client_id"],
        referencedTableName: "clients",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.dropColumns("orders", [
      "client_id",
      "created_at",
      "updated_at",
      "deleted_at",
    ]);

    await queryRunner.addColumns("orders", [
      new TableColumn({
        name: "finished",
        type: "boolean",
        default: false,
      }),
      new TableColumn({
        name: "refund",
        type: "boolean",
        default: false,
      }),
      new TableColumn({
        name: "created_at",
        type: "date",
      }),
      new TableColumn({
        name: "updated_at",
        type: "date",
      }),
      new TableColumn({
        name: "deleted_at",
        type: "date",
        isNullable: true
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("orders", ["finished", "refund"]);

    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "client_id",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["client_id"],
        referencedTableName: "clients",
        referencedColumnNames: ["id"],
      })
    );
  }
}
