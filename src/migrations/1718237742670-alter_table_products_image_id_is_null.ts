import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTableProductsImageIdIsNull1718237742670
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "products",
      "image_id",
      new TableColumn({
        name: "image_id",
        type: "int",
        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        columnNames: ["image_id"],
        referencedTableName: "files",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "products",
      new TableForeignKey({
        columnNames: ["image_id"],
        referencedTableName: "files",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.changeColumn(
      "products",
      "image_id",
      new TableColumn({
        name: "image_id",
        type: "int",
      })
    );
  }
}
