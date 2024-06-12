import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Products1718069242874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "stock",
            type: "int",
          },
          {
            name: "price",
            type: "float",
          },
          {
            name: "size",
            type: "varchar",
          },
          {
            name: "category_id",
            type: "int",
          },
          {
            name: "image_id",
            type: "int",
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

    await queryRunner.createForeignKeys("products", [
      new TableForeignKey({
        columnNames: ["category_id"],
        referencedTableName: "categories",
        referencedColumnNames: ["id"],
      }),
      new TableForeignKey({
        columnNames: ["image_id"],
        referencedTableName: "files",
        referencedColumnNames: ["id"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys("products", [
      new TableForeignKey({
        columnNames: ["category_id"],
        referencedTableName: "categories",
        referencedColumnNames: ["id"],
      }),
      new TableForeignKey({
        columnNames: ["image_id"],
        referencedTableName: "files",
        referencedColumnNames: ["id"],
      }),
    ]);

    await queryRunner.dropTable("products");
  }
}
