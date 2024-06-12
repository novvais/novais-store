import {
    MigrationInterface,
    QueryRunner,
    Table
  } from "typeorm";
  
  export class Categories1718069155409 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "categories",
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
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("categories");
    }
  }
  