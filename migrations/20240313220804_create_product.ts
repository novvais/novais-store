import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("files", (table) => {
    table.increments("id").primary().index();

    table.string("original_name").notNullable();
    table.string("extname").notNullable();

    table.timestamp("created_at").nullable();
    table.timestamp("update_at").nullable();
    table.timestamp("delete_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("files");
}
