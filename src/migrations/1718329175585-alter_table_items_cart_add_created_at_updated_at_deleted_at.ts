import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableItemsCartAddCreatedAtUpdatedAtDeletedAt1718329175585
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("items_cart", [
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      }),
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      }),
      new TableColumn({
        name: "deleted_at",
        type: "timestamp",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("items_cart", [
      "created_at",
      "updated_at",
      "deleted_at",
    ]);
  }
}
