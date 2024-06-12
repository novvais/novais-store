import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Client_Addresses1718069388510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "client_addresses",
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
            name: "cep",
            type: "varchar",
          },
          {
            name: "street",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "residencial_number",
            type: "varchar",
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "district",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "state",
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

    await queryRunner.createForeignKey(
      "client_addresses",
      new TableForeignKey({
        columnNames: ["client_id"],
        referencedTableName: "clients",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "client_addresses",
      new TableForeignKey({
        columnNames: ["client_id"],
        referencedTableName: "clients",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.dropTable("client_addresses");
  }
}
